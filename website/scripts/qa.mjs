// Quality checks for the built site (run `npm run build` first, or `npm test` for everything).
//
//   node scripts/qa.mjs            checks + screenshots in qa-output/
//   QA_SCREENSHOTS=0 node ...      checks only
//
// Serves dist/ the way Cloudflare Pages does (/changelog -> changelog.html), then for every page and viewport, in
// light and dark: axe accessibility rules (WCAG 2.1 A/AA), horizontal overflow, console errors and failed requests.
// Also validates every internal link and #anchor in the built HTML. Exits non-zero on any failure.

import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const out = join(root, 'qa-output');
const screenshots = process.env.QA_SCREENSHOTS !== '0';
const failures = [];
const fail = (msg) => failures.push(msg);

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

// ---------- Static server ----------

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function resolveFile(pathname) {
  const clean = decodeURIComponent(pathname).replace(/\/+$/, '') || '/index';
  for (const candidate of [clean, `${clean}.html`, join(clean, 'index.html')]) {
    const p = join(dist, candidate);
    if (p.startsWith(dist) && existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}

const server = createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://x');
  const file = resolveFile(pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(readFileSync(join(dist, '404.html')));
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

// ---------- Link validation (static) ----------

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

const files = htmlFiles(dist);
const pagePath = (file) => '/' + relative(dist, file).replace(/\.html$/, '').replace(/(^|\/)index$/, '');
const idsByPage = new Map(
  files.map((f) => [pagePath(f), new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]),
);
const external = new Set();
let linkCount = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const from = pagePath(file);
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    linkCount++;
    if (/^(https?:)?\/\//.test(href)) {
      external.add(href);
      continue;
    }
    if (/^(mailto|tel):/.test(href)) continue;
    const [path, hash] = href.split('#');
    const target = path === '' ? from : path.replace(/\/$/, '') || '/';
    if (!idsByPage.has(target) && !resolveFile(target)) fail(`Broken link on ${from}: ${href}`);
    else if (hash && idsByPage.has(target) && !idsByPage.get(target).has(hash))
      fail(`Missing anchor on ${from}: ${href}`);
  }
}

// ---------- Browser checks ----------

const executablePath =
  process.env.CHROMIUM_PATH ?? (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'small', width: 320, height: 640 },
];
const schemes = ['light', 'dark'];
const pages = [...idsByPage.keys()].filter((p) => p !== '/404').sort();
pages.push('/this-page-does-not-exist');

if (screenshots) mkdirSync(out, { recursive: true });

async function revealAll(page) {
  // Scroll through so every entrance animation runs, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}

let axeRuns = 0;
for (const vp of viewports) {
  for (const scheme of schemes) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: scheme,
      deviceScaleFactor: 1,
    });
    for (const path of pages) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
      page.on('response', (r) => {
        if (r.status() >= 400 && r.url() !== base + path) errors.push(`${r.status()} ${r.url()}`);
      });
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await revealAll(page);
      const tag = `${path} @ ${vp.name}/${scheme}`;

      for (const e of errors) fail(`Console/network error on ${tag}: ${e}`);

      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        if (document.documentElement.scrollWidth <= w) return null;
        const culprits = [...document.querySelectorAll('body *')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.right > w + 1 && getComputedStyle(el).position !== 'fixed';
          })
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`);
        return `${document.documentElement.scrollWidth}px > ${w}px (${culprits.join(', ')})`;
      });
      if (overflow) fail(`Horizontal overflow on ${tag}: ${overflow}`);

      // Accessibility: every page in both schemes at desktop and mobile widths.
      if (vp.name === 'desktop' || vp.name === 'mobile') {
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
        axeRuns++;
        for (const v of results.violations) {
          fail(`a11y ${v.id} (${v.impact}) on ${tag}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        }
      }

      if (screenshots && (path === '/' || vp.name !== 'laptop')) {
        const name = `${(path.replace(/\//g, '_') || '_') === '_' ? 'home' : path.slice(1).replace(/\//g, '_')}-${vp.name}-${scheme}.png`;
        if (path === '/' || ['desktop', 'mobile'].includes(vp.name)) {
          await page.screenshot({ path: join(out, name), fullPage: true });
        }
      }
      await page.close();
    }
    await context.close();
  }
}

// Interaction checks: the demo, dashboard tabs, mobile menu and appearance control actually respond.
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const before = await page.getAttribute('[data-ribbon="aB"]', 'd');
  await page.click('[data-state="charging"]');
  await page.waitForTimeout(600);
  const after = await page.getAttribute('[data-ribbon="aB"]', 'd');
  if (before === after) fail('Power-flow demo did not change when a state was chosen');
  if ((await page.textContent('[data-mac-label]')) !== '35W') fail('Power-flow demo shows the wrong Mac total for Charging');

  await page.click('#tab-cpu');
  if (await page.isHidden('#panel-cpu')) fail('Dashboard tab did not show its panel');
  await page.focus('#tab-cpu');
  await page.keyboard.press('ArrowDown');
  if ((await page.getAttribute('#tab-gpu', 'aria-selected')) !== 'true') fail('Dashboard tabs do not respond to arrow keys');

  await page.click('[data-menu-button]');
  if (await page.isHidden('#mobile-menu')) fail('Mobile menu did not open');
  await page.keyboard.press('Escape');
  if (!(await page.isHidden('#mobile-menu'))) fail('Mobile menu did not close on Escape');

  await page.click('[data-theme-value="dark"]');
  if ((await page.getAttribute('html', 'data-theme')) !== 'dark') fail('Appearance control did not switch to dark');
  await page.reload();
  if ((await page.getAttribute('html', 'data-theme')) !== 'dark') fail('Appearance choice was not remembered');
  await context.close();
}

await browser.close();
server.close();

console.log(`Pages: ${pages.length} · viewports: ${viewports.length} × ${schemes.length} schemes · axe runs: ${axeRuns}`);
console.log(`Links checked: ${linkCount} (${external.size} external, not fetched):`);
for (const e of external) console.log(`  ${e}`);
if (screenshots) console.log(`Screenshots: ${relative(root, out)}/`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of [...new Set(failures)]) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log('\nAll checks passed.');

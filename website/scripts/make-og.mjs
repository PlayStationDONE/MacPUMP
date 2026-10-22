// Renders public/og.png (1200 × 630), the social preview image, from the real app icon and popover render.
// Run after changing the icon or the headline: `node scripts/make-og.mjs`.

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('..', import.meta.url));
const b64 = (p) => readFileSync(root + p).toString('base64');
const icon = b64('src/assets/app-icon.png');
const popover = b64('src/assets/screens/popover.png');

const html = `<!doctype html><html><head><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; font-family: -apple-system, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
    background: radial-gradient(60% 80% at 82% 30%, rgba(22,112,212,.35), transparent 70%), #0b0c0f; color: #f5f5f7;
    display: grid; grid-template-columns: 1fr 420px; align-items: center; padding: 0 80px; gap: 40px; }
  img.icon { width: 112px; height: 112px; margin-left: -12px; }
  .name { margin-top: 18px; font-size: 26px; font-weight: 600; color: #b4b4ba; }
  h1 { margin-top: 10px; font-size: 64px; line-height: 1.05; letter-spacing: -0.03em; font-weight: 700; }
  p { margin-top: 22px; font-size: 25px; color: #b4b4ba; line-height: 1.4; }
  .shot { justify-self: end; width: 380px; padding: 12px; border-radius: 20px; background: #2c2d35;
    box-shadow: 0 30px 60px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.1); transform: translateY(70px); }
  .shot img { width: 100%; border-radius: 8px; display: block; }
</style></head><body>
  <div>
    <img class="icon" src="data:image/png;base64,${icon}" alt="">
    <div class="name">MacPUMP</div>
    <h1>See where your Mac’s power goes.</h1>
    <p>Live power use, battery time left and power by app, in plain English.</p>
  </div>
  <div class="shot"><img src="data:image/png;base64,${popover}" alt=""></div>
</body></html>`;

const executablePath =
  process.env.CHROMIUM_PATH ?? (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: root + 'public/og.png' });
await browser.close();
console.log('Wrote public/og.png');

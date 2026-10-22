# Updating the website

Short checklists for the jobs that come up. Run `npm test` (type check, build, then QA) before pushing. If it passes,
the site is safe to deploy.

## When you publish a new release

1. **Publish the GitHub release** in this repository (`PlayStationDONE/MacPUMP`) with the `.dmg` and `.zip` attached.
   Releases here are public, so the asset links work for everyone.
2. **Edit [`src/config/site.ts`](src/config/site.ts) → `release`:**
   - `version`, `date` (`YYYY-MM-DD`), and `channel` (`'release'` once it isn't a pre-release).
   - `downloadUrl`, `fileName` and `sha256` for the main download (the `.dmg`), and `alternate` for the ZIP. The
     SHA-256 values are in the release notes and in each asset's digest on the release page. While `downloadUrl` is
     `null`, the site says the download isn't available yet; it never shows a broken button.
   - `signing`: change `summary` and set `notarized: true` **only** once the build really is Developer ID signed and
     notarized. Then also update the "Open it once" install step in
     [`DownloadSection.astro`](src/components/DownloadSection.astro), the FAQ entry about the macOS warning in
     [`src/data/content.ts`](src/data/content.ts), and [`getting-started.md`](src/content/docs/getting-started.md).
3. **Add a changelog entry:** copy [`src/content/changelog/1.2.0.md`](src/content/changelog/1.2.0.md) to
   `x.y.z.md`, give it the next `order` number, and summarise the release in plain English.
4. If requirements changed, edit `requirements` in `site.ts`.
5. `npm test`, commit and push. The deploy happens on merge to `main` (see "Deployment").

## When a feature changes

Feature text lives in one place, [`src/data/content.ts`](src/data/content.ts): the overview, dashboard tabs,
measurement table and FAQ. Longer explanations are in the docs (`src/content/docs/*.md`) and in the section components
(`src/components/*Section.astro`).

Only describe what the shipped app does, using the names the app uses (for example "App power (estimated)" and "Not
assigned to apps" in the popover). Check against the app itself and the README. Keep estimates labelled as estimates.

## Screenshots

The site uses the real screenshots from `screenshots/` at the repository root, copied to `website/src/assets/screens/`
(`app-*.png`). Tabs without a screenshot yet (GPU, Memory, Disk, Network, Activity, Sensors) show a labelled
placeholder in [`DashboardSection.astro`](src/components/DashboardSection.astro).

To add or refresh a screenshot:

1. Capture the window on a Mac (⌘⇧4, then Space, then click the window). Keep the window's own title bar; the site
   shows it as it is.
2. Save it to `src/assets/screens/`, for example `app-gpu.png`.
3. In `DashboardSection.astro`, import it and add an entry to the `shots` map, keyed by the tab name, with a short
   `alt` describing what the screenshot shows. The placeholder disappears automatically.

Images are converted to responsive WebP at build time, so commit the original PNG. After a new release changes the UI,
re-capture the screenshots so the site doesn't describe an old version.

If the icon or headline changes, regenerate the social preview with `node scripts/make-og.mjs`.

## Deployment

The site is static: `npm run build` writes `dist/`. It's set up for **Cloudflare Pages**:

| Setting | Value |
| --- | --- |
| Root directory | `website` |
| Build command | `npm ci && npm run build` |
| Output directory | `dist` |
| Node version | 22 (from `.node-version`) |
| Environment variable | `SITE_URL` = the public address, e.g. `https://macpump.pages.dev` or your domain |

There are two ways to deploy, so use **one**:

1. **Cloudflare's Git integration (simplest).** In the Cloudflare dashboard: Workers & Pages → Create → Pages →
   Connect to Git → choose this repository → use the settings above. Every push to `main` deploys, and pull requests
   get preview URLs.
2. **GitHub Actions** ([`.github/workflows/website.yml`](../.github/workflows/website.yml)). Add two repository
   secrets, `CLOUDFLARE_API_TOKEN` (a token with only *Cloudflare Pages: Edit*) and `CLOUDFLARE_ACCOUNT_ID`, and a
   repository variable `CLOUDFLARE_PAGES_PROJECT` (defaults to `macpump`). Pushes to `main` that touch `website/` then
   deploy. Without the secrets, the workflow only builds and tests.

Only `website/dist` is uploaded. No application source code is part of the deployed site.

Security headers and caching are in [`public/_headers`](public/_headers).

## Checks

| Command | What it does |
| --- | --- |
| `npm run dev` | Local server with live reload |
| `npm run check` | TypeScript and Astro diagnostics |
| `npm run build` | Static build into `dist/` |
| `npm run qa` | Every page at 5 widths in light and dark: axe (WCAG 2.1 AA), horizontal overflow, console and network errors, internal links and anchors, and the interactive parts. Saves screenshots to `qa-output/` |
| `npm test` | All of the above |

QA needs a Chromium for Playwright: `npx playwright install chromium`, or set `CHROMIUM_PATH`.

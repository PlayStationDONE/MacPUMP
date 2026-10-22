# MacPUMP website

The product website for MacPUMP: a static [Astro](https://astro.build) site with no client framework and a few small
scripts. It lives here, separate from the macOS app, and builds to plain HTML, CSS and images.

```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm test         # type check, build, accessibility / layout / link QA
```

- [MAINTENANCE.md](MAINTENANCE.md): updating for a release, replacing screenshots, deployment.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): colours, type, spacing, glass, motion and components.

## Layout

```
src/config/site.ts        version, download link, requirements, navigation: edit this for releases
src/data/content.ts       feature text, dashboard tabs, measurement table, FAQ
src/content/changelog/    one Markdown file per release
src/content/docs/         documentation pages
src/components/           page sections (Hero, PowerSection, …) and small parts
src/layouts/              Base (SEO, nav, footer) and DocsLayout
src/styles/               tokens.css (design tokens) and global.css (shared patterns)
src/assets/               the app icon and real app renders (optimised at build time)
public/                   favicons, social image, Cloudflare _headers
scripts/qa.mjs            browser QA
scripts/make-og.mjs       regenerates public/og.png
```

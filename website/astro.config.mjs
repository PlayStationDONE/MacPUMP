// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public address of the site. Set SITE_URL in the hosting provider's build settings once a custom
// domain is attached; canonical links, Open Graph URLs, the sitemap and robots.txt all follow it.
const site = process.env.SITE_URL ?? 'https://macpump.pages.dev';

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  devToolbar: { enabled: false },
});

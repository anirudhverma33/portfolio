import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow from the repository name,
// so renaming the repository (or adding a custom domain) needs no code change.
export default defineConfig({
  site: process.env.SITE_URL || 'https://anirudhverma33.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});

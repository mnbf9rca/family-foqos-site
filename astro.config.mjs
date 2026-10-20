// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used by Layout.astro for canonical and og:url. Default build.format 'directory'
  // gives trailing-slash paths (/support/), matching Cloudflare's 308 target.
  site: 'https://family-foqos.app',
  vite: {
    plugins: [tailwindcss()]
  }
});

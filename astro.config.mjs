import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({
  site: 'https://www.purist.online',
  trailingSlash: 'never',
  output: 'hybrid',
  adapter: vercel({ maxDuration: 120 }),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    preact({ compat: true }),
    icon({ iconDir: 'src/icons' }),
  ],
  build: {
    // Inline small CSS chunks (<= 8 KB) directly in HTML — eliminates their render-blocking
    // network requests. Larger bundles (Tailwind index.css) stay external and cached.
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Doubles the default 4 KB threshold so cart CSS and other small chunks get inlined
      assetsInlineLimit: 8192,
    },
    resolve: {
      dedupe: ['preact', 'preact/hooks', 'preact/compat', '@preact/signals'],
    },
  },
});

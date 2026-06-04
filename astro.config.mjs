import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.purist.online',
  output: 'hybrid',
  adapter: vercel(),
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    preact({ compat: true }),
    icon({ iconDir: 'src/icons' }),
    sitemap({
      filter: (page) =>
        !page.includes('/pages/dashboard') &&
        !page.includes('/pages/track') &&
        !page.includes('/login') &&
        !page.includes('/cart') &&
        !page.includes('/checkout'),
    }),
  ],
  vite: {
    resolve: {
      dedupe: ['preact', 'preact/hooks', 'preact/compat', '@preact/signals'],
    },
  },
});

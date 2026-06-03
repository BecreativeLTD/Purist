import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://purist.example.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    preact({ compat: true }),
    sitemap({
      filter: (page) => page != null && !page.includes('/blog/'),
    }),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    resolve: {
      dedupe: ['preact', 'preact/hooks', 'preact/compat', '@preact/signals'],
    },
  },
});

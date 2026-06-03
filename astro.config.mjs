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
      filter: (page) => !page.includes('/blog/'),
      serialize(item) {
        if (!item) return undefined;
        return { ...item, changefreq: 'weekly', priority: item.url.includes('/products/') ? 0.9 : 0.7 };
      },
    }),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    resolve: {
      dedupe: ['preact', 'preact/hooks', 'preact/compat', '@preact/signals'],
    },
  },
});

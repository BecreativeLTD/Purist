import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/serverless';
export default defineConfig({
  site: 'https://www.purist.online',
  output: 'hybrid',
  adapter: vercel(),
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    preact({ compat: true }),
    icon({ iconDir: 'src/icons' }),
  ],
  vite: {
    resolve: {
      dedupe: ['preact', 'preact/hooks', 'preact/compat', '@preact/signals'],
    },
  },
});

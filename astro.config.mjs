// @ts-check
import { defineConfig } from 'astro/config';
import vercelStatic from '@astrojs/vercel/static';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercelStatic({}),
  vite: {
    plugins: [tailwindcss()]
  }
});
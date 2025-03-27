import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'github-light' },
    }),
  ],
  output: 'static',
  site: 'https://nicolas-cusan.github.io/tailwind-clamp',
  base: '/tailwind-clamp',

  experimental: {
    svg: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

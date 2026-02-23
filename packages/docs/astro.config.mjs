import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { visit } from 'unist-util-visit';

import tailwindcss from '@tailwindcss/vite';

function rehypeScrollableTables() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'table' && parent) {
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: { className: ['overflow-x-auto'] },
          children: [node],
        };
        parent.children[index] = wrapper;
      }
    });
  };
}

export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'github-light' },
      rehypePlugins: [rehypeScrollableTables],
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

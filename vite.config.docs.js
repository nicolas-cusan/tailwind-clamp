import { defineConfig } from 'vite';

export default defineConfig({
  // Set base URL for GitHub Pages
  // Replace 'repo-name' with your repository name
  base: '/tailwind-clamp/',
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: 'index.html',
    },
  },
});

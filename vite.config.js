import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'tailwind-clamp',
      fileName: 'index',
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ['tailwindcss'],
    },
  },
  plugins: [tailwindcss()],
});

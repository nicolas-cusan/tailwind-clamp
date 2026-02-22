import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: 'playground',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'tailwind-clamp-merge',
      fileName: 'index',
    },
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ['tailwind-merge'],
    },
  },
  plugins: [tailwindcss()],
  test: {
    root: path.resolve(__dirname),
  },
});

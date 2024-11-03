/** @type {import('tailwindcss').Config} */

import { tailwindClamp, clampValue } from './lib/index.js';

const options = {
  minViewportWidth: 375,
  maxViewportWidth: 1440,
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: { test: clampValue(30, 50) },
    },
  },
  plugins: [tailwindClamp(options)],
};

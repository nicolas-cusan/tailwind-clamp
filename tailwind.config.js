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
      fontSize: {
        size1: ['20rem', { lineHeight: '22rem', letterSpacing: '0rem' }],
        size2: ['24rem', { lineHeight: '28rem', letterSpacing: '0rem' }],
      },
    },
  },
  plugins: [tailwindClamp(options)],
};

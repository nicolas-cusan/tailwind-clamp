/** @type {import('tailwindcss').Config} */

import { tailwindClamp, clampValue } from './lib/index.js';

const options = {
  minViewportWidth: 375,
  maxViewportWidth: 1440,
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      'single-arr': ['2rem'],
      single: '4rem',
      's-base': ['2rem', '3rem'],
      's-md': [
        '1.5rem',
        {
          lineHeight: '2rem',
          letterSpacing: '-0.01em',
          fontWeight: '500',
        },
      ],
      's-xl': [
        '1.875rem',
        {
          lineHeight: '2.25rem',
          letterSpacing: '1em',
          fontWeight: '700',
        },
      ],
    },
    extend: {
      padding: { test: clampValue(30, 50) },
    },
  },
  plugins: [tailwindClamp(options)],
};

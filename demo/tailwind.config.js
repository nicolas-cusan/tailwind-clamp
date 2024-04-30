/** @type {import('tailwindcss').Config} */

const { setupClamp } = require('../src/utils.js');

const options = {
  minViewportWidth: 375,
  maxViewportWidth: 1440,
};

const { clamp, clampFs } = setupClamp(options);

module.exports = {
  content: [
    './demo/src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './demo/src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './demo/src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      base: clampFs([16, 20], [24, 28], '-0.01em'),
      md: clampFs([20, 24], [32, 36], '-0.01em'),
      lg: clampFs([32, 36], [40, 44], '-0.015em'),
      xl: clampFs([38, 42], [80, 82], '-0.03em'),
    },
    extend: {
      borderRadius: {
        'c-sm': clamp(4, 8),
        'c-md': clamp(8, 12),
        'c-lg': clamp(12, 22),
      },
      spacing: {
        grid: clamp(10, 20),
      },
    },
  },
  plugins: [require('../src/index.js')(options)],
};

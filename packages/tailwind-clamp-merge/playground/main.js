import { extendTailwindMerge } from 'tailwind-merge';
import { withTailwindClamp } from '../lib/index.js';

const twMerge = extendTailwindMerge(withTailwindClamp);

const input = document.getElementById('input');
const output = document.getElementById('output');
const presetsContainer = document.getElementById('presets');

const presets = [
  { label: 'p-4 → clamp', value: 'p-4 clamp-[p,1rem,2rem]' },
  { label: 'clamp → p-4', value: 'clamp-[p,1rem,2rem] p-4' },
  { label: 'px + py → clamp-p', value: 'px-4 py-2 clamp-[p,1rem,2rem]' },
  { label: 'w + h → clamp-size', value: 'w-4 h-8 clamp-[size,1rem,2rem]' },
  { label: 'text-lg → clamp-text', value: 'text-lg clamp-[text,1rem,2rem]' },
  { label: 'border-2 → clamp-border', value: 'border-2 clamp-[border,1px,3px]' },
  { label: 'rounded hierarchy', value: 'rounded-tl-lg clamp-[rounded,0.5rem,1rem]' },
  { label: 'md: modifier', value: 'md:p-4 md:clamp-[p,1rem,2rem]' },
  { label: 'non-conflicting', value: 'clamp-[p,1rem,2rem] clamp-[m,0.5rem,1rem]' },
  { label: 'stroke color preserved', value: 'stroke-red-500 clamp-[stroke,1px,3px]' },
];

function update() {
  const value = input.value.trim();
  if (!value) {
    output.textContent = '\u2014';
    return;
  }
  output.textContent = twMerge(value);
}

input.addEventListener('input', update);

for (const preset of presets) {
  const button = document.createElement('button');
  button.textContent = preset.label;
  button.className =
    'rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-mono text-gray-300 hover:bg-gray-700 hover:text-white transition-colors';
  button.addEventListener('click', () => {
    input.value = preset.value;
    update();
  });
  presetsContainer.appendChild(button);
}

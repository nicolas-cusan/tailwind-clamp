/**
 * Maps clamp property shorthands to tailwind-merge class group IDs.
 *
 * Most properties map 1:1 (e.g. `p` → `p`). Key divergences:
 * - `border*` → `border-w*` (tw-merge separates width from color)
 * - `text` → `font-size` (tw-merge's group for text sizing)
 * - `stroke` → `stroke-w` (tw-merge separates width from color)
 * - `decoration` → `text-decoration-thickness`
 */
export const PROP_TO_GROUP = {
  // Padding
  p: 'p',
  pt: 'pt',
  pb: 'pb',
  pl: 'pl',
  ps: 'ps',
  pr: 'pr',
  pe: 'pe',
  px: 'px',
  py: 'py',
  pbs: 'pbs',
  pbe: 'pbe',

  // Margin
  m: 'm',
  mt: 'mt',
  mb: 'mb',
  ml: 'ml',
  ms: 'ms',
  mr: 'mr',
  me: 'me',
  mx: 'mx',
  my: 'my',
  mbs: 'mbs',
  mbe: 'mbe',

  // Inset
  inset: 'inset',
  'inset-x': 'inset-x',
  'inset-y': 'inset-y',
  start: 'start',
  end: 'end',
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom',

  // Gap
  gap: 'gap',
  'gap-x': 'gap-x',
  'gap-y': 'gap-y',

  // Width / Height
  w: 'w',
  h: 'h',
  size: 'size',

  // Min / Max
  'min-w': 'min-w',
  'min-h': 'min-h',
  'max-w': 'max-w',
  'max-h': 'max-h',

  // Scroll Margin
  'scroll-m': 'scroll-m',
  'scroll-mx': 'scroll-mx',
  'scroll-my': 'scroll-my',
  'scroll-ms': 'scroll-ms',
  'scroll-me': 'scroll-me',
  'scroll-mt': 'scroll-mt',
  'scroll-mb': 'scroll-mb',
  'scroll-ml': 'scroll-ml',
  'scroll-mr': 'scroll-mr',
  'scroll-mbs': 'scroll-mbs',
  'scroll-mbe': 'scroll-mbe',

  // Scroll Padding
  'scroll-p': 'scroll-p',
  'scroll-px': 'scroll-px',
  'scroll-py': 'scroll-py',
  'scroll-ps': 'scroll-ps',
  'scroll-pe': 'scroll-pe',
  'scroll-pt': 'scroll-pt',
  'scroll-pb': 'scroll-pb',
  'scroll-pl': 'scroll-pl',
  'scroll-pr': 'scroll-pr',
  'scroll-pbs': 'scroll-pbs',
  'scroll-pbe': 'scroll-pbe',

  // Translate
  translate: 'translate',
  'translate-x': 'translate-x',
  'translate-y': 'translate-y',

  // Typography
  text: 'font-size',
  leading: 'leading',
  tracking: 'tracking',
  'underline-offset': 'underline-offset',
  decoration: 'text-decoration-thickness',

  // Border Width (tw-merge uses `border-w` prefix, not `border`)
  border: 'border-w',
  'border-t': 'border-w-t',
  'border-b': 'border-w-b',
  'border-l': 'border-w-l',
  'border-s': 'border-w-s',
  'border-r': 'border-w-r',
  'border-e': 'border-w-e',
  'border-x': 'border-w-x',
  'border-y': 'border-w-y',

  // Border Radius
  rounded: 'rounded',
  'rounded-s': 'rounded-s',
  'rounded-ss': 'rounded-ss',
  'rounded-se': 'rounded-se',
  'rounded-e': 'rounded-e',
  'rounded-ee': 'rounded-ee',
  'rounded-es': 'rounded-es',
  'rounded-t': 'rounded-t',
  'rounded-r': 'rounded-r',
  'rounded-b': 'rounded-b',
  'rounded-l': 'rounded-l',
  'rounded-tl': 'rounded-tl',
  'rounded-tr': 'rounded-tr',
  'rounded-bl': 'rounded-bl',
  'rounded-br': 'rounded-br',

  // Stroke Width (tw-merge uses `stroke-w`, not `stroke`)
  stroke: 'stroke-w',
};

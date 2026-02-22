import { mergeConfigs } from 'tailwind-merge';
import { PROP_TO_GROUP } from './mapping.js';

/**
 * Creates a validator function that matches clamp-[prop,...] values
 * for a specific property name.
 *
 * @param {string} prop - The clamp property name (e.g. "p", "gap-x")
 * @returns {(value: string) => boolean}
 */
function createClampValidator(prop) {
  // Escape hyphens for regex, require comma after prop to prevent
  // `p` from matching `pt` or `px`
  const escaped = prop.replace(/-/g, '\\-');
  const re = new RegExp(`^\\[${escaped},.+,.+`);
  return (value) => re.test(value);
}

/**
 * Builds the classGroups extension object from the property-to-group mapping.
 * Each entry adds a `clamp` validator to the corresponding tw-merge group.
 */
function buildClassGroups() {
  const groups = {};

  for (const [prop, group] of Object.entries(PROP_TO_GROUP)) {
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push({ clamp: [createClampValidator(prop)] });
  }

  return groups;
}

/**
 * Plugin for `extendTailwindMerge` that teaches tailwind-merge about
 * clamp-[property,...] utilities from tailwind-clamp.
 *
 * @example
 * ```js
 * import { extendTailwindMerge } from 'tailwind-merge';
 * import { withTailwindClamp } from 'tailwind-clamp-merge';
 *
 * const twMerge = extendTailwindMerge(withTailwindClamp);
 *
 * twMerge('p-4 clamp-[p,1rem,2rem]');
 * // => 'clamp-[p,1rem,2rem]'
 * ```
 *
 * @param {import('tailwind-merge').Config} config
 * @returns {import('tailwind-merge').Config}
 */
export function withTailwindClamp(config) {
  return mergeConfigs(config, {
    extend: {
      classGroups: buildClassGroups(),
    },
  });
}

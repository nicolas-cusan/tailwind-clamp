import type { Config } from 'tailwind-merge';

/**
 * Plugin for `extendTailwindMerge` that teaches tailwind-merge about
 * clamp-[property,...] utilities from tailwind-clamp.
 *
 * @example
 * ```ts
 * import { extendTailwindMerge } from 'tailwind-merge';
 * import { withTailwindClamp } from 'tailwind-clamp-merge';
 *
 * const twMerge = extendTailwindMerge(withTailwindClamp);
 *
 * twMerge('p-4 clamp-[p,1rem,2rem]');
 * // => 'clamp-[p,1rem,2rem]'
 * ```
 */
export declare function withTailwindClamp(config: Config): Config;

import type { PluginCreator } from 'tailwindcss/types/config';

interface TailwindClampOptions {
  /** Minimum viewport width for clamp calculation. Default: '23.4375rem' (375px) */
  minSize?: string;
  /** Maximum viewport width for clamp calculation. Default: '90rem' (1440px) */
  maxSize?: string;
}

declare const plugin: {
  (options?: TailwindClampOptions): { handler: PluginCreator };
  __isOptionsFunction: true;
};

export default plugin;

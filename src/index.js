import plugin from 'tailwindcss/plugin';
// import { clamp, resolveProperty } from './utils.js';
import { resolveProperty } from './resolve-property.js';
import { log } from './log.js';
import { parseValue } from './parse-value.js';

export default plugin.withOptions(function (
  options = {
    minViewportWidth: 375,
    maxViewportWidth: 1440,
  }
) {
  return function ({ matchUtilities, theme, config }) {
    matchUtilities(
      {
        clamp: (value) => {
          const args = value.split(',');

          if (args.length < 3) {
            log.error(
              `The clamp utility requires at least 3 arguments: "clamp-[${value}]".`
            );
            return null;
          }

          const resolvedProp = resolveProperty(args[0]);

          if (!resolvedProp) {
            log.error(
              `Property "${args[0]}" is not supported: "clamp-[${value}]".`
            );
            return null;
          }

          const { key, props } = resolvedProp;

          let start;
          let end;

          start = config().theme[key][args[1]] || args[1];
          end = config().theme[key][args[2]] || args[2];

          log.info('start', key, parseValue(start));
          log.info('end', key, end);

          // const start =
          //   config(`theme.${args[0]}.${args[1]}`) || parseFloat(args[1]);

          // const end =
          //   config(`theme.${args[0]}.${args[2]}`) || parseFloat(args[2]);

          // console.log('start', start);
          // console.log('end', end);

          // const prop = resolveProperty(
          //   args[0],
          //   clamp(
          //     start,
          //     end,
          //     args[3] || options.minViewportWidth,
          //     args[4] || options.maxViewportWidth
          //   )
          // );
          return null;
          // return prop;
        },
      },
      { values: theme('clamp') }
    );
  };
});

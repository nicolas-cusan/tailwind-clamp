import plugin from 'tailwindcss/plugin';
import { resolveProperty } from './resolve-property.js';
import { log } from './log.js';
import { parseValue, parseFontSizeValue, checkValues } from './parse-value.js';
import { clamp } from './clamp.js';

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

          const minvw = parseValue(
            config().theme.screens[args[3]] ||
              args[3] ||
              `${options.minViewportWidth}`
          );

          const maxvw = parseValue(
            config().theme.screens[args[4]] ||
              args[4] ||
              `${options.maxViewportWidth}`
          );

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

          // handle fontSize separately
          if (key === 'fontSize') {
            const start = parseFontSizeValue(
              config().theme[key][args[1]] || args[1]
            );
            const end = parseFontSizeValue(
              config().theme[key][args[2]] || args[2]
            );

            const css = {};

            Object.keys(start).forEach((k) => {
              if (k in end && checkValues(start[k], end[k], value, k)) {
                const val = clamp(start[k], end[k], minvw, maxvw);
                css[k] = val;
              }
            });

            return Object.keys(css).length > 0 ? css : null;
          }

          // handle other properties
          const start = parseValue(config().theme[key][args[1]] || args[1]);
          const end = parseValue(config().theme[key][args[2]] || args[2]);

          if (!checkValues(start, end, value)) {
            return null;
          }

          const val = clamp(start, end, minvw, maxvw);

          const css = props.reduce((acc, prop) => {
            if (typeof prop === 'string') {
              acc[prop] = val;
            } else {
              acc = { ...acc, ...prop };
            }
            return acc;
          }, {});

          return css;
        },
      },
      { values: theme('clamp') }
    );
  };
});

import plugin from 'tailwindcss/plugin';
import { resolveProperty } from './resolve-property.js';
import { log } from './log.js';
import { parseValue, parseFontSizeValue, checkValues } from './parse-value.js';
import { clamp, clampValue as cv } from './clamp.js';

const defaultOptions = {
  minViewportWidth: '23.4375rem',
  maxViewportWidth: '90rem',
};

export const clampValue = cv;

export default plugin.withOptions(function (options = {}) {
  const o = { ...defaultOptions, ...options };
  return function ({ matchUtilities, theme, config }) {
    matchUtilities(
      {
        clamp: (value) => {
          console.log('++++++++++++++++++++++++++++++++');
          console.log(value);
          const args = value.split(',');

          if (args.length < 3) {
            log.error(
              `The clamp utility requires at least 3 arguments: "clamp-[${value}]".`
            );
            return {};
          }

          const minvw = parseValue(
            config().theme.screens[args[3]] || args[3],
            o.minViewportWidth
          );

          const maxvw = parseValue(
            config().theme.screens[args[4]] || args[4],
            o.maxViewportWidth
          );

          const resolvedProp = resolveProperty(args[0]);

          if (!resolvedProp) {
            log.error(
              `Property "${args[0]}" is not supported: "clamp-[${value}]".`
            );
            return {};
          }

          const { key, props, type } = resolvedProp;

          // handle fontSize separately
          if (type === 'fontSize') {
            const start = parseFontSizeValue(
              config().theme[key][args[1]] || args[1]
            );
            const end = parseFontSizeValue(
              config().theme[key][args[2]] || args[2]
            );

            const css = {};

            Object.keys(start).forEach((k) => {
              if (k in end) {
                if (
                  (k === 'letterSpacing' || k === 'lineHeight') &&
                  start[k].number === end[k].number &&
                  start[k].unit === end[k].unit
                ) {
                  css[k] = `${start[k].number}${start[k].unit}`;
                } else if (checkValues(start[k], end[k], value, k)) {
                  const val = clamp(start[k], end[k], minvw, maxvw);
                  css[k] = val;
                }
              }
            });

            return Object.keys(css).length > 0 ? css : {};
          }

          // Other values
          let start = parseValue(config().theme[key][args[1]] || args[1]);
          let end = parseValue(config().theme[key][args[2]] || args[2]);

          // Handle spacing values
          if (type === 'spacing') {
            const spacing = parseValue(theme('spacing.1'));

            console.log(spacing);

            const startNegative = args[1].startsWith('-');
            const endNegative = args[2].startsWith('-');

            const startVal = startNegative ? args[1].slice(1) : args[1];
            const endVal = endNegative ? args[2].slice(1) : args[2];

            console.log(startVal, endVal);

            start = {
              number: spacing.number * startVal,
              unit: spacing.unit,
            };
            end = {
              number: spacing.number * endVal,
              unit: spacing.unit,
            };

            console.log(start, end);
            console.log('--------------------------------');
          }

          if (!checkValues(start, end, value)) {
            return {};
          }

          const val = clamp(start, end, minvw, maxvw);

          console.log(val);

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

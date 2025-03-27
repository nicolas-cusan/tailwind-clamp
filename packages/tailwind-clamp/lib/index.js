import plugin from 'tailwindcss/plugin';
import { resolveProperty } from './resolve-property.js';
import { log } from './log.js';
import {
  parseValue,
  parseFontSizeValue,
  validateValues,
} from './parse-value.js';
import { clamp } from './clamp.js';

const defaultOptions = {
  minSize: '23.4375rem',
  maxSize: '90rem',
};

function getBreakpointValue(customValue, fallback, screens, containers) {
  if (!customValue) {
    return {
      ...parseValue(fallback),
      isContainer: false,
    };
  }

  const isContainer = customValue.startsWith('@');

  const cleanValue = isContainer ? customValue.slice(1) : customValue;
  const value = isContainer
    ? containers[cleanValue] || cleanValue
    : screens[cleanValue] || cleanValue;

  return {
    ...parseValue(value),
    isContainer,
  };
}

export default plugin.withOptions(function (options = {}) {
  const o = { ...defaultOptions, ...options };
  return function ({ matchUtilities, theme, config }) {
    matchUtilities(
      {
        clamp: (value) => {
          const args = value.split(',');

          if (args.length < 3) {
            log.error(
              `The clamp utility requires at least 3 arguments: "clamp-[${value}]".`
            );
            return {};
          }

          const screens = theme('screens');
          const containers = theme('containers');

          const minvw = getBreakpointValue(
            args[3],
            o.minSize,
            screens,
            containers
          );

          const maxvw = getBreakpointValue(
            args[4],
            o.maxSize,
            screens,
            containers
          );

          if (!validateValues(minvw, maxvw, value)) {
            return {};
          }

          const useContainer = minvw.isContainer;
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
                } else if (validateValues(start[k], end[k], value, k)) {
                  const val = clamp(
                    start[k],
                    end[k],
                    minvw,
                    maxvw,
                    useContainer
                  );
                  css[k] = val;
                }
              }
            });

            return css;
          }

          // Other values
          let start = parseValue(config().theme[key][args[1]] || args[1]);
          let end = parseValue(config().theme[key][args[2]] || args[2]);

          // Handle spacing values
          if (type === 'spacing') {
            const spacing = parseValue(theme('spacing.1'));

            const startNegative = args[1].startsWith('-');
            const endNegative = args[2].startsWith('-');

            const startVal = startNegative ? args[1].slice(1) : args[1];
            const endVal = endNegative ? args[2].slice(1) : args[2];

            start = {
              number: spacing.number * startVal,
              unit: spacing.unit,
            };
            end = {
              number: spacing.number * endVal,
              unit: spacing.unit,
            };

            if (startNegative) start.number = start.number * -1;
            if (endNegative) end.number = end.number * -1;
          }

          if (!validateValues(start, end, value)) {
            return {};
          }

          const val = clamp(start, end, minvw, maxvw, useContainer);

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
      { values: theme('clamp') },
      {
        supportsNegativeValues: false,
        modifiers: {
          pattern: /[\w-]+(?:,[\w-]+){2}/, // Matches "text,lg,3xl" format
        },
      }
    );
  };
});

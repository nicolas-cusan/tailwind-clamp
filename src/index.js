import plugin from 'tailwindcss/plugin';
// import { clamp, resolveProperty } from './utils.js';
import { resolveProperty } from './resolve-property.js';
import { log } from './log.js';
import { parseValue } from './parse-value.js';
import { clamp } from './utils.js';

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

          if (key === 'fontSize') {
            return null;
          }

          if (typeof start === 'string' || typeof start === 'number') {
            start = parseValue(start);
          }

          if (typeof end === 'string' || typeof end === 'number') {
            end = parseValue(end);
          }

          if (start.unit === 'unsupported' || end.unit === 'unsupported') {
            log.error(
              `Only px, rem and em units are supported: "clamp-[${value}]".`
            );
            return null;
          }

          if (start.unit !== end.unit) {
            log.error(`Units need to match: "clamp-[${value}]".`);
            return null;
          }

          // @todo retrieve minvw and maxvw from the theme.screens
          const minvw = args[3] || options.minViewportWidth;
          const maxvw = args[4] || options.maxViewportWidth;

          const val = clamp(start, end, minvw, maxvw);

          const css = props.reduce((acc, prop) => {
            if (typeof prop === 'string') {
              acc[prop] = val;
            } else {
              acc = { ...acc, ...prop };
            }
            return acc;
          }, {});

          // const c = clamp(start, end)

          // if (Array.isArray(start)) {
          //   start = start.map(() => {
          //     return
          //   });
          // } else {
          //   log.info('start', key, parseValue(start));
          //   log.info('end', key, end);
          // }

          return css;
        },
      },
      { values: theme('clamp') }
    );
  };
});

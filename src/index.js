const plugin = require('tailwindcss/plugin');
const { clamp } = require('./tailwind-utils.js');

let cssTransformValue = [
  'translate(var(--tw-translate-x), var(--tw-translate-y))',
  'rotate(var(--tw-rotate))',
  'skewX(var(--tw-skew-x))',
  'skewY(var(--tw-skew-y))',
  'scaleX(var(--tw-scale-x))',
  'scaleY(var(--tw-scale-y))',
].join(' ');

function resolveProperty(property, value) {
  switch (property) {
    case 'p':
      return {
        padding: value,
      };
    case 'pt':
      return {
        paddingTop: value,
      };
    case 'pb':
      return {
        paddingBottom: value,
      };
    case 'pl':
      return {
        paddingLeft: value,
      };
    case 'pr':
      return {
        paddingRight: value,
      };
    case 'px':
      return {
        paddingLeft: value,
        paddingRight: value,
      };
    case 'py':
      return {
        paddingTop: value,
        paddingBottom: value,
      };
    case 'm':
      return {
        margin: value,
      };
    case 'mt':
      return {
        marginTop: value,
      };
    case 'mb':
      return {
        marginBottom: value,
      };
    case 'ml':
      return {
        marginLeft: value,
      };
    case 'mr':
      return {
        marginRight: value,
      };
    case 'mx':
      return {
        marginLeft: value,
        marginRight: value,
      };
    case 'my':
      return {
        marginTop: value,
        marginBottom: value,
      };
    case 'inset':
      return {
        top: value,
        left: value,
        right: value,
        bottom: value,
      };
    case 'top':
      return {
        top: value,
      };
    case 'left':
      return {
        left: value,
      };
    case 'right':
      return {
        right: value,
      };
    case 'bottom':
      return {
        bottom: value,
      };
    case 'text':
      return {
        fontSize: value,
      };
    case 'gap':
      return {
        gap: value,
      };
    case 'gap-x':
      return {
        columnGap: value,
      };
    case 'gap-y':
      return {
        rowGap: value,
      };
    case 'w':
      return {
        width: value,
      };
    case 'h':
      return {
        height: value,
      };
    case 'size':
      return {
        width: value,
        height: value,
      };
    case 'min-w':
      return {
        minWidth: value,
      };
    case 'min-h':
      return {
        minHeight: value,
      };
    case 'max-w':
      return {
        maxWidth: value,
      };
    case 'max-h':
      return {
        maxHeight: value,
      };
    case 'rounded':
      return {
        borderRadius: value,
      };
    case 'rounded-t':
      return {
        borderTopLeftRadius: value,
        borderTopRightRadius: value,
      };
    case 'rounded-r':
      return {
        borderTopRightRadius: value,
        borderBottomRightRadius: value,
      };
    case 'rounded-b':
      return {
        borderBottomLeftRadius: value,
        borderBottomRightRadius: value,
      };
    case 'rounded-l':
      return {
        borderTopLeftRadius: value,
        borderBottomLeftRadius: value,
      };
    case 'rounded-tl':
      return {
        borderTopLeftRadius: value,
      };
    case 'rounded-tr':
      return {
        borderTopRightRadius: value,
      };
    case 'rounded-bl':
      return {
        borderBottomLeftRadius: value,
      };
    case 'rounded-br':
      return {
        borderBottomRightRadius: value,
      };
    case 'translate-x':
      return {
        '--tw-translate-x': value,
        '@defaults transform': {},
        transform: cssTransformValue,
      };
    case 'translate-y':
      return {
        '--tw-translate-y': value,
        '@defaults transform': {},
        transform: cssTransformValue,
      };
    case 'text-stroke':
      return {
        '-webkit-text-stroke': value,
        textStroke: value,
      };
    case 'stroke':
      return {
        strokeWidth: value,
      };
    case 'leading':
      return {
        lineHeight: value,
      };
    case 'border':
      return {
        borderWidth: value,
      };
    case 'border-t':
      return {
        borderTopWidth: value,
      };
    case 'border-b':
      return {
        borderBottomWidth: value,
      };
    case 'border-l':
      return {
        borderLeftWidth: value,
      };
    case 'border-r':
      return {
        borderRightWidth: value,
      };
    case 'border-x':
      return {
        borderLeftWidth: value,
        borderRightWidth: value,
      };
    case 'border-y':
      return {
        borderTopWidth: value,
        borderBottomWidth: value,
      };
    case 'scroll-m':
      return {
        scrollMargin: value,
      };
    default:
      return null;
  }
}

module.exports = plugin.withOptions(function (
  options = {
    minViewPortWidth: 375,
    maxViewPortWidth: 1440,
  }
) {
  return function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        clamp: (value) => {
          const props = value.split(',');
          props[1] = parseFloat(props[1]);
          props[2] = parseFloat(props[2]);

          if (props.length < 3) {
            throw new Error('The clamp utility requires at least 3 arguments.');
          }

          if (typeof props[1] !== 'number' || typeof props[2] !== 'number') {
            throw new Error(
              'The clamp utility requires that the second and third arguments are numbers representing a pixel value.'
            );
          }

          const prop = resolveProperty(
            props[0],
            clamp(
              props[1],
              props[2],
              props[3] || options.minViewPortWidth,
              props[4] || options.maxViewPortWidth
            )
          );

          if (prop === null) {
            throw new Error(`Property "${props[0]}" is not supported.`);
          }

          return prop;
        },
      },
      { values: theme('clamp') }
    );
  };
});

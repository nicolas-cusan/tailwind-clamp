const cssTransformValue = [
  'translate(var(--tw-translate-x), var(--tw-translate-y))',
  'rotate(var(--tw-rotate))',
  'skewX(var(--tw-skew-x))',
  'skewY(var(--tw-skew-y))',
  'scaleX(var(--tw-scale-x))',
  'scaleY(var(--tw-scale-y))',
].join(' ');

export const resolveProperty = (name) => {
  switch (name) {
    case 'p':
      return {
        key: 'padding',
        props: ['padding'],
      };
    case 'pt':
      return {
        key: 'padding',
        props: ['paddingTop'],
      };
    case 'pb':
      return {
        key: 'padding',
        props: ['paddingBottom'],
      };
    case 'pl':
      return {
        key: 'padding',
        props: ['paddingLeft'],
      };
    case 'pr':
      return {
        key: 'padding',
        props: ['paddingRight'],
      };
    case 'px':
      return {
        key: 'padding',
        props: ['paddingLeft', 'paddingRight'],
      };
    case 'py':
      return {
        key: 'padding',
        props: ['paddingTop', 'paddingBottom'],
      };
    case 'm':
      return {
        key: 'margin',
        props: ['margin'],
      };
    case 'mt':
      return {
        key: 'margin',
        props: ['marginTop'],
      };
    case 'mb':
      return {
        key: 'margin',
        props: ['marginBottom'],
      };
    case 'ml':
      return {
        key: 'margin',
        props: ['marginLeft'],
      };
    case 'mr':
      return {
        key: 'margin',
        props: ['marginRight'],
      };
    case 'mx':
      return {
        key: 'margin',
        props: ['marginLeft', 'marginRight'],
      };
    case 'my':
      return {
        key: 'margin',
        props: ['marginTop', 'marginBottom'],
      };
    case 'inset':
      return {
        key: 'inset',
        props: ['top', 'left', 'right', 'bottom'],
      };
    case 'top':
      return {
        key: 'inset',
        props: ['top'],
      };

    case 'left':
      return {
        key: 'inset',
        props: ['left'],
      };
    case 'right':
      return {
        key: 'inset',
        props: ['right'],
      };
    case 'bottom':
      return {
        key: 'inset',
        props: ['bottom'],
      };
    case 'text':
      return {
        key: 'fontSize',
        props: ['fontSize'],
      };
    case 'gap':
      return {
        key: 'gap',
        props: ['gap'],
      };
    case 'gap-x':
      return {
        key: 'gap',
        props: ['columnGap'],
      };
    case 'gap-y':
      return {
        key: 'gap',
        props: ['rowGap'],
      };
    case 'w':
      return {
        key: 'width',
        props: ['width'],
      };
    case 'h':
      return {
        key: 'height',
        props: ['height'],
      };
    case 'size':
      return {
        key: 'size',
        props: ['width', 'height'],
      };

    case 'min-w':
      return {
        key: 'minWidth',
        props: ['minWidth'],
      };

    case 'min-h':
      return {
        key: 'minHeight',
        props: ['minHeight'],
      };

    case 'max-w':
      return {
        key: 'maxWidth',
        props: ['maxWidth'],
      };

    case 'max-h':
      return {
        key: 'maxHeight',
        props: ['maxHeight'],
      };

    case 'rounded':
      return {
        key: 'borderRadius',
        props: ['borderRadius'],
      };

    case 'rounded-t':
      return {
        key: 'borderRadius',
        props: ['borderTopLeftRadius', 'borderTopRightRadius'],
      };

    case 'rounded-r':
      return {
        key: 'borderRadius',
        props: ['borderTopRightRadius', 'borderBottomRightRadius'],
      };

    case 'rounded-b':
      return {
        key: 'borderRadius',
        props: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
      };

    case 'rounded-l':
      return {
        key: 'borderRadius',
        props: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
      };

    case 'rounded-tl':
      return {
        key: 'borderRadius',
        props: ['borderTopLeftRadius'],
      };

    case 'rounded-tr':
      return {
        key: 'borderRadius',
        props: ['borderTopRightRadius'],
      };

    case 'rounded-bl':
      return {
        key: 'borderRadius',
        props: ['borderBottomLeftRadius'],
      };

    case 'rounded-br':
      return {
        key: 'borderRadius',
        props: ['borderBottomRightRadius'],
      };

    case 'translate-x':
      return {
        key: 'translate',
        props: [
          '--tw-translate-x',
          { '@defaults transform': {} },
          { transform: cssTransformValue },
        ],
      };

    case 'translate-y':
      return {
        key: 'translate',
        props: [
          '--tw-translate-y',
          { '@defaults transform': {} },
          { transform: cssTransformValue },
        ],
      };
    case 'stroke':
      return {
        key: 'strokeWidth',
        props: ['strokeWidth'],
      };

    case 'leading':
      return {
        key: 'lineHeight',
        props: ['lineHeight'],
      };

    case 'border':
      return {
        key: 'borderWidth',
        props: ['borderWidth'],
      };
    case 'border-t':
      return {
        key: 'borderWidth',
        props: ['borderTopWidth'],
      };
    case 'border-b':
      return {
        key: 'borderWidth',
        props: ['borderBottomWidth'],
      };

    case 'border-l':
      return {
        key: 'borderWidth',
        props: ['borderLeftWidth'],
      };

    case 'border-r':
      return {
        key: 'borderWidth',
        props: ['borderRightWidth'],
      };

    case 'border-x':
      return {
        key: 'borderWidth',
        props: ['borderLeftWidth', 'borderRightWidth'],
      };

    case 'border-y':
      return {
        key: 'borderWidth',
        props: ['borderTopWidth', 'borderBottomWidth'],
      };

    case 'scroll-m':
      return {
        key: 'scrollMargin',
        props: ['scrollMargin'],
      };

    case 'tracking':
      return {
        key: 'letterSpacing',
        props: ['letterSpacing'],
      };

    default:
      return null;
  }
};

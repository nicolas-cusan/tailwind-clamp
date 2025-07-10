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
    // Sizing & Spacing
    case 'p':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['padding'],
      };

    case 'pt':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingTop'],
      };

    case 'pb':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingBottom'],
      };

    case 'pl':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingLeft'],
      };

    case 'ps':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingInlineStart'],
      };

    case 'pr':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingRight'],
      };

    case 'pe':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingInlineEnd'],
      };

    case 'px':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingInline'],
      };

    case 'py':
      return {
        type: 'spacing',
        key: 'padding',
        props: ['paddingBlock'],
      };

    case 'm':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['margin'],
      };

    case 'mt':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginTop'],
      };

    case 'mb':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginBottom'],
      };

    case 'ml':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginLeft'],
      };

    case 'ms':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginInlineStart'],
      };

    case 'mr':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginRight'],
      };

    case 'me':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginInlineEnd'],
      };

    case 'mx':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginInline'],
      };

    case 'my':
      return {
        type: 'spacing',
        key: 'margin',
        props: ['marginBlock'],
      };

    case 'inset':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['inset'],
      };

    case 'inset-x':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['insetInline'],
      };

    case 'inset-y':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['insetBlock'],
      };

    case 'start':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['insetInlineStart'],
      };

    case 'end':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['insetInlineEnd'],
      };

    case 'top':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['top'],
      };

    case 'left':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['left'],
      };

    case 'right':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['right'],
      };

    case 'bottom':
      return {
        type: 'spacing',
        key: 'inset',
        props: ['bottom'],
      };

    case 'gap':
      return {
        type: 'spacing',
        key: 'gap',
        props: ['gap'],
      };

    case 'gap-x':
      return {
        type: 'spacing',
        key: 'gap',
        props: ['columnGap'],
      };

    case 'gap-y':
      return {
        type: 'spacing',
        key: 'gap',
        props: ['rowGap'],
      };

    case 'w':
      return {
        type: 'spacing',
        key: 'width',
        props: ['width'],
      };

    case 'h':
      return {
        type: 'spacing',
        key: 'height',
        props: ['height'],
      };

    case 'size':
      return {
        type: 'spacing',
        key: 'size',
        props: ['width', 'height'],
      };

    case 'min-w':
      return {
        type: 'spacing',
        key: 'minWidth',
        props: ['minWidth'],
      };

    case 'min-h':
      return {
        type: 'spacing',
        key: 'minHeight',
        props: ['minHeight'],
      };

    case 'max-w':
      return {
        type: 'spacing',
        key: 'maxWidth',
        props: ['maxWidth'],
      };

    case 'max-h':
      return {
        type: 'spacing',
        key: 'maxHeight',
        props: ['maxHeight'],
      };

    case 'scroll-m':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMargin'],
      };

    case 'scroll-mx':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginInline'],
      };

    case 'scroll-my':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginBlock'],
      };
    case 'scroll-ms':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginInlineStart'],
      };

    case 'scroll-me':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginInlineEnd'],
      };

    case 'scroll-mt':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginTop'],
      };

    case 'scroll-mb':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginBottom'],
      };

    case 'scroll-ml':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginLeft'],
      };

    case 'scroll-mr':
      return {
        type: 'spacing',
        key: 'scrollMargin',
        props: ['scrollMarginRight'],
      };

    case 'scroll-p':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPadding'],
      };

    case 'scroll-px':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingInline'],
      };

    case 'scroll-py':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingBlock'],
      };

    case 'scroll-ps':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingInlineStart'],
      };

    case 'scroll-pe':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingInlineEnd'],
      };

    case 'scroll-pt':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingTop'],
      };

    case 'scroll-pb':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingBottom'],
      };

    case 'scroll-pl':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingLeft'],
      };

    case 'scroll-pr':
      return {
        type: 'spacing',
        key: 'scrollPadding',
        props: ['scrollPaddingRight'],
      };

    case 'translate':
      return {
        type: 'spacing',
        key: 'translate',
        props: [
          '--tw-translate-x',
          '--tw-translate-y',
          { translate: 'var(--tw-translate-x) var(--tw-translate-y)' },
        ],
      };

    case 'translate-x':
      return {
        type: 'spacing',
        key: 'translate',
        props: [
          '--tw-translate-x',
          { translate: 'var(--tw-translate-x) var(--tw-translate-y)' },
        ],
      };

    case 'translate-y':
      return {
        type: 'spacing',
        key: 'translate',
        props: [
          '--tw-translate-y',
          { translate: 'var(--tw-translate-x) var(--tw-translate-y)' },
        ],
      };

    case 'underline-offset':
      return {
        type: 'regular',
        key: 'textUnderlineOffset',
        props: ['textUnderlineOffset'],
      };

    // Border & Stroke
    case 'stroke':
      return {
        type: 'regular',
        key: 'strokeWidth',
        props: ['strokeWidth'],
      };

    case 'border':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderWidth'],
      };

    case 'border-t':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderTopWidth'],
      };

    case 'border-b':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderBottomWidth'],
      };

    case 'border-l':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderLeftWidth'],
      };

    case 'border-s':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderInlineStartWidth'],
      };

    case 'border-r':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderRightWidth'],
      };

    case 'border-e':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderInlineEndWidth'],
      };

    case 'border-x':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderInlineWidth'],
      };

    case 'border-y':
      return {
        type: 'regular',
        key: 'borderWidth',
        props: ['borderBlockWidth'],
      };

    case 'decoration':
      return {
        type: 'regular',
        key: 'textDecorationThickness',
        props: ['textDecorationThickness'],
      };

    // Border Radius
    case 'rounded':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderRadius'],
      };

    case 'rounded-s':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderStartStartRadius', 'borderEndStartRadius'],
      };

    case 'rounded-ss':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderStartStartRadius'],
      };

    case 'rounded-se':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderStartEndRadius'],
      };

    case 'rounded-e':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderStartEndRadius', 'borderEndEndRadius'],
      };

    case 'rounded-ee':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderEndEndRadius'],
      };

    case 'rounded-es':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderEndStartRadius'],
      };

    case 'rounded-t':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderTopLeftRadius', 'borderTopRightRadius'],
      };

    case 'rounded-r':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderTopRightRadius', 'borderBottomRightRadius'],
      };

    case 'rounded-b':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
      };

    case 'rounded-l':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
      };

    case 'rounded-tl':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderTopLeftRadius'],
      };

    case 'rounded-tr':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderTopRightRadius'],
      };

    case 'rounded-bl':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderBottomLeftRadius'],
      };

    case 'rounded-br':
      return {
        type: 'regular',
        key: 'borderRadius',
        props: ['borderBottomRightRadius'],
      };

    case 'leading':
      return {
        type: 'regular',
        key: 'lineHeight',
        props: ['lineHeight'],
      };

    case 'tracking':
      return {
        type: 'regular',
        key: 'letterSpacing',
        props: ['letterSpacing'],
      };

    // Type
    case 'text':
      return {
        type: 'fontSize',
        key: 'fontSize',
        props: ['fontSize'],
      };

    default:
      return null;
  }
};

import { describe, it, expect } from 'vitest';
import { clamp } from '../clamp.js';
import { parseValue, parseFontSizeValue, validateValues } from '../parse-value.js';
import { resolveProperty } from '../resolve-property.js';

// ---------------------------------------------------------------------------
// clamp.js
// ---------------------------------------------------------------------------

describe('clamp', () => {
  const defaultMinVw = { number: 23.4375, unit: 'rem' };
  const defaultMaxVw = { number: 90, unit: 'rem' };

  describe('basic rem output', () => {
    it('returns a clamp() string for rem values', () => {
      const result = clamp(
        { number: 1, unit: 'rem' },
        { number: 2, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^clamp\(1rem,/);
      expect(result).toMatch(/2rem\)$/);
      expect(result).toContain('vw');
    });

    it('uses the correct slope and intercept for rem', () => {
      const result = clamp(
        { number: 1, unit: 'rem' },
        { number: 3, unit: 'rem' },
        { number: 20, unit: 'rem' },
        { number: 80, unit: 'rem' }
      );
      // slope = (3-1)/(80-20) = 2/60 = 0.033333...
      // intercept = 1 - 20 * 0.033333... = 1 - 0.666666... = 0.333333...
      // vw coefficient = 100 * 0.033333... = 3.333333...
      expect(result).toBe(
        'clamp(1rem, 0.333333rem + 3.333333vw, 3rem)'
      );
    });
  });

  describe('basic px output', () => {
    it('returns a clamp() string for px values', () => {
      const result = clamp(
        { number: 16, unit: 'px' },
        { number: 32, unit: 'px' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^clamp\(16px,/);
      expect(result).toMatch(/32px\)$/);
      expect(result).toContain('vw');
    });

    it('converts rem viewport breakpoints to px when value unit is px', () => {
      // defaultMinVw is 23.4375rem -> 375px, defaultMaxVw is 90rem -> 1440px
      // slope = (32 - 16) / (1440 - 375) = 16 / 1065
      const result = clamp(
        { number: 16, unit: 'px' },
        { number: 32, unit: 'px' },
        defaultMinVw,
        defaultMaxVw
      );
      const slope = 16 / 1065;
      const intercept = 16 - 375 * slope;
      expect(result).toContain(`${intercept.toFixed(6)}px`);
      expect(result).toContain(`${(100 * slope).toFixed(6)}vw`);
    });
  });

  describe('px viewport with rem values (and vice versa)', () => {
    it('converts px minvw/maxvw to rem when value unit is rem', () => {
      // minvw 375px -> 23.4375rem, maxvw 1440px -> 90rem
      const result = clamp(
        { number: 1, unit: 'rem' },
        { number: 3, unit: 'rem' },
        { number: 375, unit: 'px' },
        { number: 1440, unit: 'px' }
      );
      // After conversion: minvw = 23.4375, maxvw = 90
      // slope = 2 / 66.5625 = 0.030047...
      // intercept = 1 - 23.4375 * slope
      expect(result).toMatch(/^clamp\(1rem,/);
      expect(result).toMatch(/3rem\)$/);
      expect(result).toContain('vw');
    });

    it('converts rem minvw/maxvw to px when value unit is px', () => {
      const result = clamp(
        { number: 16, unit: 'px' },
        { number: 48, unit: 'px' },
        { number: 23.4375, unit: 'rem' },
        { number: 90, unit: 'rem' }
      );
      // rem viewports get multiplied by 16: 375px and 1440px
      expect(result).toMatch(/^clamp\(16px,/);
      expect(result).toMatch(/48px\)$/);
    });
  });

  describe('negative / descending values', () => {
    it('wraps in calc(... * -1) when end < start and both positive', () => {
      const result = clamp(
        { number: 3, unit: 'rem' },
        { number: 1, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^calc\(clamp\(/);
      expect(result).toMatch(/\* -1\)$/);
      // Internally start becomes -3 and end becomes -1
      expect(result).toContain('-3rem');
      expect(result).toContain('-1rem');
    });

    it('wraps in calc(... * -1) when end < start and both negative', () => {
      const result = clamp(
        { number: -1, unit: 'rem' },
        { number: -3, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^calc\(clamp\(/);
      expect(result).toMatch(/\* -1\)$/);
      // abs(-1)=1, abs(-3)=3 -> start=1, end=3
      expect(result).toContain('1rem');
      expect(result).toContain('3rem');
    });

    it('wraps in calc(... * -1) when end < start with mixed signs', () => {
      const result = clamp(
        { number: 2, unit: 'rem' },
        { number: -1, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^calc\(clamp\(/);
      expect(result).toMatch(/\* -1\)$/);
      // abs(2)*-1=-2, abs(-1)=1 -> start=-2, end=1
      expect(result).toContain('-2rem');
      expect(result).toContain('1rem');
    });

    it('does not wrap ascending values in calc', () => {
      const result = clamp(
        { number: 1, unit: 'rem' },
        { number: 3, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^clamp\(/);
      expect(result).not.toContain('calc(');
    });
  });

  describe('container query (cqw)', () => {
    it('uses cqw instead of vw when useContainer is true', () => {
      const result = clamp(
        { number: 1, unit: 'rem' },
        { number: 2, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw,
        true
      );
      expect(result).toContain('cqw');
      expect(result).not.toContain('vw');
    });

    it('uses vw by default (useContainer false)', () => {
      const result = clamp(
        { number: 1, unit: 'rem' },
        { number: 2, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw,
        false
      );
      expect(result).toContain('vw');
      expect(result).not.toContain('cqw');
    });
  });

  describe('zero values', () => {
    it('resolves unit from end when start is zero', () => {
      const result = clamp(
        { number: 0, unit: 'zero' },
        { number: 2, unit: 'rem' },
        defaultMinVw,
        defaultMaxVw
      );
      expect(result).toMatch(/^clamp\(0rem,/);
      expect(result).toMatch(/2rem\)$/);
    });

    it('resolves unit from start when end is zero', () => {
      // end < start -> negative path (end=0 < start=2, both >=0)
      // start becomes -2, end becomes 0, negative = true
      const result = clamp(
        { number: 2, unit: 'rem' },
        { number: 0, unit: 'zero' },
        defaultMinVw,
        defaultMaxVw
      );
      // The unit comes from _start since _start.unit !== 'zero'
      expect(result).toContain('rem');
      expect(result).toMatch(/\* -1\)$/);
    });
  });
});

// ---------------------------------------------------------------------------
// custom properties — integration with clamp + parseValue
// ---------------------------------------------------------------------------

describe('custom properties integration', () => {
  const defaultMinVw = { number: 23.4375, unit: 'rem' };
  const defaultMaxVw = { number: 90, unit: 'rem' };

  it('produces valid clamp output for values used as custom properties', () => {
    const start = parseValue('2rem');
    const end = parseValue('6rem');
    const result = clamp(start, end, defaultMinVw, defaultMaxVw);
    expect(result).toMatch(/^clamp\(2rem,/);
    expect(result).toMatch(/6rem\)$/);
  });

  it('works with px values for custom properties', () => {
    const start = parseValue('16px');
    const end = parseValue('48px');
    const result = clamp(start, end, defaultMinVw, defaultMaxVw);
    expect(result).toMatch(/^clamp\(16px,/);
    expect(result).toMatch(/48px\)$/);
  });
});

// ---------------------------------------------------------------------------
// theme variable definitions — simulates the @theme { --clamp-*: ... } flow
// ---------------------------------------------------------------------------

describe('theme variable definitions', () => {
  const defaultMinVw = { number: 23.4375, unit: 'rem' };
  const defaultMaxVw = { number: 90, unit: 'rem' };

  // Mirrors the isLengthValue check in index.js
  const isLengthValue = (v) =>
    /^-?\d*\.?\d+(px|rem|em)$/.test(v.trim()) || v.trim() === '0';

  describe('isLengthValue detection', () => {
    it('detects rem values', () => {
      expect(isLengthValue('2rem')).toBe(true);
    });

    it('detects px values', () => {
      expect(isLengthValue('16px')).toBe(true);
    });

    it('detects em values', () => {
      expect(isLengthValue('1.5em')).toBe(true);
    });

    it('detects zero', () => {
      expect(isLengthValue('0')).toBe(true);
    });

    it('detects negative values', () => {
      expect(isLengthValue('-2rem')).toBe(true);
    });

    it('detects decimal values', () => {
      expect(isLengthValue('.5rem')).toBe(true);
    });

    it('trims whitespace', () => {
      expect(isLengthValue(' 2rem ')).toBe(true);
    });

    it('rejects property names', () => {
      expect(isLengthValue('p')).toBe(false);
      expect(isLengthValue('text')).toBe(false);
      expect(isLengthValue('gap-x')).toBe(false);
    });

    it('rejects unitless non-zero numbers', () => {
      expect(isLengthValue('42')).toBe(false);
    });
  });

  describe('2-value theme variables (start, end)', () => {
    it('computes clamp from parsed theme value', () => {
      const value = '2rem, 6rem';
      const args = value.split(',').map((s) => s.trim());
      const start = parseValue(args[0]);
      const end = parseValue(args[1]);
      const result = clamp(start, end, defaultMinVw, defaultMaxVw);
      expect(result).toMatch(/^clamp\(2rem,/);
      expect(result).toMatch(/6rem\)$/);
      expect(result).toContain('vw');
    });

    it('computes clamp for px theme values', () => {
      const value = '16px, 48px';
      const args = value.split(',').map((s) => s.trim());
      const start = parseValue(args[0]);
      const end = parseValue(args[1]);
      const result = clamp(start, end, defaultMinVw, defaultMaxVw);
      expect(result).toMatch(/^clamp\(16px,/);
      expect(result).toMatch(/48px\)$/);
    });
  });

  describe('4-value theme variables (start, end, minVw, maxVw)', () => {
    it('uses custom viewport range', () => {
      const value = '1rem, 3rem, 20rem, 80rem';
      const args = value.split(',').map((s) => s.trim());
      const start = parseValue(args[0]);
      const end = parseValue(args[1]);
      const minvw = parseValue(args[2]);
      const maxvw = parseValue(args[3]);
      const result = clamp(start, end, minvw, maxvw);
      expect(result).toBe(
        'clamp(1rem, 0.333333rem + 3.333333vw, 3rem)'
      );
    });
  });
});

// ---------------------------------------------------------------------------
// parse-value.js — parseValue
// ---------------------------------------------------------------------------

describe('parseValue', () => {
  it('parses px values', () => {
    expect(parseValue('16px')).toEqual({ number: 16, unit: 'px' });
  });

  it('parses rem values', () => {
    expect(parseValue('1.5rem')).toEqual({ number: 1.5, unit: 'rem' });
  });

  it('parses em values', () => {
    expect(parseValue('2em')).toEqual({ number: 2, unit: 'em' });
  });

  it('parses zero as special "zero" unit', () => {
    expect(parseValue('0')).toEqual({ number: 0, unit: 'zero' });
  });

  it('parses plain number 0 (not string)', () => {
    expect(parseValue(0)).toEqual({ number: 0, unit: 'zero' });
  });

  it('returns "unsupported" for unknown units', () => {
    expect(parseValue('10vh')).toEqual({ number: 10, unit: 'unsupported' });
  });

  it('returns "unsupported" for unitless non-zero values', () => {
    expect(parseValue('42')).toEqual({ number: 42, unit: 'unsupported' });
  });

  it('parses negative values', () => {
    expect(parseValue('-2rem')).toEqual({ number: -2, unit: 'rem' });
  });

  it('parses decimal values', () => {
    expect(parseValue('0.75rem')).toEqual({ number: 0.75, unit: 'rem' });
  });

  it('handles 0px as px (not zero)', () => {
    // "0px" matches /px|rem|em/ so unit = 'px', number = 0
    expect(parseValue('0px')).toEqual({ number: 0, unit: 'px' });
  });

  it('handles 0rem as rem (not zero)', () => {
    expect(parseValue('0rem')).toEqual({ number: 0, unit: 'rem' });
  });
});

// ---------------------------------------------------------------------------
// parse-value.js — parseFontSizeValue
// ---------------------------------------------------------------------------

describe('parseFontSizeValue', () => {
  describe('string input', () => {
    it('parses a simple string into fontSize', () => {
      const result = parseFontSizeValue('1rem');
      expect(result).toEqual({
        fontSize: { number: 1, unit: 'rem' },
      });
    });

    it('parses px string into fontSize', () => {
      const result = parseFontSizeValue('16px');
      expect(result).toEqual({
        fontSize: { number: 16, unit: 'px' },
      });
    });
  });

  describe('array with string lineHeight', () => {
    it('parses [fontSize, lineHeight] tuple', () => {
      const result = parseFontSizeValue(['1rem', '1.5rem']);
      expect(result).toEqual({
        fontSize: { number: 1, unit: 'rem' },
        lineHeight: { number: 1.5, unit: 'rem' },
      });
    });

    it('parses px values in tuple', () => {
      const result = parseFontSizeValue(['16px', '24px']);
      expect(result).toEqual({
        fontSize: { number: 16, unit: 'px' },
        lineHeight: { number: 24, unit: 'px' },
      });
    });
  });

  describe('array with object options', () => {
    it('parses lineHeight from object', () => {
      const result = parseFontSizeValue(['1rem', { lineHeight: '1.5rem' }]);
      expect(result).toEqual({
        fontSize: { number: 1, unit: 'rem' },
        lineHeight: { number: 1.5, unit: 'rem' },
      });
    });

    it('parses letterSpacing from object', () => {
      const result = parseFontSizeValue([
        '1rem',
        { lineHeight: '1.5rem', letterSpacing: '0.05em' },
      ]);
      expect(result).toEqual({
        fontSize: { number: 1, unit: 'rem' },
        lineHeight: { number: 1.5, unit: 'rem' },
        letterSpacing: { number: 0.05, unit: 'em' },
      });
    });

    it('handles object with only letterSpacing (no lineHeight)', () => {
      const result = parseFontSizeValue([
        '1rem',
        { letterSpacing: '0.1em' },
      ]);
      expect(result).toEqual({
        fontSize: { number: 1, unit: 'rem' },
        letterSpacing: { number: 0.1, unit: 'em' },
      });
    });

    it('computes unitless lineHeight as multiplier of fontSize', () => {
      // lineHeight "1.5" -> parseValue returns { number: 1.5, unit: 'unsupported' }
      // so it falls into the multiplier path: 1.5 * 1 (fontSize.number) = 1.5rem
      const result = parseFontSizeValue(['1rem', { lineHeight: '1.5' }]);
      expect(result).toEqual({
        fontSize: { number: 1, unit: 'rem' },
        lineHeight: { number: 1.5, unit: 'rem' },
      });
    });

    it('computes unitless lineHeight multiplied by fontSize number', () => {
      const result = parseFontSizeValue(['2rem', { lineHeight: '1.5' }]);
      expect(result).toEqual({
        fontSize: { number: 2, unit: 'rem' },
        lineHeight: { number: 3, unit: 'rem' },
      });
    });
  });
});

// ---------------------------------------------------------------------------
// parse-value.js — validateValues
// ---------------------------------------------------------------------------

describe('validateValues', () => {
  it('returns true for valid matching units', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 2, unit: 'rem' };
    expect(validateValues(start, end, '1rem,2rem')).toBe(true);
  });

  it('returns null when start equals end', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 1, unit: 'rem' };
    expect(validateValues(start, end, '1rem,1rem')).toBeNull();
  });

  it('returns null when units do not match', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 16, unit: 'px' };
    expect(validateValues(start, end, '1rem,16px')).toBeNull();
  });

  it('allows mismatched units when start is zero', () => {
    const start = { number: 0, unit: 'zero' };
    const end = { number: 2, unit: 'rem' };
    expect(validateValues(start, end, '0,2rem')).toBe(true);
  });

  it('allows mismatched units when end is zero', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 0, unit: 'zero' };
    expect(validateValues(start, end, '1rem,0')).toBe(true);
  });

  it('returns null when start unit is unsupported', () => {
    const start = { number: 10, unit: 'unsupported' };
    const end = { number: 20, unit: 'unsupported' };
    expect(validateValues(start, end, '10vh,20vh')).toBeNull();
  });

  it('returns null when end unit is unsupported', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 10, unit: 'unsupported' };
    expect(validateValues(start, end, '1rem,10vh')).toBeNull();
  });

  it('returns null when both units are unsupported (even if matching)', () => {
    const start = { number: 5, unit: 'unsupported' };
    const end = { number: 10, unit: 'unsupported' };
    expect(validateValues(start, end, '5vw,10vw')).toBeNull();
  });

  it('accepts px values with matching units', () => {
    const start = { number: 16, unit: 'px' };
    const end = { number: 32, unit: 'px' };
    expect(validateValues(start, end, '16px,32px')).toBe(true);
  });

  it('accepts em values with matching units', () => {
    const start = { number: 1, unit: 'em' };
    const end = { number: 2, unit: 'em' };
    expect(validateValues(start, end, '1em,2em')).toBe(true);
  });

  it('accepts the optional prop parameter without affecting logic', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 2, unit: 'rem' };
    expect(validateValues(start, end, '1rem,2rem', 'fontSize')).toBe(true);
  });

  it('returns null with prop parameter when values are equal', () => {
    const start = { number: 1, unit: 'rem' };
    const end = { number: 1, unit: 'rem' };
    expect(validateValues(start, end, '1rem,1rem', 'padding')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// resolve-property.js
// ---------------------------------------------------------------------------

describe('resolveProperty', () => {
  describe('spacing type properties', () => {
    it('resolves "p" to padding', () => {
      expect(resolveProperty('p')).toEqual({
        type: 'spacing',
        key: 'padding',
        props: ['padding'],
      });
    });

    it('resolves "m" to margin', () => {
      expect(resolveProperty('m')).toEqual({
        type: 'spacing',
        key: 'margin',
        props: ['margin'],
      });
    });

    it('resolves "w" to width', () => {
      expect(resolveProperty('w')).toEqual({
        type: 'spacing',
        key: 'width',
        props: ['width'],
      });
    });

    it('resolves "h" to height', () => {
      expect(resolveProperty('h')).toEqual({
        type: 'spacing',
        key: 'height',
        props: ['height'],
      });
    });

    it('resolves "gap" to gap', () => {
      expect(resolveProperty('gap')).toEqual({
        type: 'spacing',
        key: 'gap',
        props: ['gap'],
      });
    });

    it('resolves "gap-x" to columnGap', () => {
      expect(resolveProperty('gap-x')).toEqual({
        type: 'spacing',
        key: 'gap',
        props: ['columnGap'],
      });
    });

    it('resolves "inset" to inset', () => {
      expect(resolveProperty('inset')).toEqual({
        type: 'spacing',
        key: 'inset',
        props: ['inset'],
      });
    });
  });

  describe('multi-prop outputs', () => {
    it('resolves "size" to width and height', () => {
      expect(resolveProperty('size')).toEqual({
        type: 'spacing',
        key: 'size',
        props: ['width', 'height'],
      });
    });

    it('resolves "rounded-t" to two border radius props', () => {
      expect(resolveProperty('rounded-t')).toEqual({
        type: 'regular',
        key: 'borderRadius',
        props: ['borderTopLeftRadius', 'borderTopRightRadius'],
      });
    });

    it('resolves "rounded-s" to start start and end start radius', () => {
      expect(resolveProperty('rounded-s')).toEqual({
        type: 'regular',
        key: 'borderRadius',
        props: ['borderStartStartRadius', 'borderEndStartRadius'],
      });
    });

    it('resolves "rounded-e" to start end and end end radius', () => {
      expect(resolveProperty('rounded-e')).toEqual({
        type: 'regular',
        key: 'borderRadius',
        props: ['borderStartEndRadius', 'borderEndEndRadius'],
      });
    });

    it('resolves "translate-x" to CSS custom property and translate shorthand', () => {
      const result = resolveProperty('translate-x');
      expect(result.type).toBe('spacing');
      expect(result.key).toBe('translate');
      expect(result.props).toHaveLength(2);
      expect(result.props[0]).toBe('--tw-translate-x');
      expect(result.props[1]).toEqual({
        translate: 'var(--tw-translate-x) var(--tw-translate-y)',
      });
    });

    it('resolves "translate-y" to CSS custom property and translate shorthand', () => {
      const result = resolveProperty('translate-y');
      expect(result.type).toBe('spacing');
      expect(result.key).toBe('translate');
      expect(result.props).toHaveLength(2);
      expect(result.props[0]).toBe('--tw-translate-y');
      expect(result.props[1]).toEqual({
        translate: 'var(--tw-translate-x) var(--tw-translate-y)',
      });
    });

    it('resolves "translate" to both custom properties and translate shorthand', () => {
      const result = resolveProperty('translate');
      expect(result.type).toBe('spacing');
      expect(result.key).toBe('translate');
      expect(result.props).toHaveLength(3);
      expect(result.props[0]).toBe('--tw-translate-x');
      expect(result.props[1]).toBe('--tw-translate-y');
      expect(result.props[2]).toEqual({
        translate: 'var(--tw-translate-x) var(--tw-translate-y)',
      });
    });
  });

  describe('regular type properties', () => {
    it('resolves "border" to borderWidth', () => {
      expect(resolveProperty('border')).toEqual({
        type: 'regular',
        key: 'borderWidth',
        props: ['borderWidth'],
      });
    });

    it('resolves "rounded" to borderRadius', () => {
      expect(resolveProperty('rounded')).toEqual({
        type: 'regular',
        key: 'borderRadius',
        props: ['borderRadius'],
      });
    });

    it('resolves "stroke" to strokeWidth', () => {
      expect(resolveProperty('stroke')).toEqual({
        type: 'regular',
        key: 'strokeWidth',
        props: ['strokeWidth'],
      });
    });

    it('resolves "leading" to lineHeight', () => {
      expect(resolveProperty('leading')).toEqual({
        type: 'regular',
        key: 'lineHeight',
        props: ['lineHeight'],
      });
    });

    it('resolves "tracking" to letterSpacing', () => {
      expect(resolveProperty('tracking')).toEqual({
        type: 'regular',
        key: 'letterSpacing',
        props: ['letterSpacing'],
      });
    });

    it('resolves "underline-offset" to textUnderlineOffset', () => {
      expect(resolveProperty('underline-offset')).toEqual({
        type: 'regular',
        key: 'textUnderlineOffset',
        props: ['textUnderlineOffset'],
      });
    });

    it('resolves "decoration" to textDecorationThickness', () => {
      expect(resolveProperty('decoration')).toEqual({
        type: 'regular',
        key: 'textDecorationThickness',
        props: ['textDecorationThickness'],
      });
    });
  });

  describe('fontSize type', () => {
    it('resolves "text" to fontSize type', () => {
      expect(resolveProperty('text')).toEqual({
        type: 'fontSize',
        key: 'fontSize',
        props: ['fontSize'],
      });
    });
  });

  describe('custom properties (--*)', () => {
    it('returns null for custom properties (bypassed in index.js)', () => {
      expect(resolveProperty('--blockspace')).toBeNull();
    });

    it('returns null for nested custom properties', () => {
      expect(resolveProperty('--my-var')).toBeNull();
    });
  });

  describe('unknown properties', () => {
    it('returns null for unknown property names', () => {
      expect(resolveProperty('unknown')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(resolveProperty('')).toBeNull();
    });

    it('returns null for a plausible but unmapped name', () => {
      expect(resolveProperty('color')).toBeNull();
    });
  });
});

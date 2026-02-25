import { describe, it, expect } from 'vitest';
import { extendTailwindMerge } from 'tailwind-merge';
import { withTailwindClamp } from '../index.js';

const twMerge = extendTailwindMerge(withTailwindClamp);

// ---------------------------------------------------------------------------
// Same-prop conflicts (clamp vs clamp)
// ---------------------------------------------------------------------------

describe('same-prop conflicts', () => {
  it('last clamp wins when same property', () => {
    expect(
      twMerge('clamp-[p,1rem,2rem] clamp-[p,2rem,3rem]')
    ).toBe('clamp-[p,2rem,3rem]');
  });

  it('works for margin', () => {
    expect(
      twMerge('clamp-[m,1rem,2rem] clamp-[m,0.5rem,1rem]')
    ).toBe('clamp-[m,0.5rem,1rem]');
  });

  it('works for gap', () => {
    expect(
      twMerge('clamp-[gap,1rem,2rem] clamp-[gap,0.5rem,1rem]')
    ).toBe('clamp-[gap,0.5rem,1rem]');
  });
});

// ---------------------------------------------------------------------------
// Cross-type conflicts (tailwind utility vs clamp)
// ---------------------------------------------------------------------------

describe('cross-type conflicts', () => {
  it('clamp overrides static utility (p-4 → clamp-[p,...])', () => {
    expect(twMerge('p-4 clamp-[p,1rem,2rem]')).toBe('clamp-[p,1rem,2rem]');
  });

  it('static utility overrides clamp (clamp-[p,...] → p-4)', () => {
    expect(twMerge('clamp-[p,1rem,2rem] p-4')).toBe('p-4');
  });

  it('clamp overrides arbitrary value', () => {
    expect(twMerge('p-[20px] clamp-[p,1rem,2rem]')).toBe(
      'clamp-[p,1rem,2rem]'
    );
  });

  it('works for width', () => {
    expect(twMerge('w-64 clamp-[w,16rem,32rem]')).toBe(
      'clamp-[w,16rem,32rem]'
    );
  });

  it('works for height', () => {
    expect(twMerge('h-32 clamp-[h,8rem,16rem]')).toBe(
      'clamp-[h,8rem,16rem]'
    );
  });

  it('works for gap', () => {
    expect(twMerge('gap-4 clamp-[gap,1rem,2rem]')).toBe(
      'clamp-[gap,1rem,2rem]'
    );
  });
});

// ---------------------------------------------------------------------------
// Hierarchical conflicts (shorthand vs specific)
// ---------------------------------------------------------------------------

describe('hierarchical conflicts', () => {
  it('clamp-[p,...] overrides px-4 (shorthand wins)', () => {
    expect(twMerge('px-4 clamp-[p,1rem,2rem]')).toBe('clamp-[p,1rem,2rem]');
  });

  it('clamp-[p,...] overrides py-4 (shorthand wins)', () => {
    expect(twMerge('py-4 clamp-[p,1rem,2rem]')).toBe('clamp-[p,1rem,2rem]');
  });

  it('clamp-[m,...] overrides mt-4 (shorthand wins)', () => {
    expect(twMerge('mt-4 clamp-[m,1rem,2rem]')).toBe('clamp-[m,1rem,2rem]');
  });

  it('p-4 overrides clamp-[px,...] (static shorthand wins)', () => {
    expect(twMerge('clamp-[px,1rem,2rem] p-4')).toBe('p-4');
  });

  it('clamp-[inset,...] overrides top-4', () => {
    expect(twMerge('top-4 clamp-[inset,1rem,2rem]')).toBe(
      'clamp-[inset,1rem,2rem]'
    );
  });

  it('clamp-[gap,...] overrides gap-x-4', () => {
    expect(twMerge('gap-x-4 clamp-[gap,1rem,2rem]')).toBe(
      'clamp-[gap,1rem,2rem]'
    );
  });

  it('clamp-[scroll-m,...] overrides scroll-mt-4', () => {
    expect(twMerge('scroll-mt-4 clamp-[scroll-m,1rem,2rem]')).toBe(
      'clamp-[scroll-m,1rem,2rem]'
    );
  });

  it('clamp-[scroll-p,...] overrides scroll-px-4', () => {
    expect(twMerge('scroll-px-4 clamp-[scroll-p,1rem,2rem]')).toBe(
      'clamp-[scroll-p,1rem,2rem]'
    );
  });
});

// ---------------------------------------------------------------------------
// Size edge case (size conflicts with w and h)
// ---------------------------------------------------------------------------

describe('size conflicts', () => {
  it('clamp-[size,...] overrides w-4 and h-8', () => {
    expect(twMerge('w-4 h-8 clamp-[size,1rem,2rem]')).toBe(
      'clamp-[size,1rem,2rem]'
    );
  });

  it('size-4 overrides clamp-[w,...] and clamp-[h,...]', () => {
    expect(
      twMerge('clamp-[w,1rem,2rem] clamp-[h,1rem,2rem] size-4')
    ).toBe('size-4');
  });
});

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

describe('typography conflicts', () => {
  it('clamp-[text,...] overrides text-lg', () => {
    expect(twMerge('text-lg clamp-[text,1rem,2rem]')).toBe(
      'clamp-[text,1rem,2rem]'
    );
  });

  it('text-xl overrides clamp-[text,...]', () => {
    expect(twMerge('clamp-[text,1rem,2rem] text-xl')).toBe('text-xl');
  });

  it('clamp-[leading,...] overrides leading-6', () => {
    expect(twMerge('leading-6 clamp-[leading,1.5rem,2rem]')).toBe(
      'clamp-[leading,1.5rem,2rem]'
    );
  });

  it('clamp-[tracking,...] overrides tracking-wide', () => {
    expect(twMerge('tracking-wide clamp-[tracking,0.025em,0.05em]')).toBe(
      'clamp-[tracking,0.025em,0.05em]'
    );
  });
});

// ---------------------------------------------------------------------------
// Hyphenated props (scroll-m vs scroll-mx, etc.)
// ---------------------------------------------------------------------------

describe('hyphenated prop distinction', () => {
  it('scroll-m and scroll-mx do not interfere', () => {
    expect(
      twMerge('clamp-[scroll-m,1rem,2rem] clamp-[scroll-mx,0.5rem,1rem]')
    ).toBe('clamp-[scroll-m,1rem,2rem] clamp-[scroll-mx,0.5rem,1rem]');
  });

  it('scroll-p and scroll-ps do not interfere', () => {
    expect(
      twMerge('clamp-[scroll-p,1rem,2rem] clamp-[scroll-ps,0.5rem,1rem]')
    ).toBe('clamp-[scroll-p,1rem,2rem] clamp-[scroll-ps,0.5rem,1rem]');
  });

  it('pbs and pbe do not interfere', () => {
    expect(
      twMerge('clamp-[pbs,1rem,2rem] clamp-[pbe,0.5rem,1rem]')
    ).toBe('clamp-[pbs,1rem,2rem] clamp-[pbe,0.5rem,1rem]');
  });

  it('mbs and mbe do not interfere', () => {
    expect(
      twMerge('clamp-[mbs,1rem,2rem] clamp-[mbe,0.5rem,1rem]')
    ).toBe('clamp-[mbs,1rem,2rem] clamp-[mbe,0.5rem,1rem]');
  });

  it('scroll-mbs and scroll-mbe do not interfere', () => {
    expect(
      twMerge('clamp-[scroll-mbs,1rem,2rem] clamp-[scroll-mbe,0.5rem,1rem]')
    ).toBe('clamp-[scroll-mbs,1rem,2rem] clamp-[scroll-mbe,0.5rem,1rem]');
  });

  it('scroll-pbs and scroll-pbe do not interfere', () => {
    expect(
      twMerge('clamp-[scroll-pbs,1rem,2rem] clamp-[scroll-pbe,0.5rem,1rem]')
    ).toBe('clamp-[scroll-pbs,1rem,2rem] clamp-[scroll-pbe,0.5rem,1rem]');
  });

  it('gap-x and gap-y do not interfere', () => {
    expect(
      twMerge('clamp-[gap-x,1rem,2rem] clamp-[gap-y,0.5rem,1rem]')
    ).toBe('clamp-[gap-x,1rem,2rem] clamp-[gap-y,0.5rem,1rem]');
  });

  it('inset-x and inset-y do not interfere', () => {
    expect(
      twMerge('clamp-[inset-x,1rem,2rem] clamp-[inset-y,0.5rem,1rem]')
    ).toBe('clamp-[inset-x,1rem,2rem] clamp-[inset-y,0.5rem,1rem]');
  });
});

// ---------------------------------------------------------------------------
// Border and stroke name mapping
// ---------------------------------------------------------------------------

describe('border and stroke mapping', () => {
  it('border-2 conflicts with clamp-[border,...]', () => {
    expect(twMerge('border-2 clamp-[border,1px,3px]')).toBe(
      'clamp-[border,1px,3px]'
    );
  });

  it('border-t-2 conflicts with clamp-[border-t,...]', () => {
    expect(twMerge('border-t-2 clamp-[border-t,1px,3px]')).toBe(
      'clamp-[border-t,1px,3px]'
    );
  });

  it('clamp-[border,...] overrides border-x-2 (shorthand wins)', () => {
    expect(twMerge('border-x-2 clamp-[border,1px,3px]')).toBe(
      'clamp-[border,1px,3px]'
    );
  });

  it('stroke color is not affected by clamp-[stroke,...] (different groups)', () => {
    expect(twMerge('stroke-red-500 clamp-[stroke,1px,3px]')).toBe(
      'stroke-red-500 clamp-[stroke,1px,3px]'
    );
  });

  it('stroke-2 conflicts with clamp-[stroke,...]', () => {
    expect(twMerge('stroke-2 clamp-[stroke,1px,3px]')).toBe(
      'clamp-[stroke,1px,3px]'
    );
  });
});

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

describe('border radius', () => {
  it('rounded-lg conflicts with clamp-[rounded,...]', () => {
    expect(twMerge('rounded-lg clamp-[rounded,0.5rem,1rem]')).toBe(
      'clamp-[rounded,0.5rem,1rem]'
    );
  });

  it('clamp-[rounded,...] overrides rounded-tl-lg (shorthand wins)', () => {
    expect(twMerge('rounded-tl-lg clamp-[rounded,0.5rem,1rem]')).toBe(
      'clamp-[rounded,0.5rem,1rem]'
    );
  });

  it('rounded-t-lg conflicts with clamp-[rounded-t,...]', () => {
    expect(twMerge('rounded-t-lg clamp-[rounded-t,0.5rem,1rem]')).toBe(
      'clamp-[rounded-t,0.5rem,1rem]'
    );
  });
});

// ---------------------------------------------------------------------------
// Non-conflicting classes preserved
// ---------------------------------------------------------------------------

describe('non-conflicting preserved', () => {
  it('different clamp props are preserved', () => {
    expect(
      twMerge('clamp-[p,1rem,2rem] clamp-[m,0.5rem,1rem]')
    ).toBe('clamp-[p,1rem,2rem] clamp-[m,0.5rem,1rem]');
  });

  it('unrelated utilities are preserved', () => {
    expect(twMerge('flex clamp-[p,1rem,2rem] text-red-500')).toBe(
      'flex clamp-[p,1rem,2rem] text-red-500'
    );
  });

  it('text color is not affected by clamp-[text,...] (different groups)', () => {
    expect(twMerge('text-red-500 clamp-[text,1rem,2rem]')).toBe(
      'text-red-500 clamp-[text,1rem,2rem]'
    );
  });
});

// ---------------------------------------------------------------------------
// With modifiers (responsive, hover, etc.)
// ---------------------------------------------------------------------------

describe('with modifiers', () => {
  it('responsive modifier: md:p-4 → md:clamp-[p,...]', () => {
    expect(twMerge('md:p-4 md:clamp-[p,1rem,2rem]')).toBe(
      'md:clamp-[p,1rem,2rem]'
    );
  });

  it('hover modifier: hover:p-4 → hover:clamp-[p,...]', () => {
    expect(twMerge('hover:p-4 hover:clamp-[p,1rem,2rem]')).toBe(
      'hover:clamp-[p,1rem,2rem]'
    );
  });

  it('different modifiers do not conflict', () => {
    expect(twMerge('p-4 md:clamp-[p,1rem,2rem]')).toBe(
      'p-4 md:clamp-[p,1rem,2rem]'
    );
  });

  it('stacked modifiers work', () => {
    expect(
      twMerge('md:hover:p-4 md:hover:clamp-[p,1rem,2rem]')
    ).toBe('md:hover:clamp-[p,1rem,2rem]');
  });
});

// ---------------------------------------------------------------------------
// Custom viewport values
// ---------------------------------------------------------------------------

describe('custom viewport values', () => {
  it('handles 5-arg clamp values', () => {
    expect(
      twMerge('p-4 clamp-[p,1rem,2rem,20rem,80rem]')
    ).toBe('clamp-[p,1rem,2rem,20rem,80rem]');
  });

  it('5-arg clamp conflicts with 3-arg clamp', () => {
    expect(
      twMerge('clamp-[p,1rem,2rem] clamp-[p,1rem,2rem,20rem,80rem]')
    ).toBe('clamp-[p,1rem,2rem,20rem,80rem]');
  });
});

// ---------------------------------------------------------------------------
// Translate
// ---------------------------------------------------------------------------

describe('translate conflicts', () => {
  it('clamp-[translate,...] overrides translate-x-4', () => {
    expect(twMerge('translate-x-4 clamp-[translate,1rem,2rem]')).toBe(
      'clamp-[translate,1rem,2rem]'
    );
  });

  it('clamp-[translate-x,...] conflicts with translate-x-4', () => {
    expect(twMerge('translate-x-4 clamp-[translate-x,1rem,2rem]')).toBe(
      'clamp-[translate-x,1rem,2rem]'
    );
  });
});

// ---------------------------------------------------------------------------
// Decoration & underline-offset
// ---------------------------------------------------------------------------

describe('decoration and underline-offset', () => {
  it('decoration-2 conflicts with clamp-[decoration,...]', () => {
    expect(twMerge('decoration-2 clamp-[decoration,1px,3px]')).toBe(
      'clamp-[decoration,1px,3px]'
    );
  });

  it('underline-offset-4 conflicts with clamp-[underline-offset,...]', () => {
    expect(
      twMerge('underline-offset-4 clamp-[underline-offset,2px,6px]')
    ).toBe('clamp-[underline-offset,2px,6px]');
  });
});

// ---------------------------------------------------------------------------
// Min/Max width and height
// ---------------------------------------------------------------------------

describe('min/max conflicts', () => {
  it('min-w-0 conflicts with clamp-[min-w,...]', () => {
    expect(twMerge('min-w-0 clamp-[min-w,10rem,20rem]')).toBe(
      'clamp-[min-w,10rem,20rem]'
    );
  });

  it('max-h-screen conflicts with clamp-[max-h,...]', () => {
    expect(twMerge('max-h-screen clamp-[max-h,20rem,40rem]')).toBe(
      'clamp-[max-h,20rem,40rem]'
    );
  });
});

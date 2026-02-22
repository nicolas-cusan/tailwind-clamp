# tailwind-clamp-merge

A [tailwind-merge](https://github.com/dcastil/tailwind-merge) plugin for [tailwind-clamp](https://github.com/nicolas-cusan/tailwind-clamp) utilities. Without it, `twMerge("p-4 clamp-[p,1,3]")` keeps both classes instead of resolving the conflict. This plugin teaches tailwind-merge that clamp utilities belong to the same class groups as their static counterparts.

## Installation

```sh
npm i tailwind-clamp-merge
```

`tailwind-merge` v3+ is required as a peer dependency.

## Usage

Pass `withTailwindClamp` to `extendTailwindMerge`:

```js
import { extendTailwindMerge } from 'tailwind-merge';
import { withTailwindClamp } from 'tailwind-clamp-merge';

const twMerge = extendTailwindMerge(withTailwindClamp);
```

Conflicts are now resolved correctly:

```js
twMerge('p-4 clamp-[p,1,3]')
// => 'clamp-[p,1,3]'

twMerge('clamp-[p,1,3] p-4')
// => 'p-4'

twMerge('text-lg clamp-[text,lg,3xl]')
// => 'clamp-[text,lg,3xl]'
```

Hierarchical conflicts (shorthand vs specific) are handled automatically:

```js
twMerge('px-4 py-2 clamp-[p,1,3]')
// => 'clamp-[p,1,3]'

twMerge('w-4 h-8 clamp-[size,10,20]')
// => 'clamp-[size,10,20]'

twMerge('rounded-tl-lg clamp-[rounded,0.5rem,1rem]')
// => 'clamp-[rounded,0.5rem,1rem]'
```

All properties supported by tailwind-clamp are covered, including `p`, `m`, `gap`, `w`, `h`, `size`, `text`, `rounded`, `border`, `inset`, `translate`, `scroll-m`, `scroll-p`, and more.

## License

MIT

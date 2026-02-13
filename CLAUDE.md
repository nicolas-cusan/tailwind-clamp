# CLAUDE.md

## Project Overview

**tailwind-clamp** — A Tailwind CSS v4 plugin that generates `clamp()` CSS functions for fluid/responsive values. Published to npm as `tailwind-clamp` (v4.1.2).

## Monorepo Structure

```
/
├── packages/
│   ├── tailwind-clamp/   # The npm-published plugin
│   │   ├── lib/          # Source code (JS)
│   │   │   └── __tests__/ # Vitest unit tests
│   │   ├── dist/         # Vite library build output (ESM + UMD + .d.ts)
│   │   ├── index.html    # Dev playground
│   │   └── style.css     # Dev playground styles
│   └── docs/             # Astro documentation site (deployed to GitHub Pages)
│       └── scripts/generate-readme.js  # Generates root README.md from docs.mdx
├── .github/workflows/deploy.yml  # GitHub Pages deployment
├── pnpm-workspace.yaml
└── package.json          # Root workspace
```

- **Package manager**: pnpm with workspaces
- **Build tool**: Vite (library mode for plugin, Astro for docs)
- **Module system**: ESM (`"type": "module"` throughout)
- **Test framework**: Vitest

## Key Commands

```sh
pnpm run dev          # Vite dev server for plugin playground
pnpm run build        # Build plugin to dist/ (ESM + UMD)
pnpm run test         # Run vitest unit tests (71 tests)
pnpm run docs:dev     # Astro dev server for docs site
pnpm run docs:build   # Build docs site
pnpm run docs:generate # Generate README.md files from docs.mdx
pnpm run build:all    # Build plugin + docs + generate README
```

## Plugin Source Code (`packages/tailwind-clamp/lib/`)

| File                 | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `index.js`           | Plugin entry point, uses `plugin.withOptions` + `matchUtilities` |
| `clamp.js`           | Core `clamp()` CSS formula generation                         |
| `parse-value.js`     | Value parsing (px/rem/em), font-size tuples, validation       |
| `resolve-property.js`| Maps 40+ shorthand names (p, mt, w, text, etc.) to CSS props  |
| `log.js`             | Colored console logging helpers                               |

## Plugin Syntax

```
clamp-[property,startValue,endValue]
clamp-[property,startValue,endValue,minViewport,maxViewport]
```

Default viewport range: `23.4375rem` (375px) to `90rem` (1440px). Supports container queries via `@` prefix on viewport args.

## Build Output

Vite builds `lib/index.js` into:
- `dist/index.js` (ESM) — `@csstools/css-calc` is bundled in, `tailwindcss` is external
- `dist/index.umd.cjs` (UMD/CJS)
- `dist/index.d.ts` (TypeScript declarations)

## Package Configuration

- `tailwindcss` is a **peerDependency** (`^4.0.0`) — consumers must install it themselves
- `@csstools/css-calc` is a **devDependency** — bundled into dist by Vite, not needed at runtime
- Exports include `types` condition for TypeScript resolution

## Docs Site

- Built with Astro + MDX
- Deployed to GitHub Pages at `/tailwind-clamp` via GitHub Actions on push to `main`
- README.md files are auto-generated — edit `packages/docs/src/content/docs.mdx` instead

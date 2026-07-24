# Type95 — Project Guidelines

Retro OS-skinned React component library. TypeScript, CSS Modules only, no
CSS-in-JS runtime. Inspired by React95, built from scratch (not forked) to
be React 19 / RSC-safe and token-driven across five skins instead of
maintaining parallel component forks per OS era.

## Tech Stack

| Package                               | Purpose                                                         |
| ------------------------------------- | --------------------------------------------------------------- |
| React 19                              | Server Components by default, `'use client'` only when stateful |
| TypeScript 5                          | Strict mode                                                     |
| CSS Modules                           | Component styling, no CSS-in-JS                                 |
| tsup                                  | Build: ESM + CJS + `.d.ts`, `bundle: false`                     |
| Vitest + Testing Library + jest-axe   | Testing                                                         |
| Storybook 9 (`@storybook/react-vite`) | Component gallery, skin toolbar switcher                        |
| ESLint + Prettier                     | Linting and formatting                                          |

## Commands

```bash
npm run validate         # Format + typecheck + lint — REQUIRED before completion
npm test                  # Run tests
npm run test:coverage     # Coverage report
npm run storybook         # Storybook dev server
npm run build-storybook   # Static Storybook build
npm run build              # tsup build -> dist/
```

## Core Architecture

**Token-driven skins, not forked components.** Every component's CSS Module
references only `--t95-*` custom properties (`--t95-face`,
`--t95-border-light`, `--t95-border-dark`, `--t95-border-lightest`,
`--t95-border-darkest`, `--t95-titlebar-bg`, `--t95-titlebar-bg-end`,
`--t95-font`, `--t95-font-size`, `--t95-radius`, `--t95-focus-outline`,
`--t95-highlight-bg`, `--t95-highlight-text`, `--t95-disabled-text`). Full
token list and defaults: `src/tokens/base.css`. Each skin
(`src/tokens/win95.css`, `win98.css`, `winxp.css`, `win7.css`, `win10.css`)
overrides those tokens under `[data-skin="..."]`. Never hardcode a color,
border, or font value in a component's CSS Module — add a token instead.

**Why**: switching skins becomes a pure CSS cascade (flip the `data-skin`
attribute), zero component re-render, and adding a sixth skin later never
touches component code, only a new token file.

**`Type95Provider` (`src/Type95Provider/Type95Provider.tsx`) is server-safe.**
It only sets a static `data-skin` attribute at render time, no state — ships
with no `'use client'` directive, usable inside a Server Component. Live
runtime skin switching goes through `setSkin()`
(`src/Type95Provider/setSkin.ts`, `'use client'`), which mutates the
attribute directly via `document.querySelector('[data-t95-provider]')` — no
React context, no re-render. Do not add a context provider for skin state;
this was a deliberate choice to keep the provider RSC-compatible.

**Components split by statefulness.** Static/no-interaction components
(no hooks, no event handlers required to render) ship with no `'use client'`
directive. Stateful ones (drag state, open/closed, controlled inputs) get
`'use client'` at the top of the file. A component that merely _accepts_ an
`onClick` prop (like `Button`) does not need the directive — passing an event
handler down doesn't require client-side state.

**CSS Modules ship unprocessed.** `tsup.config.ts` builds with
`bundle: false`, so `import styles from './Button.module.css'` in a
component's compiled output stays untouched (not inlined or hashed), and
`dist/` mirrors `src/`'s directory structure 1:1. The `onSuccess` hook
copies every `.css` file from `src/` to the matching path in `dist/`. This
means the package is never processing CSS itself — the consumer's own
bundler (Next.js, Vite, webpack) applies the actual CSS Modules
scoped-hashing. If you change `tsup.config.ts`'s bundling mode, this
assumption breaks and CSS imports will fail to resolve for consumers.

**Skin build order / status**: win95 done, win98 done (near-identical to
95, only the title bar gained a gradient), winXP done (bigger jump: rounded
corners via `--t95-radius`, Luna gradient title bar, Tahoma font). win7
(Aero glass/translucency) and win10 (Fluent, no bevels at all) are
placeholder token files only — designing them needs more than token
substitution (Aero needs real transparency/blur, Fluent needs a flat-border
component variant since the whole 4-shade bevel model doesn't apply). See
`src/tokens/win7.css` and `win10.css` for the TODO notes.

## Component Conventions

Every component lives in `src/components/<Name>/` with:

- `<Name>.tsx` — the component. `Readonly<Props>` typing. Merge a consumer
  `className` with the component's own module class via
  `[styles.x, className].filter(Boolean).join(' ')` (see `Button.tsx`) — no
  `clsx` dependency for this simple case.
- `<Name>.module.css` — styling, tokens only, no hardcoded values
- `<Name>.stories.tsx` — Storybook CSF3 stories. Skin switching is handled
  globally by the toolbar decorator in `.storybook/preview.tsx` — do not add
  per-story skin args.
- `<Name>.test.tsx` — Vitest + Testing Library, import `render`/`screen`/`user`
  from `@/test-utils` (wraps `Type95Provider`, default skin `win98`). Include
  a `jest-axe` accessibility check on every component (see `Button.test.tsx`
  for the pattern).
- `index.ts` — re-exports the component and its prop type

Export every new component from `src/index.ts`. No barrel files beyond that
single top-level one.

## Rules

**Never:**

- Hardcode a color/border/font value in a component's CSS Module — add a
  `--t95-*` token instead
- Use CSS-in-JS (styled-components, emotion, etc.)
- Add React context for skin state — `Type95Provider` must stay server-safe
- Change `tsup.config.ts` to `bundle: true` without also reworking the CSS
  Modules copy step (see Core Architecture above)
- Mock `global.fetch` (n/a today, but if network code is ever added, follow
  MSW conventions)

**Always:**

- Run `npm run validate` and `npm test` before declaring a task complete
- Add a `jest-axe` check for every new interactive component
- Update the component roadmap table in `README.md` when a component moves
  from backlog to built

⚠️ **Ask before:** publishing to npm, creating a GitHub remote, pushing,
adding dependencies, or renaming the package.

**Definition of done:** `npm run validate` + `npm test` + `npm run build`
all pass.

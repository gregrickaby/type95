# Type95

A retro OS-skinned React component library. TypeScript, CSS Modules, no
CSS-in-JS runtime. Inspired by [React95](https://github.com/react95-io/React95)
but built from scratch, not forked: React 19 / RSC-safe, token-driven skins
instead of parallel component forks per OS era.

## Status

Early scaffold. One reference component (`Button`) proves the pattern.
Everything else is roadmap.

## Skins

| Skin  | Status                                             |
| ----- | -------------------------------------------------- |
| win95 | done (flat title bar)                              |
| win98 | done (gradient "web style" title bar)              |
| winxp | done (Luna blue, rounded corners)                  |
| win7  | placeholder tokens only — Aero glass not designed  |
| win10 | placeholder tokens only — Fluent flat not designed |

Switch skins by setting a `data-skin` attribute (`win95` / `win98` / `winxp`
/ `win7` / `win10`) on an ancestor element — every component's CSS Module
reads only `--t95-*` custom properties, which each skin file in
`src/tokens/` scopes under `[data-skin="..."]`.

```tsx
import {Type95Provider, Button} from 'type95'

function App() {
  return (
    <Type95Provider skin="win98">
      <Button>OK</Button>
    </Type95Provider>
  )
}
```

For a live theme switcher (no re-render), use `setSkin()` instead of
changing the `skin` prop:

```tsx
import {setSkin} from 'type95'

setSkin('winxp')
```

## Peer requirement: CSS Modules support

This package ships `.module.css` files unprocessed — it does not bundle or
hash them at build time. Your bundler must support CSS Modules natively
(Next.js, Vite, and webpack all do out of the box). See `tsup.config.ts` for
why: bundling everything into one file would make relative CSS import paths
unreliable, so this package compiles with `bundle: false` and mirrors
`src/`'s directory structure 1:1 in `dist/`.

## Component roadmap

Built: `Button`

Backlog (not started): `Window`, `TitleBar`, `TextInput`, `Panel`/`Cutout`,
`ScrollView`, `MenuList`, `Tabs`, `Checkbox`, `Radio`, `Divider`

## Commands

```bash
npm run validate       # Format + typecheck + lint
npm test                # Run tests
npm run test:coverage   # Coverage report (utilities/hooks 100%, components 80%+)
npm run storybook       # Storybook dev server
npm run build            # tsup build -> dist/
npm run build-storybook  # Static Storybook build
```

## License

MIT

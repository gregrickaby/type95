# Type95

A retro OS-skinned React component library built with TypeScript and CSS Modules. Inspired by [React95](https://github.com/react95-io/React95).

Storybook: https://gregrickaby.github.io/type95/

## Status

Early scaffold. Eleven components built (`Button`, `Checkbox`, `Divider`,
`Panel`, `Radio`, `TextInput`, `TitleBar`, `Window`, `ScrollView`,
`MenuList`, `Tabs`); the rest is roadmap.

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

Built: `Button`, `Checkbox`, `Divider`, `Panel`, `Radio`, `TextInput`,
`TitleBar`, `Window`, `ScrollView`, `MenuList`, `Tabs`

Backlog (not started): none yet — see GitHub issues for what's next.

## AI / agent-ready

Type95 is set up for AI coding agents (Claude Code, Cursor, Windsurf, etc.)
out of the box, following the same shape as [mantine.dev](https://mantine.dev):

- **`llms.txt` / `llms-full.txt`** — generated from component JSDoc +
  `src/tokens/base.css` via `npm run generate:llms`. Served at
  `https://gregrickaby.github.io/type95/llms.txt` and
  `https://gregrickaby.github.io/type95/llms-full.txt`, and shipped inside
  the npm package.
- **Agent Skills** (`skills/`) — `type95-usage` (installing and using the
  library) and `type95-custom-components` (building your own components
  that skin correctly). Install with:

  ```bash
  npx skills add https://github.com/gregrickaby/type95 --skill type95-usage
  npx skills add https://github.com/gregrickaby/type95 --skill type95-custom-components
  ```

- **MCP server** (`mcp-server/`, package `type95-mcp-server`) — exposes
  `list_components`, `get_component_doc`, and `search_docs` tools over
  stdio. Early scaffold (see `mcp-server/README.md`); point your tool at
  the built server:

  ```json
  {
    "mcpServers": {
      "type95": {
        "command": "node",
        "args": ["/absolute/path/to/type95/mcp-server/dist/index.js"]
      }
    }
  }
  ```

## Commands

```bash
npm run validate       # Format + typecheck + lint
npm test                # Run tests
npm run test:coverage   # Coverage report (utilities/hooks 100%, components 80%+)
npm run storybook       # Storybook dev server
npm run generate:llms   # Regenerate llms.txt / llms-full.txt / mcp-server data
npm run build            # generate:llms + tsup build -> dist/
npm run build-storybook  # Static Storybook build (includes llms.txt/llms-full.txt)
```

## License

MIT

---
name: type95-usage
description: Install and use the Type95 React component library in an app — wrapping the tree in Type95Provider, choosing/switching a retro OS skin (win95/win98/winxp/win7/win10), and rendering built-in components. Use for tasks like "add Type95 to this project", "switch skins", "render a Type95 Button", or any Type95-consuming (not Type95-authoring) work.
---

# Using Type95

Type95 is a retro OS-skinned React component library (TypeScript, CSS
Modules, no CSS-in-JS runtime). It ships components that render identically
across five Windows-era skins by reading only `--t95-*` CSS custom
properties — switching skins is a CSS cascade, not a re-render.

## Install

```bash
npm install type95
```

**Peer requirement**: your bundler must support CSS Modules natively
(Next.js, Vite, and webpack all do out of the box). Type95 ships
`.module.css` files unprocessed — it does not bundle or hash them itself.

## Core workflow

1. Wrap your app (or the relevant subtree) in `Type95Provider` with a
   `skin` prop. This is server-safe — no `'use client'` needed, works
   inside a Server Component:

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

2. Render built-in components as normal JSX inside the provider. They pick
   up styling from the ancestor `data-skin` attribute automatically — no
   per-component skin prop.

3. For live runtime skin switching (a theme menu, a settings toggle) —
   don't re-render `Type95Provider` with a new `skin` prop. Use `setSkin()`
   instead, which mutates the DOM attribute directly with no React
   re-render:

   ```tsx
   'use client'
   import {setSkin, getSkin} from 'type95'

   setSkin('winxp')
   getSkin() // 'winxp' | null
   ```

## Skins

| Skin    | Status                                                |
| ------- | ----------------------------------------------------- |
| `win95` | done — flat title bar                                 |
| `win98` | done — gradient "web style" title bar                 |
| `winxp` | done — Luna blue, rounded corners                     |
| `win7`  | placeholder tokens only, Aero glass not designed yet  |
| `win10` | placeholder tokens only, Fluent flat not designed yet |

## Components

Check `llms.txt` (compact) or `llms-full.txt` (full reference, including
every component's props and behavior) at the package root, or the
`type95-mcp-server` MCP server's `list_components`/`get_component_doc`
tools, for the current component list — it grows over time and this file
isn't the source of truth for it.

## Gotchas

- A component prop like `component="a"` (where supported, e.g. `Button`)
  renders as that element instead of the default — pass that element's own
  native props (`href` for an anchor) alongside it.
- There's no theme object and no `classNames`/`styles`/`vars` runtime
  style-override API (deliberately, to stay CSS-Modules-only). Override
  appearance by passing `className`; it merges with the component's own
  class rather than replacing it.
- Skin switching only affects descendants of the element carrying
  `data-skin` — if part of your UI renders outside the `Type95Provider`
  subtree (e.g. a portal), wrap that subtree in its own provider too.

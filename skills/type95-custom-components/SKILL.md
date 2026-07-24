---
name: type95-custom-components
description: Build a custom component that skins correctly alongside Type95's built-ins — using the --t95-* token set, the four-shade bevel border pattern, and the factory()/polymorphicFactory() helpers for ref-forwarding and a "component" prop. Use when Type95 doesn't ship a component you need yet (e.g. a custom panel, list item, or control) and it must look native under win95/win98/winxp/win7/win10.
---

# Building your own Type95-compatible component

Type95 components never hardcode a color, border, or font — they read
`--t95-*` CSS custom properties, and each skin file overrides those
properties under `[data-skin="..."]`. Follow the same rule and your custom
component skins automatically, with no per-skin branching in JS or CSS.

## The token set (`src/tokens/base.css` defaults)

```
--t95-face                  background surface color
--t95-face-text              default text color on that surface
--t95-border-lightest        outer bevel highlight
--t95-border-light           inner bevel highlight
--t95-border-dark             inner bevel shadow
--t95-border-darkest          outer bevel shadow
--t95-titlebar-bg / -bg-end   title bar gradient (active window)
--t95-titlebar-text            title bar text (active window)
--t95-titlebar-bg-inactive     title bar background (inactive window)
--t95-titlebar-text-inactive   title bar text (inactive window)
--t95-highlight-bg            selected-item background
--t95-highlight-text           selected-item text
--t95-disabled-text           disabled-state text color
--t95-font / --t95-font-size   typeface and base size
--t95-radius                  corner radius (0 pre-XP, rounded from XP on)
--t95-focus-outline            focus ring
```

Get the current values (and any tokens added since this was written) from
`llms-full.txt` at the package root, or `src/tokens/base.css` in the
`type95` source.

## The bevel-border pattern

The classic raised-3D look (see `Button.module.css`) is four inset shadows,
lightest-to-darkest going one direction for "raised", reversed for
"pressed":

```css
.myComponent {
  border: none;
  border-radius: var(--t95-radius);
  background: var(--t95-face);
  color: var(--t95-face-text);
  font-family: var(--t95-font);
  font-size: var(--t95-font-size);
  box-shadow:
    inset -1px -1px var(--t95-border-darkest),
    inset 1px 1px var(--t95-border-lightest),
    inset -2px -2px var(--t95-border-dark),
    inset 2px 2px var(--t95-border-light);
}

.myComponent:active:not(:disabled) {
  /* reverse the shadow direction + nudge padding 1px to sell "pressed" */
  box-shadow:
    inset 1px 1px var(--t95-border-darkest),
    inset -1px -1px var(--t95-border-lightest),
    inset 2px 2px var(--t95-border-dark),
    inset -2px -2px var(--t95-border-light);
}

.myComponent:focus-visible {
  outline: var(--t95-focus-outline);
  outline-offset: -4px;
}
```

For a _sunken_ surface (a text input well, a scroll view), swap which
shadow set is default vs. `:active` — sunken is the "pressed" direction at
rest.

## Matching Type95's ref-forwarding / polymorphism

Type95 exports `factory()` and `polymorphicFactory()` (from `type95`) —
the same helpers built-in components are built with. Use them so your
component forwards refs and (optionally) accepts a `component` prop the
same way `Button` does:

```tsx
import {factory} from 'type95'
import type {FactoryPayload} from 'type95'
import styles from './Panel.module.css'

interface PanelFactoryPayload extends FactoryPayload {
  props: {children?: React.ReactNode; className?: string}
  ref: HTMLDivElement
}

export const Panel = factory<PanelFactoryPayload>(
  ({className, ...rest}, ref) => (
    <div
      ref={ref}
      className={[styles.panel, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
)
Panel.displayName = 'Panel'
```

Use `polymorphicFactory()` instead of `factory()` only if the component
genuinely needs to render as different elements (like `Button` rendering
as `<a>`) — don't reach for it by default.

## What not to do

- Don't hardcode a color/border/font value — always a `--t95-*` token.
- Don't add a `classNames`/`styles`/`vars` runtime override prop — that's
  CSS-in-JS-shaped and isn't how this library styles things. Accept a
  plain `className` and merge it, same as `Button`.
- Don't branch on the active skin in JavaScript — if you find yourself
  checking `getSkin() === 'winxp'` to change layout, that logic belongs in
  a token or a skin-scoped CSS selector instead.

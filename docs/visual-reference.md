# Visual reference sources

Where to find authoritative visual specs (colors, measurements, states) for
each Windows era Type95 recreates. Check here before eyeballing a
screenshot or guessing a hex value — every source below either measured
pixels directly off a real OS install, or is Microsoft's own published
design spec.

## Primary sources (pixel-measured CSS recreations)

These three projects are a maintained family (each extends the last) and
document their own methodology: "the behavior of pixelated borders is well
specified in the Microsoft Windows User Experience reference manual...
tools used were a Windows 98 VM and MSPaint for measuring pixels." Read
their CSS directly — it's the fastest way to get an exact value.

- **[jdan/98.css](https://github.com/jdan/98.css)** — Windows 95/98. Core
  file: [`style.css`](https://github.com/jdan/98.css/blob/main/style.css).
  Windows 95 and 98 share the same bevel/button recipe (98 only changed the
  title bar to a gradient); this is why Type95's win95/win98 tokens are so
  close already.
- **[botoxparty/XP.css](https://github.com/botoxparty/XP.css)** — extends
  98.css. Core (non-themed) styles in
  [`gui/`](https://github.com/botoxparty/XP.css/tree/main/gui) render the
  Windows Classic theme (same bevel look as 98). The actual Luna look
  (rounded blue-bordered gradient buttons) is a separate theme override in
  [`themes/XP/`](https://github.com/botoxparty/XP.css/tree/main/themes/XP)
  — fetch `themes/XP/_buttons.scss` and `themes/XP/_variables.scss`, not
  the top-level `gui/_buttons.scss`, or you'll get the wrong (Classic, not
  Luna) values.
- **[khang-nd/7.css](https://github.com/khang-nd/7.css)** — Windows 7
  Aero. Core file:
  [`gui/_button.scss`](https://github.com/khang-nd/7.css/blob/master/gui/_button.scss),
  variables in
  [`gui/_variables.scss`](https://github.com/khang-nd/7.css/blob/master/gui/_variables.scss).
  Uses a `--w7-<component>-<property>-<state>` naming convention worth
  copying the _idea_ of (not the names) if Type95's token set grows.

Fetch raw file contents with `gh api repos/<owner>/<repo>/contents/<path>
--jq '.content' | base64 -d` (works even though these repos don't always
expose predictable `raw.githubusercontent.com` paths on first guess).

## Windows 10 (Fluent)

No equivalent pixel-measured CSS library exists for Windows 10 the way it
does for 95–7 — Fluent is a flat design language, not a bevel to trace.
Use Microsoft's own spec instead:

- **[Fluent 2 Design System — Shapes](https://fluent2.microsoft.design/shapes)**
  — corner radius spec (4px default for standard controls: Button,
  CheckBox, ComboBox, TextBox, ListView).
- **[Geometry in Windows 11 — Microsoft Learn](https://learn.microsoft.com/en-us/windows/apps/design/style/rounded-corner)**
  — corner-radius rationale, useful for confirming Windows 10 predates the
  more aggressive rounding Windows 11 introduced (Windows 10 buttons are
  much closer to square, ~2px, not 8px).
- Windows blue accent: `#0078D4` is Microsoft's documented default accent
  color across Fluent-era Windows 10 UI.

Treat win10 as "flat fill + 1px border + tiny radius + accent-color
states," not "trace a screenshot."

## Screenshot verification (all eras)

- **[GUIdebook: Graphical User Interface Gallery](https://guidebookgallery.org/)**
  — screenshot archive across OS history, organized by
  [interface](https://guidebookgallery.org/guis/windows). Use this to
  sanity-check a rendered component against a real screenshot, especially
  for states the CSS libraries above don't cover (e.g. a disabled button
  in a real Win95 dialog).
- **["The Windows Interface Guidelines for Software Design" (1995)](https://guidebookgallery.org/books/thewindowsinterfaceguidelinesforsoftwaredesign)**
  — Microsoft's own official UI spec book for the Windows 95 era, archived
  in full on GUIdebook. Useful for _why_ a measurement is what it is (e.g.
  standard dialog button size), not just what it is.

## Extracted values already on file

To save a re-fetch, here's what research for the `Button` component
turned up (2026-07). Re-verify against the sources above if something
looks off rather than trusting this table blindly — it's a snapshot, not
a spec.

| Token/property                 | Win95/98 (98.css)                                                 | WinXP Luna (XP.css `themes/XP`)                                                                | Win7 Aero (7.css)                                                                                    |
| ------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Window-frame / darkest shade   | `#0a0a0a` (not pure `#000000`)                                    | n/a (border-based, not bevel)                                                                  | n/a (border-based, not bevel)                                                                        |
| Text color                     | `#222222` (not pure `#000000`)                                    | `#222222`                                                                                      | `#222222`                                                                                            |
| Button min-height              | `23px`                                                            | `23px`                                                                                         | `23px`                                                                                               |
| Button padding                 | `0 12px` (not `4px 12px`)                                         | `0 12px`                                                                                       | `0 12px`                                                                                             |
| Border/shape                   | `border: none`, 4-shadow bevel, `border-radius: 0`                | `border: 1px solid #003c74`, `border-radius: 3px`, no box-shadow                               | `border: 1px solid #8e8f8f`, `border-radius: 3px`, `box-shadow: inset 0 0 0 1px #fffc`               |
| Background                     | flat `--surface` (`#c0c0c0`)                                      | `linear-gradient(180deg, #fff 0%, #ecebe5 86%, #d8d0c4 100%)`                                  | `linear-gradient(#f2f2f2 45%, #ebebeb 45%, #cfcfcf)`                                                 |
| Active/pressed                 | sunken 4-shadow bevel (shadow order reversed)                     | gradient darkens: `linear-gradient(180deg, #cdcac3 0%, #e3e3db 8%, #e5e5de 94%, #f2f2f1 100%)` | border `#6d91ab`, overlay gradient `linear-gradient(#e5f4fc, #c4e5f6 30% 50%, #98d1ef 50%, #68b3db)` |
| Hover (only exists from XP on) | none                                                              | inset glow rings: `#fff0cf, #fdd889, #fbc761, #e5a01a`                                         | border `#3c7fb1`, gradient crossfades to `#eaf6fd, #bee6fd, #a7d9f5`                                 |
| Focus/default                  | `outline: 1px dotted #000`, `outline-offset: -4px`                | inset blue rings: `#cee7ff, #98b8ea, #bcd4f6, #89ade4`                                         | border `#5586a3` + `1s ease infinite alternate` pulse glow animation                                 |
| Disabled                       | text `#808080` with `text-shadow: 1px 1px 0 #fff` (engraved look) | _(not covered in fetched excerpt — verify against GUIdebook)_                                  | `background: #f4f4f4`, `border-color: #adb2b5`, `color: #838383`                                     |

Win95/98's engraved disabled-text trick (gray text + 1px white drop
shadow) is an easy, high-value detail Type95 is currently missing — it's
one of the most recognizable "this is really Windows" details on a
disabled button.

## Checkbox / Radio / TextInput / Panel (2026-07)

Sourced the same way as Button above. A few techniques worth knowing
before touching these tokens:

- **Win95/98's checkbox, radio, and Panel `sunken`/`flat` variants are
  literal source SVGs, inlined as CSS data URIs**, not CSS-drawn shapes.
  `--border-field` (98.css's sunken bevel) maps cleanly to box-shadow, but
  a _round_ stepped-pixel bevel (radio) and a _pixel-art checkmark/dot_
  can't be reproduced with `border-radius` + `content` — a smooth
  anti-aliased CSS circle looks wrong next to 98's blocky one. Assets used
  (all from `jdan/98.css`'s `icon/` directory): `checkmark.svg` /
  `checkmark-disabled.svg` (7x7, checkbox glyph), `radio-border.svg` /
  `radio-border-disabled.svg` (12x12, the radio's own bevel — note the
  "disabled" asset is reused by the source for both `[disabled]` **and**
  the momentary `:active`/pressed state, not a Type95 simplification),
  `radio-dot.svg` / `radio-dot-disabled.svg` (4x4, radio glyph),
  `groupbox-border.svg` (5x5, `fieldset`'s border-image, → Panel `flat`),
  `sunken-panel-border.svg` (5x5, `.sunken-panel`'s border-image → Panel
  `sunken`). `--button-face` (`#dfdfdf`) is a _distinct_ shade from
  `--surface`/`--t95-face` (`#c0c0c0`) in 98.css — it's what
  `--t95-border-light` already models; an earlier draft of these tokens
  mistakenly substituted `--t95-face` here and it's worth double-checking
  against `gui/style.css`'s own `:root` block if this ever needs re-deriving.
- **XP Luna's checkmark/radio-dot are also literal source SVGs** (from
  `botoxparty/XP.css`'s `themes/XP/icon/`), but colorful green pixel-shaded
  raster icons (`checkmark.svg` is `#22a122`, not a flat brand color) —
  inlined the same way, not approximated to a solid color.
- **XP's `input[type="text"]` isn't in `themes/XP/` at all** — the Luna
  theme never overrides it, so the recipe comes from the _base_ (Classic)
  `gui/_forms.scss`: border `#7f9db9`, padding `3px 4px`, `outline: none`
  on focus with no replacement (genuinely no visible focus change in this
  era — Type95 doesn't fight this, it just doesn't suppress the browser's
  own default outline either). `themes/XP/_forms.scss` does override
  `height` to `23px` for text/select though (loads after the base file,
  wins the cascade) — the effective height is a mix of both files, not
  either one alone.
- **Win7's textbox border is genuinely 4 different colors per side**
  (`khang-nd/7.css`'s `gui/_textbox.scss`: `border-color: #abadb3 #dbdfe6
#e3e9ef #e2e3ea`, and different 4-tuples again on hover/focus) —
  reproduced with the literal 4-value `border-color` shorthand rather than
  collapsed to one tone.
- **Win7's checkbox and radio disable via two different mechanisms** in
  the source itself: checkbox swaps explicit background/border/glyph
  colors (`gui/_checkbox.scss`), radio instead applies `filter:
grayscale(1) opacity(0.6)` to the whole control
  (`gui/_radiobutton.scss`) — not a Type95 inconsistency, that's what's
  actually in the library.
- **Win10 has no sourced recipe for any of these controls** — same
  situation as the Button block above (no 98.css/XP.css/7.css equivalent
  exists for Windows 10). The checkbox/radio glyph uses the same
  Unicode-character technique as win7 (no Fluent SVG asset to be more
  literal than that) and every color is inferred from the button's
  already-approximate `#0078d7` accent, not measured.

| Token/property      | Win95/98 (98.css)                                   | WinXP Luna (XP.css)                                              | Win7 (7.css)                                                                   |
| ------------------- | --------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Checkbox/radio size | 13px / 12px                                         | 13px / 13px                                                      | 14px / 14px                                                                    |
| Checkmark/dot glyph | inlined SVG, `black` fill                           | inlined SVG, `#22a122` green pixel art                           | Unicode `\2714` ("✓"), `#4a5f97`                                               |
| TextInput height    | 21px                                                | 23px (theme override wins over base's 21px)                      | 23px                                                                           |
| TextInput border    | none (box-shadow bevel only)                        | `1px solid #7f9db9`                                              | 4-sided: `#abadb3 #dbdfe6 #e3e9ef #e2e3ea`                                     |
| TextInput focus     | no visible change (`outline: none` in source)       | no visible change (`outline: none` in source)                    | border → `#3d7bad #a4c9e3 #b7d9ed #b5cfe7`                                     |
| Panel (GroupBox)    | `border-image` (groove/sunken-panel SVGs), 0 radius | `1px solid #d0d0bf`, radius `4px` (distinct from button's `3px`) | `1px solid #cdd7db`, `inset 0 0 0 1px #fff`, radius `3px` (shared with button) |

Re-verify against the sources above if something looks off — this is a
snapshot from one research pass, not a spec.

## TitleBar / Window / ScrollView / MenuList / Tabs (2026-07)

- **TitleBar/Window (`.title-bar`, `.window`)** — win95/98 recipe is
  `jdan/98.css`'s own `.window`/`.title-bar` rules: window is the same
  4-shadow bevel math as Button/Panel but with face/highlight swapped
  (`--border-window-outer`/`-inner`, distinct from `--border-raised-*`),
  title bar is a `90deg` gradient (98) or flat navy (95, no gradient — see
  existing win95.css `--t95-titlebar-bg` == `-bg-end`) that swaps to a gray
  gradient when `.inactive`. XP Luna (`themes/XP/_window.scss`) is a much
  bigger jump: rounded 8px top corners, a 9-stop vertical blue gradient
  title bar with a 1px text-shadow, and title-bar-control buttons that are
  flat colored squares with hover/active PNG icon swaps (Type95 approximates
  the icon-swap with a plain hover/active background-color shift instead of
  shipping 15 PNGs). Win7 (`khang-nd/7.css`'s `_window.scss`) is Aero: a
  radial "glass" gradient plus `backdrop-filter: blur()` and per-button glow
  animations — full glass is still out of scope (see win7.css's existing
  header TODO), so Type95's win7 TitleBar/Window use the same
  "flat-gradient stand-in" treatment already applied to win7 Button (a
  `linear-gradient` using the sourced `--w7-w-bg`/`--w7-wct-*` colors, no
  blur). Win10 has no sourced window-chrome recipe at all (same situation
  as every other win10 block in this doc) — flat Fluent approximation using
  the existing `#0078d7` accent.
- **ScrollView** — win95/98's `.sunken-panel` (`jdan/98.css`) is literally
  "Panel sunken variant + `overflow: auto`", so ScrollView's box styling
  reuses Panel's existing `--t95-panel-*` sunken tokens rather than a
  duplicate set. The scrollbar itself is `::-webkit-scrollbar` (Chromium/
  Safari only, no Firefox equivalent exists — this is a real limitation of
  the source library too, not a Type95 gap). Win95/98 track/thumb/arrow-button
  glyphs are literal sourced SVGs, inlined as data URIs, same reasoning as
  the checkbox/radio glyphs: `scrollbar-background.svg` (2x2 checkerboard
  tile), `button-up/down/left/right.svg` (16x17 bevel + arrow). XP
  (`botoxparty/XP.css`'s `themes/XP/_global.scss`) reskins the thumb to a
  rounded (2px) light-blue-tinted box (`#c8d6fb` + blue/white inset bevel)
  over its own track SVGs — Type95 approximates the XP track as a flat tint
  of `--t95-face` rather than fetching the Luna-specific track/thumb grip
  SVGs (a decorative micro-detail, not a shape CSS can't otherwise produce).
  Win7 (`khang-nd/7.css`'s `_scrollbar.scss`) sources a real gradient track
  (`linear-gradient(to right/bottom, #e5e5e5, surface 20%)`) and a
  bordered/rounded thumb using the same `--w7-el-bd`/`-bg` tokens as
  Button — reproduced faithfully, except the sourced base64 PNG "grip dot"
  texture on the thumb is omitted (plain thumb, like every other skin).
  Win10 has no sourced scrollbar recipe — flat Fluent approximation.
- **MenuList** — no dedicated "menu bar" component exists in 98.css or
  XP.css at all (only their tab-strip `menu[role=tablist]`, which is a
  different control — see Tabs below). Win95/98/XP's real convention,
  documented across the Windows 95/98 UI guidelines, is that a hovered or
  keyboard-focused menu item inverts to the system highlight color — so
  MenuList's hover/focus state deliberately reuses the
  already-established `--t95-highlight-bg`/`--t95-highlight-text` tokens
  (the same ones used for text selection) rather than inventing a new
  token pair, since that's the actual OS behavior, not an approximation of
  a missing recipe. Win7 is the one skin with a real sourced menu
  (`khang-nd/7.css`'s `_menu.scss`, `ul[role=menubar]`/`[role=menu]`/
  `[role=menuitem]`): flat `#3399ff` hover highlight (distinct from its
  Button/element blue `#3c7fb1`/`#0078d7` family — this is the literal
  sourced value, not a typo) over a light gradient menu-bar background.
  Win10 hover uses the shared `#0078d7` accent (no dedicated sourced
  recipe, same as everywhere else in this doc).
- **Tabs** — sourced directly from the same `menu[role=tablist]` /
  `[role=tabpanel]` rules in all three libraries (98.css, XP.css classic +
  Luna override, 7.css). All three share the identical structural trick:
  the selected tab's `margin-top`/`padding-bottom` shift makes it visually
  overlap and merge into the panel below, hiding the border between them —
  reproduced exactly via `margin`/`z-index`, not approximated. Luna adds a
  distinctive `#e68b2c` top-border + `inset 0 2px #ffc73c` glow on
  hover/selected that 98/7 don't have (sourced, not invented). Win7's
  selected-tab treatment additionally sets `animation: none` to cancel the
  button-pulse focus animation that would otherwise apply (Type95 mirrors
  this by not carrying `--t95-button-animation` into the tab recipe at
  all — tabs use dedicated `--t95-tabs-*` tokens, not the button ones).

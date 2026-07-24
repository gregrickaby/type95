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

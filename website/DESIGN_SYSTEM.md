# MacPUMP website design system

The website should feel like the app: calm, precise, native to macOS. Every value below lives in
[`src/styles/tokens.css`](src/styles/tokens.css); shared patterns live in [`src/styles/global.css`](src/styles/global.css).
Components use tokens and shared classes. Don't add one-off colours, sizes or shadows in a component.

## Principles

1. **Real before decorative.** Show the app's own renders. Where a screenshot doesn't exist yet, use the labelled
   `Placeholder` component, never a mock-up presented as the app.
2. **Plain English first, detail on request.** Lead with what something means. Technical detail goes in a
   `.disclosure` ("For the technically curious").
3. **Honest numbers.** The site labels figures the way the app does: Measured, Calculated, Estimated, Unavailable.
   The power-flow demo is always tagged as a demonstration with sample values.
4. **Glass is an accent.** Translucent surfaces are for floating chrome, not for content.

## Colour

Colours are taken from the app (`Sources/PowerFlow/Spec.swift`, `enum Palette`) and its icon.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#fbfbfd` | `#0b0c0f` | Page background |
| `--bg-alt` | `#f3f3f6` | `#121317` | Alternate section band, footer |
| `--surface` | `#ffffff` | `#17181d` | Cards, tables, windows |
| `--surface-sunken` | `#ececf0` | `#0f1013` | Code, disabled controls |
| `--text` | `#1d1d1f` | `#f5f5f7` | Headings, primary text |
| `--text-2` | `#4a4a4f` | `#b4b4ba` | Body and lead text |
| `--text-3` | `#6a6a70` | `#93939a` | Captions, labels |
| `--accent` | `#0a64cc` | `#1670d4` | Primary buttons, selection. The app's charge-fill blue |
| `--accent-text` | `#0a5fc2` | `#5aa6ff` | Links and eyebrows (meets 4.5:1 on its background) |
| `--energy` | `#a8740a` | `#f2e5b9` | The app's adapter/energy accent, used sparingly for small marks |
| `--charcoal` | `#2c2d35` | same | The app popover's background: demo panel, screenshot frames, privacy band |
| `--brand-navy`, `--brand-cyan` | `#0d1630`, `#19d3ff` | same | From the icon; only in faint background washes |

Measurement badges: `--kind-measured` (green), `--kind-calculated` (blue), `--kind-estimated` (amber),
`--kind-unavailable` (grey). Each badge pairs its colour with a text label, so colour is never the only signal.

Gradients are limited to two faint radial washes (behind the hero popover and on the download card). No other
gradients.

## Typography

System fonts only, so there are no web-font downloads: `-apple-system` (SF Pro on Apple devices), then Segoe UI,
Roboto and Helvetica Neue. Code uses `ui-monospace` / SF Mono.

| Role | Token | Size | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Hero heading | `--fs-hero` | 40 → 64 px (fluid) | 700 | −0.032em |
| Section heading (`.h2`) | `--fs-h2` | 30 → 46 px | 700 | −0.032em |
| Sub-heading (`.h3`) | `--fs-h3` | 19 → 22 px | 650 | −0.022em |
| Lead (`.lead`) | `--fs-lead` | 17.5 → 21 px | 400 | −0.011em |
| Body | `--fs-body` | 17 px | 400 | −0.011em |
| Small | `--fs-small` | 15 px | 400–600 | |
| Caption (`.caption`) | `--fs-caption` | 13 px | 400 | |
| Micro (badges) | `--fs-micro` | 12 px | 600 | 0 |
| Buttons | | 15–17 px | 600 | −0.01em |
| Measurements (`.measure`) | | inherits | | tabular figures |

Headings use `text-wrap: balance`. Body text uses `text-wrap: pretty`. Line length stays under about 75 characters
(`.section-head` max 44rem, prose max 46rem).

## Spacing

A 4 px base: `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 ·
`--s-9` 96. Sections use `--section-y` (72 → 128 px). Side gutters use `--gutter` (16 → 32 px). The content width is
`--container` (1120 px).

Two plain sections in a row share one gap. Alternate bands (`.section--alt`) and the dark band (`.section--band`)
keep full padding on both sides.

## Radii

`--r-xs` 6 · `--r-sm` 10 · `--r-md` 14 · `--r-lg` 20 · `--r-xl` 28 · `--r-pill` 999. Buttons, the nav bar and
segmented controls are pills. Window-like frames use `--r-lg`. Nested corners subtract the padding
(`calc(var(--r-xl) - var(--s-2))`).

## Glass

`.glass` = `--glass-bg` (white 66% / charcoal 60%) + `backdrop-filter: saturate(180%) blur(20px)` + a 1 px
`--glass-border` + a 1 px inner top highlight + `--shadow-2`.

Used only on: the navigation bar and mobile menu sheet, segmented controls, the secondary button, the hero's menu bar
strip and the download facts panel. When the browser has no `backdrop-filter`, or the visitor prefers reduced
transparency, glass falls back to an opaque surface.

## Shadows

- `--shadow-1`: hairline lift (selected segment, nav at rest).
- `--shadow-2`: floating panels and cards on hover.
- `--shadow-window`: app windows and screenshots. A long soft drop plus a 0.5 px outline, like a macOS window.

Dark mode uses darker, wider shadows and a faint light outline instead of a dark one.

## Components

| Pattern | Class / component | Notes |
| --- | --- | --- |
| Primary / secondary button | `.btn.btn--primary`, `.btn.btn--secondary`, `.btn--lg` | 44 px tall (50 px large). `aria-disabled="true"` gives the disabled look |
| Text link with chevron | `.link-arrow` | The chevron nudges 3 px on hover |
| Eyebrow + heading + lead | `.eyebrow`, `.h2`, `.lead` in `.section-head` | Every section opens this way |
| Two-column feature | `.split`, `.split__copy`, `.split__media` | Media drops below the copy under 900 px |
| Checklist | `.check-list` | Bold lead-in, then the plain explanation |
| Technical detail | `details.disclosure` | Collapsed by default |
| Measurement badge | `.badge.badge--measured` etc. | Always shown with its text |
| Screenshot frame | `.shot` | Charcoal frame with `--shadow-window` |
| Placeholder | `Placeholder.astro` | Dashed, hatched and labelled "Screenshot coming soon", naming where in the app to capture |
| Segmented control | `.segmented` (+ `.glass`) | `aria-pressed` for toggles; WAI-ARIA tabs for the dashboard |
| Table | `.table-wrap` + `.table` | Becomes a stacked list on phones (see `NumbersSection`) |
| Prose | `.prose` | Markdown in docs, changelog and legal pages |

## Motion

- **Easing:** `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`). Nothing overshoots, like the app's critically damped
  springs.
- **Durations:** `--dur-1` 160 ms (hover, press), `--dur-2` 280 ms (state changes), `--dur-3` 600 ms (entrances).
  The power-flow demo tweens over 470 ms, the app's own settle time.
- **Entrances:** `[data-reveal]` fades up 18 px once, when it first scrolls into view. Staggers use `--reveal-delay`
  (60–80 ms steps).
- **Presses:** buttons scale to 0.97.
- **No continuous animation**, no parallax and no scroll-jacking.
- **Reduced motion:** `prefers-reduced-motion: reduce` removes all transitions and entrances, and the demo jumps
  straight to each state.

## Responsive breakpoints

| Width | Changes |
| --- | --- |
| ≤ 960 px | The power section stacks (the demo goes below the copy) |
| ≤ 900 px | `.split` stacks, overview grid 2 columns, download card stacks |
| ≤ 860 px | Navigation collapses to a menu button and glass sheet; hero centres; docs sidebar becomes a collapsible menu; FAQ stacks |
| ≤ 760 px | Dashboard sidebar becomes a scrolling tab strip; renders become a swipeable row; customise grid single column |
| ≤ 600 px | Provenance table becomes a stacked list |
| ≤ 520 px | Demo controls become a 2 × 2 grid; privacy facts single column |
| ≤ 420 px | Hero buttons go full width |

Single-column grids use `minmax(0, 1fr)`, never `1fr`, so wide content can't force sideways scrolling. QA checks
for horizontal overflow at 320, 390, 834, 1280 and 1440 px.

## Light and dark

The site follows the system appearance. The footer's **Appearance** control (Auto / Light / Dark) overrides it and
is remembered in `localStorage`. An inline script applies the choice before first paint.

Dark tokens are defined twice in `tokens.css`: once for the system setting and once for the explicit choice. Keep
the two blocks identical. The demo panel, the screenshot frames and the privacy band stay charcoal in both
appearances, because that is how the app's popover looks.

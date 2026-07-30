# UI Design System
## CEDIM Digital Platform

Version: 1.0

---

# Design Principles

- Simple
- Modern
- Professional
- Technology-Oriented
- Accessible
- Responsive
- Consistent

---

# Theme

Dark only. Every colour comes from a token in `variables.css`, so a
light theme is a matter of overriding those tokens — but no light
variant exists today and nothing in the code anticipates one.

---

# Color Palette

## Primary

Background: #0B1120

Surface: #111827

Border: #1F2937

Accent: #38BDF8

Primary Text: #F8FAFC

Secondary Text: #94A3B8

---

## Status Colors

Success: #22C55E (`--color-success`)

Warning: #F59E0B (`--color-warning`)

Error: #EF4444 (`--color-danger`)

Info: #0EA5E9 — not declared as a token; no component uses it yet.

---

# Typography

Primary Font

Inter, self-hosted from `assets/fonts/` — variable weight 400–700, so
one file covers every weight the site uses. Declared in
`assets/css/fonts.css`.

Served from the repo rather than Google Fonts: one less external
request, and no visitor data going to a third party. Licensed under SIL
OFL 1.1 (`assets/fonts/OFL.txt`), which permits redistribution.

Two subsets are declared with `unicode-range`, so the browser fetches
only what the page actually needs — normally just `inter-latin.woff2`
(48 KB). `inter-latin-ext.woff2` (85 KB) covers characters outside
Latin-1 and costs nothing until one appears.

`font-display:swap`, so text paints immediately in the fallback and
switches when Inter arrives.

Fallback

system-ui, sans-serif

---

# Font Scale

Defined as tokens in `variables.css`, named by size rather than by role
so that two components sharing a size do not have to share a semantic
name:

`--font-size-xs` .75rem — tags, status chips

`--font-size-sm` .875rem — card meta, footer legal

`--font-size-base` 1rem — buttons, footer headings

`--font-size-md` 1.1rem — page intro, project summary

`--font-size-lg` 1.15rem — card titles, hero description

`--font-size-xl` 1.35rem — detail section titles

`--font-size-2xl` 1.4rem — logo fallback text

`--font-size-3xl` 2rem — page title on mobile

`--font-size-4xl` 2.5rem — page titles, stat figures

`--font-size-5xl` 3rem — hero title on mobile

`--font-size-6xl` 3.5rem — 404 code on mobile

`--font-size-7xl` 4rem — hero title

`--font-size-8xl` 5rem — 404 code

Known wart: `md` and `lg` sit less than 1px apart. They come from
choosing sizes one at a time before the scale existed. Collapsing them
is a real, if barely visible, change.

The navbar toggle keeps a literal 1.8rem: it sizes the ☰ glyph, not
text, so it is deliberately outside this scale.

---

# Spacing Scale

`--space-1` … `--space-8` in `variables.css`:

4, 8, 12, 16, 24, 32, 48, 64

Steps of 96 and 128 were in the original scale but nothing needs them
yet, so they are not declared.

---

# Border Radius

`--radius-sm` 6px, `--radius-md` 12px, `--radius-lg` 20px

"Extra Large" and "Rounded" are not declared: nothing uses them. The
one place needing a circle (`border-radius:50%` on bullets and social
icons) states it literally.

---

# Shadows

Two levels, because two are all the site uses — both in the navbar:

`--shadow-md` `0 8px 24px rgba(0,0,0,.25)` — bar after scrolling

`--shadow-lg` `0 12px 32px rgba(0,0,0,.45)` — open mobile menu

Cards do not use a shadow: they lift with `transform` and a border
colour change instead. A third, smaller level will be added when
something needs it, rather than sitting unused in `variables.css`.

---

# Buttons

Primary

Secondary

Ghost

Outline

Danger

Icon

Disabled

Loading

---

# Cards

All rendered by `components/cards/cards.js` from data files, sharing the
`.card` base plus small builders (`createTitle`, `createTags`,
`createFooter`, `createDetail`, …).

Built:

Project Card — image, category, status, tags, year; whole card links to
the detail page

Open Call Card — category, status, deadline, requirements, apply button

Workshop Card — optional image, date, instructor, location, tags,
duration, sign-up button

Statistics Card — figure and label

Not built:

Member Card, Feature Card

"Announcement Card" is the Open Call Card; the site says "Open Calls"
throughout.

---

# Components

Built (one folder each under `components/`):

Navbar, Hero, Buttons, Cards, Partners, Footer, Project Detail,
Site Chrome

Section layout lives in `layout.css`, not as a component.

Not built:

Timeline, Accordion, Modal, Drawer, Toast, Badge, Breadcrumb, Tabs,
Pagination, Table, Chart

Form — will not be built. Applications and sign-ups run on Google Forms
or Microsoft Forms; the site links out to them and never collects data
itself, since there is no backend to receive it.

---

# Forms

None. See the note under Components: forms are external (Google Forms /
Microsoft Forms). This section is kept only to record that the decision
was deliberate, not an oversight.

---

# Icons

Library

Lucide shapes, but **not the Lucide package**. The paths are inlined as
SVG in the components that need them, so the site keeps zero
dependencies. Copy new icons from lucide.dev as raw paths.

Style

Outlined, `stroke-width:2`, `stroke-linecap:round`

---

# Images

SVG preferred

WebP for photos

PNG only if transparency required

---

# Animations

Duration

150 ms

250 ms

350 ms

Hover

Scale

Fade

Slide

Reduced Motion Support

Yes

---

# Layout

Max Width

1280 px (`--container-width`)

Container

Centered (`.container`)

Grid

No 12-column system. Card grids use CSS Grid with
`repeat(auto-fill, minmax(300px, 1fr))`, which reflows on its own and
made a fixed column count unnecessary.

---

# Breakpoints

A single mobile/desktop split.

Mobile

≤992 px

Desktop

>992 px

One breakpoint is enough because the card grids use
`repeat(auto-fill, minmax(300px, 1fr))` and reflow continuously — a
tablet gets two columns and a desktop three or four with no media query
involved. A five-zone scale was considered and dropped as ceremony.

Declared as `--breakpoint-mobile` in `variables.css` for reference only:
media queries cannot read custom properties, so the value is repeated
literally in each component.

Known trade-off: between 768 and 992 px the hamburger menu appears even
though there is room for the full menu.

---

# Accessibility

Semantic HTML

Keyboard Navigation

Visible Focus

ARIA when needed

WCAG AA

---

# Naming

CSS

kebab-case

JavaScript

camelCase

Python

snake_case

Classes

BEM (future)

---

# Assets

CSS

assets/css/

JavaScript

assets/js/

Images

assets/img/

Icons

assets/icons/

Fonts

assets/fonts/

---

# Future UI

Glassmorphism

Minimal Animations

Dark Dashboard

Interactive Charts

Kanban Boards

Calendar

Notifications

Command Palette

AI Assistant

---

# Inspirations

Vercel

Linear

OpenAI

NVIDIA Research

Apple

GitHub
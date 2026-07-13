# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

CEDIM Web is the official site for the Centro de Desarrollo e Investigación en Mecatrónica (CEDIM) at Universidad Nacional de Ingeniería (UNI). It is a **static site**: plain HTML5, CSS3, and vanilla JavaScript — no framework, no bundler, no package manager, no build step, no test suite.

## Running the site

There is no build/lint/test tooling in this repo. To view changes, open `index.html` directly in a browser or serve the directory statically (e.g. `npx serve .` or the VS Code Live Server extension). Deployment target is GitHub Pages.

## Architecture

**Component folders vs. `index.html` are not wired together automatically.** `components/<name>/` folders (e.g. `components/navbar/`, `components/hero/`, `components/footer/`) hold a component's markup (`.html`), styles (`.css`), and behavior (`.js`) in isolation — think of them as source-of-truth snippets/previews, not includes. `index.html` currently contains hand-copied markup for the navbar, hero, and footer sections; there is no templating engine, so when a component's HTML changes, the corresponding markup in `index.html` must be updated by hand to match. Several top-level files under `components/` (`buttons.html`, `cards.html`, `modal.html`) are empty placeholders for components not yet built.

**CSS loads through a single entry point with a fixed cascade order.** `index.html` only links `assets/css/styles.css`, which `@import`s in this order: `variables.css` → `layout.css` → `components.css` → `utilities.css`. `components.css` in turn `@import`s each component's own stylesheet by relative path (e.g. `../../components/navbar/navbar.css`). When adding a new component's CSS, register its `@import` in `assets/css/components.css` — otherwise it will never be loaded from `index.html`.

**Design tokens live in `assets/css/variables.css`** as CSS custom properties on `:root` (colors, spacing scale `--space-1`…`--space-8`, border radii, transition, container width, font family). Component and layout CSS should consume these tokens (`var(--color-primary)`, etc.) rather than hardcoding values, to stay consistent with `docs/ui-design-system.md`.

**`docs/ui-design-system.md`** is the design spec for the whole platform (colors, type scale, spacing, component inventory, breakpoints, naming conventions, accessibility targets). Much of it describes components/features that don't exist yet — treat it as the target design language, not a description of current code.

## Conventions (from `docs/ui-design-system.md`)

- CSS classes: kebab-case (BEM planned for the future, not yet in use)
- JavaScript: camelCase
- Theme: dark by default (light theme planned but not implemented); base colors `--color-bg: #0B1120`, `--color-surface: #111827`, `--color-primary: #38BDF8`
- Icons: Lucide, outlined style
- Breakpoint used in current CSS: single mobile/desktop split at `992px` (`@media (max-width: 992px)`)

## Branches

- `main` — production (GitHub Pages serves from here)
- `develop` — active development
- Feature work may also happen on short-lived `feature/*` branches, merged into `develop` and deleted once merged

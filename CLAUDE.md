# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

CEDIM Web is the official site for the Centro de Desarrollo e Investigación en Mecatrónica (CEDIM) at Universidad Nacional de Ingeniería (UNI). It is a **static site**: plain HTML5, CSS3, and vanilla JavaScript — no framework, no bundler, no package manager, no build step, no test suite.

## Running the site

There is no build/lint/test tooling in this repo, and none is wanted — GitHub Actions was considered and declined, since a site with no build step gains nothing from it. To view changes, open any `.html` at the root directly in a browser or serve the directory statically. Deployment is a plain `git push`: merge `develop` into `main`, push, and GitHub Pages publishes in about a minute.

## Architecture

**The site is multi-page, and every page lives at the repo root.** `index.html`, `about.html`, `research.html`, `projects.html`, `open-calls.html`, `workshops.html`, and `project.html` (project detail). Flat on purpose: every asset reference is then the same string from every page, which removes the whole class of `../` bugs that appeared when the detail page briefly lived under `pages/`. **Do not add new pages under `pages/`** — that folder is now vestigial. Put a new page at the root and add it to `NAV_ITEMS`.

**The site is English-only, deliberately.** All user-facing text, page filenames, and project `id` slugs are in English because CEDIM wants international reach; pages declare `lang="en"`. Code comments and the editing instructions inside `assets/js/data/projects.js` stay in Spanish, since those serve the CEDIM team rather than the public. Keep new content on the same split.

**Navbar and footer are injected by JS from one place.** Each page declares only `<div id="site-navbar"></div>` and `<div id="site-footer"></div>`; `components/site-chrome/site-chrome.js` replaces them. Menu options, the contact email, the address, and the social links are all defined as constants at the top of that file — edit them there and every page changes at once. It also marks the current page's menu item with `.is-active` by comparing the filename from `location.pathname`. Unlike the data renderers, this file builds its markup with template strings rather than `createElement`, because the content is fixed and ours; there is no user-authored text in it.

**Script order matters and is not enforced anywhere.** `site-chrome.js` must be loaded *before* `navbar.js` and `footer.js`, which query for `.navbar-toggle` and `#footer-year` — elements that do not exist until the chrome is injected. Likewise `assets/js/data/projects.js` must come before `cards.js` / `project-detail.js`, which read the global `projects` array. Every page repeats this ordering in its `<script>` block.

**`components/<name>/` folders are source-of-truth for CSS and JS, but their `.html` files are only reference sheets.** No build step copies them anywhere. For `navbar` and `footer` the `.html` is now purely documentation of the CSS classes — the real markup lives in `site-chrome.js`, and editing the reference file changes nothing on the site. `components/modal.html` is still an empty placeholder.

**Project cards and detail pages are rendered from data.** The content lives in `assets/js/data/projects.js`, which carries editing instructions in its header comment for non-developers; it is the only file to touch to add/change/remove a project. `cards.js` renders into `#projects-grid` (all projects, on `proyectos.html`) and `#featured-projects` (first 3, on `index.html`) — it looks up both ids and skips whichever is absent, so one file serves both pages. `proyecto.html` reads `?id=` from the URL and renders that project into `#project-content`. Adding a project to the data file therefore creates its card *and* its detail page automatically; there is no HTML file per project. Each project's `id` is part of its public URL, so renaming one breaks links already shared.

**Renderers build DOM with `createElement` + `textContent`, never `innerHTML`.** Project data is meant to be user-authored, and this keeps it from being parsed as HTML. They also tolerate missing fields (`project.tags || []`) and a missing `projects` global, because a hand-edited data file is expected to break occasionally — a broken data file should degrade to an empty state, not take the page down.

**The project data is a `.js` file rather than `.json` deliberately.** `fetch()` of a local JSON is blocked by CORS under the `file://` protocol, which would leave the projects section empty whenever a page is opened directly in a browser instead of served — the usual way this repo gets checked. A plain `<script>` with a `const projects = [...]` avoids that entirely and is just as editable through github.com's web editor. For the same reason `image` fields store a bare filename (`"brazo-robotico.svg"`), with the renderer supplying the `assets/img/projects/` prefix.

**Content editing = commit.** The chosen approach for project CRUD is "edit the data file on github.com, GitHub Pages redeploys in ~1 min". A CMS admin panel (Decap) was considered and deferred: it authenticates through GitHub OAuth, which needs a server-side secret exchange that GitHub Pages cannot perform, so it would require deploying a separate OAuth service. If a form-based admin UI becomes a real need, the cheapest path is moving *hosting* to Netlify or Cloudflare Pages (repo stays on GitHub) for their built-in identity — the data layer above does not have to be rebuilt for it.

**`components/buttons/` is a style-only component.** Unlike the section components above, it ships no markup into `index.html` — it defines the `.btn` class plus variant modifiers (`.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-outline`, `.btn-danger`, `.btn-icon`) and states (`:disabled`/`.btn-disabled`, `.btn-loading`) that other components consume. `components/buttons/buttons.html` is a reference sheet of every variant, not a snippet to copy in.

**CSS loads through a single entry point with a fixed cascade order.** Every page links only `assets/css/styles.css`, which `@import`s in this order: `variables.css` → `layout.css` → `components.css` → `utilities.css`. `components.css` in turn `@import`s each component's own stylesheet by relative path (e.g. `../../components/navbar/navbar.css`) — those paths resolve against the CSS file's own location, which is why they work identically from every page. When adding a new component's CSS, register its `@import` in `assets/css/components.css`, otherwise it is never loaded.

**Import order in `components.css` is load-bearing.** Equal-specificity rules are resolved by source order, so a component imported later wins. This already bit once: `.navbar-cta` composes `.btn .btn-primary`, and because `buttons.css` is imported after `navbar.css`, the mobile rule hiding the CTA had to be written `.navbar .navbar-cta` to outrank `.btn`. Prefer raising specificity in the component that owns the behavior over reordering the imports.

**Shared page-level classes live in `layout.css`, not in a component.** `.page` (top padding that clears the 72px fixed navbar), `.page-title`, `.page-intro`, `.prose`, and `.section-actions` are used by every interior page. `html { scroll-padding-top: 72px }` is there for the same reason — without it, in-page anchors land under the navbar.

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

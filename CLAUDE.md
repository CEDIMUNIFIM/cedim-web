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

**Script order matters and is not enforced anywhere.** `site-chrome.js` must be loaded *before* `navbar.js` and `footer.js`, which query for `.navbar-toggle` and `#footer-year` — elements that do not exist until the chrome is injected. Likewise a page's data file must come before `cards.js` / `project-detail.js`, which read the globals (`projects`, `openCalls`, `workshops`). Each page loads only the data it needs; the renderers guard every global with `typeof … === "undefined"`, so a page that omits one simply renders nothing for it.

**`components/<name>/` folders are source-of-truth for CSS and JS, but their `.html` files are only reference sheets.** No build step copies them anywhere. For `navbar` and `footer` the `.html` is now purely documentation of the CSS classes — the real markup lives in `site-chrome.js`, and editing the reference file changes nothing on the site. `components/modal.html` is still an empty placeholder.

**All list content is rendered from data files, not written into the pages.** `assets/js/data/` holds `projects.js`, `open-calls.js`, and `workshops.js`; each declares one global array and carries editing instructions in its header comment for non-developers. Those three files are the only ones to touch to publish content — the pages themselves contain just an empty grid `<div>`. This is deliberate: calls and workshops turn over every semester, so requiring an HTML edit for them would defeat the "edit data, not code" goal.

`components/cards/cards.js` renders all of them. `renderCardsInto(containerId, list, createCard, emptyMessage)` looks up a container id and returns silently if that page doesn't have it, which is how one script serves every page: `#projects-grid`, `#featured-projects` (first 3, on `index.html`), `#calls-grid`, and `#workshops-grid`. The three card builders share small helpers (`createTitle`, `createTags`, `createFooter`, …) rather than repeating DOM construction. `project.html` is separate — it reads `?id=` from the URL and renders one project into `#project-content` via `project-detail.js`. Adding a project to the data file creates its card *and* its detail page automatically; there is no HTML file per project, and each project's `id` is part of its public URL, so renaming one breaks links already shared.

**Renderers build DOM with `createElement` + `textContent`, never `innerHTML`.** Project data is meant to be user-authored, and this keeps it from being parsed as HTML. They also tolerate missing fields (`project.tags || []`) and a missing `projects` global, because a hand-edited data file is expected to break occasionally — a broken data file should degrade to an empty state, not take the page down.

**The project data is a `.js` file rather than `.json` deliberately.** `fetch()` of a local JSON is blocked by CORS under the `file://` protocol, which would leave the projects section empty whenever a page is opened directly in a browser instead of served — the usual way this repo gets checked. A plain `<script>` with a `const projects = [...]` avoids that entirely and is just as editable through github.com's web editor. For the same reason `image` fields store a bare filename (`"brazo-robotico.svg"`), with the renderer supplying the `assets/img/projects/` prefix.

**Social preview tags are static and hardcoded per page.** Every page carries `description`, `canonical`, `og:*` and `twitter:*` tags in its `<head>`. `og:url` and `og:image` must be absolute URLs — crawlers do not resolve relative paths — so the base `https://cedimunifim.github.io/cedim-web/` is repeated in all seven files; a domain change means editing all of them. `project.html` is the exception: its tags are generic and deliberately omit `og:url`/`canonical`, because social crawlers do not execute JavaScript and therefore never see what `project-detail.js` writes. Per-project previews would require one HTML file per project, which would break the data-driven design.

**The `og:image` must be a raster file.** Facebook, LinkedIn, and WhatsApp do not render SVG previews, so all pages point at `assets/img/social/og-cedim.jpg` rather than reusing the site's SVGs. The current photo is 1280×960 (4:3), not the 1.91:1 the networks want, so they centre-crop it; `og:image:width`/`og:image:height` are declared as 1280×960 to match the actual file, and **must be updated in all seven pages if the photo is ever replaced** — networks may drop an image whose declared size disagrees with the file. `assets/img/social/README.md` holds the spec, and `og-cedim.svg` there is an unused brand-card alternative. This repo has no image tooling, so cropping and conversion happen outside it.

**Forms are always external.** CEDIM runs applications and sign-ups through Google Forms or Microsoft Forms; the site is the publicity layer and never collects data itself. Open calls and workshops carry `actionLabel`/`actionHref` fields for that, and `createAction()` in `cards.js` adds `target="_blank"` plus `rel="noopener noreferrer"` whenever the URL is external. Do not build in-page form handling — there is no backend to receive it.

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

# CEDIM Web

Official website of the **Centro de Desarrollo e Investigación en Mecatrónica (CEDIM)** at Universidad Nacional de Ingeniería (UNI), Peru.

🌐 **Live site:** https://cedimunifim.github.io/cedim-web/

The site presents the centre's research lines, projects, open calls, and workshops. It is the public-facing layer: applications and sign-ups are handled through Google Forms / Microsoft Forms, linked from the relevant pages.

---

## Publishing content

**You do not need to know HTML to publish content.** Everything that changes regularly lives in five files under `assets/js/data/`:

| To publish a… | Edit this file |
|---|---|
| Project | `assets/js/data/projects.js` |
| Open call | `assets/js/data/open-calls.js` |
| Workshop | `assets/js/data/workshops.js` |
| Statistic (home page figures) | `assets/js/data/stats.js` |
| Partner | `assets/js/data/partners.js` |

Each file starts with a comment explaining every field, in Spanish, written for non-developers.

### Steps

1. Open the file on github.com
2. Click the pencil icon (**Edit this file**)
3. Copy an existing block, change its text
4. Save with **Commit changes** on the `main` branch
5. The site updates on its own in about a minute

Adding a project also creates its own detail page automatically — there is no HTML file per project.

> **Careful with the syntax.** Every entry sits between `{ }`, entries are separated by commas, and text goes inside quotes. If the file breaks, the affected section shows an empty-state message instead of taking the page down — but the content will not appear until the syntax is fixed.

All site content is written in **English**, since CEDIM aims for international reach.

---

## Tech stack

Plain HTML5, CSS3, and vanilla JavaScript. **No framework, no bundler, no package manager, no build step.** This is deliberate: the site deploys by pushing to GitHub Pages, and a build step would add tooling to maintain without improving anything.

## Running it locally

There is nothing to install. Open any `.html` file at the root directly in a browser, or serve the folder statically (VS Code's Live Server extension works well).

---

## Structure

```
index.html            Home
about.html            About the centre
research.html         Research lines
projects.html         Project listing
project.html          Project detail (reads ?id= from the URL)
open-calls.html       Open calls
workshops.html        Workshops
404.html              Not-found page

assets/
├── css/              Single entry point: styles.css
├── fonts/            Self-hosted Inter (variable font + OFL license)
├── js/data/          ← Editable content lives here
└── img/              Illustrations, logos, social preview

components/           One folder per component (.css, .js, and an .html reference)
docs/                 UI design system spec
```

**Every page sits at the repo root**, on purpose: asset paths are then identical from every page, which avoids a whole class of broken-link bugs.

The navbar and footer are not copied into each page — they are generated from `components/site-chrome/site-chrome.js`. Menu entries, the contact email, the address, and the social links are all defined at the top of that file, so editing it updates every page at once.

---

## Deployment

GitHub Pages serves from `main`. There is no CI pipeline.

```bash
git checkout develop        # work here
git add .
git commit -m "your message"
git push origin develop

git checkout main           # publish
git merge develop
git push origin main        # live in ~1 min
```

### Branches

- `main` — production, what GitHub Pages serves
- `develop` — active development
- `feature/*` — short-lived branches, merged into `develop` and deleted

---

## Contributing

Maintained by members of CEDIM. `CLAUDE.md` at the repo root documents the architecture and the reasoning behind each decision — worth reading before making structural changes.

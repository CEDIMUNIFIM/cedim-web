# Landing Page Blueprint
## CEDIM Digital Platform

Version: 1.0

---

# Goal

Present CEDIM as the leading Mechatronics Research Center in Peru, encouraging students, researchers, and partners to participate in projects, workshops, and research initiatives.

---

# Target Audience

- UNI Students
- Researchers
- Professors
- Companies
- Future Members
- Visitors

---

# User Journey

Landing

↓

Learn about CEDIM

↓

Explore Research Areas

↓

Discover Projects

↓

View Open Calls

↓

Join CEDIM

---

# Landing Structure

This blueprint was written for a single-page site. It became multi-page:
Research, Projects, Open Calls and Workshops each have their own page,
and the landing keeps only a summary of each. The sections below still
describe what each area should contain — read them as specs for those
pages, not for one scrolling page.

Landing page (`index.html`):

1. Navbar
2. Hero
3. About CEDIM (summary → `about.html`)
4. Featured Projects (first 3 → `projects.html`)
5. Statistics
6. Partners
7. Footer (contact lives here)

Own pages:

`about.html`, `research.html`, `projects.html`, `project.html`,
`open-calls.html`, `workshops.html`, `404.html`

---

# 1. Navbar

Purpose

- Global navigation
- Institutional branding
- Main CTA

Built. Injected on every page from
`components/site-chrome/site-chrome.js`, which also marks the current
page in the menu.

- Logo (the official SVG, white variant)
- Navigation Links
- Join CEDIM Button (→ `open-calls.html`)

Future

- Login
- Dashboard
- ~~Language Selector~~ — dropped. The site is English-only by decision,
  for international reach; retrofitting a second language later is
  expensive, so this is a deliberate closed door rather than a pending
  item.

---

# 2. Hero

Purpose

Create an outstanding first impression.

Content

Headline

Subheadline

Primary CTA

Secondary CTA

Background Illustration

Future

Animated background

Research statistics

---

# 3. About CEDIM

Purpose

Explain who we are.

Content

Mission

Vision

History

Achievements

CTA

Learn More

---

# 4. Research Areas

Purpose

Show CEDIM's research fields.

Built as four lines in `research.html`, not the six drafted here:

- Robotics and Automation
- Embedded Systems and Control
- Computer Vision and Applied AI
- Biomechatronics and Rehabilitation

The four merge pairs from the original six (Robotics + Automation,
AI + Computer Vision) and add Biomechatronics, which the draft omitted
despite the centre having projects in it. IoT has no projects yet, so it
is not listed.

**These four are placeholder content and have not been confirmed by
CEDIM.** They also double as the `category` values in
`assets/js/data/projects.js`, so changing them means updating both.

Each Card

- Title
- Short Description
- Tags

No icon and no "Learn More" per card: the section ends with a single
link to the projects page instead.

---

# 5. Featured Projects

Purpose

Highlight current research.

Built from `assets/js/data/projects.js`. All fields below exist, except
the button: the whole card is a link to `project.html?id=…`, which gives
a larger click target and keeps one link per card in the accessibility
tree.

Image

Title

Category

Status

Description

Technologies (the `tags` field)

Future

Filters

Project Search

---

# 6. Open Calls

Purpose

Promote participation.

Built from `assets/js/data/open-calls.js`; every field below exists. The
apply button points at the external form and opens in a new tab. A
closed call shows when it closed instead of a button that leads nowhere.

Title

Category

Deadline

Requirements

Apply Button

Future

Online Application — will stay external (Google / Microsoft Forms)

Notifications

---

# 7. Workshops & Events

Purpose

Show educational activities.

Built from `assets/js/data/workshops.js`; every field below exists. Each
one is omitted individually when empty, so a workshop with no instructor
assigned does not render a half-empty line.

Image — supported, but no photos are in the repo yet

Title

Date

Instructor

Location

Registration Button — opens the external form in a new tab

Future

Calendar Integration

---

# 8. Statistics

Purpose

Show impact.

Built. Figures come from `assets/js/data/stats.js`; the section hides
itself if that file is emptied. Four figures shown:

Active projects, Members, Publications, Awards

**The current numbers are placeholders and are not real.**

Future

Animated Counters

---

# 9. Partners

Purpose

Display institutional credibility.

Built. Comes from `assets/js/data/partners.js`; the section hides itself
if that file is emptied.

Each partner shows its logo, or its name as text when no logo file is
set — which is the case today, since no logos are in the repo yet.
Logos need the white or single-light-colour version to read on the dark
background, and **permission from each institution** before publishing
their mark.

Future

Carousel

---

# 10. Contact

Purpose

Provide communication channels.

Contact is not a section: it lives in the footer, present on every page,
and `#contact` links jump to it.

Content

Email

Location

Social Media

**No contact form.** Forms are external (Google Forms / Microsoft
Forms) — the site has no backend to receive a submission. Where a call
needs an application, its card links straight to the form.

Google Maps (Future)

---

# 11. Footer

Sections

About

Quick Links

Projects

Workshops

Contact

Social Media

Copyright

---

# Global CTAs

Explore Projects

Join CEDIM

View Open Calls

Register for Workshop

Contact Us

---

# Responsive Strategy

One breakpoint at 992 px, not three tiers. The card grids use
`auto-fill minmax(300px, 1fr)`, so tablet already gets two columns and
desktop three or four without a tablet-specific rule.

Desktop (>992 px)

Full layout, full menu

Mobile (≤992 px)

Single column, hamburger menu

See the Breakpoints section of `ui-design-system.md` for why.

---

# Accessibility

Semantic HTML

Keyboard Navigation

ARIA Labels

Visible Focus

WCAG AA

---

# SEO

Semantic Headings ✅

Meta Description ✅ — one per page

Open Graph ✅ — absolute URLs, 1200×630 preview image

Twitter Cards ✅ — `summary_large_image`

Known limit: `project.html` carries generic tags. Social crawlers do not
run JavaScript, so they never see the project that `project-detail.js`
renders, and every shared `?id=` shows the same preview.

Structured Data (Future)

Performance Optimization

---

# Future Integrations

Authentication

Dashboard

Inventory

Project Management

Workshop Registration

AI Assistant

RAG Search

Analytics

Notifications

Mobile App

---

# Success Metrics

- Increased membership applications
- Higher workshop registrations
- More project visibility
- Improved institutional presence
- Better engagement

---

# MVP Scope

Included — all shipped:

- Navbar
- Hero
- About
- Research Areas
- Featured Projects
- Open Calls
- Footer

Also shipped beyond the original MVP: Workshops, project detail pages,
Statistics, Partners, a 404 page, and social preview tags.

Remaining before this can be called finished: **the content is
placeholder.** Projects, calls, workshops, research lines, mission,
vision and figures are all invented and currently live. Replacing them
is the open task, not any missing feature.

Deferred

- Authentication
- Dashboard
- Inventory
- AI Features
- Admin Panel — see `CLAUDE.md`; a CMS was costed and deferred
- Analytics

---

# Design References

- OpenAI
- GitHub
- Vercel
- Linear
- NVIDIA
- Apple

---

# Development Order

All thirteen steps are done, though not in this order — the footer and
the data layer came before Buttons and Cards, and the multi-page split
happened after the landing was already assembled.

1. Navbar
2. Hero
3. Buttons
4. Section Layout
5. Cards
6. About
7. Research Areas
8. Projects
9. Open Calls
10. Footer
11. Landing Assembly
12. Optimization
13. Deployment
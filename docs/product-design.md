# Product Design Document
## CEDIM Digital Platform

**Version:** 1.0 (Draft)

**Project Name**
CEDIM Digital Platform

**Organization**
Centro de Desarrollo e Investigación en Mecatrónica (CEDIM)
Universidad Nacional de Ingeniería (UNI)

---

# 1. Vision

The CEDIM Digital Platform aims to become the central digital ecosystem for the
Centro de Desarrollo e Investigación en Mecatrónica.

Rather than being a traditional institutional website, it will be a platform that
connects students, researchers, professors and administrators through a modern,
intuitive and scalable interface.

The platform will initially provide institutional information and gradually evolve
into a complete management system for research projects, events, inventory,
documentation and collaboration.

---

# 2. Mission

Create a digital platform that encourages innovation, collaboration and research,
allowing members of CEDIM to organize projects efficiently while providing the
public with an attractive window into the center's activities.

---

# 3. Long-Term Goals

- Increase visibility of CEDIM.
- Facilitate student participation.
- Improve project management.
- Digitize administrative processes.
- Centralize institutional information.
- Reduce manual work.
- Build a scalable platform for future growth.

---

# 4. Design Philosophy

The platform follows these principles:

## Simplicity

Only essential information should appear.

Users must immediately understand what CEDIM does.

---

## Technology First

The website should look like a modern technology company rather than a traditional
university website.

Inspirations:

- Vercel
- Linear
- OpenAI
- NVIDIA Research

---

## Scalability

Every component should be reusable.

Every module should be independent.

The platform should grow without requiring redesign.

---

## Accessibility

Responsive design.

Keyboard navigation.

Accessible colors.

Semantic HTML.

---

## Performance

Minimal dependencies.

Optimized images.

Fast loading.

Clean code.

---

# 5. Target Users

## Visitor

Can:

- Learn about CEDIM
- Browse projects
- View workshops
- View public announcements

Cannot:

- Access internal information

---

## Student

Can:

- Participate in calls
- Register for workshops
- Explore research areas

Both actions happen through external Google Forms / Microsoft Forms
linked from each card. The site never collects data itself, so these need
no account and no backend.

---

## Member

Can:

- Access dashboard
- View internal projects
- Download documentation
- Manage assigned tasks

---

## Project Coordinator

Can:

- Manage schedules
- Upload documents
- Manage team members
- Monitor project progress

---

## Administrator

Full platform access.

---

# 6. Platform Architecture

PUBLIC (built)

- Home
- About
- Research
- Projects (listing + detail page per project)
- Open Calls
- Workshops
- Contact (in the footer)

"Announcements" ships as "Open Calls"; "Research Areas" as "Research".
The site uses the shorter names throughout. News was dropped.

PRIVATE

- Dashboard
- Inventory
- Project Management
- Documentation
- Finance
- Administration

---

# 7. Public Website

## Landing Page

Purpose:

Present CEDIM in less than 30 seconds.

The site became multi-page: Research, Projects, Open Calls and Workshops
each have their own page, and the landing carries only a summary.

Landing sections:

1. Hero
2. About (summary → `about.html`)
3. Featured Projects (first 3 → `projects.html`)
4. Statistics
5. Partners
6. Footer (contact lives here, on every page)

News was never built and is not planned: it needs someone to keep it
current every week, and nobody is assigned to that.

---

# 8. Private Platform

Modules:

Dashboard

Inventory

Projects

Schedules

Budgets

Meeting Minutes

Documents

Equipment Reservation

Members

Administration

---

# 9. Future Features

Authentication

Notifications

Email integration

Google Calendar integration

Equipment reservations

QR inventory

Document versioning

Research repository

Project Kanban

Internal messaging

Analytics dashboard

AI assistant

Knowledge base

Digital signatures

---

# 10. Visual Identity

Style

Minimalistic

Professional

Technology-oriented

Dark Theme

Modern

Elegant

---

## Color Palette

Primary Background

#0B1120

Secondary Background

#111827

Accent

#38BDF8

Primary Text

#F8FAFC

Secondary Text

#94A3B8

Success

#22C55E

Warning

#F59E0B

Error

#EF4444

---

## Typography

Primary

Inter

Fallback

system-ui

---

# 11. Technical Stack

Frontend

HTML5

CSS3

JavaScript ES6+

Future

TypeScript

---

Backend (Future)

FastAPI

Python

---

Database

PostgreSQL

---

Authentication

OAuth2

JWT

---

Hosting

Current

GitHub Pages

Future

Docker

Nginx

Cloud VPS

---

Version Control

Git

GitHub

---

# 12. Repository Structure

cedim-web/

index.html, about.html, research.html, projects.html,
project.html, open-calls.html, workshops.html, 404.html
(todas las páginas viven en la raíz)

assets/

css/

js/data/

img/

icons/

fonts/

components/

docs/

README.md

CLAUDE.md

---

# 13. Git Workflow

main

Production — GitHub Pages serves from here

develop

Integration — day-to-day work happens here

feature/*

New functionality. Short-lived, merged into `develop` and deleted.

In practice only `main` and `develop` are in use; `bugfix/*` and
`hotfix/*` were drafted but never needed at this size.

---

# 14. Development Workflow

Research

↓

Design

↓

Architecture

↓

Implementation

↓

Testing

↓

Review

↓

Merge into develop

↓

Merge into main

↓

Deploy

---

# 15. Roadmap

Phase 1

Infrastructure

Completed

---

Phase 2

Landing Page

Completed

---

Phase 3

Dynamic Content

Completed — projects, open calls, workshops, statistics and partners all
render from data files in `assets/js/data/`. Publishing content is a file
edit on github.com, no code change.

Remaining in this phase: the published content is still placeholder.

---

Phase 4

Authentication

Planned

---

Phase 5

Project Management

Planned

---

Phase 6

Inventory

Planned

---

Phase 7

AI Integration

Future

---

# 16. Success Metrics

Website loading time

< 2 seconds

Accessibility

WCAG AA

Responsive

100%

Performance

90+ Lighthouse

Maintainability

High

Scalability

High

---

# 17. Future Vision

The CEDIM Digital Platform should become the digital hub for every activity
performed by the research center.

Students should feel inspired to participate.

Researchers should manage projects efficiently.

Administrators should automate repetitive tasks.

The platform should represent the technological excellence of CEDIM and the
Universidad Nacional de Ingeniería.
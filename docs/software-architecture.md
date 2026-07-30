# Software Architecture Document
## CEDIM Digital Platform

**Version:** 1.0 (Draft)

---

# 1. Purpose

This document describes the software architecture of the CEDIM Digital Platform.

Its objective is to provide a technical reference for current and future developers, ensuring that the platform remains modular, scalable, maintainable, and easy to evolve.

---

# 2. Architecture Principles

The platform follows the following engineering principles.

## Modularity

Every module should be independent.

A change in one module should not require changes in another.

---

## Separation of Concerns

Each layer has a single responsibility.

Presentation

↓

Business Logic

↓

Data

---

## Scalability

The platform must support future modules without requiring a complete redesign.

---

## Reusability

Reusable components should always be preferred over duplicated code.

---

## Maintainability

The project should remain understandable after several years.

---

## Security

Security must be considered from the beginning rather than added later.

---

# 3. High-Level Architecture

```text
                        Internet
                            │
                            ▼
                  GitHub Pages (Current)
                            │
                            ▼
─────────────────────────────────────────────────────────
                    Frontend Layer
─────────────────────────────────────────────────────────

HTML

CSS

JavaScript

Future:
TypeScript

↓

REST API

↓

─────────────────────────────────────────────────────────
                    Backend Layer
─────────────────────────────────────────────────────────

FastAPI

Python

Authentication

Business Logic

↓

─────────────────────────────────────────────────────────
                    Data Layer
─────────────────────────────────────────────────────────

PostgreSQL

Files

Images

Documents

Backups
```

---

# 4. Current Architecture

Current Version

Static Website

```text
Browser
    │
    ▼
GitHub Pages
    │
    ▼
HTML
CSS
JavaScript
```

No backend.

No database.

No authentication.

---

# 5. Future Architecture

```text
Browser

↓

Frontend

↓

FastAPI

↓

Business Services

↓

Database

↓

PostgreSQL
```

---

# 6. Frontend Architecture

Structure

```text
Frontend

├── *.html            Pages, all at the repo root
├── components/       One folder per component (.css + .js)
└── assets/
    ├── css/          variables → layout → components → utilities
    ├── js/data/      Editable content
    └── img/
```

There is no `Pages` folder — pages sit at the root. `Utilities` is a
stylesheet (`assets/css/utilities.css`), not a folder.

Responsibilities

- User Interface
- Navigation
- Rendering content from the data files
- Responsive Design

**No API requests, by design.** Content is loaded as plain `<script>`
data files rather than fetched, because `fetch()` of a local JSON is
blocked by CORS under `file://` — which would leave every list empty
whenever a page is opened directly instead of served. There is no
validation either: the site has no forms (they are external).

---

# 7. Backend Architecture (Future)

FastAPI will expose REST endpoints.

Responsibilities

- Authentication

- Authorization

- Business Logic

- Validation

- Database Access

- File Management

- Notifications

---

# 8. Database Architecture

Future database:

PostgreSQL

Main entities:

Users

Projects

Announcements

Workshops

Inventory

Equipment

Budgets

Schedules

Documents

Reservations

---

# 9. Module Architecture

The system is divided into independent modules.

```text
Platform

├── Public Website
│
├── Authentication
│
├── Dashboard
│
├── Projects
│
├── Workshops
│
├── Announcements
│
├── Inventory
│
├── Documents
│
├── Administration
│
└── API
```

Each module should contain:

Views

Logic

Models

Assets

Documentation

---

# 10. Layer Responsibilities

Presentation Layer

Responsible for:

Rendering

Interaction

Responsive behavior

Accessibility

---

Business Layer

Responsible for:

Business rules

Validation

Calculations

Permissions

Notifications

---

Data Layer

Responsible for:

Persistence

Queries

Transactions

Backups

---

# 11. Security Architecture

Authentication

OAuth2

JWT

HTTPS

Password hashing

CSRF protection

Input validation

Role-based authorization

Audit logs

---

# 12. Repository Structure

```text
cedim-web/

index.html            Home
about.html            About the centre
research.html         Research lines
projects.html         Project listing
project.html          Project detail (?id=)
open-calls.html       Open calls
workshops.html        Workshops
404.html              Not found

assets/
    css/              Single entry point: styles.css
    js/data/          Editable content (projects, open-calls, workshops)
    img/              Illustrations, logos, social preview
    icons/
    fonts/

components/           One folder per component (.css, .js, .html reference)

docs/

README.md
CLAUDE.md
```

Note: every page sits at the repo root on purpose, so asset paths are
identical from all of them. The `pages/` subfolder in earlier drafts of
this document was tried and removed — nesting the project detail page
one level down caused a run of broken `../` references.

Future:

```text
backend/

app/

api/

services/

models/

schemas/

database/

tests/

requirements.txt
```

---

# 13. Deployment Strategy

Current

GitHub Pages

↓

Future

Docker

↓

Nginx

↓

FastAPI

↓

PostgreSQL

---

# 14. Development Workflow

Feature Branch

↓

Develop

↓

Testing

↓

Main

↓

Deployment

---

# 15. Coding Standards

Semantic HTML

Modern CSS

ES6+

PEP8 (Python)

Type hints

Meaningful commits

Documentation-first

Pull requests are not in use: the flow is commit on `develop`, then merge
into `main`. Worth adopting if more people start contributing at once.

---

# 16. Error Handling

Frontend

User-friendly messages

Graceful degradation — implemented. Every renderer guards its data file
with `typeof … === "undefined"`, so a syntax error introduced while
hand-editing content degrades that section to an empty state instead of
taking the page down. Missing fields are tolerated the same way.

Backend

Structured exceptions

HTTP status codes

Centralized logging

---

# 17. Logging

Future logging:

Application logs

API logs

Authentication logs

Audit logs

---

# 18. Monitoring

Future:

Health checks

Performance metrics

Database monitoring

API monitoring

---

# 19. Future Integrations

Google Calendar

Google Drive

Microsoft Teams

Email

QR Codes

AI Assistant

IoT Devices

GitHub API

---

# 20. Long-Term Vision

The architecture should allow the platform to evolve from a static website into a complete digital ecosystem for the Centro de Desarrollo e Investigación en Mecatrónica.

The architecture should prioritize simplicity, scalability, maintainability, and long-term sustainability.
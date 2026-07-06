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

├── HTML
├── CSS
├── JavaScript
│
├── Components
├── Pages
├── Assets
└── Utilities
```

Responsibilities

- User Interface
- Navigation
- Validation
- API Requests
- Responsive Design

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

assets/
    css/
    js/
    img/
    icons/
    fonts/

pages/

docs/

README.md

index.html
```

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

Small pull requests

Documentation-first

---

# 16. Error Handling

Frontend

User-friendly messages

Graceful degradation

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
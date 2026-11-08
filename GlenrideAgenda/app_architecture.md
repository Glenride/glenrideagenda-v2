# Agenda Clone - Application Architecture

## Overview

A time-centric note-taking application built with Laravel + Inertia.js + React, replicating the core functionality of the Agenda app.

## Technology Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **Database**: SQLite (configurable to MySQL/PostgreSQL)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix primitives)
- **Rich Text Editor**: TipTap
- **Authentication**: Laravel Fortify with 2FA support

## Data Model

### Categories

Top-level organizational groups for projects.

```
categories
├── id (bigint, primary key)
├── user_id (bigint, foreign key → users)
├── name (string)
├── created_at (timestamp)
├── updated_at (timestamp)
└── deleted_at (timestamp, nullable - soft deletes)
```

### Projects

Containers for notes, nested within categories.

```
projects
├── id (bigint, primary key)
├── user_id (bigint, foreign key → users)
├── category_id (bigint, foreign key → categories)
├── name (string)
├── created_at (timestamp)
├── updated_at (timestamp)
└── deleted_at (timestamp, nullable - soft deletes)
```

### Notes

The core content entity with time-linking capabilities.

```
notes
├── id (bigint, primary key)
├── user_id (bigint, foreign key → users)
├── project_id (bigint, foreign key → projects)
├── title (string)
├── content (longtext, nullable - HTML from TipTap)
├── is_on_agenda (boolean, default: false)
├── linked_date (date, nullable)
├── created_at (timestamp)
├── updated_at (timestamp)
└── deleted_at (timestamp, nullable - soft deletes)
```

## API Endpoints

All endpoints require authentication via session cookies.

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories with projects |
| POST | `/api/categories` | Create a category |
| PUT | `/api/categories/{id}` | Update a category |
| DELETE | `/api/categories/{id}` | Soft delete a category |
| POST | `/api/categories/{id}/restore` | Restore a deleted category |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/{id}` | Update a project |
| DELETE | `/api/projects/{id}` | Soft delete a project |
| POST | `/api/projects/{id}/restore` | Restore a deleted project |

### Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | List notes (supports filters) |
| GET | `/api/notes/{id}` | Get a single note |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/{id}` | Update a note |
| DELETE | `/api/notes/{id}` | Soft delete a note |
| POST | `/api/notes/{id}/restore` | Restore a deleted note |
| POST | `/api/notes/{id}/toggle-agenda` | Toggle "On the Agenda" status |

#### Note Filters

- `?project_id={id}` - Filter by project
- `?on_agenda=true` - Filter notes marked "On the Agenda"
- `?today=true` - Filter notes linked to today's date

## Frontend Architecture

### Three-Pane Layout

1. **Sidebar (AgendaSidebar)**: Categories, projects, and overview filters
2. **Note List (NoteList)**: Filtered list of notes
3. **Editor (NoteEditor)**: Rich text editing with TipTap

### State Management

- Server state via Inertia.js page props (initial load)
- Client-side API calls for CRUD operations
- Local React state for UI interactions

### Key Features

- **"On the Agenda" Filter**: Cross-project priority view
- **"Today" Filter**: Notes linked to current date
- **Rich Text Editing**: Full formatting via TipTap
- **Date Linking**: Connect notes to specific dates
- **Soft Deletes**: Trash/restore functionality

## Security

- Session-based authentication
- CSRF protection on all API endpoints
- Policy-based authorization (users can only access their own data)
- Cascade deletes (deleting a category removes all its projects and notes)

## File Structure

```
app/
├── Http/Controllers/
│   ├── CategoryController.php
│   ├── NoteController.php
│   └── ProjectController.php
├── Models/
│   ├── Category.php
│   ├── Note.php
│   ├── Project.php
│   └── User.php
└── Policies/
    ├── CategoryPolicy.php
    ├── NotePolicy.php
    └── ProjectPolicy.php

resources/js/
├── components/agenda/
│   ├── agenda.tsx
│   ├── agenda-sidebar.tsx
│   ├── note-editor.tsx
│   ├── note-list.tsx
│   └── tiptap-editor.tsx
├── pages/
│   └── dashboard.tsx
└── types/
    └── index.d.ts
```

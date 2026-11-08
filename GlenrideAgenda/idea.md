Product Requirements Document (PRD): Agenda Clone

Document Version: 1.0
Date: December 3, 2025
Product Name: Project Agenda Clone (Internal Codename)
Goal: To create a modern, full-stack, real-time note-taking application that integrates project organization with calendar-centric data management, replicating the core functionality of the Agenda app.

1. Goals and Objectives

The primary objective is to build a robust, minimum viable product (MVP) that demonstrates the unique time-centric note-taking workflow of the original Agenda app.

Primary Goal: Successfully implement the three-pane layout (Sidebar, Note List, Editor) with real-time syncing using Firestore.

Key Differentiator: Ensure the "On the Agenda" filter works effectively as a cross-project priority view.

2. Target Audience

Professionals: Individuals who need to organize project-based notes and link them directly to upcoming meetings or deadlines.

Students/Academics: Users who require a structured way to manage course notes, research projects, and due dates.

Creative Professionals: Anyone needing a "breadcrumb trail" of notes related to ongoing creative projects.

3. Product Scope and Features (MVP)

3.1. Core Navigation and Organization (Sidebar)

ID

Feature

Description

Status

N-101

User Authentication

Secure sign-in/anonymous access via Canvas environment tokens (__initial_auth_token).

Implemented (Auth Logic)

N-102

Categories

Ability for users to create, name, and sort top-level organizational groups (e.g., "Work").

To Implement (CRUD UI)

N-103

Projects

Ability to create, name, and sort project containers within a parent category.

To Implement (CRUD UI)

N-104

Project Selection

Selecting a project updates the Main List to show only notes belonging to that project.

Implemented (State Logic)

3.2. Note Management (Main List)

ID

Feature

Description

Status

N-201

Note Creation

Button to create a new note within the currently selected project with a default title/content.

Implemented (Handler)

N-202

Note Listing

Display notes associated with the selected project, sorted by createdAt (newest first).

Implemented (Data Fetching/Filtering)

N-203

Note Selection

Clicking a note displays its full details in the Editor Panel.

Implemented (Handler)

3.3. Content Editor (Editor Panel)

ID

Feature

Description

Status

N-301

Title/Content Editing

Implement a simple text area for updating the title and content fields of the selected note in real-time.

To Implement (UI/Update Handler)

N-302

"On the Agenda" Toggle

Button to set or unset the note's isOnAgenda boolean flag.

Implemented (Handler)

N-303

Date Linking

UI element (e.g., a date picker) to link the note to a specific date (linkedDate timestamp).

To Implement (UI/Update Handler)

3.4. Time-Centric Filters

ID

Feature

Description

Status

N-401

"On the Agenda" Filter

Clicking the "On the Agenda" overview filter displays all notes across all projects where isOnAgenda: true.

To Implement (Filter Logic in UI)

N-402

"Today" Filter

Clicking the "Today" filter displays all notes where linkedDate matches the current system date.

To Implement (Filter Logic in UI)

4. Technical Specifications

4.1. Technology Stack

Backend Framework: Laravel (for backend structure, API, and potential future routing)

Frontend Library: React (Single-Page Application)

Styling: Tailwind CSS (for rapid, responsive UI development)

Database: Google Cloud Firestore (for real-time, persistent data storage)

4.2. Data Model

The application adheres to the data model defined in app_architecture.md, utilizing the categories, projects, and notes collections, secured under the private user path (artifacts/{__app_id}/users/{userId}/...).

5. Success Metrics

Success for the MVP will be measured by the following metrics:

Feature Completion: 100% of the features listed in Section 3 are implemented and functional.

Real-Time Sync: Data updates (e.g., toggling "On the Agenda") must be reflected in the UI within 2 seconds.

Authentication: Successful and silent authentication upon application load.

Data Integrity: Categories, Projects, and Notes are correctly separated and displayed according to the Firestore structure.

# ZestLearn Structured Build Plan

## Purpose

This document explains how to build the ZestLearn MVP as a single implementer while using Codex for planning and Cursor for implementation.

Even though the filename remains `structuring_per_coder.md`, this document now assumes:

- one person is coding,
- work is done sequentially,
- there is no split ownership between multiple coders,
- there is no parallel multi-branch collaboration model.

It is based on:

- `zestlearn_cursor_implementation_plan.md`
- `zestlearn_hackathon_build_checklist.md`
- `zestlearn_system_architecture_and_api_contract.md`
- `CURRENT_PLAN.md`
- `IMPLEMENTATION_STATUS.md`
- `DECISIONS.md`
- `NEXT_TASK.md`

---

## Core Principle

Build the MVP in one clear sequence:

1. create the full base scaffold first,
2. freeze the structure,
3. implement one milestone at a time,
4. keep the repo stable after each completed slice.

Do not simulate team-based ownership when only one person is coding.

---

## Working Model

Use this division of labor:

- **Codex:** planning, architecture guidance, reviews, handoffs, next-task definition
- **Cursor:** implementation, file creation, UI work, backend work, iteration

Use the repo files as the shared memory between them:

- `CURRENT_PLAN.md`
- `IMPLEMENTATION_STATUS.md`
- `DECISIONS.md`
- `NEXT_TASK.md`

---

## Before You Start

Read these first:

1. `zestlearn_index.md`
2. `CURRENT_PLAN.md`
3. `IMPLEMENTATION_STATUS.md`
4. `DECISIONS.md`
5. `NEXT_TASK.md`
6. `zestlearn_system_architecture_and_api_contract.md`
7. `zestlearn_cursor_implementation_plan.md`

Freeze these before implementing milestone features:

- route names
- folder structure
- core type names
- Convex table names
- API contract names

---

## Required Setup

Use one local working copy and one active task at a time.

Recommended setup:

```bash
git clone <repo-url>
cd Zestlearn_mvp_cursor
git checkout main
git pull origin main
npm install
```

If using pnpm instead, use pnpm consistently for the whole project.

Make sure you also have:

- the correct Node version
- `.env.local` configured
- access to Convex
- access to Gemini keys

---

## Git Workflow

Because only one person is coding, keep git simple.

### Recommended model

- `main`
  - your stable working branch
- one short-lived task branch at a time
  - optional, but recommended for clean commits and rollback safety

Do not maintain multiple active implementation branches in parallel.

---

## Branch Naming Convention

Use names like:

- `codex/m1-assessment-flow`
- `codex/m2-workspace-shell`
- `codex/m3-document-upload`
- `codex/m4-chat`
- `codex/m5-report-generation`
- `codex/m6-memory-polish`

Only one of these should be active at a time.

---

## Step-By-Step Git Setup

## Step 1: Start from `main`

```bash
git checkout main
git pull origin main
```

---

## Step 2: Create one task branch

Example:

```bash
git checkout -b codex/m1-assessment-flow
```

This branch should represent one bounded milestone or one clear implementation slice.

---

## Step 3: Implement the task

Before coding:

1. read `CURRENT_PLAN.md`
2. read `IMPLEMENTATION_STATUS.md`
3. read `DECISIONS.md`
4. read `NEXT_TASK.md`

Then implement only the active task.

---

## Step 4: Commit frequently

Use small, descriptive commits:

```bash
git add .
git commit -m "Wire assessment form to Convex workspace creation"
```

---

## Step 5: Verify before merging back

Run the relevant checks:

```bash
npm run lint
npm run build
```

If that is too heavy for every slice, at least run the most relevant local validation and a manual smoke test.

---

## Step 6: Merge back to `main`

Once the slice is stable:

```bash
git checkout main
git pull origin main
git merge --no-ff codex/m1-assessment-flow
git push origin main
```

Then delete the completed task branch:

```bash
git branch -d codex/m1-assessment-flow
```

If pushed remotely:

```bash
git push origin --delete codex/m1-assessment-flow
```

---

## Step 7: Start the next task branch

```bash
git checkout main
git pull origin main
git checkout -b codex/m2-next-task
```

Repeat the same loop.

---

## Shared Memory Workflow

At the start of each session:

1. pull latest `main`
2. read the four shared memory files
3. inspect the current code state
4. confirm the active task

At the end of each session:

1. update `IMPLEMENTATION_STATUS.md`
2. update `NEXT_TASK.md` if the next slice is clear
3. update `DECISIONS.md` only if an architectural decision changed
4. commit the documentation updates with the implementation work

Recommended ownership:

- Codex updates `CURRENT_PLAN.md` and proposes `NEXT_TASK.md`
- Cursor implements the task
- after implementation, shared memory files are refreshed to match reality

---

## Timeboxed Implementation Plan

This follows the existing 24-hour implementation plan, but for one implementer working sequentially.

## Hours 0-2: Base Scaffold and Contract Freeze

### Goal

Create the full base folder structure and placeholder files before feature work begins.

### Tasks

- create Next.js app scaffold
- configure TypeScript and Tailwind
- create app route skeleton
- create `components/`, `convex/`, `lib/`, `types/`, `hooks/`, `n8n/`
- create placeholder starter files
- freeze routes, schema names, and API contracts

### Done When

- base scaffold exists
- route structure exists
- folder structure matches architecture
- starter files compile cleanly

---

## Hours 2-5: Landing and Assessment Flow

### Goal

Complete the assessment-to-workspace creation flow.

### Tasks

- build landing page
- build assessment form UI
- add client-side validation
- wire form submission to Convex
- create workspace and assessment records
- redirect to `/workspace/[workspaceId]`

### Done When

- form validates
- submit works
- redirect works
- backend records exist

---

## Hours 5-8: Workspace Shell

### Goal

Render a real workspace backed by stored data.

### Tasks

- build workspace shell
- build overview panel
- add documents/chat/reports/insights placeholders
- wire overview to real dashboard query

### Done When

- workspace loads
- overview reflects stored company and assessment data

---

## Hours 8-12: Document Upload and Summarization

### Goal

Allow one file upload and one processed summary.

### Tasks

- build upload dropzone
- build document cards and status badge
- implement upload route
- implement document record creation
- implement extraction and summarization helpers
- store summary and tags

### Done When

- one supported file uploads
- processing state changes
- summary displays in workspace

---

## Hours 12-16: Consultant Chat

### Goal

Support one contextual question-answer flow.

### Tasks

- build chat UI
- store messages in Convex
- build chat context assembly
- call Gemini
- store and display assistant response

### Done When

- user can send a message
- assistant responds
- response uses workspace context

---

## Hours 16-20: Report Generation

### Goal

Generate and render the core opportunity report.

### Tasks

- build report route
- build report generation helper
- validate structured report output
- render report UI
- store report in Convex

### Done When

- report generates from real context
- report is stored
- report renders clearly

---

## Hours 20-22: Memory Layer

### Goal

Show the reusable insight layer.

### Tasks

- extract insights from report
- save memory patterns
- retrieve memory patterns
- render insights panel
- seed demo patterns if needed

### Done When

- at least one insight appears
- insight feels relevant

---

## Hours 22-24: Polish and Demo Prep

### Goal

Make the MVP demo-ready.

### Tasks

- polish loading states
- polish empty and error states
- fix layout and UX issues
- run final smoke tests
- verify the end-to-end flow

### Final Success Condition

The MVP is ready when a user can go from:

`assessment -> workspace -> upload -> chat -> report -> insight`

without a broken step in the main happy path.

---

## Suggested Commit Style

Use descriptive commits:

- `Scaffold app routes and shared component folders`
- `Wire assessment flow to Convex`
- `Build workspace overview with live query`
- `Implement document upload pipeline`
- `Add consultant chat with Gemini context`
- `Implement structured report generation`

Avoid vague commits like:

- `updates`
- `fix stuff`
- `more changes`

---

## Final Recommended Operating Model

Use this exact model:

- one coder implementing sequentially
- Codex for planning and task shaping
- Cursor for execution
- one active task branch at a time
- shared memory files updated after each real milestone

That is the cleanest setup for the current ZestLearn workflow.

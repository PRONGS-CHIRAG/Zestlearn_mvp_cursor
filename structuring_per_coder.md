# ZestLearn Two-Coder Parallel Build Plan

## Purpose

This document explains how two people can build the ZestLearn MVP asynchronously in parallel and combine their work safely.

It is based on the existing ZestLearn MVP planning documents, especially:

- `zestlearn_cursor_implementation_plan.md`
- `zestlearn_hackathon_build_checklist.md`
- `zestlearn_system_architecture_and_api_contract.md`
- `CURRENT_PLAN.md`
- `IMPLEMENTATION_STATUS.md`
- `DECISIONS.md`
- `NEXT_TASK.md`

The goal is to let both coders move fast without constantly blocking each other or creating merge chaos.

---

## Core Principle

Do not split work randomly by feature ideas.
Split work by ownership boundaries that minimize file overlap.

For ZestLearn, the cleanest split is:

- **Coder A:** frontend, page composition, UI components, user flows
- **Coder B:** backend, Convex, API routes, AI logic, document/report/memory pipelines

This maps well to the documented architecture and reduces collisions.

---

## Recommended Roles

## Coder A: Frontend / UX Owner

Primary ownership:

- `app/page.tsx`
- `app/assessment/page.tsx`
- `app/workspace/[workspaceId]/page.tsx`
- `app/workspace/[workspaceId]/report/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/**`
- `hooks/**`
- presentation-only utility code

Primary responsibility:

- landing page
- assessment UI
- workspace shell
- document UI
- chat UI
- report UI
- insights UI
- loading / empty / error states

---

## Coder B: Backend / AI / Data Owner

Primary ownership:

- `convex/**`
- `app/api/**`
- `lib/**`
- `types/**`
- storage / parsing / validation helpers

Primary responsibility:

- Convex schema
- queries / mutations / actions
- assessment submission backend
- workspace dashboard data contract
- document upload and summarization pipeline
- chat backend
- report generation
- memory extraction and retrieval
- event logging / webhooks

---

## Shared Ownership Rules

These areas are sensitive and should not be edited casually by both people at the same time:

- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `next.config.ts`
- `.env.example` or env docs
- root-level planning files

Recommended rule:

- **Coder A** is the integration owner for repo-level docs and shared planning files.
- **Coder B** proposes changes to those files through handoff notes or PR comments unless a change is necessary for backend setup.

This reduces avoidable conflicts.

---

## Before You Start

Both coders should do this first:

1. Read:
   - `zestlearn_index.md`
   - `CURRENT_PLAN.md`
   - `IMPLEMENTATION_STATUS.md`
   - `DECISIONS.md`
   - `NEXT_TASK.md`
2. Read the architecture and implementation docs:
   - `zestlearn_system_architecture_and_api_contract.md`
   - `zestlearn_cursor_implementation_plan.md`
3. Agree on:
   - package manager
   - Node version
   - branch naming
   - who is integration owner
   - exact ownership split
4. Freeze these before coding:
   - route names
   - folder structure
   - core type names
   - Convex table names
   - API contract names

Do not start parallel coding until those are agreed.

---

## Required Setup

Both coders should have:

- the same repo clone
- the same Node version
- the same package manager
- the same environment variable template
- access to the same Convex project and model keys

Recommended local setup:

```bash
git clone <repo-url>
cd Zestlearn_mvp_cursor
git checkout main
git pull origin main
```

If using npm:

```bash
npm install
```

If using pnpm instead, both coders must use pnpm consistently.

---

## Git Branching Model

Use three branch levels:

1. `main`
2. one shared integration branch
3. short-lived coder feature branches

### Branch Purpose

- `main`
  - stable only
  - demoable milestones only
- `codex/integration-mvp`
  - combined latest work from both coders
  - integration and checkpoint testing happens here
- feature branches
  - one scoped task branch per coder
  - merge into integration, not directly into `main`

---

## Branch Naming Convention

Use names like:

- `codex/integration-mvp`
- `codex/a-foundation-ui`
- `codex/b-foundation-backend`
- `codex/a-assessment-workspace-ui`
- `codex/b-convex-assessment-dashboard`
- `codex/a-documents-chat-ui`
- `codex/b-documents-chat-pipeline`
- `codex/a-report-insights-ui`
- `codex/b-report-memory-backend`

Keep branch names task-scoped.
Do not keep one huge long-running branch per coder for the whole project.

---

## Step-By-Step Git Setup

## Step 1: Create the shared integration branch

One person, preferably the integration owner, should run:

```bash
git checkout main
git pull origin main
git checkout -b codex/integration-mvp
git push -u origin codex/integration-mvp
```

---

## Step 2: Each coder branches off integration

Coder A:

```bash
git fetch origin
git checkout codex/integration-mvp
git pull origin codex/integration-mvp
git checkout -b codex/a-foundation-ui
```

Coder B:

```bash
git fetch origin
git checkout codex/integration-mvp
git pull origin codex/integration-mvp
git checkout -b codex/b-foundation-backend
```

---

## Step 3: Work only inside your owned files

Coder A should avoid editing backend-owned folders.
Coder B should avoid editing frontend-owned folders.

If a change crosses ownership boundaries:

1. leave a note in `IMPLEMENTATION_STATUS.md`,
2. flag it in the PR,
3. only make the change if it is blocking.

---

## Step 4: Push feature branch and open PR into integration

Example:

```bash
git add .
git commit -m "Add assessment UI skeleton"
git push -u origin codex/a-foundation-ui
```

Open PR:

- base: `codex/integration-mvp`
- compare: your feature branch

Do not PR directly to `main` during active parallel development.

---

## Step 5: Sync before merging

Before merging your feature branch:

```bash
git fetch origin
git checkout codex/a-foundation-ui
git rebase origin/codex/integration-mvp
```

Or for Coder B:

```bash
git fetch origin
git checkout codex/b-foundation-backend
git rebase origin/codex/integration-mvp
```

Then run the relevant local checks.

---

## Step 6: Merge into integration

After checks pass and conflicts are resolved:

- squash merge into `codex/integration-mvp`, or
- use a normal merge if commit history is intentionally meaningful

Recommended for MVP speed:

- squash merge feature branches into integration

---

## Step 7: Refresh local state after teammate merge

After the other coder merges:

```bash
git fetch origin
git checkout codex/integration-mvp
git pull origin codex/integration-mvp
```

Then create your next short-lived branch from updated integration:

```bash
git checkout -b codex/a-next-task
```

or

```bash
git checkout -b codex/b-next-task
```

---

## Step 8: Merge integration to main only at stable checkpoints

When a checkpoint is stable:

1. create a PR from `codex/integration-mvp` to `main`
2. run final smoke checks
3. merge only when the current milestone is working end-to-end

Do not continuously drip unstable code into `main`.

---

## Asynchronous Working Protocol

Because both coders are working asynchronously, do not rely on chat messages alone.
Use the repo as the shared memory.

### Required shared files

- `CURRENT_PLAN.md`
- `IMPLEMENTATION_STATUS.md`
- `DECISIONS.md`
- `NEXT_TASK.md`

### Daily / session-start protocol

At the start of each session, each coder should:

1. pull latest `codex/integration-mvp`
2. read the four shared files
3. read latest merged diff if needed
4. confirm current owned task
5. start a new short-lived branch

### End-of-session protocol

Before ending a session, each coder should:

1. push branch
2. update `IMPLEMENTATION_STATUS.md`
3. note blockers or contract changes
4. identify the next integration dependency

Recommended rule:

- only the integration owner updates `CURRENT_PLAN.md` and `NEXT_TASK.md`
- both coders can append implementation notes to `IMPLEMENTATION_STATUS.md`
- architectural changes go into `DECISIONS.md`

---

## Timeboxed Parallel Plan

This plan follows the 24-hour implementation structure but adapts it for two coders.

## Hours 0-2: Foundation and Contract Freeze

### Shared Goal

Create enough shared structure that both coders can split cleanly afterward.

### Coder A

- create initial Next.js app scaffold if not already present
- set up route skeleton
- create `app/layout.tsx`, `app/page.tsx`, `app/assessment/page.tsx`
- set up `components/` structure
- set up base visual shell

### Coder B

- set up `convex/` structure
- define schema skeleton
- create `lib/`, `types/`, and `app/api/` folder skeleton
- define initial shared contract types
- document any backend assumptions

### Integration Checkpoint at Hour 2

Must be true:

- route and folder structure are frozen
- table names are frozen
- API operation names are frozen
- ownership split is frozen

Merge both branches into `codex/integration-mvp` before continuing.

---

## Hours 2-5: Landing and Assessment Flow

### Shared Goal

Complete the assessment-to-workspace creation flow.

### Coder A

- build landing page sections
- build assessment form UI
- add client-side validation
- wire submit UX, loading state, and redirect handling

Owned files mainly:

- `app/page.tsx`
- `app/assessment/page.tsx`
- `components/landing/**`
- `components/assessment/**`

### Coder B

- implement Convex schema for workspaces and assessments
- implement workspace creation and assessment submission backend
- implement dashboard data query contract
- create validation helpers and types if needed

Owned files mainly:

- `convex/schema.ts`
- `convex/workspaces.ts`
- `convex/assessments.ts`
- `lib/validation/**`
- `types/**`

### Integration Checkpoint at Hour 5

Must be true:

- assessment payload shape is stable
- submission works end-to-end
- redirect target is confirmed

Merge both branches and smoke test assessment submission.

---

## Hours 5-8: Workspace Shell

### Shared Goal

Create a real workspace page backed by stored data.

### Coder A

- build workspace shell
- build overview, documents, chat, reports, and insights placeholder panels
- render real workspace and assessment summary data

Owned files mainly:

- `app/workspace/[workspaceId]/page.tsx`
- `components/workspace/**`

### Coder B

- finalize workspace dashboard query
- ensure response shape matches UI needs
- add events logging if helpful
- expose stable dashboard data for overview panel

Owned files mainly:

- `convex/workspaces.ts`
- `convex/events.ts`
- `types/workspace.ts`

### Integration Checkpoint at Hour 8

Must be true:

- workspace loads with real data
- overview panel reflects backend state
- panel placeholders are visible for future modules

---

## Hours 8-12: Document Upload and Summarization

### Shared Goal

Allow one document to be uploaded, processed, and displayed.

### Coder A

- build upload dropzone
- build document card
- build processing status badge
- connect documents panel to upload and display states

Owned files mainly:

- `components/documents/**`
- `components/workspace/DocumentsPanel.tsx`

### Coder B

- implement upload route
- implement documents table and backend functions
- implement text extraction helper
- implement summarization helper
- store summary and tags

Owned files mainly:

- `app/api/upload/route.ts`
- `convex/documents.ts`
- `lib/documents/**`
- related `types/document.ts`

### Integration Checkpoint at Hour 12

Must be true:

- user can upload at least one supported file
- processing status changes correctly
- summary appears in workspace

---

## Hours 12-16: Consultant Chat

### Shared Goal

Support one contextual question-answer exchange.

### Coder A

- build chat window
- build chat input
- build chat message UI
- add prompt starters
- connect chat panel to backend request flow

Owned files mainly:

- `components/chat/**`
- `components/workspace/ChatPanel.tsx`

### Coder B

- implement chat API route
- implement chat storage in Convex
- assemble chat context
- implement Gemini provider wrapper
- save assistant response

Owned files mainly:

- `app/api/chat/route.ts`
- `convex/chat.ts`
- `lib/ai/**`
- `types/chat.ts`

### Integration Checkpoint at Hour 16

Must be true:

- user message persists
- assistant response returns
- backend uses assessment/docs context

---

## Hours 16-20: Report Generation

### Shared Goal

Generate and render the main opportunity report.

### Coder A

- build reports panel generate button
- build report page
- build ReportView, UseCaseCard, RoadmapSection, RiskSection
- render structured report cleanly

Owned files mainly:

- `components/report/**`
- `components/workspace/ReportsPanel.tsx`
- `app/workspace/[workspaceId]/report/page.tsx`

### Coder B

- implement report route
- implement report prompt
- implement report generator
- implement parser / validator
- implement markdown renderer
- save report in Convex

Owned files mainly:

- `app/api/report/route.ts`
- `convex/reports.ts`
- `lib/reports/**`
- `lib/ai/prompts/report.ts`
- `lib/ai/parsers/reportParser.ts`
- `types/report.ts`

### Integration Checkpoint at Hour 20

Must be true:

- report generates from real workspace context
- report is stored
- report renders clearly

---

## Hours 20-22: Memory Layer

### Shared Goal

Show the collective memory concept in a visible way.

### Coder A

- build insights panel
- render insight cards
- add polished empty states for no insights yet

Owned files mainly:

- `components/workspace/InsightsPanel.tsx`
- any supporting shared UI states

### Coder B

- implement memory extraction helper
- implement memory storage and retrieval
- seed a few shared patterns
- connect report generation to memory saving

Owned files mainly:

- `convex/memory.ts`
- `lib/memory/**`
- `lib/reports/extractInsights.ts`
- `types/memory.ts`

### Integration Checkpoint at Hour 22

Must be true:

- at least one insight appears after report generation
- insight text feels related to workspace context

---

## Hours 22-24: Polish, Errors, Demo Prep

### Shared Goal

Make the MVP safe to demo.

### Coder A

- polish loading states
- polish empty states
- fix layout issues
- smooth end-to-end UX flow

### Coder B

- harden error handling
- add webhook / logging if time permits
- run scenario smoke tests
- fix backend stability issues

### Final Checkpoint at Hour 24

Must be true:

- landing page works
- assessment works
- workspace works
- one document upload works
- one contextual chat turn works
- one report generates
- one insight appears

Then merge `codex/integration-mvp` into `main`.

---

## Integration Cadence

Do not wait until the end of the day to combine.

Recommended merge cadence:

- Hour 2
- Hour 5
- Hour 8
- Hour 12
- Hour 16
- Hour 20
- Hour 22
- Hour 24

At each checkpoint:

1. both coders push current branches
2. both update `IMPLEMENTATION_STATUS.md`
3. integration owner rebases / merges into `codex/integration-mvp`
4. smoke test current milestone
5. update `CURRENT_PLAN.md` and `NEXT_TASK.md`
6. both coders branch again from latest integration

---

## How To Avoid Merge Conflicts

1. Keep ownership boundaries strict.
2. Keep branches short-lived.
3. Merge at the checkpoint cadence above.
4. Do not let both people modify the same component family casually.
5. Freeze contracts early:
   - route names
   - schema names
   - response types
   - report JSON shape
6. Put contract changes in `DECISIONS.md` before the other coder starts the next slice.

If conflict risk appears, prefer one coder adding a small adapter rather than both rewriting a shared file.

---

## Checks Before Merging to Integration

Each coder should run the relevant checks locally before opening or merging a PR.

Recommended checks:

```bash
npm run lint
npm run build
```

If tests exist later:

```bash
npm test
```

For MVP speed, if full build is too slow, at least run the most relevant check for your slice plus a manual smoke test.

---

## Suggested Commit Style

Keep commits small and descriptive.

Examples:

- `Add landing page hero and CTA flow`
- `Implement workspace and assessment Convex schema`
- `Add upload dropzone and document cards`
- `Implement report parser and markdown renderer`

Avoid giant mixed commits like:

- `work on app`
- `fix stuff`

---

## Handoff Template For Each Coder

At the end of a work block, add a short note to `IMPLEMENTATION_STATUS.md` using this structure:

```md
### Coder A Update

#### Just Completed
- ...

#### Files Changed
- ...

#### What Works
- ...

#### Blocking Dependencies
- ...

#### Next Suggested Integration Point
- ...
```

Coder B should use the same structure.

This makes asynchronous collaboration much easier.

---

## If One Coder Finishes Early

Do not immediately jump into the other coder's ownership area.

Take work from this order:

1. bug fixes in your owned files
2. polish in your owned files
3. test coverage or smoke tests
4. documentation and shared memory updates
5. only then, help in the other area after alignment

This prevents accidental merge churn near the end.

---

## Final Recommended Operating Model

If you want the cleanest two-person setup for this MVP, use this exact model:

- **Coder A:** frontend / UX / composition / states
- **Coder B:** backend / Convex / AI / pipeline logic
- **Shared memory:** repo files, not chat memory
- **Shared branch:** `codex/integration-mvp`
- **Feature branches:** short-lived, task-scoped, branched from integration
- **Merge rhythm:** every major timebox checkpoint
- **Main branch:** stable only

This gives you the best chance of moving fast in parallel while still ending with a codebase that can actually be combined and demoed.

# ZestLearn Next Task

## Purpose

This file is the immediate execution handoff from Codex to Cursor.

There should usually be one active bounded task here.
If multiple tasks are listed, Cursor should complete them in order and stop after the first blocking issue.

---

## Active Task

**Wire the assessment-to-workspace flow end-to-end using Convex (Phase 2)**

---

## Why This Task Next

The shared base scaffold is complete. All routes, schemas, type contracts, and folder structure are in place and TypeScript compiles cleanly. The next bounded task is to connect the existing `AssessmentForm` UI to the real Convex backend so that submitting the form creates a workspace + assessment record and routes the user to the live workspace page backed by stored data. This closes Milestone 1.

---

## Required Inputs

Read these first:

1. `CURRENT_PLAN.md`
2. `IMPLEMENTATION_STATUS.md`
3. `DECISIONS.md`
4. `zestlearn_system_architecture_and_api_contract.md` — section 10.1 (Assessment API Contract) and section 5.1 (Assessment Flow)

---

## Task Scope

### Step 1 — Initialize Convex
```bash
npx convex dev
```
This generates `convex/_generated/` and makes Convex queries/mutations callable from the frontend.

### Step 2 — Wire AssessmentForm submission
- In `components/assessment/AssessmentForm.tsx`, replace the `console.log` placeholder in `handleSubmit` with real Convex calls:
  1. Call `createWorkspace` mutation with company fields
  2. Call `submitAssessment` mutation with bottleneck/outcome fields
  3. On success, `router.push(/workspace/${workspaceId})`

### Step 3 — Add ConvexProvider to layout
- Wrap `app/layout.tsx` children with `<ConvexProvider client={convex}>` using the `NEXT_PUBLIC_CONVEX_URL` env var

### Step 4 — Wire OverviewPanel to real data
- In `components/workspace/OverviewPanel.tsx`, use the `useQuery` hook to call `getWorkspaceDashboardData` and render:
  - company name, type, size, department, role, AI maturity
  - bottleneck and desired outcome from the assessment

### Step 5 — Update WorkspaceShell to pass real data
- Ensure `WorkspaceShell` receives `workspaceId` from route params and passes it down to panels

---

## Guardrails

- do not implement document upload, chat, reports, or memory in this task
- do not change schema names, route names, or type interfaces
- keep route files thin — delegate to components and Convex hooks
- preserve the architecture: AI logic stays out of UI files
- assume a single-implementer workflow while executing this task
- update `IMPLEMENTATION_STATUS.md` when done

---

## Done Definition

This task is done when:

- `npx convex dev` runs without errors
- submitting the assessment form creates a real workspace and assessment in Convex
- the user is routed to `/workspace/[workspaceId]`
- the workspace overview panel renders the stored company and assessment data
- no console errors on the happy path

---

## After Completion

Cursor should update:

- `IMPLEMENTATION_STATUS.md` — mark assessment flow as wired
- `NEXT_TASK.md` — set next task to document upload pipeline (Milestone 2 start)
- `DECISIONS.md` only if Convex initialization forced a real architecture change

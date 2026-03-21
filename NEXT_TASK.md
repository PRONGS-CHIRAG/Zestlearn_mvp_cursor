# ZestLearn Next Task

## Purpose

This file is the immediate execution handoff from Codex to Cursor.

There should usually be one active bounded task here.
If multiple tasks are listed, Cursor should complete them in order and stop after the first blocking issue.

---

## Active Task

**Scaffold the initial ZestLearn app and route structure**

---

## Why This Task Next

The project currently has planning documentation but no confirmed application scaffold.
The fastest way to preserve momentum is to create the implementation foundation that later milestones will build on.

---

## Required Inputs

Read these first:

1. `zestlearn_index.md`
2. `CURRENT_PLAN.md`
3. `IMPLEMENTATION_STATUS.md`
4. `DECISIONS.md`
5. `zestlearn_system_architecture_and_api_contract.md`
6. `zestlearn_cursor_implementation_plan.md`

---

## Task Scope

Create the initial project structure for the ZestLearn MVP:

- Next.js app scaffold
- TypeScript setup
- Tailwind setup
- route skeleton for:
  - `/`
  - `/assessment`
  - `/workspace/[workspaceId]`
  - `/workspace/[workspaceId]/report`
- placeholder shared layout
- placeholder component folders
- placeholder Convex folder structure
- minimal starter pages that compile cleanly

---

## Guardrails

- do not implement chat, upload, reports, or memory logic yet
- do not over-engineer abstractions
- keep route files thin
- preserve the documented architecture
- prefer clean placeholders over half-built features

---

## Done Definition

This task is done when:

- the app structure exists
- the route files exist
- the project compiles
- the folder layout matches the architecture closely enough for the next milestone
- `IMPLEMENTATION_STATUS.md` is updated with what was created

---

## After Completion

Cursor should update:

- `IMPLEMENTATION_STATUS.md`
- `NEXT_TASK.md` with the next bounded task, or leave a clear blocker note
- `DECISIONS.md` only if implementation forced a real architecture change

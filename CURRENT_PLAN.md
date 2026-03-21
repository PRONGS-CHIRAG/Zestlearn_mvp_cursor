# ZestLearn Current Plan

## Purpose

This file is the shared planning memory between Codex and Cursor.

Codex should update this file when planning.
Cursor should read this file before implementing.

If code and plan conflict, the codebase is the source of truth until this file is updated.

---

## Product Loop

The core ZestLearn MVP loop is:

`assessment -> workspace -> document upload -> consultant chat -> report -> memory insight`

If this loop works end-to-end, the MVP works.

---

## Current Milestone

**Milestone 1: Complete the assessment-to-workspace flow end-to-end** ✅ scaffold done — now wiring

The shared base scaffold is complete. Routes, schema, types, and folder structure are all frozen. Milestone 1 now moves into feature implementation: wire the assessment form submission through Convex to create a real workspace, and render stored data on the workspace page.
The working model for implementation is now a single implementer flow with one active slice at a time.

---

## Milestone Goal

A user should be able to:

1. land on the ZestLearn homepage,
2. click the CTA,
3. complete the assessment,
4. submit the form,
5. create a workspace,
6. arrive at a workspace screen backed by stored data.

---

## Scope For This Milestone

### In Scope

- Next.js app scaffold ✅ done
- TypeScript and Tailwind setup ✅ done
- initial route structure ✅ done
- Convex schema for workspaces and assessments ✅ done
- landing page ✅ component shells done, needs real UI polish
- assessment page ✅ component shells done
- assessment form validation ✅ client-side validation implemented
- workspace creation flow — wire `AssessmentForm` submit to Convex mutations
- workspace page shell with overview data — wire `OverviewPanel` to Convex query

### Out of Scope

- document processing
- chat implementation
- report generation
- memory extraction logic
- n8n workflows
- fallback model support

---

## Acceptance Criteria

- app boots locally without route errors
- `/` renders a usable landing page
- `/assessment` renders the onboarding flow
- assessment validation works for required fields
- successful submission creates workspace and assessment records
- user is routed to `/workspace/[workspaceId]`
- workspace page can render stored company and assessment context

---

## Recommended Build Order

1. create the full base folder structure and starter files
2. freeze routes, folders, schema names, and API contracts
3. define Convex schema and core mutations/queries
4. build landing page
5. build assessment form
6. connect submission flow to backend
7. build workspace shell and overview panel
8. verify end-to-end routing and persistence

---

## Constraints

- prioritize demoability over completeness
- keep route files thin
- keep AI logic out of UI files
- prefer deterministic flows over agentic complexity
- keep the architecture aligned with:
  - `zestlearn_context_md.md`
  - `zestlearn_technical_prd.md`
  - `zestlearn_system_architecture_and_api_contract.md`

---

## Planning Notes For Codex

- read `IMPLEMENTATION_STATUS.md` before updating this file
- inspect actual code changes before changing milestone status
- keep tasks small enough for a single Cursor implementation pass
- record architecture changes in `DECISIONS.md`
- plan for one active implementation slice at a time
- do not reintroduce multi-coder or parallel-branch assumptions unless the workflow changes again

---

## Execution Notes For Cursor

- read `DECISIONS.md` and `NEXT_TASK.md` before coding
- implement only the active bounded task
- if implementation forces a design change, record it in `IMPLEMENTATION_STATUS.md` and `DECISIONS.md`
- do not silently deviate from the agreed architecture

# ZestLearn Docs README

This file is a quick guide to the planning and build documents created for the ZestLearn MVP.

## 1. `zestlearn_context_md`

**Purpose:** Product and business context document.

Use this file to understand:

* what ZestLearn is,
* who it is for,
* the MVP scope,
* user persona,
* features,
* workflow,
* inputs and outputs,
* deliverables,
* CTA and page structure.

Best for:

* product understanding,
* startup positioning,
* onboarding collaborators,
* giving Cursor or AI tools high-level product context.

---

## 2. `zestlearn_technical_prd`

**Purpose:** Technical product requirements document.

Use this file to understand:

* product goals and non-goals,
* user stories,
* technical scope,
* modules,
* data model,
* backend function design,
* prompt architecture,
* retrieval strategy,
* acceptance criteria,
* testing scenarios.

Best for:

* converting product vision into engineering requirements,
* implementation planning,
* keeping the MVP technically focused.

---

## 3. `zestlearn_system_architecture_and_api_contract`

**Purpose:** Engineering architecture and API design guide.

Use this file to understand:

* overall system architecture,
* component responsibilities,
* data flow,
* project folder structure,
* Convex schema design,
* API contracts,
* shared types,
* AI service design,
* frontend page contracts,
* environment variables,
* implementation conventions.

Best for:

* setting up the codebase,
* structuring backend and frontend,
* implementing APIs consistently.

---

## 4. `zestlearn_cursor_implementation_plan`

**Purpose:** Execution plan for building the MVP in Cursor.

Use this file to understand:

* exact build phases,
* file creation order,
* what each major file should contain,
* implementation order over 24 hours,
* manual QA checklist,
* demo seed ideas.

Best for:

* hackathon execution,
* solo building,
* turning specs into actual files and features.

---

## 5. `zestlearn_master_cursor_prompt_pack`

**Purpose:** Copy-paste prompt library for Cursor.

Use this file to get:

* global Cursor instructions,
* scaffold prompts,
* landing page prompts,
* assessment prompts,
* backend prompts,
* upload prompts,
* chat prompts,
* report prompts,
* memory prompts,
* polish and refactor prompts.

Best for:

* building module by module with AI assistance,
* keeping generated code consistent,
* speeding up development in Cursor.

---

## 6. `zestlearn_hackathon_build_checklist`

**Purpose:** Short execution checklist for the build.

Use this file to track:

* hour-by-hour tasks,
* must-have features,
* should-have features,
* nice-to-have features,
* final demo readiness.

Best for:

* staying focused,
* avoiding scope creep,
* making sure the core MVP loop works.

---

## 7. `CURRENT_PLAN`

**Purpose:** Shared planning memory between Codex and Cursor.

Use this file to understand:

* the active milestone,
* current goal,
* acceptance criteria,
* scope boundaries,
* recommended build order,
* planning constraints.

Best for:

* giving Codex a persistent planning surface,
* making sure Cursor implements against the latest milestone,
* preventing planning drift across sessions.

---

## 8. `IMPLEMENTATION_STATUS`

**Purpose:** Shared implementation truth between Codex and Cursor.

Use this file to understand:

* what has actually been built,
* what still does not exist,
* latest completed work,
* known issues,
* current implementation risks.

Best for:

* making Codex plan against reality instead of assumption,
* giving Cursor a place to report what changed,
* keeping implementation progress visible across tools.

---

## 9. `DECISIONS`

**Purpose:** Shared architecture and product decision log.

Use this file to understand:

* the core MVP loop,
* stack decisions,
* architecture constraints,
* AI orchestration boundaries,
* persistent rules both tools should honor.

Best for:

* preventing repeated redesign debates,
* keeping Cursor aligned with Codex architecture choices,
* preserving important decisions across sessions.

---

## 10. `NEXT_TASK`

**Purpose:** Immediate handoff file from Codex planning to Cursor implementation.

Use this file to understand:

* the exact next bounded task,
* why it is next,
* which docs to read first,
* task scope,
* implementation guardrails,
* definition of done.

Best for:

* giving Cursor a narrow, execution-ready task,
* reducing ambiguity during implementation,
* creating a reliable planning-to-coding bridge.

---

## 11. `structuring_per_coder`

**Purpose:** Two-coder parallel execution and git collaboration guide.

Use this file to understand:

* how to split work between two people,
* which files each coder should own,
* how to work asynchronously in parallel,
* how to set up git branches and integration flow,
* when to merge work together,
* how to follow the 24-hour build plan as a two-person team.

Best for:

* running ZestLearn with two builders instead of one,
* reducing merge conflicts,
* keeping frontend and backend work parallelized,
* coordinating milestone-based integration into a shared branch.

---

## Shared Memory Workflow

If you are using both Codex and Cursor together, use these four files as the shared context layer:

1. `CURRENT_PLAN`
2. `IMPLEMENTATION_STATUS`
3. `DECISIONS`
4. `NEXT_TASK`

### Recommended Protocol

#### Codex should:

* read the four shared memory files first,
* inspect the actual codebase or latest diff,
* update the plan,
* set the next bounded task,
* record architecture changes in `DECISIONS`.

#### Cursor should:

* read the four shared memory files first,
* implement only the active task in `NEXT_TASK`,
* update `IMPLEMENTATION_STATUS` after coding,
* update `NEXT_TASK` only if handing off a blocker or clear next step,
* update `DECISIONS` only if implementation forces a real change.

### Why This Matters

Codex and Cursor do not reliably share internal chat memory.  
These four files create a repo-level memory layer so:

* Codex knows what Cursor actually coded,
* Cursor knows what Codex actually planned,
* both tools stay aligned through explicit written context,
* the codebase, plans, and implementation status remain synchronized.

---

## Recommended Usage Order

1. Read `zestlearn_context_md`
2. Read `zestlearn_technical_prd`
3. Use `zestlearn_system_architecture_and_api_contract`
4. Follow `zestlearn_cursor_implementation_plan`
5. Build with `zestlearn_master_cursor_prompt_pack`
6. Track progress using `zestlearn_hackathon_build_checklist`
7. Use `CURRENT_PLAN`, `IMPLEMENTATION_STATUS`, `DECISIONS`, and `NEXT_TASK` as the shared memory layer between Codex and Cursor
8. Use `structuring_per_coder` when two people are building the MVP in parallel and need a clear ownership and git-integration model

---

## One-Line Summary

These documents together define what ZestLearn is, how the MVP should work, how the system should be built, how to execute the build quickly in Cursor, how to maintain shared planning/implementation memory between Codex and Cursor, and how two coders can build the MVP in parallel without losing coordination.

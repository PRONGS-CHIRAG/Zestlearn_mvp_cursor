# ZestLearn Decisions Log

## Purpose

This file is the shared architecture and product decision memory between Codex and Cursor.

Only record decisions that should persist across implementation sessions.
Do not use this file for temporary task notes.

---

## Decision 1

**Title:** Build the MVP around one convincing product loop

**Status:** active

**Decision**

The MVP should focus on one complete loop:

`assessment -> workspace -> document upload -> consultant chat -> report -> memory insight`

**Why**

This is the smallest end-to-end workflow that proves the ZestLearn concept.

**Implication**

Features outside this loop should be deprioritized unless the loop already works.

---

## Decision 2

**Title:** Use Next.js + TypeScript + Tailwind + Convex as the primary app foundation

**Status:** active

**Decision**

The implementation should follow the documented stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Convex

**Why**

This stack is already defined across the ZestLearn planning documents and supports fast MVP delivery.

**Implication**

Do not introduce alternate backend or frontend frameworks unless there is a strong blocking reason.

---

## Decision 3

**Title:** Keep AI orchestration lightweight and deterministic

**Status:** active

**Decision**

The MVP should avoid heavy multi-agent orchestration and complex RAG infrastructure.

Instead, it should use:

- structured onboarding context
- document summaries
- recent chat history
- lightweight memory patterns

**Why**

The product is a 24-hour solo-build MVP and must optimize for reliability and demoability.

**Implication**

Prefer summary-based retrieval and structured prompts over advanced retrieval infrastructure.

---

## Decision 4

**Title:** Gemini is the primary model provider

**Status:** active

**Decision**

Google Gemini is the primary model provider.
Featherless is optional and should only be used as a fallback if implemented later.

**Why**

This matches the current product and architecture docs.

**Implication**

Core implementation should not depend on the fallback provider being present.

---

## Decision 5

**Title:** Shared repo files are the operational memory between Codex and Cursor

**Status:** active

**Decision**

Codex and Cursor should not rely on chat memory to stay aligned.
They should use:

- `CURRENT_PLAN.md`
- `IMPLEMENTATION_STATUS.md`
- `DECISIONS.md`
- `NEXT_TASK.md`

as the shared source of planning and handoff context.

**Why**

This creates a reliable, inspectable memory layer inside the repo that both tools can read and update.

**Implication**

Before planning or coding, both tools should read these files first.
After planning or coding, the relevant files should be updated before ending the session.

---

## Decision Template

Use this format for future entries:

## Decision N

**Title:** ...

**Status:** active | replaced | rejected

**Decision**

...

**Why**

...

**Implication**

...

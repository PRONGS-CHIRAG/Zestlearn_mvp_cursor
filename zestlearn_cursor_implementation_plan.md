# ZestLearn Cursor-Ready Implementation Plan

## 1. Document Purpose

This document translates the ZestLearn MVP into a direct implementation plan for building inside Cursor.

It is designed to answer:

* what to build first,
* which files to create,
* what each file should contain,
* how modules connect,
* how to sequence the build over 24 hours,
* what prompts to paste into Cursor to accelerate development.

This is not just a roadmap. It is an execution plan.

---

## 2. Build Goal

Build a working ZestLearn MVP web app that allows a user to:

1. visit a landing page,
2. submit an assessment,
3. create a workspace,
4. upload a document,
5. ask questions in consultant chat,
6. generate an AI opportunity report,
7. view reusable insights from the memory layer.

The implementation should optimize for:

* speed,
* demoability,
* clean enough structure,
* functional end-to-end flow,
* minimal over-engineering.

---

## 3. Recommended Build Sequence

## Phase 1 — Project Setup

### Goal

Get the project bootstrapped with routing, styling, Convex, and environment setup.

### Tasks

1. Create Next.js app with TypeScript and Tailwind
2. Install Convex
3. Set up folder structure
4. Add environment variables
5. Create shared UI primitives
6. Confirm app runs locally

### Deliverable

A running project with clean structure and placeholder routes.

---

## Phase 2 — Assessment Flow

### Goal

Implement landing page and onboarding form that creates a workspace.

### Tasks

1. Build landing page
2. Build assessment form UI
3. Add validation
4. Create Convex schema for workspaces and assessments
5. Add backend mutation for `submitAssessment`
6. Redirect to workspace page on success

### Deliverable

User can go from landing page to workspace creation.

---

## Phase 3 — Workspace Shell

### Goal

Create the main dashboard shell with tabs/panels.

### Tasks

1. Build workspace page layout
2. Create Overview, Documents, Chat, Reports, Insights panels
3. Fetch workspace dashboard data
4. Show assessment summary in overview

### Deliverable

Workspace exists and can render stored data.

---

## Phase 4 — Document Upload + Summarization

### Goal

Allow user to upload a document, process it, and display summary.

### Tasks

1. Create upload UI
2. Create upload API route
3. Add document record in Convex
4. Implement text extraction helper
5. Implement document summarization prompt
6. Save summary and tags
7. Show doc processing status in UI

### Deliverable

User can upload a file and see a processed summary.

---

## Phase 5 — Consultant Chat

### Goal

Implement contextual chat using workspace profile, docs, and memory.

### Tasks

1. Create chat UI
2. Add send message action
3. Store chat messages in Convex
4. Build chat context assembler
5. Create chat prompt
6. Integrate Gemini provider
7. Save assistant replies

### Deliverable

User can ask questions and receive grounded answers.

---

## Phase 6 — Report Generation

### Goal

Generate structured AI opportunity reports and render them nicely.

### Tasks

1. Create report generation action
2. Build report prompt
3. Define report schema type
4. Parse/validate structured output
5. Render report as markdown/cards
6. Store report in Convex

### Deliverable

User can generate a polished structured report.

---

## Phase 7 — Memory Layer

### Goal

Extract reusable insights and display them in UI.

### Tasks

1. Create memory table in Convex
2. Build memory extraction helper
3. Save patterns from reports
4. Retrieve relevant patterns by workspace
5. Show insights in workspace panel

### Deliverable

Product demonstrates collective learning concept.

---

## Phase 8 — n8n + Polish

### Goal

Add small automation and make the app demo-ready.

### Tasks

1. Add assessment submitted webhook
2. Add report generated webhook
3. Add loading states
4. Add error states
5. Add seed demo patterns
6. Test 3 demo scenarios

### Deliverable

Polished MVP ready for presentation.

---

## 4. Exact File Creation Plan

Below is the recommended order of file creation.

---

## 4.1 Root and Config Files

### Files

* `.env.local`
* `README.md`
* `package.json`
* `tailwind.config.ts`
* `tsconfig.json`
* `next.config.ts`

### What To Add

#### `.env.local`

```bash
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=
GEMINI_API_KEY=
FEATHERLESS_API_KEY=
N8N_WEBHOOK_URL=
ELEVENLABS_API_KEY=
```

#### README should contain

* product summary
* stack
* setup instructions
* run instructions
* env vars
* MVP feature list

---

## 4.2 App Routes

### Files

* `app/page.tsx`
* `app/layout.tsx`
* `app/globals.css`
* `app/assessment/page.tsx`
* `app/workspace/[workspaceId]/page.tsx`
* `app/workspace/[workspaceId]/report/page.tsx`
* `app/api/upload/route.ts`
* `app/api/chat/route.ts`
* `app/api/report/route.ts`
* `app/api/webhook/route.ts`

### Purpose

These files define the route-level structure of the app.

---

## 4.3 UI Components

### Landing Components

* `components/landing/Hero.tsx`
* `components/landing/HowItWorks.tsx`
* `components/landing/TargetAudience.tsx`
* `components/landing/CTASection.tsx`

### Assessment Components

* `components/assessment/AssessmentForm.tsx`
* `components/assessment/CompanyDetailsStep.tsx`
* `components/assessment/BottleneckStep.tsx`
* `components/assessment/AIMaturityStep.tsx`

### Workspace Components

* `components/workspace/WorkspaceShell.tsx`
* `components/workspace/OverviewPanel.tsx`
* `components/workspace/DocumentsPanel.tsx`
* `components/workspace/ChatPanel.tsx`
* `components/workspace/ReportsPanel.tsx`
* `components/workspace/InsightsPanel.tsx`

### Document Components

* `components/documents/UploadDropzone.tsx`
* `components/documents/DocumentCard.tsx`
* `components/documents/ProcessingStatusBadge.tsx`

### Chat Components

* `components/chat/ChatWindow.tsx`
* `components/chat/ChatInput.tsx`
* `components/chat/ChatMessage.tsx`
* `components/chat/PromptStarters.tsx`

### Report Components

* `components/report/ReportView.tsx`
* `components/report/UseCaseCard.tsx`
* `components/report/RoadmapSection.tsx`
* `components/report/RiskSection.tsx`

### Shared Components

* `components/shared/Button.tsx`
* `components/shared/Card.tsx`
* `components/shared/Spinner.tsx`
* `components/shared/EmptyState.tsx`
* `components/shared/ErrorState.tsx`

---

## 4.4 Convex Backend Files

### Files

* `convex/schema.ts`
* `convex/workspaces.ts`
* `convex/assessments.ts`
* `convex/documents.ts`
* `convex/chat.ts`
* `convex/reports.ts`
* `convex/memory.ts`
* `convex/events.ts`

### Purpose

These files own all persistent application state.

---

## 4.5 Business Logic Files

### AI Providers

* `lib/ai/providers/gemini.ts`
* `lib/ai/providers/featherless.ts`

### Prompts

* `lib/ai/prompts/system.ts`
* `lib/ai/prompts/chat.ts`
* `lib/ai/prompts/summarize.ts`
* `lib/ai/prompts/report.ts`
* `lib/ai/prompts/memory.ts`

### Parsers

* `lib/ai/parsers/reportParser.ts`
* `lib/ai/parsers/summaryParser.ts`

### Context Builders

* `lib/ai/context/buildChatContext.ts`
* `lib/ai/context/buildReportContext.ts`
* `lib/ai/context/buildMemoryContext.ts`

### Document Utilities

* `lib/documents/extractText.ts`
* `lib/documents/summarizeDocument.ts`
* `lib/documents/tagDocument.ts`
* `lib/documents/supportedTypes.ts`

### Report Utilities

* `lib/reports/generateReport.ts`
* `lib/reports/renderMarkdown.ts`
* `lib/reports/extractInsights.ts`

### Memory Utilities

* `lib/memory/savePatterns.ts`
* `lib/memory/retrievePatterns.ts`
* `lib/memory/normalizePattern.ts`

### Validation

* `lib/validation/assessment.ts`
* `lib/validation/chat.ts`
* `lib/validation/report.ts`

### Utility Files

* `lib/utils/logger.ts`
* `lib/utils/errors.ts`
* `lib/utils/format.ts`

---

## 4.6 Types

### Files

* `types/assessment.ts`
* `types/workspace.ts`
* `types/document.ts`
* `types/chat.ts`
* `types/report.ts`
* `types/memory.ts`
* `types/api.ts`

---

## 5. What Each Major File Should Contain

## 5.1 `app/page.tsx`

### Should Contain

* landing page assembly
* Hero
* How it works
* target audience
* CTA

### Should Not Contain

* backend logic
* data mutation logic

---

## 5.2 `app/assessment/page.tsx`

### Should Contain

* assessment page wrapper
* render `AssessmentForm`
* optional intro copy

---

## 5.3 `components/assessment/AssessmentForm.tsx`

### Should Contain

* controlled form state
* field validation
* submit action
* loading/error states
* redirect on success

### Input Fields

* companyName
* companyType
* companySize
* department
* role
* aiMaturity
* bottleneck
* desiredOutcome
* currentTools
* dataAvailability

---

## 5.4 `convex/workspaces.ts`

### Should Contain

* workspace creation mutation
* workspace fetch query
* dashboard query if needed

---

## 5.5 `convex/assessments.ts`

### Should Contain

* create assessment mutation
* get assessment by workspace query

---

## 5.6 `app/workspace/[workspaceId]/page.tsx`

### Should Contain

* workspace route wrapper
* fetch workspace dashboard data
* render `WorkspaceShell`

---

## 5.7 `components/workspace/WorkspaceShell.tsx`

### Should Contain

* tab navigation
* composition of panels
* layout structure

---

## 5.8 `app/api/upload/route.ts`

### Should Contain

* file receive logic
* validation for workspaceId and file
* trigger text extraction + summarization
* return document id/status

---

## 5.9 `lib/documents/extractText.ts`

### Should Contain

* file type detection
* extraction helper(s)
* fallback error handling

### MVP Rule

If parsing fails, return a controlled error and allow manual text fallback later.

---

## 5.10 `lib/documents/summarizeDocument.ts`

### Should Contain

* prompt invocation for summarization
* structured response with summary and tags

---

## 5.11 `app/api/chat/route.ts`

### Should Contain

* request validation
* fetch workspace context
* fetch doc summaries
* fetch memory patterns
* build prompt
* call model
* store assistant reply

---

## 5.12 `lib/ai/context/buildChatContext.ts`

### Should Contain

* compact workspace profile formatter
* assessment formatter
* doc summaries formatter
* recent messages formatter
* memory pattern formatter

---

## 5.13 `lib/ai/prompts/chat.ts`

### Should Contain

* consultant chat prompt template
* role constraints
* domain framing
* response style rules

---

## 5.14 `app/api/report/route.ts`

### Should Contain

* validate workspace id
* assemble context
* call structured report generator
* save report
* extract memory
* return report payload

---

## 5.15 `lib/reports/generateReport.ts`

### Should Contain

* build report prompt
* call AI provider
* parse structured JSON
* validate required keys

---

## 5.16 `lib/reports/renderMarkdown.ts`

### Should Contain

* deterministic mapping from structured report to markdown string

---

## 5.17 `convex/memory.ts`

### Should Contain

* create memory entry mutation
* get relevant memory patterns query

---

## 6. Implementation Order by Hours

## Hours 0–2

### Focus

Project bootstrap

### Tasks

* initialize app
* install dependencies
* create folders
* configure Tailwind
* configure Convex
* set up env vars

### Done When

App boots and routes exist.

---

## Hours 2–5

### Focus

Landing page + assessment form

### Tasks

* build landing page sections
* create assessment UI
* add validation
* create workspace/assessment backend
* redirect to workspace

### Done When

Assessment creates a workspace successfully.

---

## Hours 5–8

### Focus

Workspace shell

### Tasks

* create workspace layout
* create tabs/panels
* fetch workspace data
* display assessment summary

### Done When

Workspace page renders real backend data.

---

## Hours 8–12

### Focus

Document upload and summarization

### Tasks

* upload UI
* upload route
* file processing
* summary generation
* summary display

### Done When

A document can be uploaded and summarized.

---

## Hours 12–16

### Focus

Chat implementation

### Tasks

* chat UI
* store messages
* build context
* call Gemini
* render responses

### Done When

User can ask contextual questions.

---

## Hours 16–20

### Focus

Report generation

### Tasks

* create report prompt
* implement structured output generation
* render report UI
* store reports

### Done When

User can generate a complete opportunity report.

---

## Hours 20–22

### Focus

Memory layer

### Tasks

* extract insights
* save patterns
* show insights panel

### Done When

At least one reusable insight is visible.

---

## Hours 22–24

### Focus

Polish and test

### Tasks

* loading states
* error states
* seed patterns
* test 3 scenarios
* connect n8n webhook if time permits

### Done When

App is demo-ready.

---

## 7. Cursor Prompt Pack

Below are prompts you can paste directly into Cursor while building.

---

## Prompt 1 — Project Scaffold

```text
Create a clean Next.js 14 + TypeScript + Tailwind project structure for an MVP called ZestLearn.
It is an AI consultant copilot for pharma and biotech SMEs.
Set up route folders for landing page, assessment page, workspace page with dynamic workspaceId, report page, and API routes for upload, chat, report, and webhook.
Also create reusable component folders, lib folders for AI, documents, reports, memory, validation, and Convex backend files.
Do not add unnecessary complexity. Keep it clean, modular, and MVP-friendly.
```

---

## Prompt 2 — Landing Page

```text
Build a modern landing page for ZestLearn using React, Next.js, and Tailwind.
The product helps pharma and biotech SMEs discover the best AI pilot for their team.
Include these sections: Hero, how it works, target audience, example outputs, CTA.
Tone should feel modern, credible, and AI/startup oriented. CTA button text should be “Start Your AI Assessment”.
Keep styling clean and premium, with cards and subtle gradients.
```

---

## Prompt 3 — Assessment Form

```text
Build a multi-section but single-page assessment form component for ZestLearn.
Fields: companyName, companyType, companySize, department, role, aiMaturity, bottleneck, desiredOutcome, currentTools, dataAvailability.
Use React state and TypeScript. Add validation for required fields and good UX with labels, placeholders, and helper text.
On submit, call a provided async submitAssessment function and redirect to /workspace/[workspaceId] on success.
Include loading and error states.
```

---

## Prompt 4 — Convex Schema and Mutations

```text
Generate Convex schema and backend functions for a ZestLearn MVP.
Create tables for workspaces, assessments, documents, chatMessages, reports, memoryPatterns, and events.
Implement mutations and queries for creating a workspace, submitting an assessment, fetching workspace dashboard data, saving chat messages, saving reports, and fetching memory patterns.
Use TypeScript and clean domain separation across files.
```

---

## Prompt 5 — Workspace Shell

```text
Build a workspace dashboard UI for ZestLearn.
It should have tabs or a sidebar for Overview, Documents, Chat, Reports, and Insights.
The layout should feel modern, SaaS-like, and responsive.
The overview panel should show company profile and assessment summary.
Use reusable cards and keep the structure modular.
```

---

## Prompt 6 — Document Upload

```text
Build a document upload flow for a Next.js app.
Create an upload dropzone component and an API route that accepts multipart form data with workspaceId and file.
After upload, call helper functions to extract text, summarize the document using an AI provider, generate tags, and save the result.
Return processing status and show it in the UI using document cards.
Keep the implementation simple and robust for MVP use.
```

---

## Prompt 7 — Chat Backend

```text
Implement a consultant chat API route for ZestLearn.
Input: workspaceId and message.
Fetch workspace profile, assessment data, recent chat history, document summaries, and memory patterns.
Assemble compact prompt context and call a Gemini-based AI provider.
The AI should respond as a practical AI transformation consultant for pharma and biotech SMEs.
Store both user and assistant messages and return the assistant reply.
Use TypeScript and keep the logic modular.
```

---

## Prompt 8 — Chat UI

```text
Build a chat interface for ZestLearn.
Include a scrollable message list, message bubbles for user and assistant, a text input, submit button, loading state, and optional prompt starter buttons.
The UI should feel modern and calm, suitable for a B2B AI copilot product.
Use React and Tailwind. Keep components modular.
```

---

## Prompt 9 — Report Generator

```text
Implement a structured report generation pipeline for ZestLearn.
Input: workspaceId.
Fetch workspace profile, assessment, documents, recent chat context, and memory patterns.
Build a prompt that asks the model to return strict JSON with fields: problem_summary, current_pain_points, recommended_use_cases, best_first_pilot, roadmap_30_60_90, open_questions.
Parse and validate the JSON, store it in the database, render it into markdown, and return the result.
Use clear TypeScript types.
```

---

## Prompt 10 — Report UI

```text
Build a report view for ZestLearn using React and Tailwind.
Display sections for Problem Summary, Recommended Use Cases, Best First Pilot, Risks, 30/60/90 Roadmap, and Open Questions.
Use card-based layout and make it feel polished and professional.
Assume the input is a structured report object with nested arrays.
```

---

## Prompt 11 — Memory Layer

```text
Implement a simple collective memory layer for ZestLearn.
Create helper functions that extract short reusable patterns from a generated report, such as common blockers, recommended first pilots, and risk insights.
Store them in a memoryPatterns collection and build a query to fetch relevant patterns for a workspace.
Also create a small Insights panel UI that displays these patterns as cards.
```

---

## Prompt 12 — Gemini Provider

```text
Create a Gemini provider wrapper in TypeScript for a Next.js app.
The wrapper should support generateText and generateStructured methods.
It should take a system prompt, user prompt, and optional schema hint.
Keep the code clean and reusable so other modules like document summarization, chat, and report generation can use it.
Add basic error handling.
```

---

## 8. Manual QA Checklist

Before demoing, verify the following manually:

### Landing

* landing page loads
* CTA works

### Assessment

* required field validation works
* submission creates workspace
* redirect works

### Workspace

* overview shows assessment data
* tabs switch correctly

### Documents

* upload works
* unsupported file types fail gracefully
* summary appears
* status updates appear correctly

### Chat

* user message appears instantly
* assistant response returns
* responses use context from assessment/docs

### Reports

* generate report button works
* report renders clearly
* top use cases appear
* roadmap appears

### Memory

* insights panel shows at least one pattern
* patterns update after report generation

### Error Handling

* chat failure handled gracefully
* report failure handled gracefully
* document parsing failure handled gracefully

---

## 9. Demo Scenario Data to Seed

Seed example patterns or test data so the app feels richer.

### Example Shared Patterns

1. Documentation-heavy teams often begin with summarization and document triage copilots.
2. Low AI maturity teams should start with human-in-the-loop copilots before full automation.
3. R&D knowledge fragmentation often benefits from internal semantic search and structured note capture.
4. Operations teams with repetitive review tasks often get value from workflow summarization and intelligent triage.

### Example Demo Personas

* Operations Lead in Pharma SME
* R&D Knowledge Manager in Biotech Startup
* Process Improvement Manager in Life Sciences SME

---

## 10. Final Execution Principle

While building in Cursor, prioritize one rule above everything else:

**Make each feature work end-to-end before moving to the next.**

Do not over-engineer abstractions too early.
Do not build hidden complexity for features that are not yet visible.
Do not optimize prematurely.

The ZestLearn MVP only needs one convincing product loop:

**user context in → AI reasoning grounded in context → structured recommendation out → reusable insight saved**

If that loop works, the MVP works.

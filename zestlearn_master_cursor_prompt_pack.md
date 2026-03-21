# ZestLearn Master Cursor Prompt Pack

## 1. How to Use This Document

This document contains a complete master prompt pack for building the ZestLearn MVP inside Cursor.

It is designed so you can:

* paste one prompt at a time into Cursor,
* build module by module,
* keep code style and architecture consistent,
* avoid over-engineering,
* move fast while preserving clarity.

Each prompt is written to reflect the ZestLearn MVP scope:

* AI consultant copilot for pharma and biotech SMEs,
* assessment-driven onboarding,
* workspace model,
* document upload and summarization,
* consultant chat,
* AI opportunity report,
* lightweight collective memory layer.

---

## 2. Global Instruction Prompt for Cursor

Paste this first before prompting Cursor for individual modules.

```text
You are helping me build an MVP called ZestLearn.

ZestLearn is an AI consultant copilot for pharma and biotech SMEs. The user should be able to:
1. visit a landing page,
2. complete an onboarding assessment,
3. create a workspace,
4. upload documents,
5. chat with an AI consultant,
6. generate a structured AI opportunity report,
7. view reusable insights from a lightweight collective memory layer.

Tech stack:
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Convex for backend/database
- Google Gemini API for primary LLM
- Featherless.ai as optional fallback
- LangChain only where useful for prompt/output structure
- n8n only for light automations/webhooks

Architectural principles:
- Keep the code modular and MVP-friendly.
- Do not over-engineer.
- Prefer deterministic pipelines over overly agentic systems.
- Keep route files thin.
- Keep UI components presentation-focused.
- Keep AI prompt logic in separate lib files.
- Keep Convex as the main source of truth for persistent state.
- Always use TypeScript types.
- Use reusable helper functions.
- Make each feature work end-to-end before adding extra complexity.

Style rules:
- Write clean production-style code.
- Avoid unnecessary abstractions.
- Use descriptive variable names.
- Add concise comments only where useful.
- Prefer small composable components.
- Build responsive modern UI with Tailwind.
- Keep the visual style modern, premium, calm, and B2B SaaS-like.

Important MVP rule:
The core loop is:
user context in -> AI reasoning grounded in context -> structured recommendation out -> insight saved for reuse.

Whenever I ask you to create a file or module, generate code that fits this architecture and product goal.
```

---

## 3. Global Refactor Prompt

Use this when Cursor starts generating inconsistent code.

```text
Refactor the generated code to match these rules:
- Keep the architecture modular and MVP-friendly.
- Move business logic out of page files.
- Keep prompt and AI logic in lib/ai.
- Keep reusable backend logic in Convex or lib helpers.
- Use clean TypeScript types.
- Reduce duplication.
- Preserve current behavior.
- Do not add unnecessary abstractions or dependencies.
- Improve readability and maintainability.
```

---

## 4. Global UI Style Prompt

Use this when improving the design of any screen.

```text
Improve the UI styling while keeping the current functionality unchanged.
The design should feel modern, premium, startup-like, and suitable for a B2B AI SaaS product.
Use Tailwind CSS only.
Preferred characteristics:
- clean spacing,
- rounded cards,
- soft shadows,
- subtle gradients,
- strong hierarchy,
- calm professional color palette,
- responsive layout,
- polished empty/loading states.
Do not redesign the architecture. Only improve presentation and layout.
```

---

## 5. Global Bug Fix Prompt

Use this when something breaks.

```text
Debug this issue carefully.
Identify the root cause, explain it briefly, and fix it with minimal changes.
Do not rewrite unrelated parts.
Preserve architecture and current behavior where possible.
Also improve error handling so the issue fails gracefully if it happens again.
```

---

## 6. Project Scaffold Prompt

Use this first for codebase setup.

```text
Create the initial codebase structure for a Next.js 14 + TypeScript + Tailwind MVP called ZestLearn.

Product:
ZestLearn is an AI consultant copilot for pharma and biotech SMEs.
The user journey is:
- landing page
- assessment form
- workspace dashboard
- document upload
- consultant chat
- report generation
- insights/memory panel

Please create a clean folder structure for:
- app routes
- components
- Convex backend files
- lib folders for AI, prompts, context builders, documents, reports, memory, validation, and utils
- types folder
- hooks folder

Use this route structure:
- /
- /assessment
- /workspace/[workspaceId]
- /workspace/[workspaceId]/report
- /api/upload
- /api/chat
- /api/report
- /api/webhook

Do not build every feature yet. Just scaffold the project structure with placeholder files and minimal starter code where appropriate.
Keep it clean and MVP-friendly.
```

---

## 7. README Prompt

```text
Create a clear README.md for the ZestLearn MVP.
Include:
- product overview,
- target users,
- MVP feature list,
- tech stack,
- folder structure summary,
- setup instructions,
- environment variables,
- how to run locally,
- high-level product loop,
- current MVP scope vs out-of-scope.
Write it in a professional startup/engineering style.
```

---

## 8. Environment Variables Prompt

```text
Generate a `.env.example` file for the ZestLearn MVP.
Include variables for:
- NEXT_PUBLIC_CONVEX_URL
- CONVEX_DEPLOYMENT
- GEMINI_API_KEY
- FEATHERLESS_API_KEY
- N8N_WEBHOOK_URL
- ELEVENLABS_API_KEY
Also add short inline comments describing what each variable is used for.
```

---

## 9. Landing Page Prompts

## 9.1 Landing Page Assembly Prompt

```text
Build the ZestLearn landing page in `app/page.tsx` using modular React components.
Use these sections:
- Hero
- How It Works
- Target Audience
- Example Outputs
- CTA Section

The product is an AI consultant copilot for pharma and biotech SMEs.
Main CTA: “Start Your AI Assessment”.
Tone should feel modern, premium, credible, and startup-oriented.
Use Tailwind and keep the code clean.
```

## 9.2 Hero Component Prompt

```text
Create a Hero component for ZestLearn.
Headline idea: “Find the best AI pilot for your pharma or biotech team.”
Subheadline should explain that ZestLearn analyzes business context, documents, and pain points to recommend practical AI use cases and a roadmap.
Include a prominent CTA button linking to /assessment.
The design should feel premium, modern, and SaaS-like.
```

## 9.3 How It Works Prompt

```text
Create a “How It Works” section for ZestLearn with 4 simple steps:
1. Tell us about your team and bottleneck
2. Upload internal context
3. Chat with the AI consultant
4. Get a practical AI opportunity report
Use cards with icons or visual emphasis.
Keep the copy concise and B2B-friendly.
```

## 9.4 Target Audience Prompt

```text
Create a Target Audience section for ZestLearn.
Focus on users like innovation managers, digital transformation leads, operations managers, and R&D/process leads at pharma and biotech SMEs.
Explain their pain points and why ZestLearn helps them.
Use a clean card-based layout.
```

## 9.5 Example Outputs Prompt

```text
Create an Example Outputs section for the ZestLearn landing page.
Show examples of outputs like:
- top AI use cases
- best first pilot
- data requirements
- risks and compliance considerations
- 30/60/90 day roadmap
Make it visually polished and clearly business-oriented.
```

## 9.6 CTA Section Prompt

```text
Create a final CTA section for the ZestLearn landing page.
Main CTA text: “Start Your AI Assessment”.
Support copy should encourage users to turn a business bottleneck into a practical AI roadmap.
Use a visually strong section with premium styling.
```

---

## 10. Assessment Module Prompts

## 10.1 Assessment Page Prompt

```text
Create the assessment page for ZestLearn in `app/assessment/page.tsx`.
Render a polished onboarding screen with a short intro and the main AssessmentForm component.
The page should feel focused, guided, and low-friction.
Use Tailwind and keep the page clean.
```

## 10.2 Assessment Form Prompt

```text
Build `components/assessment/AssessmentForm.tsx` for ZestLearn.
This is a single-page structured onboarding form with these fields:
- companyName
- companyType
- companySize
- department
- role
- aiMaturity
- bottleneck
- desiredOutcome
- currentTools
- dataAvailability

Requirements:
- use React + TypeScript,
- controlled inputs,
- client-side validation,
- clear labels and helper text,
- loading and error states,
- on submit call a provided async function,
- redirect to `/workspace/[workspaceId]` on success.

Design should feel polished and SaaS-like.
```

## 10.3 Assessment Validation Prompt

```text
Create `lib/validation/assessment.ts` for ZestLearn.
Add a validation function for the assessment form input.
Return a structured object containing:
- whether the input is valid,
- field-level errors,
- normalized values where appropriate.
Keep it simple and robust for MVP use.
```

## 10.4 Assessment Types Prompt

```text
Create `types/assessment.ts` for the ZestLearn MVP.
Define TypeScript interfaces and types for:
- AssessmentInput
- AssessmentValidationErrors
- AssessmentSubmitResponse
Use clean, reusable types.
```

---

## 11. Convex Backend Prompts

## 11.1 Convex Schema Prompt

```text
Create `convex/schema.ts` for the ZestLearn MVP.
Define Convex tables for:
- users
- workspaces
- assessments
- documents
- chatMessages
- reports
- memoryPatterns
- events

Use appropriate fields for the ZestLearn product:
workspace profile, assessment data, document summaries, chat history, structured report JSON, memory patterns, and event logs.
Add useful indexes where appropriate, especially by workspaceId.
Use TypeScript and Convex values.
```

## 11.2 Workspaces Backend Prompt

```text
Create `convex/workspaces.ts` for the ZestLearn MVP.
Implement functions for:
- createWorkspace
- getWorkspaceById
- getWorkspaceDashboardData

The dashboard data should return workspace profile, assessment summary, document list, latest report, and relevant insights.
Keep the code clean and domain-focused.
```

## 11.3 Assessments Backend Prompt

```text
Create `convex/assessments.ts` for the ZestLearn MVP.
Implement functions for:
- submitAssessment
- getAssessmentByWorkspaceId
- updateAssessmentStatus if useful

The submit function should create or connect to a workspace and save bottleneck, desired outcome, current tools, and data availability.
Use strong typing.
```

## 11.4 Documents Backend Prompt

```text
Create `convex/documents.ts` for the ZestLearn MVP.
Implement functions for:
- createDocumentRecord
- updateDocumentProcessingStatus
- saveDocumentSummary
- listWorkspaceDocuments

Document records should support fileName, fileType, storagePath, extractedText, summary, tags, and processingStatus.
```

## 11.5 Chat Backend Prompt

```text
Create `convex/chat.ts` for the ZestLearn MVP.
Implement functions for:
- createChatMessage
- listRecentMessagesByWorkspace
- optionally clear or summarize history later

Store role, content, optional metadata, workspaceId, and createdAt.
```

## 11.6 Reports Backend Prompt

```text
Create `convex/reports.ts` for the ZestLearn MVP.
Implement functions for:
- createReportRecord
- getLatestReportByWorkspace
- listReportsByWorkspace

Reports should store structuredJson, renderedMarkdown, title, workspaceId, and createdAt.
```

## 11.7 Memory Backend Prompt

```text
Create `convex/memory.ts` for the ZestLearn MVP.
Implement functions for:
- saveMemoryPattern
- listRelevantMemoryPatterns

Memory patterns should support scope, category, patternText, sourceType, confidenceScore, workspaceId, functionArea, and industry where useful.
Keep retrieval simple and practical for MVP use.
```

## 11.8 Events Backend Prompt

```text
Create `convex/events.ts` for the ZestLearn MVP.
Implement a small event logging helper and query functions if useful.
Event types should include things like assessment_submitted, document_uploaded, chat_message_sent, report_generated, and memory_pattern_saved.
Keep it lightweight.
```

---

## 12. Workspace UI Prompts

## 12.1 Workspace Page Prompt

```text
Build `app/workspace/[workspaceId]/page.tsx` for ZestLearn.
This page should fetch workspace dashboard data and render a reusable WorkspaceShell component.
Handle loading and error states cleanly.
Keep route-level logic thin.
```

## 12.2 Workspace Shell Prompt

```text
Build `components/workspace/WorkspaceShell.tsx` for ZestLearn.
It should provide a modern responsive dashboard layout with sections or tabs for:
- Overview
- Documents
- Chat
- Reports
- Insights
Use reusable cards and good spacing.
The layout should feel like a modern B2B SaaS workspace.
```

## 12.3 Overview Panel Prompt

```text
Create `components/workspace/OverviewPanel.tsx` for ZestLearn.
Display the workspace profile and assessment summary.
Show fields like company type, company size, role, department, AI maturity, bottleneck, and desired outcome.
Use a clean card-based layout.
```

## 12.4 Documents Panel Prompt

```text
Create `components/workspace/DocumentsPanel.tsx` for ZestLearn.
This panel should include:
- upload section,
- list of document cards,
- processing status badges,
- summary preview.
Keep the panel modular and polished.
```

## 12.5 Chat Panel Prompt

```text
Create `components/workspace/ChatPanel.tsx` for ZestLearn.
This panel should render the consultant chat UI including message list, input, and prompt starters.
It should feel conversational but professional.
```

## 12.6 Reports Panel Prompt

```text
Create `components/workspace/ReportsPanel.tsx` for ZestLearn.
This panel should display the latest report summary and include a Generate Report button.
If a report exists, show a preview card and link to the full report page.
```

## 12.7 Insights Panel Prompt

```text
Create `components/workspace/InsightsPanel.tsx` for ZestLearn.
This panel should display reusable memory insights as cards.
Examples include common blockers, similar team patterns, and suggested first pilots.
The design should make the collective memory layer feel tangible.
```

---

## 13. Document Upload Prompts

## 13.1 Upload Dropzone Prompt

```text
Create `components/documents/UploadDropzone.tsx` for ZestLearn.
It should support drag-and-drop and file picker upload.
Accept at least PDF and TXT for MVP.
Expose an `onUpload` callback.
Show loading state while uploading.
Design should be clean and modern.
```

## 13.2 Document Card Prompt

```text
Create `components/documents/DocumentCard.tsx` for ZestLearn.
Display:
- file name,
- file type,
- processing status,
- summary preview,
- tags.
Use a clean card design suitable for a SaaS dashboard.
```

## 13.3 Processing Badge Prompt

```text
Create `components/documents/ProcessingStatusBadge.tsx` for ZestLearn.
It should render clear status styles for: uploaded, processing, done, error.
Keep it simple and reusable.
```

## 13.4 Upload Route Prompt

```text
Create `app/api/upload/route.ts` for ZestLearn.
This route should:
- accept multipart form data with workspaceId and file,
- validate supported file types,
- create a document record,
- trigger text extraction,
- summarize the document,
- generate tags,
- save results,
- return success or failure response.

Keep it MVP-friendly and robust.
Do not over-engineer storage. If needed, stub file storage simply and focus on the processing pipeline.
```

## 13.5 Text Extraction Prompt

```text
Create `lib/documents/extractText.ts` for ZestLearn.
Implement a simple document text extraction utility.
Prioritize support for TXT and PDF.
If PDF parsing is limited, implement a clean fallback structure and return controlled errors.
The function should be reusable by the upload route.
```

## 13.6 Summarize Document Prompt

```text
Create `lib/documents/summarizeDocument.ts` for ZestLearn.
This helper should call the AI provider to summarize extracted document text.
Return:
- summary,
- tags,
- optional key facts.
The summary should be concise but useful for downstream chat and report generation.
```

## 13.7 Tag Document Prompt

```text
Create `lib/documents/tagDocument.ts` for ZestLearn.
Implement a lightweight utility that classifies document summaries into tags such as:
- process
- compliance
- workflow
- data
- bottleneck
- systems
- operations
- research
Use either rule-based tagging or an AI-assisted helper if appropriate.
Keep it simple for MVP.
```

---

## 14. AI Provider and Prompt Prompts

## 14.1 Gemini Provider Prompt

```text
Create `lib/ai/providers/gemini.ts` for ZestLearn.
Implement a Gemini provider wrapper in TypeScript with methods:
- generateText
- generateStructured

Inputs should support:
- systemPrompt
- userPrompt
- optional schemaHint
- optional temperature

Keep the wrapper reusable for chat, document summarization, report generation, and memory extraction.
Add basic error handling.
```

## 14.2 Featherless Provider Prompt

```text
Create `lib/ai/providers/featherless.ts` for ZestLearn.
Implement the same interface as the Gemini provider so it can be used as an optional fallback provider.
Keep the structure parallel and reusable.
```

## 14.3 System Prompt File Prompt

```text
Create `lib/ai/prompts/system.ts` for ZestLearn.
Define the core system prompt that frames the model as an AI transformation consultant for pharma and biotech SMEs.
The system should prioritize practical, realistic, low-risk AI recommendations and clearly state assumptions when information is missing.
Export reusable prompt constants or builder functions.
```

## 14.4 Chat Prompt Prompt

```text
Create `lib/ai/prompts/chat.ts` for ZestLearn.
Build a chat prompt generator that uses:
- workspace profile,
- assessment data,
- recent chat history,
- document summaries,
- memory insights.
The response style should be consultant-like, practical, and contextual.
Return a prompt string or structured prompt object.
```

## 14.5 Summary Prompt Prompt

```text
Create `lib/ai/prompts/summarize.ts` for ZestLearn.
Define a prompt used to summarize uploaded documents into concise structured context for later retrieval.
The output should help identify relevant workflows, pain points, systems, compliance context, and data context where possible.
```

## 14.6 Report Prompt Prompt

```text
Create `lib/ai/prompts/report.ts` for ZestLearn.
Build a report generation prompt that asks the model to return strict JSON for an AI opportunity report.
Required sections:
- problem_summary
- current_pain_points
- recommended_use_cases
- best_first_pilot
- roadmap_30_60_90
- open_questions
The prompt should emphasize realistic AI use cases for pharma and biotech SMEs and practical first pilots.
```

## 14.7 Memory Prompt Prompt

```text
Create `lib/ai/prompts/memory.ts` for ZestLearn.
Define a prompt that extracts short reusable patterns from reports or chat outputs.
Examples: common blockers, recommended first pilots, risk insights, implementation advice.
The output should be concise and reusable in later chats.
```

---

## 15. Context Builder Prompts

## 15.1 Build Chat Context Prompt

```text
Create `lib/ai/context/buildChatContext.ts` for ZestLearn.
Build helper functions that convert workspace profile, assessment, document summaries, recent messages, and memory patterns into compact prompt-ready text blocks.
The goal is to keep context concise, relevant, and structured.
Do not dump raw database objects directly into prompts.
```

## 15.2 Build Report Context Prompt

```text
Create `lib/ai/context/buildReportContext.ts` for ZestLearn.
Build a helper that assembles the best available context for report generation from:
- workspace profile,
- assessment,
- document summaries,
- recent chat insights,
- memory patterns.
The output should be deterministic and prompt-ready.
```

## 15.3 Build Memory Context Prompt

```text
Create `lib/ai/context/buildMemoryContext.ts` for ZestLearn.
Build a small helper that formats report/chat outputs into input for memory extraction.
Keep it simple and reusable.
```

---

## 16. Chat Module Prompts

## 16.1 Chat Route Prompt

```text
Create `app/api/chat/route.ts` for ZestLearn.
This route should:
- accept workspaceId and message,
- validate input,
- store the user message,
- fetch workspace profile, assessment, recent messages, document summaries, and memory patterns,
- build compact chat context,
- call the Gemini provider,
- store the assistant reply,
- return the reply and basic metadata.

Keep the route handler thin and move reusable logic into lib helpers where appropriate.
```

## 16.2 Chat Window Prompt

```text
Create `components/chat/ChatWindow.tsx` for ZestLearn.
Render a scrollable message list with user and assistant messages.
Use a polished conversational UI suitable for a B2B AI assistant.
Keep the component reusable and presentation-focused.
```

## 16.3 Chat Input Prompt

```text
Create `components/chat/ChatInput.tsx` for ZestLearn.
It should include a textarea or input, submit button, enter-to-send behavior where appropriate, and loading state.
Expose a clean onSend callback.
```

## 16.4 Chat Message Prompt

```text
Create `components/chat/ChatMessage.tsx` for ZestLearn.
Render a message bubble for either user or assistant.
Style them differently but consistently.
Keep the visual style clean and professional.
```

## 16.5 Prompt Starters Prompt

```text
Create `components/chat/PromptStarters.tsx` for ZestLearn.
Include buttons for prompts like:
- Find AI use cases
- Assess feasibility
- Recommend first pilot
- Identify risks
- Draft stakeholder summary
The component should be reusable and easy to style.
```

---

## 17. Report Module Prompts

## 17.1 Report Route Prompt

```text
Create `app/api/report/route.ts` for ZestLearn.
This route should:
- accept workspaceId,
- gather workspace profile, assessment, document summaries, recent chat context, and memory patterns,
- build a report prompt,
- call the AI provider for structured output,
- parse and validate the result,
- render markdown from the structured report,
- save the report,
- extract memory patterns,
- return the report payload.
Keep the route clean and modular.
```

## 17.2 Report Generator Prompt

```text
Create `lib/reports/generateReport.ts` for ZestLearn.
This helper should:
- accept assembled report context,
- call the AI provider,
- request strict JSON output,
- validate required keys,
- return a strongly typed structured report object.
Use clean TypeScript types and defensive parsing.
```

## 17.3 Report Parser Prompt

```text
Create `lib/ai/parsers/reportParser.ts` for ZestLearn.
Implement a parser/validator for the structured report format.
It should verify that required sections exist and normalize missing optional values safely.
Keep it practical for MVP use.
```

## 17.4 Markdown Renderer Prompt

```text
Create `lib/reports/renderMarkdown.ts` for ZestLearn.
Convert the structured report object into a deterministic markdown string.
Do not rely on the model to generate final markdown.
Use the report structure to build a clean readable report with headings and bullet points where useful.
```

## 17.5 Report View Prompt

```text
Create `components/report/ReportView.tsx` for ZestLearn.
Render a polished report screen using a structured report object.
Display sections for:
- Problem Summary
- Recommended Use Cases
- Best First Pilot
- Risks and Considerations
- 30/60/90 Day Roadmap
- Open Questions
Use cards and clear hierarchy.
```

## 17.6 Use Case Card Prompt

```text
Create `components/report/UseCaseCard.tsx` for ZestLearn.
Show a recommended AI use case with title, description, business value, difficulty, data requirements, risks, and priority score.
Use a polished card design.
```

## 17.7 Roadmap Section Prompt

```text
Create `components/report/RoadmapSection.tsx` for ZestLearn.
Display the 30/60/90 day roadmap in a clear multi-column or stacked layout.
Make it visually easy to scan.
```

## 17.8 Risk Section Prompt

```text
Create `components/report/RiskSection.tsx` for ZestLearn.
Display risk and compliance considerations cleanly.
If risk data is distributed inside use cases, provide a sensible aggregated display approach.
```

---

## 18. Memory Layer Prompts

## 18.1 Memory Extraction Prompt

```text
Create `lib/reports/extractInsights.ts` for ZestLearn.
This helper should extract short reusable insights from a structured report, such as:
- common blockers,
- recommended first pilots,
- workflow-specific risk insights,
- maturity-level guidance.
Return normalized memory pattern objects that can be saved in the database.
```

## 18.2 Save Patterns Prompt

```text
Create `lib/memory/savePatterns.ts` for ZestLearn.
Implement a small helper that accepts extracted memory patterns and persists them using backend calls.
Keep it simple and reusable.
```

## 18.3 Retrieve Patterns Prompt

```text
Create `lib/memory/retrievePatterns.ts` for ZestLearn.
Implement a helper to fetch relevant memory patterns for a workspace and optionally combine workspace-specific and shared patterns.
Keep ranking/filtering logic simple.
```

## 18.4 Normalize Pattern Prompt

```text
Create `lib/memory/normalizePattern.ts` for ZestLearn.
Implement a utility that ensures memory patterns have consistent categories, text formatting, and metadata before storing them.
```

---

## 19. Types and Shared Utilities Prompts

## 19.1 Workspace Types Prompt

```text
Create `types/workspace.ts` for ZestLearn.
Define TypeScript interfaces for workspace profile data and workspace dashboard response data.
Keep them aligned with the Convex schema and frontend needs.
```

## 19.2 Document Types Prompt

```text
Create `types/document.ts` for ZestLearn.
Define interfaces for document metadata, document summary, tags, and upload responses.
```

## 19.3 Chat Types Prompt

```text
Create `types/chat.ts` for ZestLearn.
Define types for chat messages, chat request payload, chat response payload, and any context usage metadata.
```

## 19.4 Report Types Prompt

```text
Create `types/report.ts` for ZestLearn.
Define a strongly typed OpportunityReport model including recommended use cases, best first pilot, roadmap, and open questions.
Also define API response types for report generation.
```

## 19.5 Memory Types Prompt

```text
Create `types/memory.ts` for ZestLearn.
Define types for memory patterns, insight cards, and relevant memory query responses.
```

## 19.6 API Types Prompt

```text
Create `types/api.ts` for ZestLearn.
Define generic API response types and typed payloads for upload, chat, assessment submission, and report generation.
Keep them simple and reusable.
```

## 19.7 Logger Utility Prompt

```text
Create `lib/utils/logger.ts` for ZestLearn.
Implement a lightweight logger utility suitable for MVP development.
Support info, warn, and error helpers.
Keep it minimal and server-safe.
```

## 19.8 Errors Utility Prompt

```text
Create `lib/utils/errors.ts` for ZestLearn.
Implement small helper utilities for normalizing thrown errors into readable API-safe messages.
Keep it simple.
```

## 19.9 Format Utility Prompt

```text
Create `lib/utils/format.ts` for ZestLearn.
Add small formatting helpers that may be useful for labels, dates, titles, and string cleanup in the UI.
Keep the file minimal.
```

---

## 20. Report Page Prompt

```text
Build `app/workspace/[workspaceId]/report/page.tsx` for ZestLearn.
This page should display the latest generated report for a workspace or a helpful empty state if no report exists yet.
Use the ReportView component and keep route logic thin.
```

---

## 21. Loading and Error State Prompts

## 21.1 Spinner Prompt

```text
Create `components/shared/Spinner.tsx` for ZestLearn.
Build a small reusable loading spinner with clean styling.
```

## 21.2 Empty State Prompt

```text
Create `components/shared/EmptyState.tsx` for ZestLearn.
Build a reusable empty state component with title, description, and optional action button.
Use a polished SaaS-style design.
```

## 21.3 Error State Prompt

```text
Create `components/shared/ErrorState.tsx` for ZestLearn.
Build a reusable error state component with title, message, and optional retry action.
Make it clean and friendly.
```

---

## 22. n8n and Webhook Prompts

## 22.1 Webhook Route Prompt

```text
Create `app/api/webhook/route.ts` for ZestLearn.
This route should support lightweight outgoing or incoming webhook behavior for MVP use.
It may be used to notify n8n when events like assessment submission or report generation occur.
Keep it simple and secure enough for an MVP.
```

## 22.2 Assessment Notification Prompt

```text
Create a lightweight helper that sends an n8n webhook when an assessment is submitted.
The payload should include workspace id, company name, role, bottleneck, and timestamp.
Keep it simple and non-blocking.
```

## 22.3 Report Notification Prompt

```text
Create a lightweight helper that sends an n8n webhook when a report is generated.
The payload should include workspace id, report id, company name, bottleneck summary, and timestamp.
Keep it non-blocking and failure-safe.
```

---

## 23. Final Polish Prompts

## 23.1 Loading State Polish Prompt

```text
Improve all major async flows in the ZestLearn MVP by adding clear loading states for:
- assessment submission,
- workspace loading,
- document processing,
- chat generation,
- report generation.
Keep the UI polished and consistent.
```

## 23.2 Empty State Polish Prompt

```text
Add polished empty states across the ZestLearn workspace for:
- no documents uploaded,
- no chat yet,
- no report generated yet,
- no insights available yet.
The messaging should feel helpful and product-oriented.
```

## 23.3 Error Handling Polish Prompt

```text
Improve error handling across the ZestLearn MVP.
Ensure assessment, upload, chat, and report flows fail gracefully with readable messages and no broken UI states.
Preserve current functionality while improving resilience.
```

## 23.4 Demo Data Seed Prompt

```text
Add seed data or helper logic for the ZestLearn MVP so the product feels richer during demos.
Include a few shared memory patterns such as:
- documentation-heavy teams often begin with summarization and document triage copilots,
- low AI maturity teams should start with human-in-the-loop copilots,
- R&D knowledge fragmentation often benefits from internal semantic search,
- operations teams with repetitive review tasks often benefit from intelligent triage.
Keep it easy to remove or replace later.
```

---

## 24. One-Shot Recovery Prompt

Use this if the codebase becomes messy and you need Cursor to realign it.

```text
Review the current ZestLearn MVP codebase and align it with this architecture:
- Next.js + TypeScript + Tailwind frontend
- Convex as source of truth for persistent state
- lib/ai for provider wrappers, prompts, parsers, and context builders
- lib/documents for extraction and summarization
- lib/reports for generation, rendering, and insight extraction
- lib/memory for memory utilities
- thin route handlers
- modular reusable components

Refactor only where necessary to improve consistency, readability, and maintainability.
Preserve current functionality and avoid unnecessary abstractions.
Also point out the top technical debt issues still remaining after the refactor.
```

---

## 25. Final Working Principle

When using this prompt pack inside Cursor, follow this order:

1. paste the global instruction prompt,
2. scaffold the project,
3. build one module at a time,
4. test each module before moving on,
5. refactor only after the feature works end-to-end,
6. use polish prompts near the end.

The MVP succeeds if this loop works convincingly:

**assessment + context -> grounded AI guidance -> structured report -> reusable insight**

That is the heart of ZestLearn.

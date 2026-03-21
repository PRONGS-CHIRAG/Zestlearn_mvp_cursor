# ZestLearn System Architecture, Folder Structure, and API Contract

## 1. Document Purpose

This document translates the ZestLearn MVP product and technical PRD into a direct implementation guide for development.

It defines:

* system architecture,
* component responsibilities,
* project folder structure,
* data flow,
* backend function contracts,
* frontend module boundaries,
* service integrations,
* implementation conventions.

This document should be used as the primary engineering reference during the 24-hour MVP build.

---

## 2. MVP Build Objective

Build a working web application where a user can:

1. land on ZestLearn,
2. complete an AI assessment,
3. create a workspace,
4. upload documents,
5. chat with an AI consultant,
6. generate a structured AI opportunity report,
7. view reusable memory insights.

The implementation should prioritize:

* speed,
* simplicity,
* reliability,
* clean architecture,
* demo readiness.

---

## 3. System Architecture Overview

## 3.1 High-Level Architecture

The ZestLearn MVP consists of the following main layers:

### 1. Frontend Application

Responsible for:

* landing page,
* forms,
* workspace UI,
* document upload UI,
* consultant chat UI,
* report rendering,
* insights/memory display.

### 2. Backend Application Layer

Responsible for:

* handling requests,
* orchestrating AI calls,
* interacting with Convex,
* document processing,
* context assembly,
* report generation.

### 3. Database / Persistence Layer

Responsible for:

* workspaces,
* assessments,
* documents,
* chat messages,
* reports,
* memory patterns,
* optional logs/events.

### 4. AI Reasoning Layer

Responsible for:

* document summarization,
* chat completion,
* structured report generation,
* tagging,
* lightweight memory extraction.

### 5. Automation Layer

Responsible for:

* notifications,
* webhook triggers,
* optional report delivery,
* internal logging or founder alerts.

---

## 3.2 Recommended Technology Mapping

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* v0-generated UI as starting point

### App State / Database / Server Functions

* Convex

### AI Provider

* Google Gemini API

### Optional Secondary AI Provider

* Featherless.ai

### Orchestration / Parsing

* LangChain

### Automations

* n8n

### Optional Voice

* ElevenLabs

---

## 4. Component Responsibilities

## 4.1 Frontend Responsibilities

The frontend should:

* render pages,
* collect user input,
* call backend actions,
* display loading/progress/error states,
* display chat and report outputs,
* show saved memory insights.

The frontend should not:

* contain API secrets,
* perform direct LLM orchestration logic,
* hold business logic that should be reusable server-side.

---

## 4.2 Backend Responsibilities

The backend should:

* create and fetch workspaces,
* store assessments,
* process documents,
* assemble prompt context,
* call the model,
* validate structured report output,
* store reports,
* save memory patterns,
* expose clean API contracts.

---

## 4.3 Convex Responsibilities

Convex should act as:

* primary persistence layer,
* query/mutation backend,
* storage metadata manager,
* source of truth for workspace state.

Convex should store:

* user/workspace records,
* uploaded doc metadata,
* doc summaries,
* chat messages,
* report JSON,
* rendered report text,
* memory entries.

---

## 4.4 LLM Layer Responsibilities

The LLM layer should perform:

* assessment interpretation,
* document summarization,
* chat answer generation,
* report generation,
* memory extraction.

The LLM layer should return:

* plain text for chat,
* strict JSON for reports,
* summary + tags for documents,
* short reusable pattern statements for memory.

---

## 4.5 n8n Responsibilities

n8n should only be used for:

* notification workflows,
* founder alerts,
* simple webhook-triggered automations,
* optional CRM or spreadsheet logging,
* optional email delivery.

n8n should not own:

* primary chat state,
* primary report generation logic,
* core business logic.

---

## 5. End-to-End Data Flow

## 5.1 Assessment Flow

1. User opens landing page.
2. User clicks CTA.
3. User completes assessment form.
4. Frontend sends request to create workspace + assessment.
5. Backend persists workspace and assessment.
6. Frontend navigates user to workspace dashboard.

## 5.2 Document Upload Flow

1. User uploads file.
2. Frontend sends file metadata / upload request.
3. File is stored or referenced.
4. Backend extracts text.
5. Backend calls summarization pipeline.
6. Summary and tags are stored.
7. Frontend shows processed document card.

## 5.3 Chat Flow

1. User types message.
2. Frontend sends message to backend.
3. Backend stores user message.
4. Backend fetches relevant context.
5. Backend composes prompt.
6. Backend calls Gemini.
7. Backend stores assistant reply.
8. Frontend renders conversation.

## 5.4 Report Generation Flow

1. User clicks Generate Report.
2. Frontend triggers report generation request.
3. Backend fetches all relevant workspace context.
4. Backend composes structured report prompt.
5. Backend calls model.
6. Backend validates/parses JSON.
7. Backend renders markdown/text view.
8. Backend stores report.
9. Backend extracts memory patterns.
10. Frontend displays report.

## 5.5 Memory Flow

1. Report or chat output produces reusable insight.
2. Backend converts insight into a memory record.
3. Memory record is stored with scope and metadata.
4. Future chats/reports retrieve relevant patterns.

---

## 6. Project Folder Structure

Below is a recommended structure for a Next.js + Convex implementation.

```text
zestlearn/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── assessment/
│   │   └── page.tsx
│   ├── workspace/
│   │   └── [workspaceId]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── report/
│   │           └── page.tsx
│   └── api/
│       ├── upload/
│       │   └── route.ts
│       ├── chat/
│       │   └── route.ts
│       ├── report/
│       │   └── route.ts
│       └── webhook/
│           └── route.ts
│
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TargetAudience.tsx
│   │   └── CTASection.tsx
│   ├── assessment/
│   │   ├── AssessmentForm.tsx
│   │   ├── CompanyDetailsStep.tsx
│   │   ├── BottleneckStep.tsx
│   │   └── AIMaturityStep.tsx
│   ├── workspace/
│   │   ├── WorkspaceShell.tsx
│   │   ├── OverviewPanel.tsx
│   │   ├── DocumentsPanel.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── ReportsPanel.tsx
│   │   └── InsightsPanel.tsx
│   ├── documents/
│   │   ├── UploadDropzone.tsx
│   │   ├── DocumentCard.tsx
│   │   └── ProcessingStatusBadge.tsx
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   └── PromptStarters.tsx
│   ├── report/
│   │   ├── ReportView.tsx
│   │   ├── UseCaseCard.tsx
│   │   ├── RoadmapSection.tsx
│   │   └── RiskSection.tsx
│   └── shared/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Spinner.tsx
│       ├── EmptyState.tsx
│       └── ErrorState.tsx
│
├── convex/
│   ├── schema.ts
│   ├── users.ts
│   ├── workspaces.ts
│   ├── assessments.ts
│   ├── documents.ts
│   ├── chat.ts
│   ├── reports.ts
│   ├── memory.ts
│   ├── events.ts
│   └── http.ts
│
├── lib/
│   ├── ai/
│   │   ├── providers/
│   │   │   ├── gemini.ts
│   │   │   └── featherless.ts
│   │   ├── prompts/
│   │   │   ├── system.ts
│   │   │   ├── chat.ts
│   │   │   ├── summarize.ts
│   │   │   ├── report.ts
│   │   │   └── memory.ts
│   │   ├── parsers/
│   │   │   ├── reportParser.ts
│   │   │   └── summaryParser.ts
│   │   ├── context/
│   │   │   ├── buildChatContext.ts
│   │   │   ├── buildReportContext.ts
│   │   │   └── buildMemoryContext.ts
│   │   └── index.ts
│   ├── documents/
│   │   ├── extractText.ts
│   │   ├── summarizeDocument.ts
│   │   ├── tagDocument.ts
│   │   └── supportedTypes.ts
│   ├── reports/
│   │   ├── generateReport.ts
│   │   ├── renderMarkdown.ts
│   │   └── extractInsights.ts
│   ├── memory/
│   │   ├── savePatterns.ts
│   │   ├── retrievePatterns.ts
│   │   └── normalizePattern.ts
│   ├── validation/
│   │   ├── assessment.ts
│   │   ├── chat.ts
│   │   └── report.ts
│   ├── constants/
│   │   ├── app.ts
│   │   ├── prompts.ts
│   │   └── ui.ts
│   └── utils/
│       ├── format.ts
│       ├── logger.ts
│       ├── errors.ts
│       └── time.ts
│
├── hooks/
│   ├── useWorkspace.ts
│   ├── useDocuments.ts
│   ├── useChat.ts
│   └── useReport.ts
│
├── types/
│   ├── assessment.ts
│   ├── workspace.ts
│   ├── document.ts
│   ├── chat.ts
│   ├── report.ts
│   ├── memory.ts
│   └── api.ts
│
├── public/
│   └── assets/
│
├── n8n/
│   ├── report-generated-workflow.json
│   ├── assessment-submitted-workflow.json
│   └── lead-capture-workflow.json
│
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 7. Folder-Level Responsibility Guide

## 7.1 `app/`

Contains route-level pages and API endpoints.

### Rules

* keep route components thin,
* delegate logic to `lib/` or Convex,
* route files should mostly compose UI and call actions.

---

## 7.2 `components/`

Contains reusable UI modules.

### Rules

* presentation-focused,
* minimal business logic,
* clear separation between data fetching and display.

---

## 7.3 `convex/`

Contains schema, queries, and mutations.

### Rules

* Convex is the source of truth for persistent app state,
* each file should manage one domain,
* use named functions with narrow responsibilities.

---

## 7.4 `lib/`

Contains business logic, AI orchestration, processing pipelines, validation, and utilities.

### Rules

* keep model interaction code here,
* keep prompt builders here,
* do not scatter AI logic across pages or components.

---

## 7.5 `types/`

Contains shared type definitions.

### Rules

* define stable interfaces,
* share across frontend, backend, and processing layers.

---

## 8. Backend Domain Design

## 8.1 Workspace Domain

Responsible for:

* creating workspace,
* fetching workspace summary,
* loading linked assessment/report/doc state.

### Suggested Functions

* createWorkspace
* getWorkspaceById
* getWorkspaceDashboardData

---

## 8.2 Assessment Domain

Responsible for:

* validating assessment input,
* creating assessment record,
* updating assessment status,
* exposing data for prompt context.

### Suggested Functions

* submitAssessment
* getAssessmentByWorkspaceId
* markAssessmentAnalyzed

---

## 8.3 Documents Domain

Responsible for:

* upload metadata registration,
* extraction,
* summarization,
* tagging,
* document retrieval.

### Suggested Functions

* createDocumentRecord
* updateDocumentProcessingStatus
* saveDocumentSummary
* listWorkspaceDocuments

---

## 8.4 Chat Domain

Responsible for:

* storing user message,
* retrieving context,
* generating assistant response,
* storing assistant message.

### Suggested Functions

* createChatMessage
* listRecentMessages
* sendConsultantMessage

---

## 8.5 Report Domain

Responsible for:

* generating structured report,
* rendering formatted report,
* storing final artifact,
* exposing report history.

### Suggested Functions

* generateOpportunityReport
* createReportRecord
* getLatestReport
* listReports

---

## 8.6 Memory Domain

Responsible for:

* storing reusable insights,
* retrieving relevant patterns,
* exposing insight cards in UI.

### Suggested Functions

* saveMemoryPattern
* listRelevantPatterns
* extractPatternsFromReport
* extractPatternsFromChat

---

## 9. Convex Schema Recommendation

Below is a suggested schema design.

```ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    createdAt: v.number(),
  }),

  workspaces: defineTable({
    createdBy: v.optional(v.id("users")),
    companyName: v.string(),
    companyType: v.string(),
    companySize: v.string(),
    department: v.string(),
    role: v.string(),
    aiMaturity: v.number(),
    createdAt: v.number(),
  }),

  assessments: defineTable({
    workspaceId: v.id("workspaces"),
    bottleneck: v.string(),
    desiredOutcome: v.string(),
    currentTools: v.optional(v.string()),
    dataAvailability: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("analyzed")
    ),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  documents: defineTable({
    workspaceId: v.id("workspaces"),
    fileName: v.string(),
    fileType: v.string(),
    storagePath: v.optional(v.string()),
    extractedText: v.optional(v.string()),
    summary: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    processingStatus: v.union(
      v.literal("uploaded"),
      v.literal("processing"),
      v.literal("done"),
      v.literal("error")
    ),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  chatMessages: defineTable({
    workspaceId: v.id("workspaces"),
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  reports: defineTable({
    workspaceId: v.id("workspaces"),
    title: v.string(),
    structuredJson: v.any(),
    renderedMarkdown: v.string(),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  memoryPatterns: defineTable({
    workspaceId: v.optional(v.id("workspaces")),
    scope: v.union(v.literal("workspace"), v.literal("shared")),
    category: v.string(),
    functionArea: v.optional(v.string()),
    industry: v.optional(v.string()),
    patternText: v.string(),
    confidenceScore: v.optional(v.number()),
    sourceType: v.union(
      v.literal("report"),
      v.literal("chat"),
      v.literal("seed"),
      v.literal("document")
    ),
    createdAt: v.number(),
  }),

  events: defineTable({
    workspaceId: v.optional(v.id("workspaces")),
    eventType: v.string(),
    payload: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),
});
```

---

## 10. API Contract Design

The MVP can combine:

* Convex queries/mutations/actions for primary app behavior,
* route handlers for file uploads or external webhooks.

Below is the recommended contract design.

## 10.1 Assessment API Contract

### Create Workspace + Assessment

**Operation:** `submitAssessment`

**Request**

```ts
{
  companyName: string;
  companyType: string;
  companySize: string;
  department: string;
  role: string;
  aiMaturity: number;
  bottleneck: string;
  desiredOutcome: string;
  currentTools?: string;
  dataAvailability?: string;
}
```

**Response**

```ts
{
  success: true;
  workspaceId: string;
  assessmentId: string;
}
```

**Validation Rules**

* companyName required
* companyType required
* companySize required
* department required
* role required
* aiMaturity required and numeric
* bottleneck required
* desiredOutcome required

**Failure Response**

```ts
{
  success: false;
  error: string;
}
```

---

## 10.2 Workspace Dashboard Contract

### Get Workspace Dashboard Data

**Operation:** `getWorkspaceDashboardData`

**Request**

```ts
{
  workspaceId: string;
}
```

**Response**

```ts
{
  workspace: {
    id: string;
    companyName: string;
    companyType: string;
    companySize: string;
    department: string;
    role: string;
    aiMaturity: number;
  };
  assessment: {
    bottleneck: string;
    desiredOutcome: string;
    currentTools?: string;
    dataAvailability?: string;
    status: string;
  } | null;
  documents: Array<{
    id: string;
    fileName: string;
    fileType: string;
    processingStatus: string;
    summary?: string;
    tags?: string[];
  }>;
  latestReport: {
    id: string;
    title: string;
    renderedMarkdown: string;
    createdAt: number;
  } | null;
  insights: Array<{
    id: string;
    category: string;
    patternText: string;
    scope: string;
  }>;
}
```

---

## 10.3 Document Upload Contract

### Upload Document

This may use a route handler plus backend processing action.

**Operation:** `POST /api/upload`

**Request**

* multipart/form-data
* fields:

  * `workspaceId`
  * `file`

**Response**

```ts
{
  success: true;
  documentId: string;
  processingStatus: "uploaded" | "processing";
}
```

### Process Document Result

**Internal Output**

```ts
{
  documentId: string;
  extractedText: string;
  summary: string;
  tags: string[];
  processingStatus: "done" | "error";
}
```

### Failure Response

```ts
{
  success: false;
  error: string;
}
```

---

## 10.4 Chat API Contract

### Send Chat Message

**Operation:** `POST /api/chat` or Convex action wrapper

**Request**

```ts
{
  workspaceId: string;
  message: string;
}
```

**Response**

```ts
{
  success: true;
  reply: string;
  citations?: string[];
  usedContext: {
    documentsUsed: number;
    memoryPatternsUsed: number;
    recentMessagesUsed: number;
  };
}
```

### Backend Steps

1. validate message
2. save user message
3. fetch workspace profile
4. fetch assessment
5. fetch recent docs summaries
6. fetch recent chat history
7. fetch memory patterns
8. build prompt
9. call Gemini
10. save assistant reply
11. return result

### Failure Response

```ts
{
  success: false;
  error: string;
}
```

---

## 10.5 Report Generation Contract

### Generate Report

**Operation:** `POST /api/report` or Convex action wrapper

**Request**

```ts
{
  workspaceId: string;
}
```

**Response**

```ts
{
  success: true;
  report: {
    id: string;
    title: string;
    structuredJson: {
      problem_summary: string;
      current_pain_points: string[];
      recommended_use_cases: Array<{
        title: string;
        description: string;
        business_value: string;
        difficulty: "low" | "medium" | "high";
        data_requirements: string[];
        risks: string[];
        priority_score: number;
      }>;
      best_first_pilot: {
        title: string;
        why_this_first: string;
        success_metrics: string[];
      };
      roadmap_30_60_90: {
        days_30: string[];
        days_60: string[];
        days_90: string[];
      };
      open_questions: string[];
    };
    renderedMarkdown: string;
    createdAt: number;
  };
}
```

### Failure Response

```ts
{
  success: false;
  error: string;
}
```

---

## 10.6 Insights / Memory Contract

### Get Relevant Insights

**Operation:** `getRelevantMemoryPatterns`

**Request**

```ts
{
  workspaceId: string;
  limit?: number;
}
```

**Response**

```ts
{
  success: true;
  insights: Array<{
    id: string;
    category: string;
    patternText: string;
    scope: "workspace" | "shared";
    sourceType: string;
  }>;
}
```

---

## 11. Shared Type Definitions

Below are recommended core types.

## 11.1 Assessment Types

```ts
export interface AssessmentInput {
  companyName: string;
  companyType: string;
  companySize: string;
  department: string;
  role: string;
  aiMaturity: number;
  bottleneck: string;
  desiredOutcome: string;
  currentTools?: string;
  dataAvailability?: string;
}
```

## 11.2 Document Types

```ts
export interface DocumentSummary {
  id: string;
  fileName: string;
  fileType: string;
  extractedText?: string;
  summary?: string;
  tags?: string[];
  processingStatus: "uploaded" | "processing" | "done" | "error";
}
```

## 11.3 Chat Types

```ts
export interface ChatMessage {
  id: string;
  workspaceId: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
}
```

## 11.4 Report Types

```ts
export interface RecommendedUseCase {
  title: string;
  description: string;
  business_value: string;
  difficulty: "low" | "medium" | "high";
  data_requirements: string[];
  risks: string[];
  priority_score: number;
}

export interface OpportunityReport {
  problem_summary: string;
  current_pain_points: string[];
  recommended_use_cases: RecommendedUseCase[];
  best_first_pilot: {
    title: string;
    why_this_first: string;
    success_metrics: string[];
  };
  roadmap_30_60_90: {
    days_30: string[];
    days_60: string[];
    days_90: string[];
  };
  open_questions: string[];
}
```

## 11.5 Memory Types

```ts
export interface MemoryPattern {
  id: string;
  category: string;
  patternText: string;
  scope: "workspace" | "shared";
  sourceType: "report" | "chat" | "seed" | "document";
  confidenceScore?: number;
}
```

---

## 12. AI Service Design

## 12.1 AI Provider Interface

Create an abstraction so Gemini is the primary provider but not tightly coupled.

```ts
export interface AIProvider {
  generateText(input: {
    systemPrompt: string;
    userPrompt: string;
    temperature?: number;
  }): Promise<string>;

  generateStructured<T>(input: {
    systemPrompt: string;
    userPrompt: string;
    schemaHint: string;
    temperature?: number;
  }): Promise<T>;
}
```

### Initial Providers

* `GeminiProvider`
* `FeatherlessProvider` (optional)

---

## 12.2 Prompt Builder Design

Each AI task should have its own prompt builder.

### Required Prompt Builders

* `buildChatPrompt()`
* `buildSummaryPrompt()`
* `buildReportPrompt()`
* `buildMemoryExtractionPrompt()`

### Why

This keeps prompts modular and editable without touching route files.

---

## 12.3 Context Builder Design

Build small deterministic context builders.

### Required Context Builders

* `buildWorkspaceProfileContext()`
* `buildDocumentContext()`
* `buildRecentChatContext()`
* `buildMemoryContext()`
* `buildReportContext()`

### Rule

Always pass compact structured context, not raw full database dumps.

---

## 13. Document Processing Design

## 13.1 Processing Pipeline

1. validate file type
2. create `documents` record
3. set status to `processing`
4. extract text
5. trim noisy content if needed
6. summarize text using model
7. generate tags
8. save final document summary
9. set status to `done`

## 13.2 MVP Extraction Strategy

Use the simplest stable extraction possible.

### Priority

* plain text input fallback,
* PDF text extraction,
* DOCX only if easy.

### Rule

Do not block the MVP on perfect parsing.
If parsing fails, let user paste text manually.

---

## 14. Report Rendering Design

The report should be stored in:

1. structured JSON,
2. rendered markdown.

## 14.1 Rendering Pipeline

1. validate structured JSON
2. map sections to markdown template
3. display markdown or render section cards

## 14.2 UI Rendering Sections

* Problem Summary
* Top Use Cases
* Best First Pilot
* Risks
* 30/60/90 Roadmap
* Open Questions

### Rule

Do not rely on LLM-generated markdown alone. Always generate from structured data when possible.

---

## 15. Memory Extraction Design

## 15.1 When to Extract Memory

* after report generation,
* optionally after significant chat exchanges,
* optionally after document summarization.

## 15.2 What to Extract

Examples:

* recurring bottleneck themes,
* suggested low-risk pilot patterns,
* common objections,
* risk warnings,
* domain recommendations.

## 15.3 Example Pattern Format

```ts
{
  category: "first_pilot",
  patternText: "Documentation-heavy teams often start with summarization and document triage copilots.",
  scope: "shared",
  sourceType: "report"
}
```

---

## 16. Frontend Page Contracts

## 16.1 Landing Page Contract

### Purpose

Drive user to assessment.

### Inputs

None

### Outputs

* CTA click event

### Components

* Hero
* HowItWorks
* TargetAudience
* ExampleOutputSection
* CTASection

---

## 16.2 Assessment Page Contract

### Purpose

Capture structured onboarding data.

### Input

`AssessmentInput`

### Output

* success response with workspaceId
* redirect to `/workspace/[workspaceId]`

---

## 16.3 Workspace Page Contract

### Purpose

Display all workspace state.

### Input

* `workspaceId`

### Output

* overview,
* docs,
* chat,
* report,
* insights.

---

## 16.4 Report Page Contract

### Purpose

Render latest generated report or report history item.

### Input

* `workspaceId`
* optional `reportId`

### Output

* formatted report screen

---

## 17. Loading and Error State Design

## 17.1 Loading States

Required loading states:

* assessment submission
* workspace initialization
* document processing
* chat generation
* report generation

## 17.2 Error States

Required error states:

* invalid form data
* upload failure
* extraction failure
* AI response failure
* JSON parse failure
* report generation failure

## 17.3 UX Rule

Every async action must visibly show:

* started,
* in progress,
* completed,
* failed.

---

## 18. Logging and Event Tracking Design

## 18.1 Event Types

Recommended events:

* `landing_page_viewed`
* `assessment_started`
* `assessment_submitted`
* `workspace_created`
* `document_uploaded`
* `document_processed`
* `chat_message_sent`
* `chat_message_completed`
* `report_generation_started`
* `report_generated`
* `memory_pattern_saved`

## 18.2 Event Storage

Store lightweight events in `events` table.

### Purpose

* debug user flow,
* understand funnel,
* demo tracking,
* founder visibility.

---

## 19. Environment Variables

Suggested environment variables:

```bash
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=
GEMINI_API_KEY=
FEATHERLESS_API_KEY=
N8N_WEBHOOK_URL=
ELEVENLABS_API_KEY=
```

### Rules

* never expose secret keys client-side,
* frontend should only access public-safe env vars,
* all provider keys live server-side.

---

## 20. Implementation Conventions

## 20.1 Naming Conventions

* Components: `PascalCase`
* Functions: `camelCase`
* Convex files: domain-based lowercase
* Types: `PascalCase`
* Route folders: lowercase

## 20.2 Code Organization Rules

* keep prompts separate from route handlers,
* keep parsers separate from providers,
* keep rendering logic separate from generation logic,
* prefer small pure functions for context assembly.

## 20.3 MVP Development Principle

When in doubt, choose:

* simpler architecture,
* fewer abstractions,
* deterministic flows,
* visible end-to-end functionality.

---

## 21. Recommended Build Order

### Step 1

Initialize Next.js app and Tailwind UI

### Step 2

Set up Convex schema and base queries/mutations

### Step 3

Build landing page and assessment form

### Step 4

Implement workspace dashboard shell

### Step 5

Implement assessment submission flow

### Step 6

Implement document upload + summarization pipeline

### Step 7

Implement chat backend and chat UI

### Step 8

Implement report generation and report rendering

### Step 9

Implement memory extraction and insight cards

### Step 10

Add n8n notifications and polish demo states

---

## 22. Minimal API Sequence for First Working Demo

For the first demo, the app only needs this sequence to work reliably:

1. `submitAssessment`
2. `getWorkspaceDashboardData`
3. `uploadDocument`
4. `sendChatMessage`
5. `generateOpportunityReport`
6. `getRelevantMemoryPatterns`

If these six operations work, the MVP is demoable.

---

## 23. Demo Readiness Checklist

The system is demo-ready when:

* landing page is functional,
* assessment creates workspace,
* user can upload at least one file,
* uploaded file gets summarized,
* user can send at least one chat message,
* assistant reply is contextual,
* report generation returns structured output,
* report renders cleanly,
* one memory/insight card appears,
* app survives basic error cases.

---

## 24. Final Engineering Summary

The ZestLearn MVP should be built as a clean, context-driven web application with a strong separation between UI, persistence, AI orchestration, and reusable processing logic. The architecture must support a reliable end-to-end consulting workflow while remaining simple enough for a solo founder to implement within 24 hours.

The system should be optimized not for maximal feature count, but for a convincing product loop:

**context in → reasoning grounded in context → structured recommendation out → insight saved for reuse**

That loop is the technical heart of the ZestLearn MVP.

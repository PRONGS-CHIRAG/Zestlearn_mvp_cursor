# ZestLearn Technical PRD

## 1. Document Information

### Product

**ZestLearn**

### Document Type

**Technical Product Requirements Document (PRD)**

### MVP Version

**v0.1 — 24-Hour Solo Build MVP**

### Product Theme

AI consultant copilot for pharma and biotech SMEs

### Primary Objective

Build a fully working MVP that allows a user to provide company context, upload documents, chat with an AI consultant, and generate a structured AI opportunity report with lightweight reusable memory.

---

## 2. Executive Summary

ZestLearn is an AI consulting copilot designed for pharma and biotech SMEs that want practical help identifying where AI can create value. The MVP focuses on one end-to-end workflow:

1. user starts an assessment,
2. provides company and problem context,
3. uploads supporting documents,
4. interacts with a domain-aware consultant chat,
5. generates a structured AI opportunity report,
6. stores outputs and reusable patterns in a lightweight collective memory layer.

The system should feel more like a guided consultant than a generic chatbot.

---

## 3. Product Goals

### Primary Goal

Enable a user to go from a vague business problem to a practical first AI pilot recommendation.

### Secondary Goals

* Ground the system in uploaded company context
* Produce structured outputs that can be shared internally
* Demonstrate ZestLearn’s collective memory concept
* Be fully demoable and functional within 24 hours of solo development

### Non-Goals

* Full enterprise security stack
* Formal regulatory compliance engine
* Multi-user collaboration workflows
* Fine-grained RBAC
* Advanced agent orchestration across many specialized agents
* Mobile app support

---

## 4. Target User

### Primary Persona

Innovation, operations, or digital transformation lead at a pharma/biotech SME

### User Characteristics

* Interested in AI adoption
* Not necessarily an AI expert
* Needs practical guidance
* Needs internal buy-in material
* Wants low-risk, high-value pilots

### User Job-To-Be-Done

“Help me understand which AI use case we should pursue first, based on our actual business bottlenecks and available context.”

---

## 5. Problem Statement

Pharma and biotech SMEs often understand that AI could create value, but they do not know where to begin. Their business context is fragmented, their internal processes are hard to translate into AI opportunities, and they lack the internal expertise to prioritize a low-risk, high-impact first pilot.

---

## 6. Solution Overview

ZestLearn provides a guided workflow that combines structured onboarding, document-grounded AI reasoning, and a consultant-style interface to produce AI opportunity recommendations and a practical pilot roadmap.

The product’s technical design should support the following promise:

> Given a company context, business pain point, and optional supporting documents, the system can recommend realistic AI use cases, identify the best first pilot, describe required data/assets, highlight risks, and suggest next steps.

---

## 7. User Stories

### Core User Stories

1. As a user, I want to enter my company and workflow context so the AI can give me tailored advice.
2. As a user, I want to upload internal documents so recommendations are grounded in my reality.
3. As a user, I want to ask practical consulting questions in chat.
4. As a user, I want a structured report I can use internally.
5. As a user, I want the system to remember prior interactions and reused patterns.

### Admin / Founder Story

6. As the founder, I want to inspect user submissions and generated outputs to validate product-market fit and demo readiness.

---

## 8. Functional Scope

## 8.1 In Scope

* Landing page
* Guided assessment form
* Workspace creation
* Document upload
* Document text extraction and summarization
* Consultant chat
* Report generation
* Lightweight collective memory layer
* Storage of chats, docs, reports, summaries, and memory items

## 8.2 Out of Scope

* Enterprise authentication stack
* SSO
* Multi-seat collaboration
* Compliance audit workflows
* PDF export engine if time is limited
* Complex analytics dashboards
* Full vector database optimization

---

## 9. Technical Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* Initial UI scaffold generated via **v0**

### Backend / Database

* **Convex** for:

  * database
  * server-side mutations and queries
  * realtime app state
  * storage metadata

### AI / LLM Layer

* **Google Gemini API** as primary model provider
* **Featherless.ai** as optional secondary / fallback model provider

### Orchestration / Logic

* **LangChain** for:

  * prompt composition
  * structured output parsing
  * lightweight retrieval / memory pipeline
  * model abstraction

### Automation Layer

* **n8n** for:

  * async-like report trigger flow
  * notification hooks
  * optional email delivery
  * internal logging / founder alerts

### Voice Layer (Optional / Nice-to-Have)

* **ElevenLabs** for report narration or audio summary

---

## 10. System Architecture

### High-Level Components

1. Frontend Web App
2. Backend + Database
3. LLM Orchestration Layer
4. Document Processing Pipeline
5. Memory Layer
6. Automation / Notification Layer

### Architectural Flow

1. User enters assessment data from frontend
2. Frontend sends assessment payload to Convex
3. Convex stores workspace and assessment
4. User uploads documents
5. Backend extracts and summarizes document text
6. User interacts with consultant chat
7. Chat backend retrieves:

   * company profile
   * assessment context
   * document summaries
   * memory patterns
8. LLM generates contextual answer
9. When requested, backend generates structured opportunity report
10. Report is stored and rendered in the workspace
11. Key signals are saved into memory tables
12. Optional n8n workflow sends notification/email

---

## 11. Core Modules

## 11.1 Landing Page Module

### Purpose

Explain value proposition and push user to the assessment flow.

### Required Elements

* hero section
* product description
* target audience section
* how it works section
* example outputs
* CTA button

### Primary CTA

**Start Your AI Assessment**

### Acceptance Criteria

* User can access landing page
* CTA navigates to assessment flow
* Page loads without auth requirement

---

## 11.2 Assessment Module

### Purpose

Capture structured user and company context.

### Inputs

* companyName
* companyType
* companySize
* department
* role
* bottleneck
* desiredOutcome
* aiMaturity
* currentTools (optional)
* dataAvailability (optional)

### Processing

* validate required fields
* create workspace
* create assessment record
* seed initial consultant context

### Outputs

* workspace created
* user redirected to workspace dashboard

### Acceptance Criteria

* Form validates missing required fields
* Submission persists data in backend
* Workspace is created successfully
* Stored data can be retrieved for downstream prompts

---

## 11.3 Workspace Module

### Purpose

Provide persistent place for all interaction artifacts.

### Tabs / Sections

* Overview
* Documents
* Chat
* Reports
* Insights / Memory

### Data Displayed

* profile summary
* uploaded docs and summaries
* recent chat messages
* generated reports
* memory snippets or “similar patterns”

### Acceptance Criteria

* Workspace loads after assessment submission
* Tabs are navigable
* Existing stored data is visible without page reload issues

---

## 11.4 Document Upload Module

### Purpose

Allow users to provide context files for grounding.

### Supported File Types

* PDF
* TXT
* DOCX if time permits
* pasted text as fallback

### Processing Pipeline

1. upload file metadata
2. store file reference / blob path
3. extract text
4. summarize extracted text
5. tag summary
6. store output to documents table

### Outputs per Document

* fileName
* fileType
* storageUrl / path
* extractedText
* summary
* tags
* processingStatus

### Acceptance Criteria

* User can upload at least one supported file
* File processing status is visible
* Summary is generated and stored
* Summary can be used in chat/report prompts

---

## 11.5 Consultant Chat Module

### Purpose

Deliver the core advisor experience.

### Chat Input

* free-text user question

### Chat Context Sources

* workspace profile
* assessment data
* uploaded document summaries
* recent chat history
* memory patterns

### Chat Output Requirements

* practical consultant-style response
* pharma/biotech aware framing
* explicit assumptions where information is missing
* preference for realistic and low-risk recommendations

### Optional Prompt Starters

* Find AI use cases
* Assess feasibility
* Recommend first pilot
* Identify risks
* Draft stakeholder summary

### Acceptance Criteria

* Chat persists messages
* Each response includes grounded contextual reasoning
* Chat pulls from document summaries and workspace state
* Errors are handled gracefully

---

## 11.6 Report Generation Module

### Purpose

Produce the main value artifact.

### Trigger Conditions

* user clicks “Generate Report”
* minimum required context exists:

  * assessment completed
  * at least one bottleneck entered
  * optional docs if available

### Input Sources

* assessment
* workspace profile
* doc summaries
* recent chat insights
* pattern library / memory

### Output Format

Two representations:

1. JSON object for storage/rendering
2. markdown/rendered report for UI

### Required Report Sections

* problem summary
* current pain points
* recommended use cases
* best first pilot
* data requirements
* risks and compliance considerations
* implementation difficulty
* roadmap 30/60/90
* open questions

### Acceptance Criteria

* Report can be generated end-to-end
* Report is persisted to backend
* Report is displayed in UI
* Top recommendations are readable and coherent

---

## 11.7 Collective Memory Module

### Purpose

Demonstrate the reusable learning layer.

### MVP Memory Layers

#### Session Memory

* latest messages
* active user intent

#### Workspace Memory

* past reports
* recurring bottlenecks
* uploaded doc summaries
* prior recommendation patterns

#### Shared Pattern Library

* generic reusable use case templates
* common blockers by function
* common risks by workflow type

### Memory Output Examples

* similar teams often begin with document triage
* low maturity teams should pilot copilots before automation
* compliance-heavy teams need human-in-the-loop review

### Acceptance Criteria

* Memory entries are stored after report generation
* Chat can retrieve and incorporate saved patterns
* UI can display at least one reusable insight block

---

## 12. Data Model

## 12.1 Tables / Collections

### users

```ts
{
  _id,
  name?: string,
  email?: string,
  createdAt: number
}
```

### workspaces

```ts
{
  _id,
  createdBy?: Id<"users">,
  companyName: string,
  companyType: string,
  companySize: string,
  department: string,
  role: string,
  aiMaturity: number,
  createdAt: number
}
```

### assessments

```ts
{
  _id,
  workspaceId: Id<"workspaces">,
  bottleneck: string,
  desiredOutcome: string,
  currentTools?: string,
  dataAvailability?: string,
  status: "draft" | "submitted" | "analyzed",
  createdAt: number
}
```

### documents

```ts
{
  _id,
  workspaceId: Id<"workspaces">,
  fileName: string,
  fileType: string,
  storagePath?: string,
  extractedText?: string,
  summary?: string,
  tags?: string[],
  processingStatus: "uploaded" | "processing" | "done" | "error",
  createdAt: number
}
```

### chatMessages

```ts
{
  _id,
  workspaceId: Id<"workspaces">,
  role: "user" | "assistant" | "system",
  content: string,
  metadata?: any,
  createdAt: number
}
```

### reports

```ts
{
  _id,
  workspaceId: Id<"workspaces">,
  title: string,
  structuredJson: any,
  renderedMarkdown: string,
  createdAt: number
}
```

### memoryPatterns

```ts
{
  _id,
  workspaceId?: Id<"workspaces">,
  scope: "workspace" | "shared",
  category: string,
  functionArea?: string,
  industry?: string,
  patternText: string,
  confidenceScore?: number,
  sourceType: "report" | "chat" | "seed" | "document",
  createdAt: number
}
```

---

## 13. API / Backend Function Design

## 13.1 Workspace Functions

### createWorkspace

**Input:**

```ts
{
  companyName: string,
  companyType: string,
  companySize: string,
  department: string,
  role: string,
  aiMaturity: number
}
```

**Output:**

```ts
{
  workspaceId: string
}
```

### getWorkspace

**Input:** workspaceId

**Output:** workspace details + linked assessment summary

---

## 13.2 Assessment Functions

### submitAssessment

**Input:**

```ts
{
  workspaceId: string,
  bottleneck: string,
  desiredOutcome: string,
  currentTools?: string,
  dataAvailability?: string
}
```

**Output:**

```ts
{
  assessmentId: string,
  status: "submitted"
}
```

---

## 13.3 Document Functions

### uploadDocumentMetadata

Registers file before processing.

### processDocument

**Pipeline:**

* fetch file
* extract text
* summarize using LLM
* generate tags
* store result

### listDocuments

Returns all docs for a workspace

---

## 13.4 Chat Functions

### sendChatMessage

**Input:**

```ts
{
  workspaceId: string,
  message: string
}
```

**Backend Logic:**

1. store user message
2. retrieve workspace context
3. retrieve recent chat history
4. retrieve doc summaries
5. retrieve memory patterns
6. compose prompt
7. call model
8. store assistant message
9. return assistant response

**Output:**

```ts
{
  reply: string
}
```

---

## 13.5 Report Functions

### generateOpportunityReport

**Input:**

```ts
{
  workspaceId: string
}
```

**Backend Logic:**

1. fetch assessment
2. fetch workspace profile
3. fetch documents
4. fetch chat summary or recent key messages
5. fetch memory patterns
6. compose report prompt
7. call LLM with structured output format
8. store JSON + rendered markdown
9. extract memory items from result
10. return report

**Output:**

```ts
{
  reportId: string,
  structuredJson: any,
  renderedMarkdown: string
}
```

---

## 13.6 Memory Functions

### createMemoryPattern

Stores reusable pattern entry

### getRelevantMemoryPatterns

Returns memory records filtered by:

* workspaceId
* function area
* category
* industry

---

## 14. Prompt Architecture

## 14.1 System Prompt for Chat

The model should be instructed to:

* act as an AI transformation consultant for pharma and biotech SMEs,
* prioritize practicality over hype,
* recommend feasible low-risk pilots,
* clearly state assumptions,
* identify gaps in data or context,
* avoid overclaiming,
* produce concise but structured answers.

### Example Prompt Frame

```text
You are an AI transformation consultant for pharma and biotech SMEs.
Your job is to help the user identify realistic, practical AI opportunities.
Base your answers on the provided company context, uploaded document summaries, and prior workspace insights.
Avoid generic advice. Prefer low-risk, high-value first pilots. Highlight assumptions and missing information.
```

## 14.2 Context Blocks

Prompt inputs should include:

* company profile
* assessment details
* document summaries
* recent conversation history
* memory snippets

## 14.3 Structured Report Prompt

The report generator should request strict JSON output first, then convert to markdown if needed.

### Suggested JSON Schema

```json
{
  "problem_summary": "",
  "current_pain_points": [],
  "recommended_use_cases": [
    {
      "title": "",
      "description": "",
      "business_value": "",
      "difficulty": "low | medium | high",
      "data_requirements": [],
      "risks": [],
      "priority_score": 0
    }
  ],
  "best_first_pilot": {
    "title": "",
    "why_this_first": "",
    "success_metrics": []
  },
  "roadmap_30_60_90": {
    "days_30": [],
    "days_60": [],
    "days_90": []
  },
  "open_questions": []
}
```

---

## 15. Retrieval and Context Strategy

### Retrieval Priority Order

1. assessment and workspace profile
2. recent chat history
3. uploaded document summaries
4. workspace memory patterns
5. shared pattern library

### MVP Retrieval Strategy

Do not build a complex RAG pipeline if time is limited.
Use:

* stored summaries,
* recent messages,
* tagged memory snippets,
* lightweight filtering by workspace and category.

### Reasoning Strategy

* context-first prompt assembly
* no autonomous multi-agent graph required for MVP
* simple deterministic flow preferred

---

## 16. n8n Workflow Design

### Workflow A: New Assessment Notification

**Trigger:** assessment submitted

**Actions:**

* receive webhook or app event
* log entry
* send founder notification

### Workflow B: Report Generated Notification

**Trigger:** report created

**Actions:**

* optional email to user
* founder alert for demo tracking

### Workflow C: Lead Capture / CRM Sync

**Trigger:** user starts assessment

**Actions:**

* add entry to spreadsheet / notion / internal tracker

### Note

Core chat and report generation should remain inside the app/backend, not delegated entirely to n8n.

---

## 17. UI Requirements

## 17.1 Landing Page

Required UI elements:

* headline
* subheadline
* CTA
* “How it works” section
* target audience section
* example outputs

## 17.2 Assessment Form

Required UI elements:

* progress-friendly layout
* required field validation
* dropdowns for company size and AI maturity
* textarea for bottleneck

## 17.3 Workspace

Required UI elements:

* sidebar or tabs
* overview card
* doc cards
* chat interface
* report preview panel

## 17.4 Report Screen

Required UI elements:

* executive summary
* use case cards
* priority labels
* roadmap sections
* risk section

## 17.5 Insights / Memory Block

Required UI elements:

* “Similar patterns” card
* “Common blockers” card
* “Suggested next move” card

---

## 18. Error Handling Requirements

### Assessment Errors

* empty required fields
* invalid AI maturity format

### Document Errors

* unsupported file type
* extraction failure
* empty extracted text

### LLM Errors

* API timeout
* malformed structured output
* provider failure

### Recovery Behavior

* show friendly fallback message
* allow retry
* preserve user state
* log failure details where possible

---

## 19. Security and Data Handling

### MVP Security Assumptions

This is not production-grade compliance infrastructure.
The MVP should still apply basic safety principles.

### Minimum Requirements

* store only necessary user data
* avoid exposing raw secrets on frontend
* use environment variables for API keys
* isolate workspace data in queries
* show disclaimer that sensitive production documents should not be uploaded in early demo environment

### Nice-to-Have

* basic auth later
* file access rules
* redaction pipeline later

---

## 20. Performance Requirements

### UX Expectations

* assessment submit: near instant
* chat response: acceptable within a few seconds
* document processing: async feel with visible status
* report generation: longer than chat is acceptable if status is shown

### MVP Standard

Fast enough to demo without obvious latency problems.

---

## 21. Analytics / Logging

### Events to Track

* landing_page_viewed
* assessment_started
* assessment_submitted
* workspace_created
* document_uploaded
* document_processed
* chat_message_sent
* report_generated
* memory_pattern_saved

### Purpose

* demo validation
* funnel analysis
* founder feedback loop

---

## 22. Acceptance Criteria Summary

The MVP is complete when:

* a user can start from landing page,
* submit an assessment,
* create a workspace,
* upload at least one document,
* receive a document summary,
* ask chat questions,
* generate a structured report,
* view stored report in UI,
* see at least one memory-derived insight.

---

## 23. Testing Scenarios

### Scenario 1: Documentation Burden

**Input:** company with workflow documentation overload

**Expected Output:**

* recommends summarization/classification/search assistant
* suggests low-risk first pilot
* flags review workflow considerations

### Scenario 2: Knowledge Fragmentation

**Input:** R&D team with scattered knowledge

**Expected Output:**

* recommends internal knowledge assistant
* suggests data capture and tagging as prerequisite
* highlights importance of source quality

### Scenario 3: Operational Inefficiency

**Input:** operations lead with repetitive manual review tasks

**Expected Output:**

* recommends triage/copilot workflow
* identifies needed inputs/data
* provides phased roadmap

---

## 24. Build Prioritization

## Must Have

* assessment
* workspace
* docs upload + summary
* chat
* report generation
* memory storage

## Should Have

* polished report UI
* prompt starters
* n8n notifications

## Nice to Have

* ElevenLabs narration
* email report delivery
* fallback model switching
* richer insight cards

---

## 25. 24-Hour Delivery Plan

### Phase 1

Set up repo, frontend scaffold, routing, Convex schema

### Phase 2

Implement assessment and workspace creation

### Phase 3

Implement document upload and summarization pipeline

### Phase 4

Implement consultant chat with contextual prompt assembly

### Phase 5

Implement structured report generation and rendering

### Phase 6

Implement memory extraction and display

### Phase 7

Polish UI, test demo scenarios, connect n8n notifications

---

## 26. Risks and Tradeoffs

### Risk 1

Too much complexity from over-engineering agent orchestration

**Mitigation:** keep deterministic pipeline and one main model

### Risk 2

Document processing becomes too slow or fragile

**Mitigation:** support plain text fallback and prioritize summary over full RAG

### Risk 3

Report output becomes inconsistent

**Mitigation:** structured JSON schema and parser validation

### Risk 4

Collective layer feels too weak

**Mitigation:** explicitly show reusable insights in UI even if implemented simply

---

## 27. Launch Readiness Checklist

* landing page works
* assessment works
* workspace creation works
* one file upload works
* one summarization flow works
* chat works with context
* report generation works reliably
* report looks presentable
* memory snippet appears in UI
* at least 3 demo examples tested

---

## 28. Final Technical Summary

The ZestLearn MVP should be implemented as a lightweight but complete AI consulting workflow. The architecture should prioritize speed, clarity, and demoability over complexity. The backend should store structured company context, document summaries, chat history, reports, and simple memory patterns. The LLM layer should be grounded in retrieved workspace context and return structured outputs that drive both the user experience and future memory reuse.

The MVP succeeds if it can consistently transform a user’s business bottleneck into:

* a set of realistic AI opportunities,
* a recommended first pilot,
* an explanation of risks and requirements,
* and a concrete roadmap for next steps.

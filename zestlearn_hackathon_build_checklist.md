# ZestLearn Hackathon Build Checklist

## Core Rule

Build only what is needed for this loop to work:

**Assessment → Workspace → Document Upload → Consultant Chat → Report → Memory Insight**

If this loop works end-to-end, the MVP works.

---

## Hour 0–1: Setup

* [ ] Create Next.js + TypeScript + Tailwind project
* [ ] Install Convex
* [ ] Create base folder structure
* [ ] Add `.env.local`
* [ ] Add placeholder routes
* [ ] Confirm app runs locally

### Done Check

* [ ] Local app boots without errors
* [ ] Base routes exist

---

## Hour 1–3: Landing + Assessment

* [ ] Build landing page
* [ ] Add Hero section
* [ ] Add How It Works section
* [ ] Add Target Audience section
* [ ] Add CTA section
* [ ] Build assessment form UI
* [ ] Add validation
* [ ] Add submit button and loading state

### Done Check

* [ ] Landing page looks usable
* [ ] Assessment form renders fully
* [ ] Validation works

---

## Hour 3–5: Convex Backend Basics

* [ ] Create Convex schema
* [ ] Add `workspaces` table
* [ ] Add `assessments` table
* [ ] Add `documents` table
* [ ] Add `chatMessages` table
* [ ] Add `reports` table
* [ ] Add `memoryPatterns` table
* [ ] Add `events` table
* [ ] Implement workspace creation
* [ ] Implement assessment submission
* [ ] Implement workspace dashboard query

### Done Check

* [ ] Assessment submission creates workspace
* [ ] Workspace data can be fetched

---

## Hour 5–7: Workspace Shell

* [ ] Build workspace route
* [ ] Build WorkspaceShell layout
* [ ] Add Overview panel
* [ ] Add Documents panel
* [ ] Add Chat panel
* [ ] Add Reports panel
* [ ] Add Insights panel
* [ ] Connect dashboard query to workspace page

### Done Check

* [ ] Workspace loads after assessment submission
* [ ] Tabs/panels show real data

---

## Hour 7–10: Document Upload

* [ ] Build upload dropzone
* [ ] Build document card
* [ ] Build processing status badge
* [ ] Create upload API route
* [ ] Validate file types
* [ ] Create document record in backend
* [ ] Implement text extraction helper
* [ ] Implement summarization helper
* [ ] Save summary and tags
* [ ] Show processed documents in UI

### Done Check

* [ ] User can upload at least one file
* [ ] Processing status changes correctly
* [ ] Summary appears in workspace

---

## Hour 10–14: Consultant Chat

* [ ] Build chat window
* [ ] Build chat input
* [ ] Build chat message component
* [ ] Add prompt starters
* [ ] Create chat API route
* [ ] Save user messages
* [ ] Fetch workspace context
* [ ] Fetch doc summaries
* [ ] Fetch memory patterns
* [ ] Build chat prompt
* [ ] Integrate Gemini provider
* [ ] Save assistant replies

### Done Check

* [ ] User can send a message
* [ ] Assistant responds
* [ ] Response uses real workspace/doc context

---

## Hour 14–18: Report Generation

* [ ] Create report types
* [ ] Create report prompt
* [ ] Create report generator helper
* [ ] Create report parser/validator
* [ ] Create markdown renderer
* [ ] Create report API route
* [ ] Save report in backend
* [ ] Build ReportView UI
* [ ] Build UseCaseCard
* [ ] Build RoadmapSection
* [ ] Build RiskSection
* [ ] Add Generate Report button

### Done Check

* [ ] Report generates from workspace context
* [ ] Structured report is stored
* [ ] Report renders clearly in UI

---

## Hour 18–20: Memory Layer

* [ ] Create memory extraction helper
* [ ] Normalize memory pattern structure
* [ ] Save patterns from report
* [ ] Create memory retrieval helper
* [ ] Show insights in Insights panel
* [ ] Seed a few shared patterns

### Done Check

* [ ] At least one memory insight appears after report generation
* [ ] Insights feel relevant to the workspace

---

## Hour 20–22: Error + Loading States

* [ ] Add loading state for assessment submission
* [ ] Add loading state for workspace fetch
* [ ] Add loading state for document processing
* [ ] Add loading state for chat response
* [ ] Add loading state for report generation
* [ ] Add empty state for no documents
* [ ] Add empty state for no chat yet
* [ ] Add empty state for no report yet
* [ ] Add error state for upload failure
* [ ] Add error state for chat failure
* [ ] Add error state for report failure

### Done Check

* [ ] No major flow fails silently
* [ ] UI remains usable during async work

---

## Hour 22–23: n8n + Instrumentation

* [ ] Add webhook route
* [ ] Send event on assessment submission
* [ ] Send event on report generation
* [ ] Log basic app events

### Done Check

* [ ] Important events can be observed externally or in logs

---

## Hour 23–24: Demo Prep

* [ ] Test scenario 1: documentation-heavy workflow
* [ ] Test scenario 2: R&D knowledge fragmentation
* [ ] Test scenario 3: operations inefficiency
* [ ] Clean up obvious UI issues
* [ ] Remove broken placeholder text
* [ ] Add seed insights if needed
* [ ] Verify CTA flow from landing page to report

### Done Check

* [ ] One full demo flow works end-to-end
* [ ] App is stable enough for presentation

---

## Must-Have Features

* [ ] Landing page
* [ ] Assessment form
* [ ] Workspace creation
* [ ] Document upload
* [ ] Document summary
* [ ] Consultant chat
* [ ] Report generation
* [ ] Memory insights

---

## Should-Have Features

* [ ] Polished cards and layout
* [ ] Prompt starters
* [ ] n8n webhook notifications
* [ ] Seed demo patterns

---

## Nice-to-Have Features

* [ ] Featherless fallback model
* [ ] ElevenLabs audio summary
* [ ] Report history page
* [ ] Manual pasted-text upload fallback

---

## Kill List

Do **not** spend time on these unless everything core is finished:

* [ ] advanced multi-agent orchestration
* [ ] enterprise auth
* [ ] RBAC
* [ ] full compliance engine
* [ ] complex analytics dashboards
* [ ] mobile app
* [ ] perfect file parsing
* [ ] pixel-perfect design obsession

---

## Final Demo Checklist

* [ ] Landing page loads cleanly
* [ ] CTA works
* [ ] Assessment submits correctly
* [ ] Workspace loads
* [ ] User can upload a document
* [ ] Document gets summarized
* [ ] User can ask a consulting question
* [ ] Assistant gives a contextual answer
* [ ] User can generate a report
* [ ] Report shows top use cases and roadmap
* [ ] Insights panel shows reusable memory

---

## Final Success Condition

The MVP is successful if a user can go from:

**“We have a business bottleneck and some documents”**

to

**“Here are our best AI use cases, the best first pilot, the risks, and our next steps.”**

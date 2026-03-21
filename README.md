# ZestLearn

**AI Consultant Copilot for Pharma & Biotech SMEs**

ZestLearn helps pharma and biotech teams move from "we think AI could help us" to "here is our best AI pilot, why it matters, what it needs, and what to do next."

---

## Product Loop

```
Assessment → Workspace → Document Upload → Consultant Chat → Report → Memory Insight
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend / DB | Convex |
| Primary AI | Google Gemini API |
| Optional AI | Featherless.ai |
| Automation | n8n |
| Optional Voice | ElevenLabs |

---

## MVP Features

- Guided onboarding assessment
- Workspace creation per company context
- Document upload and AI summarization
- Consultant-style chat grounded in context
- Structured AI opportunity report
- Lightweight collective memory layer

---

## Folder Structure

```
app/               # Next.js routes and API handlers
components/        # React UI components
  landing/         # Landing page sections
  assessment/      # Onboarding form components
  workspace/       # Workspace dashboard panels
  documents/       # Document upload and display
  chat/            # Chat interface
  report/          # Report rendering
  shared/          # Reusable UI primitives
convex/            # Database schema, queries, mutations
lib/               # Business logic, AI orchestration, utilities
  ai/              # Providers, prompts, parsers, context builders
  documents/       # Text extraction and summarization
  reports/         # Report generation and rendering
  memory/          # Memory pattern utilities
  validation/      # Input validation helpers
  constants/       # App-wide constants
  utils/           # Shared utility functions
hooks/             # React hooks for data fetching
types/             # Shared TypeScript interfaces
n8n/               # Automation workflow definitions
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
# Fill in the values in .env.local
```

### 3. Initialize Convex

```bash
npx convex dev
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

See `.env.example` for all required variables.

---

## MVP Scope

**In scope:** assessment, workspace, document upload, consultant chat, report generation, memory layer

**Out of scope:** enterprise auth, RBAC, compliance automation, mobile, complex analytics

---

## Current Status

See `CURRENT_PLAN.md`, `IMPLEMENTATION_STATUS.md`, `DECISIONS.md`, and `NEXT_TASK.md` for live build state.

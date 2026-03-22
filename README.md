# ZestLearn

AI consultant copilot for pharma and biotech SMEs.

ZestLearn helps life-sciences teams move from "AI could help us" to "this is the best first pilot, why it matters, what it needs, what the risks are, and what to do next."

## What It Does

ZestLearn is a guided AI opportunity discovery workflow for innovation, operations, and digital transformation leads at pharma and biotech SMEs.

Core loop:

```text
Assessment -> Workspace -> Document Upload -> Consultant Chat -> Report -> Collective Learning
```

The product is designed to feel more like a domain-aware consultant than a generic chatbot.

## Current MVP Features

- Guided onboarding assessment that captures company, role, bottleneck, outcome, AI maturity, and context
- Persistent workspace backed by Convex
- Document upload pipeline for `.txt`, `.md`, and `.pdf`
- Text extraction, AI summarization, tagging, and document-derived memory insights
- Consultant chat grounded in workspace profile, uploaded documents, recent chat history, and memory patterns
- Multi-model chat selection in the UI
- Structured report generation with rendered markdown output
- Downloadable PDF report export
- Collective learning / memory insights panel
- Optional voice playback for assistant replies via ElevenLabs
- Optional browser voice input for the chat composer

## Product Positioning

ZestLearn is an AI consulting copilot for pharma and biotech SMEs that helps teams identify high-value AI opportunities, assess readiness, and generate practical pilot roadmaps using company context and reusable organizational learning.

This MVP is intentionally focused. It is:

- a guided AI opportunity discovery platform
- a company-context-aware advisor
- a lightweight collective learning system

It is not:

- a generic chatbot
- a full compliance automation suite
- a production-grade enterprise governance platform

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| App State / DB | Convex |
| Chat AI | Gemini, Featherless.ai |
| Report AI | OpenAI (`gpt-4o-mini`) |
| Document Processing | `pdf-parse`, custom extraction/summarization helpers |
| Markdown Rendering | `react-markdown`, `remark-gfm` |
| PDF Export | `@react-pdf/renderer` |
| Voice | ElevenLabs + browser speech APIs |

## Key User Flow

1. User completes the assessment.
2. A workspace is created and populated with company context.
3. User uploads internal docs for extraction, summary, and tagging.
4. User chats with the consultant using grounded context.
5. User generates a structured AI opportunity report.
6. ZestLearn extracts reusable insights into the collective memory layer.

## Repository Structure

```text
app/                    Next.js app routes and API handlers
components/             UI components
  assessment/           onboarding flow
  landing/              landing page sections
  workspace/            workspace panels: overview, documents, chat, reports, insights
convex/                 schema, queries, mutations, generated API bindings
hooks/                  React hooks such as workspace loading and voice input
lib/
  ai/                   providers, prompts, parsers, context builders, validation
  documents/            extraction, tagging, supported types, summarization
  memory/               pattern extraction, normalization, persistence helpers
  reports/              report generation, markdown rendering, PDF download/rendering
  voice/                ElevenLabs integration and narration cleanup
  utils/                shared helpers and error formatting
types/                  shared TypeScript types
```

## API Surface

Main application routes:

- `app/api/chat/route.ts` - grounded consultant chat
- `app/api/chat/voice/route.ts` - assistant reply narration
- `app/api/upload/route.ts` - multipart document upload and processing
- `app/api/report/route.ts` - structured report generation
- `app/api/report/pdf/route.ts` - downloadable PDF export

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required for core MVP:

- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`
- `GEMINI_API_KEY` for document summarization and Gemini-backed chat models
- `OPENAI_API_KEY` for report generation

Optional:

- `FEATHERLESS_API_KEY` for alternate chat models
- `ELEVENLABS_API_KEY` for voice playback
- `N8N_WEBHOOK_URL` for optional external automation hooks

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

### 3. Start Convex

```bash
npx convex dev
```

This generates the latest Convex bindings and gives you the deployment URL to use in `.env.local`.

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev         # start Next.js in development
npm run build       # Convex codegen + deploy + Next build
npm run build:local # local Next build without Convex deploy
npm run start       # start production server
npm run lint        # run Next lint
```

## Notes On Build And Deployment

- `npm run build` is configured for deployment environments where Convex codegen and deploy should happen before `next build`.
- For a purely local verification build, use `npm run build:local`.
- Make sure the same environment variables exist in your deployment environment, especially `NEXT_PUBLIC_CONVEX_URL`, `OPENAI_API_KEY`, and `GEMINI_API_KEY`.

## Supported Document Types

The upload flow currently supports:

- `.txt`
- `.md`
- `.pdf`

PDFs use `pdf-parse`. Scanned or image-only PDFs may produce partial or failed extraction, which the upload route handles explicitly.

## MVP Scope

In scope:

- assessment
- workspace
- document upload and AI triage
- consultant chat
- report generation
- PDF export
- collective memory insights
- optional voice layer

Out of scope:

- enterprise authentication / SSO
- RBAC and advanced collaboration
- formal compliance automation
- mobile apps
- complex analytics dashboards

## Supporting Docs

For product and build context, see:

- `zestlearn_context_md.md`
- `zestlearn_technical_prd.md`
- `zestlearn_system_architecture_and_api_contract.md`
- `CURRENT_PLAN.md`
- `IMPLEMENTATION_STATUS.md`
- `DECISIONS.md`
- `NEXT_TASK.md`

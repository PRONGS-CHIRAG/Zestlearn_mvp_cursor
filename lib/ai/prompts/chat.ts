import { CONSULTANT_SYSTEM_PROMPT } from "./system";

interface ChatPromptInput {
  companyProfile: string;
  assessmentContext: string;
  documentSummaries: string;
  recentMessages: string;
  memoryInsights: string;
  userMessage: string;
}

export function buildChatSystemPrompt(): string {
  return CONSULTANT_SYSTEM_PROMPT;
}

export function buildChatUserPrompt({
  companyProfile,
  assessmentContext,
  documentSummaries,
  recentMessages,
  memoryInsights,
  userMessage,
}: ChatPromptInput): string {
  return `
## Company Context
${companyProfile}

## Business Problem
${assessmentContext}

## Uploaded Document Summaries
${documentSummaries || "No documents uploaded yet."}

## Relevant Insights from Similar Teams
${memoryInsights || "No prior insights available."}

## Recent Conversation
${recentMessages || "This is the start of the conversation."}

## User Question
${userMessage}

Please respond as a practical AI transformation consultant. Ground your answer in the provided context. Be specific and actionable.
`.trim();
}

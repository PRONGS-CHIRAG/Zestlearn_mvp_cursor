import {
  buildWorkspaceProfileContext,
  buildAssessmentContext,
  buildDocumentContext,
  buildMemoryContext,
} from "./buildChatContext";

interface ReportContextInput {
  workspace: {
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
  };
  documents: Array<{ fileName: string; summary?: string; tags?: string[] }>;
  recentChatInsights: string;
  memoryPatterns: Array<{ patternText: string; category: string }>;
}

export function buildReportContext(input: ReportContextInput): string {
  const profileCtx = buildWorkspaceProfileContext(input.workspace);
  const assessmentCtx = buildAssessmentContext(input.workspace);
  const docCtx = buildDocumentContext(input.documents);
  const memoryCtx = buildMemoryContext(input.memoryPatterns);

  return `
## Company Profile
${profileCtx}

## Business Problem
${assessmentCtx}

## Uploaded Documents
${docCtx}

## Recent Consulting Insights
${input.recentChatInsights || "No prior chat context."}

## Patterns from Similar Teams
${memoryCtx || "No prior patterns available."}
`.trim();
}

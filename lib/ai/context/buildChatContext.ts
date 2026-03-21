interface WorkspaceContext {
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

interface DocSummary {
  fileName: string;
  summary?: string;
  tags?: string[];
}

interface ChatMsg {
  role: string;
  content: string;
}

interface MemoryPattern {
  patternText: string;
  category: string;
}

export function buildWorkspaceProfileContext(workspace: WorkspaceContext): string {
  return `Company: ${workspace.companyName} (${workspace.companyType}, ${workspace.companySize} employees)
Department: ${workspace.department} | Role: ${workspace.role}
AI Maturity: ${workspace.aiMaturity}/5`;
}

export function buildAssessmentContext(workspace: WorkspaceContext): string {
  return `Business Bottleneck: ${workspace.bottleneck}
Desired Outcome: ${workspace.desiredOutcome}
${workspace.currentTools ? `Current Tools: ${workspace.currentTools}` : ""}
${workspace.dataAvailability ? `Available Data: ${workspace.dataAvailability}` : ""}`.trim();
}

export function buildDocumentContext(docs: DocSummary[]): string {
  if (!docs.length) return "No documents uploaded.";
  return docs
    .map((d) => `[${d.fileName}] ${d.summary ?? "No summary yet."}${d.tags?.length ? ` Tags: ${d.tags.join(", ")}` : ""}`)
    .join("\n\n");
}

export function buildRecentChatContext(messages: ChatMsg[]): string {
  if (!messages.length) return "";
  return messages
    .slice(-8)
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");
}

export function buildMemoryContext(patterns: MemoryPattern[]): string {
  if (!patterns.length) return "";
  return patterns.map((p) => `- [${p.category}] ${p.patternText}`).join("\n");
}

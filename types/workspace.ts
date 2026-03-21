export interface WorkspaceProfile {
  id: string;
  companyName: string;
  companyType: string;
  companySize: string;
  department: string;
  role: string;
  aiMaturity: number;
  createdAt: number;
}

export interface WorkspaceAssessmentSummary {
  bottleneck: string;
  desiredOutcome: string;
  currentTools?: string;
  dataAvailability?: string;
  status: "draft" | "submitted" | "analyzed";
}

export interface WorkspaceDashboardData {
  workspace: WorkspaceProfile;
  assessment: WorkspaceAssessmentSummary | null;
  documents: import("./document").DocumentSummary[];
  latestReport: {
    id: string;
    title: string;
    renderedMarkdown: string;
    createdAt: number;
  } | null;
  insights: import("./memory").MemoryPattern[];
}

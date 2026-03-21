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

export interface ReportRecord {
  id: string;
  workspaceId: string;
  title: string;
  structuredJson: OpportunityReport;
  renderedMarkdown: string;
  createdAt: number;
}

export interface ReportGenerationResponse {
  success: boolean;
  report?: ReportRecord;
  error?: string;
}

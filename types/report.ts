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
  executive_summary: string;
  problem_summary: string;
  current_pain_points: string[];
  recommended_use_cases: RecommendedUseCase[];
  best_first_pilot: {
    title: string;
    why_this_first: string;
    success_metrics: string[];
    estimated_timeline: string;
  };
  estimated_business_impact: {
    efficiency_gains: string;
    cost_reduction: string;
    timeline_to_value: string;
  };
  roadmap_30_60_90: {
    days_30: string[];
    days_60: string[];
    days_90: string[];
  };
  risks_and_constraints: string[];
  open_questions: string[];
  assumptions: string[];
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

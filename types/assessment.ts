export interface AssessmentInput {
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

export interface AssessmentValidationErrors {
  companyName?: string;
  companyType?: string;
  companySize?: string;
  department?: string;
  role?: string;
  aiMaturity?: string;
  bottleneck?: string;
  desiredOutcome?: string;
  currentTools?: string;
  dataAvailability?: string;
}

export interface AssessmentSubmitResponse {
  success: boolean;
  workspaceId?: string;
  assessmentId?: string;
  error?: string;
}

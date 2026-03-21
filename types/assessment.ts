// ============================================================================
// ZestLearn Assessment Types
// ============================================================================

// ----------------------------------------------------------------------------
// Enums & Constants
// ----------------------------------------------------------------------------

export const COMPANY_TYPES = [
  'pharmaceutical',
  'biotech',
  'medtech',
  'cro',
  'cdmo',
  'other',
] as const;

export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '500+',
] as const;

export const DEPARTMENTS = [
  'rd',
  'manufacturing',
  'quality',
  'regulatory',
  'commercial',
  'operations',
  'it',
  'other',
] as const;

export const ROLES = [
  'executive',
  'director',
  'manager',
  'lead',
  'specialist',
  'analyst',
  'other',
] as const;

export const DATA_AVAILABILITY_OPTIONS = [
  'well_organized',
  'scattered',
  'mostly_paper',
  'mixed',
  'unsure',
] as const;

export type CompanyType = (typeof COMPANY_TYPES)[number];
export type CompanySize = (typeof COMPANY_SIZES)[number];
export type Department = (typeof DEPARTMENTS)[number];
export type Role = (typeof ROLES)[number];
export type DataAvailability = (typeof DATA_AVAILABILITY_OPTIONS)[number];

// ----------------------------------------------------------------------------
// Core Input Interface
// ----------------------------------------------------------------------------

export interface AssessmentInput {
  /** Company or organization name */
  companyName: string;
  
  /** Type of company (pharma, biotech, etc.) */
  companyType: CompanyType | string;
  
  /** Number of employees */
  companySize: CompanySize | string;
  
  /** Primary department */
  department: Department | string;
  
  /** User's role in the organization */
  role: Role | string;
  
  /** AI maturity level (1-5 scale) */
  aiMaturity: number;
  
  /** Primary bottleneck or pain point */
  bottleneck: string;
  
  /** Desired outcome from AI implementation */
  desiredOutcome: string;
  
  /** Current tools and systems in use */
  currentTools?: string;
  
  /** How data is currently organized */
  dataAvailability?: DataAvailability | string;
}

// ----------------------------------------------------------------------------
// Validation Types
// ----------------------------------------------------------------------------

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

export interface ValidationResult {
  /** Whether all fields are valid */
  isValid: boolean;
  
  /** Field-level error messages */
  errors: AssessmentValidationErrors;
  
  /** Normalized/sanitized input values */
  normalizedValues: AssessmentInput;
}

// ----------------------------------------------------------------------------
// API Response Types
// ----------------------------------------------------------------------------

export interface AssessmentSubmitResponse {
  /** Whether the submission was successful */
  success: boolean;
  
  /** Generated workspace ID for redirect */
  workspaceId?: string;
  
  /** Assessment record ID */
  assessmentId?: string;
  
  /** Error message if submission failed */
  error?: string;
  
  /** Additional error details for debugging */
  details?: Record<string, unknown>;
}

export interface AssessmentRetrieveResponse {
  /** Whether the retrieval was successful */
  success: boolean;
  
  /** The assessment data */
  assessment?: StoredAssessment;
  
  /** Error message if retrieval failed */
  error?: string;
}

// ----------------------------------------------------------------------------
// Storage Types
// ----------------------------------------------------------------------------

export interface StoredAssessment extends AssessmentInput {
  /** Unique assessment identifier */
  id: string;
  
  /** Associated workspace ID */
  workspaceId: string;
  
  /** User ID who created the assessment */
  userId?: string;
  
  /** Timestamp when assessment was created */
  createdAt: string;
  
  /** Timestamp when assessment was last updated */
  updatedAt: string;
  
  /** Assessment processing status */
  status: AssessmentStatus;
}

export type AssessmentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

// ----------------------------------------------------------------------------
// Form State Types
// ----------------------------------------------------------------------------

export interface AssessmentFormState {
  /** Current form values */
  values: AssessmentInput;
  
  /** Current validation errors */
  errors: AssessmentValidationErrors;
  
  /** Fields that have been touched/visited */
  touched: Partial<Record<keyof AssessmentInput, boolean>>;
  
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  
  /** Whether form has been submitted at least once */
  isSubmitted: boolean;
  
  /** Current step in multi-step form (0-indexed) */
  currentStep: number;
}

// ----------------------------------------------------------------------------
// Utility Types
// ----------------------------------------------------------------------------

export type AssessmentField = keyof AssessmentInput;

export type AssessmentInputPartial = Partial<AssessmentInput>;

export type RequiredAssessmentFields = Pick<
  AssessmentInput,
  | 'companyName'
  | 'companyType'
  | 'companySize'
  | 'department'
  | 'role'
  | 'aiMaturity'
  | 'bottleneck'
  | 'desiredOutcome'
>;

export type OptionalAssessmentFields = Pick<
  AssessmentInput,
  'currentTools' | 'dataAvailability'
>;

// ----------------------------------------------------------------------------
// Default Values
// ----------------------------------------------------------------------------

export const DEFAULT_ASSESSMENT_INPUT: AssessmentInput = {
  companyName: '',
  companyType: '',
  companySize: '',
  department: '',
  role: '',
  aiMaturity: 1,
  bottleneck: '',
  desiredOutcome: '',
  currentTools: '',
  dataAvailability: '',
};

export const DEFAULT_FORM_STATE: AssessmentFormState = {
  values: DEFAULT_ASSESSMENT_INPUT,
  errors: {},
  touched: {},
  isSubmitting: false,
  isSubmitted: false,
  currentStep: 0,
};

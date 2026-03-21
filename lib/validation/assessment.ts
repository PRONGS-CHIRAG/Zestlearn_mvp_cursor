import type { AssessmentInput, AssessmentValidationErrors } from "@/types/assessment";

// Valid options for select fields
export const COMPANY_TYPES = [
  "pharmaceutical",
  "biotech",
  "medical-devices",
  "cro",
  "cdmo",
  "healthtech",
  "other",
] as const;

export const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

export const DEPARTMENTS = [
  "r-and-d",
  "manufacturing",
  "quality",
  "regulatory",
  "commercial",
  "supply-chain",
  "it",
  "operations",
  "other",
] as const;

export const ROLES = [
  "c-level",
  "vp-director",
  "manager",
  "team-lead",
  "individual-contributor",
  "consultant",
  "other",
] as const;

export const DATA_AVAILABILITY_OPTIONS = [
  "well-organized",
  "partially-organized",
  "mostly-unstructured",
  "not-sure",
] as const;

// Type definitions
export type CompanyType = (typeof COMPANY_TYPES)[number];
export type CompanySize = (typeof COMPANY_SIZES)[number];
export type Department = (typeof DEPARTMENTS)[number];
export type Role = (typeof ROLES)[number];
export type DataAvailability = (typeof DATA_AVAILABILITY_OPTIONS)[number];

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: AssessmentValidationErrors;
  normalizedValues: Partial<AssessmentInput>;
}

// Field validation helpers
function normalizeString(value: string | undefined | null): string {
  return (value ?? "").trim();
}

function validateRequired(value: string, fieldName: string): string | undefined {
  const normalized = normalizeString(value);
  if (!normalized) {
    return `${fieldName} is required`;
  }
  return undefined;
}

function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string
): string | undefined {
  const normalized = normalizeString(value);
  if (normalized && normalized.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return undefined;
}

function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string
): string | undefined {
  const normalized = normalizeString(value);
  if (normalized && normalized.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  return undefined;
}

function validateInOptions<T extends string>(
  value: string,
  options: readonly T[],
  fieldName: string
): string | undefined {
  const normalized = normalizeString(value);
  if (normalized && !options.includes(normalized as T)) {
    return `Please select a valid ${fieldName.toLowerCase()}`;
  }
  return undefined;
}

function validateAIMaturity(value: number | string | undefined): string | undefined {
  const num = typeof value === "string" ? parseInt(value, 10) : value;
  if (num === undefined || num === null || isNaN(num as number)) {
    return "AI maturity level is required";
  }
  if (num < 1 || num > 5) {
    return "AI maturity must be between 1 and 5";
  }
  return undefined;
}

// Main validation function
export function validateAssessmentInput(input: Partial<AssessmentInput>): ValidationResult {
  const errors: AssessmentValidationErrors = {};
  const normalizedValues: Partial<AssessmentInput> = {};

  // Company Name - required, 2-100 chars
  const companyName = normalizeString(input.companyName);
  normalizedValues.companyName = companyName;
  errors.companyName =
    validateRequired(companyName, "Company name") ||
    validateMinLength(companyName, 2, "Company name") ||
    validateMaxLength(companyName, 100, "Company name");

  // Company Type - required, must be valid option
  const companyType = normalizeString(input.companyType);
  normalizedValues.companyType = companyType;
  errors.companyType =
    validateRequired(companyType, "Company type") ||
    validateInOptions(companyType, COMPANY_TYPES, "Company type");

  // Company Size - required, must be valid option
  const companySize = normalizeString(input.companySize);
  normalizedValues.companySize = companySize;
  errors.companySize =
    validateRequired(companySize, "Company size") ||
    validateInOptions(companySize, COMPANY_SIZES, "Company size");

  // Department - required, must be valid option
  const department = normalizeString(input.department);
  normalizedValues.department = department;
  errors.department =
    validateRequired(department, "Department") ||
    validateInOptions(department, DEPARTMENTS, "Department");

  // Role - required, must be valid option
  const role = normalizeString(input.role);
  normalizedValues.role = role;
  errors.role =
    validateRequired(role, "Role") || validateInOptions(role, ROLES, "Role");

  // AI Maturity - required, 1-5
  const aiMaturity =
    typeof input.aiMaturity === "string"
      ? parseInt(input.aiMaturity, 10)
      : input.aiMaturity;
  normalizedValues.aiMaturity = aiMaturity;
  errors.aiMaturity = validateAIMaturity(aiMaturity);

  // Bottleneck - required, 10-1000 chars
  const bottleneck = normalizeString(input.bottleneck);
  normalizedValues.bottleneck = bottleneck;
  errors.bottleneck =
    validateRequired(bottleneck, "Bottleneck description") ||
    validateMinLength(bottleneck, 10, "Bottleneck description") ||
    validateMaxLength(bottleneck, 1000, "Bottleneck description");

  // Desired Outcome - required, 10-1000 chars
  const desiredOutcome = normalizeString(input.desiredOutcome);
  normalizedValues.desiredOutcome = desiredOutcome;
  errors.desiredOutcome =
    validateRequired(desiredOutcome, "Desired outcome") ||
    validateMinLength(desiredOutcome, 10, "Desired outcome") ||
    validateMaxLength(desiredOutcome, 1000, "Desired outcome");

  // Current Tools - optional, max 500 chars
  const currentTools = normalizeString(input.currentTools);
  normalizedValues.currentTools = currentTools || undefined;
  if (currentTools) {
    errors.currentTools = validateMaxLength(currentTools, 500, "Current tools");
  }

  // Data Availability - optional, must be valid if provided
  const dataAvailability = normalizeString(input.dataAvailability);
  normalizedValues.dataAvailability = dataAvailability || undefined;
  if (dataAvailability) {
    errors.dataAvailability = validateInOptions(
      dataAvailability,
      DATA_AVAILABILITY_OPTIONS,
      "Data availability"
    );
  }

  // Remove undefined error entries
  const cleanErrors: AssessmentValidationErrors = {};
  for (const [key, value] of Object.entries(errors)) {
    if (value !== undefined) {
      cleanErrors[key as keyof AssessmentValidationErrors] = value;
    }
  }

  const isValid = Object.keys(cleanErrors).length === 0;

  return {
    isValid,
    errors: cleanErrors,
    normalizedValues,
  };
}

// Legacy function for backward compatibility
export function validateAssessment(input: AssessmentInput): {
  valid: boolean;
  errors: AssessmentValidationErrors;
} {
  const result = validateAssessmentInput(input);
  return { valid: result.isValid, errors: result.errors };
}

// Single field validation for real-time feedback
export function validateField(
  fieldName: keyof AssessmentInput,
  value: string | number | undefined
): string | undefined {
  const stringValue = typeof value === "number" ? String(value) : (value ?? "");

  switch (fieldName) {
    case "companyName":
      return (
        validateRequired(stringValue, "Company name") ||
        validateMinLength(stringValue, 2, "Company name") ||
        validateMaxLength(stringValue, 100, "Company name")
      );
    case "companyType":
      return (
        validateRequired(stringValue, "Company type") ||
        validateInOptions(stringValue, COMPANY_TYPES, "Company type")
      );
    case "companySize":
      return (
        validateRequired(stringValue, "Company size") ||
        validateInOptions(stringValue, COMPANY_SIZES, "Company size")
      );
    case "department":
      return (
        validateRequired(stringValue, "Department") ||
        validateInOptions(stringValue, DEPARTMENTS, "Department")
      );
    case "role":
      return (
        validateRequired(stringValue, "Role") ||
        validateInOptions(stringValue, ROLES, "Role")
      );
    case "aiMaturity":
      return validateAIMaturity(value as number);
    case "bottleneck":
      return (
        validateRequired(stringValue, "Bottleneck description") ||
        validateMinLength(stringValue, 10, "Bottleneck description") ||
        validateMaxLength(stringValue, 1000, "Bottleneck description")
      );
    case "desiredOutcome":
      return (
        validateRequired(stringValue, "Desired outcome") ||
        validateMinLength(stringValue, 10, "Desired outcome") ||
        validateMaxLength(stringValue, 1000, "Desired outcome")
      );
    case "currentTools":
      return stringValue
        ? validateMaxLength(stringValue, 500, "Current tools")
        : undefined;
    case "dataAvailability":
      return stringValue
        ? validateInOptions(
            stringValue,
            DATA_AVAILABILITY_OPTIONS,
            "Data availability"
          )
        : undefined;
    default:
      return undefined;
  }
}

// Check if form is complete (all required fields filled)
export function isFormComplete(input: Partial<AssessmentInput>): boolean {
  const requiredFields: (keyof AssessmentInput)[] = [
    "companyName",
    "companyType",
    "companySize",
    "department",
    "role",
    "aiMaturity",
    "bottleneck",
    "desiredOutcome",
  ];

  return requiredFields.every((field) => {
    const value = input[field];
    if (field === "aiMaturity") {
      return typeof value === "number" && value >= 1 && value <= 5;
    }
    return typeof value === "string" && value.trim().length > 0;
  });
}

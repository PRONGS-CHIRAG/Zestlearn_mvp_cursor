import type { AssessmentInput, AssessmentValidationErrors } from "@/types/assessment";

export function validateAssessment(input: AssessmentInput): {
  valid: boolean;
  errors: AssessmentValidationErrors;
} {
  const errors: AssessmentValidationErrors = {};

  if (!input.companyName?.trim()) errors.companyName = "Company name is required.";
  if (!input.companyType?.trim()) errors.companyType = "Company type is required.";
  if (!input.companySize?.trim()) errors.companySize = "Company size is required.";
  if (!input.department?.trim()) errors.department = "Department is required.";
  if (!input.role?.trim()) errors.role = "Role is required.";
  if (!input.bottleneck?.trim()) errors.bottleneck = "Business bottleneck is required.";
  if (!input.desiredOutcome?.trim()) errors.desiredOutcome = "Desired outcome is required.";

  if (!input.aiMaturity || input.aiMaturity < 1 || input.aiMaturity > 5) {
    errors.aiMaturity = "AI maturity must be between 1 and 5.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

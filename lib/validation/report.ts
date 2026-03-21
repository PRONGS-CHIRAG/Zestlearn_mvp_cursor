import type { ReportRequest } from "@/types/api";

export function validateReportRequest(input: Partial<ReportRequest>): {
  valid: boolean;
  error?: string;
} {
  if (!input.workspaceId?.trim()) return { valid: false, error: "workspaceId is required." };
  return { valid: true };
}

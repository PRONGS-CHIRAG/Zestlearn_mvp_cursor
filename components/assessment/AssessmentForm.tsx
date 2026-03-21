"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type {
  AssessmentInput,
  AssessmentValidationErrors,
} from "@/types/assessment";
import CompanyDetailsStep from "./CompanyDetailsStep";
import BottleneckStep from "./BottleneckStep";
import AIMaturityStep from "./AIMaturityStep";

const initialState: AssessmentInput = {
  companyName: "",
  companyType: "",
  companySize: "",
  department: "",
  role: "",
  aiMaturity: 1,
  bottleneck: "",
  desiredOutcome: "",
  currentTools: "",
  dataAvailability: "",
};

export default function AssessmentForm() {
  const router = useRouter();
  const [form, setForm] = useState<AssessmentInput>(initialState);
  const [errors, setErrors] = useState<AssessmentValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "aiMaturity" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate(): boolean {
    const newErrors: AssessmentValidationErrors = {};
    if (!form.companyName.trim()) newErrors.companyName = "Required";
    if (!form.companyType.trim()) newErrors.companyType = "Required";
    if (!form.companySize.trim()) newErrors.companySize = "Required";
    if (!form.department.trim()) newErrors.department = "Required";
    if (!form.role.trim()) newErrors.role = "Required";
    if (!form.bottleneck.trim()) newErrors.bottleneck = "Required";
    if (!form.desiredOutcome.trim()) newErrors.desiredOutcome = "Required";
    if (!form.aiMaturity || form.aiMaturity < 1 || form.aiMaturity > 5)
      newErrors.aiMaturity = "Must be between 1 and 5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError(null);
    try {
      // TODO: replace with real Convex mutation call
      // const result = await submitAssessment(form);
      // router.push(`/workspace/${result.workspaceId}`);
      console.log("Assessment payload:", form);
    } catch {
      setServerError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-8">
      {/* Company Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose/10 text-rose">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Company Details
            </h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your organization
            </p>
          </div>
        </div>
        <CompanyDetailsStep form={form} errors={errors} onChange={handleChange} />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Bottleneck */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose/10 text-rose">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Challenges & Goals
            </h2>
            <p className="text-sm text-muted-foreground">
              What problems are you trying to solve?
            </p>
          </div>
        </div>
        <BottleneckStep form={form} errors={errors} onChange={handleChange} />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* AI Maturity */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose/10 text-rose">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              AI Readiness
            </h2>
            <p className="text-sm text-muted-foreground">
              Your current AI adoption level
            </p>
          </div>
        </div>
        <AIMaturityStep form={form} errors={errors} onChange={handleChange} />
      </div>

      {serverError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {serverError}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:shadow-xl hover:shadow-rose/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          <>
            Create My Workspace
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

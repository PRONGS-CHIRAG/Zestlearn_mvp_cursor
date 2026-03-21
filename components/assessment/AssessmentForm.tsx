"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AssessmentInput, AssessmentValidationErrors } from "@/types/assessment";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
      {/* Company Details */}
      <CompanyDetailsStep form={form} errors={errors} onChange={handleChange} />
      {/* Bottleneck */}
      <BottleneckStep form={form} errors={errors} onChange={handleChange} />
      {/* AI Maturity */}
      <AIMaturityStep form={form} errors={errors} onChange={handleChange} />

      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Create My Workspace"}
      </button>
    </form>
  );
}

// inline subcomponents — will be split into own files during implementation
import CompanyDetailsStep from "./CompanyDetailsStep";
import BottleneckStep from "./BottleneckStep";
import AIMaturityStep from "./AIMaturityStep";

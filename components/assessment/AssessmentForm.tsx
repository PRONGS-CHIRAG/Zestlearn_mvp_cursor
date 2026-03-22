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
import AccountDetailsStep from "./AccountDetailsStep";

const initialState: AssessmentInput = {
  email: "",
  password: "",
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

interface Props {
  onSubmit?: (data: AssessmentInput) => Promise<{ success: boolean; workspaceId?: string; error?: string }>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AssessmentForm({ onSubmit }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<AssessmentInput>(initialState);
  const [errors, setErrors] = useState<AssessmentValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

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
    if (errors[name as keyof AssessmentValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name as keyof AssessmentInput);
  }

  function validateField(fieldName: keyof AssessmentInput): string | undefined {
    const value = form[fieldName];
    let error: string | undefined;

    switch (fieldName) {
      case "email":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Email is required";
        else if (typeof value === "string" && !EMAIL_RE.test(value.trim()))
          error = "Please enter a valid email address";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (typeof value === "string" && value.length < 8)
          error = "Password must be at least 8 characters";
        else if (typeof value === "string" && !/[a-zA-Z]/.test(value))
          error = "Password must contain at least one letter";
        else if (typeof value === "string" && !/[0-9]/.test(value))
          error = "Password must contain at least one number";
        break;
      case "companyName":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Company name is required";
        else if (typeof value === "string" && value.length < 2)
          error = "Company name must be at least 2 characters";
        break;
      case "companyType":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Please select a company type";
        break;
      case "companySize":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Please select a company size";
        break;
      case "department":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Department is required";
        break;
      case "role":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Your role is required";
        break;
      case "bottleneck":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Please describe your main bottleneck";
        else if (typeof value === "string" && value.length < 20)
          error = "Please provide more detail (at least 20 characters)";
        break;
      case "desiredOutcome":
        if (!value || (typeof value === "string" && !value.trim()))
          error = "Please describe your desired outcome";
        else if (typeof value === "string" && value.length < 10)
          error = "Please provide more detail (at least 10 characters)";
        break;
      case "aiMaturity":
        if (typeof value === "number" && (value < 1 || value > 5))
          error = "AI maturity must be between 1 and 5";
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
    return error;
  }

  function validate(): boolean {
    const newErrors: AssessmentValidationErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!EMAIL_RE.test(form.email.trim())) newErrors.email = "Please enter a valid email address";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/[a-zA-Z]/.test(form.password)) newErrors.password = "Password must contain at least one letter";
    else if (!/[0-9]/.test(form.password)) newErrors.password = "Password must contain at least one number";

    if (!form.companyName.trim()) newErrors.companyName = "Company name is required";
    else if (form.companyName.length < 2) newErrors.companyName = "Company name must be at least 2 characters";

    if (!form.companyType.trim()) newErrors.companyType = "Please select a company type";
    if (!form.companySize.trim()) newErrors.companySize = "Please select a company size";
    if (!form.department.trim()) newErrors.department = "Department is required";
    if (!form.role.trim()) newErrors.role = "Your role is required";

    if (!form.bottleneck.trim()) newErrors.bottleneck = "Please describe your main bottleneck";
    else if (form.bottleneck.length < 20) newErrors.bottleneck = "Please provide more detail (at least 20 characters)";

    if (!form.desiredOutcome.trim()) newErrors.desiredOutcome = "Please describe your desired outcome";
    else if (form.desiredOutcome.length < 10) newErrors.desiredOutcome = "Please provide more detail (at least 10 characters)";

    if (!form.aiMaturity || form.aiMaturity < 1 || form.aiMaturity > 5)
      newErrors.aiMaturity = "AI maturity must be between 1 and 5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) {
      const firstErrorField = document.querySelector("[data-error='true']");
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setServerError(null);

    try {
      if (onSubmit) {
        const result = await onSubmit(form);
        if (result.success && result.workspaceId) {
          router.push(`/workspace/${result.workspaceId}`);
        } else {
          setServerError(result.error || "Submission failed. Please try again.");
        }
        return;
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.error || "Registration failed. Please try again.");
        return;
      }

      router.push(`/workspace/${data.workspaceId}`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      console.error("[ZestLearn] Assessment submit error:", message, err);
      setServerError(message);
    } finally {
      setLoading(false);
    }
  }

  const completedFields = [
    form.email,
    form.password,
    form.companyName,
    form.companyType,
    form.companySize,
    form.department,
    form.role,
    form.bottleneck,
    form.desiredOutcome,
  ].filter((f) => f && String(f).trim().length > 0).length;

  const totalRequiredFields = 9;
  const progressPercent = Math.round((completedFields / totalRequiredFields) * 100);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-8">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Form completion</span>
          <span className="font-medium text-foreground">{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-rose/10 text-rose ring-1 ring-rose/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Account Details</h2>
            <p className="text-sm text-muted-foreground">Create your login credentials</p>
          </div>
        </div>
        <AccountDetailsStep
          form={form}
          errors={errors}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Company Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-rose/10 text-rose ring-1 ring-rose/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Company Details</h2>
            <p className="text-sm text-muted-foreground">Tell us about your organization</p>
          </div>
        </div>
        <CompanyDetailsStep form={form} errors={errors} onChange={handleChange} onBlur={handleBlur} />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Bottleneck & Goals */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-rose/10 text-rose ring-1 ring-rose/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Challenges & Goals</h2>
            <p className="text-sm text-muted-foreground">What problems are you trying to solve?</p>
          </div>
        </div>
        <BottleneckStep form={form} errors={errors} onChange={handleChange} onBlur={handleBlur} />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* AI Maturity */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-rose/10 text-rose ring-1 ring-rose/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">AI Readiness</h2>
            <p className="text-sm text-muted-foreground">Your current AI adoption level</p>
          </div>
        </div>
        <AIMaturityStep form={form} errors={errors} onChange={handleChange} />
      </div>

      {/* Server error */}
      {serverError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-400">Submission failed</p>
            <p className="mt-0.5 text-sm text-red-400/80">{serverError}</p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-rose to-pink-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-rose/25 transition-all duration-300 hover:shadow-xl hover:shadow-rose/30 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {loading ? (
          <>
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Creating your account...</span>
          </>
        ) : (
          <>
            <span>Create Account & Workspace</span>
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      {/* Helper text */}
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="text-rose hover:underline">Log in</a>
      </p>
    </form>
  );
}

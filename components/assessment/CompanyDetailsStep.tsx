import type {
  AssessmentInput,
  AssessmentValidationErrors,
} from "@/types/assessment";

interface Props {
  form: AssessmentInput;
  errors: AssessmentValidationErrors;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const COMPANY_TYPES = [
  { value: "pharma_sme", label: "Pharma SME" },
  { value: "biotech_startup", label: "Biotech Startup" },
  { value: "biotech_sme", label: "Biotech SME" },
  { value: "life_sciences_sme", label: "Life Sciences SME" },
  { value: "cro_cmo", label: "CRO / CMO" },
  { value: "other", label: "Other" },
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-100", label: "51-100 employees" },
  { value: "101-250", label: "101-250 employees" },
  { value: "251-500", label: "251-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-rose/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-rose/20";

const selectClasses =
  "mt-1.5 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground transition-all duration-200 focus:border-rose/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-rose/20";

const labelClasses = "block text-sm font-medium text-foreground/90";

const errorClasses = "mt-2 flex items-center gap-1.5 text-xs text-red-400";

const helperClasses = "mt-1.5 text-xs text-muted-foreground/70";

export default function CompanyDetailsStep({
  form,
  errors,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="space-y-5">
      {/* Company Name */}
      <div data-error={!!errors.companyName}>
        <label htmlFor="companyName" className={labelClasses}>
          Company Name <span className="text-rose">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={form.companyName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. HelixPharm Solutions AG"
          className={`${inputClasses} ${errors.companyName ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
          aria-invalid={!!errors.companyName}
          aria-describedby={errors.companyName ? "companyName-error" : undefined}
        />
        {errors.companyName && (
          <p id="companyName-error" className={errorClasses}>
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.companyName}
          </p>
        )}
      </div>

      {/* Company Type & Size */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="relative" data-error={!!errors.companyType}>
          <label htmlFor="companyType" className={labelClasses}>
            Company Type <span className="text-rose">*</span>
          </label>
          <div className="relative">
            <select
              id="companyType"
              name="companyType"
              value={form.companyType}
              onChange={onChange}
              onBlur={onBlur}
              className={`${selectClasses} ${!form.companyType ? "text-muted-foreground/50" : ""} ${errors.companyType ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
              aria-invalid={!!errors.companyType}
            >
              <option value="" className="bg-card text-muted-foreground">
                Select type...
              </option>
              {COMPANY_TYPES.map((t) => (
                <option
                  key={t.value}
                  value={t.value}
                  className="bg-card text-foreground"
                >
                  {t.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.companyType && (
            <p className={errorClasses}>
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.companyType}
            </p>
          )}
        </div>

        <div className="relative" data-error={!!errors.companySize}>
          <label htmlFor="companySize" className={labelClasses}>
            Company Size <span className="text-rose">*</span>
          </label>
          <div className="relative">
            <select
              id="companySize"
              name="companySize"
              value={form.companySize}
              onChange={onChange}
              onBlur={onBlur}
              className={`${selectClasses} ${!form.companySize ? "text-muted-foreground/50" : ""} ${errors.companySize ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
              aria-invalid={!!errors.companySize}
            >
              <option value="" className="bg-card text-muted-foreground">
                Select size...
              </option>
              {COMPANY_SIZES.map((s) => (
                <option
                  key={s.value}
                  value={s.value}
                  className="bg-card text-foreground"
                >
                  {s.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.companySize && (
            <p className={errorClasses}>
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.companySize}
            </p>
          )}
        </div>
      </div>

      {/* Department & Role */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div data-error={!!errors.department}>
          <label htmlFor="department" className={labelClasses}>
            Department <span className="text-rose">*</span>
          </label>
          <input
            id="department"
            name="department"
            type="text"
            value={form.department}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="e.g. Operations, R&D, Quality"
            className={`${inputClasses} ${errors.department ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
            aria-invalid={!!errors.department}
          />
          <p className={helperClasses}>The team or function you work in</p>
          {errors.department && (
            <p className={errorClasses}>
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.department}
            </p>
          )}
        </div>

        <div data-error={!!errors.role}>
          <label htmlFor="role" className={labelClasses}>
            Your Role <span className="text-rose">*</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            value={form.role}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="e.g. Operations Manager"
            className={`${inputClasses} ${errors.role ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
            aria-invalid={!!errors.role}
          />
          <p className={helperClasses}>Your job title or function</p>
          {errors.role && (
            <p className={errorClasses}>
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.role}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

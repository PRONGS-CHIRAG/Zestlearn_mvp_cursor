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
}

const COMPANY_TYPES = [
  "Pharma SME",
  "Biotech Startup",
  "Biotech SME",
  "Life Sciences SME",
  "Other",
];
const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-100",
  "101-250",
  "251-500",
  "500+",
];

const inputClasses =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-rose/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-rose/20";

const selectClasses =
  "mt-1.5 w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground transition-all duration-200 focus:border-rose/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-rose/20";

const labelClasses = "block text-sm font-medium text-foreground/90";

const errorClasses = "mt-1.5 text-xs text-red-400";

export default function CompanyDetailsStep({ form, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelClasses}>Company Name *</label>
        <input
          name="companyName"
          value={form.companyName}
          onChange={onChange}
          placeholder="e.g. HelixPharm Solutions AG"
          className={inputClasses}
        />
        {errors.companyName && (
          <p className={errorClasses}>{errors.companyName}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="relative">
          <label className={labelClasses}>Company Type *</label>
          <select
            name="companyType"
            value={form.companyType}
            onChange={onChange}
            className={selectClasses}
          >
            <option value="" className="bg-card text-muted-foreground">
              Select type
            </option>
            {COMPANY_TYPES.map((t) => (
              <option key={t} className="bg-card text-foreground">
                {t}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute bottom-3 right-3">
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
          {errors.companyType && (
            <p className={errorClasses}>{errors.companyType}</p>
          )}
        </div>
        <div className="relative">
          <label className={labelClasses}>Company Size *</label>
          <select
            name="companySize"
            value={form.companySize}
            onChange={onChange}
            className={selectClasses}
          >
            <option value="" className="bg-card text-muted-foreground">
              Select size
            </option>
            {COMPANY_SIZES.map((s) => (
              <option key={s} className="bg-card text-foreground">
                {s}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute bottom-3 right-3">
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
          {errors.companySize && (
            <p className={errorClasses}>{errors.companySize}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses}>Department *</label>
          <input
            name="department"
            value={form.department}
            onChange={onChange}
            placeholder="e.g. Operations"
            className={inputClasses}
          />
          {errors.department && (
            <p className={errorClasses}>{errors.department}</p>
          )}
        </div>
        <div>
          <label className={labelClasses}>Your Role *</label>
          <input
            name="role"
            value={form.role}
            onChange={onChange}
            placeholder="e.g. Operations Manager"
            className={inputClasses}
          />
          {errors.role && <p className={errorClasses}>{errors.role}</p>}
        </div>
      </div>
    </div>
  );
}

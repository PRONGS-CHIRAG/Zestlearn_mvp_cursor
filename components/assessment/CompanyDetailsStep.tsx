import type { AssessmentInput, AssessmentValidationErrors } from "@/types/assessment";

interface Props {
  form: AssessmentInput;
  errors: AssessmentValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const COMPANY_TYPES = ["Pharma SME", "Biotech Startup", "Biotech SME", "Life Sciences SME", "Other"];
const COMPANY_SIZES = ["1–10", "11–50", "51–100", "101–250", "251–500", "500+"];

export default function CompanyDetailsStep({ form, errors, onChange }: Props) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-base font-semibold text-slate-900">Company & Role</legend>

      <div>
        <label className="block text-sm font-medium text-slate-700">Company Name *</label>
        <input
          name="companyName"
          value={form.companyName}
          onChange={onChange}
          placeholder="e.g. HelixPharm Solutions AG"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.companyName && <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Company Type *</label>
          <select
            name="companyType"
            value={form.companyType}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select type</option>
            {COMPANY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          {errors.companyType && <p className="mt-1 text-xs text-red-500">{errors.companyType}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Company Size *</label>
          <select
            name="companySize"
            value={form.companySize}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select size</option>
            {COMPANY_SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
          {errors.companySize && <p className="mt-1 text-xs text-red-500">{errors.companySize}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Department *</label>
          <input
            name="department"
            value={form.department}
            onChange={onChange}
            placeholder="e.g. Operations"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Your Role *</label>
          <input
            name="role"
            value={form.role}
            onChange={onChange}
            placeholder="e.g. Operations Manager"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
        </div>
      </div>
    </fieldset>
  );
}

import type { AssessmentInput, AssessmentValidationErrors } from "@/types/assessment";

interface Props {
  form: AssessmentInput;
  errors: AssessmentValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const maturityLabels: Record<number, string> = {
  1: "No AI usage yet",
  2: "Exploring options",
  3: "Some pilots underway",
  4: "AI in production for 1+ use cases",
  5: "AI-first culture",
};

export default function AIMaturityStep({ form, errors, onChange }: Props) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-semibold text-slate-900">
        AI Maturity Level *
      </legend>
      <p className="text-xs text-slate-500">
        How would you describe your team's current AI maturity? (1 = not started, 5 = AI-first)
      </p>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className={`flex flex-1 cursor-pointer flex-col items-center rounded-xl border p-3 text-center transition ${
              form.aiMaturity === n
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
            }`}
          >
            <input
              type="radio"
              name="aiMaturity"
              value={n}
              checked={form.aiMaturity === n}
              onChange={onChange}
              className="sr-only"
            />
            <span className="text-lg font-bold">{n}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-indigo-600">{maturityLabels[form.aiMaturity]}</p>
      {errors.aiMaturity && <p className="text-xs text-red-500">{errors.aiMaturity}</p>}
    </fieldset>
  );
}

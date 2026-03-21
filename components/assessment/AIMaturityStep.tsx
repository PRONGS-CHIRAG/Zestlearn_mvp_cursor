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

const maturityLabels: Record<number, string> = {
  1: "No AI usage yet",
  2: "Exploring options",
  3: "Some pilots underway",
  4: "AI in production for 1+ use cases",
  5: "AI-first culture",
};

export default function AIMaturityStep({ form, errors, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">
          How would you describe your team&apos;s current AI maturity?
        </p>
      </div>

      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className={`flex flex-1 cursor-pointer flex-col items-center rounded-xl border p-4 text-center transition-all duration-200 ${
              form.aiMaturity === n
                ? "border-rose/50 bg-rose/10 text-rose shadow-lg shadow-rose/10"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:bg-white/10"
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
            <span
              className={`text-xl font-bold ${
                form.aiMaturity === n ? "text-rose" : "text-foreground"
              }`}
            >
              {n}
            </span>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-rose/20 bg-rose/5 px-4 py-2.5">
        <svg
          className="h-4 w-4 text-rose"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-rose">{maturityLabels[form.aiMaturity]}</p>
      </div>

      {errors.aiMaturity && (
        <p className="text-xs text-red-400">{errors.aiMaturity}</p>
      )}
    </div>
  );
}

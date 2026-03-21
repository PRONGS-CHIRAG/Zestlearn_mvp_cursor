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

const inputClasses =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-rose/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-rose/20";

const textareaClasses =
  "mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-rose/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none";

const labelClasses = "block text-sm font-medium text-foreground/90";

const hintClasses = "mt-1 text-xs text-muted-foreground";

const errorClasses = "mt-1.5 text-xs text-red-400";

export default function BottleneckStep({ form, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelClasses}>
          Main operational or strategic bottleneck *
        </label>
        <p className={hintClasses}>
          Describe the biggest pain point your team is facing right now.
        </p>
        <textarea
          name="bottleneck"
          value={form.bottleneck}
          onChange={onChange}
          rows={3}
          placeholder="e.g. Our document review process is almost entirely manual and creates a backlog every quarter..."
          className={textareaClasses}
        />
        {errors.bottleneck && (
          <p className={errorClasses}>{errors.bottleneck}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>Desired business outcome *</label>
        <textarea
          name="desiredOutcome"
          value={form.desiredOutcome}
          onChange={onChange}
          rows={2}
          placeholder="e.g. Reduce review cycle time by 50% and free up the team for higher-value work."
          className={textareaClasses}
        />
        {errors.desiredOutcome && (
          <p className={errorClasses}>{errors.desiredOutcome}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>
          Current tools or systems
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          name="currentTools"
          value={form.currentTools}
          onChange={onChange}
          placeholder="e.g. Excel trackers, SharePoint, SAP"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>
          Data availability
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          name="dataAvailability"
          value={form.dataAvailability}
          onChange={onChange}
          placeholder="e.g. PDFs, SOPs, meeting notes in shared folders"
          className={inputClasses}
        />
      </div>
    </div>
  );
}

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

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-rose/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-rose/20";

const textareaClasses =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-rose/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-rose/20 resize-none";

const labelClasses = "block text-sm font-medium text-foreground/90";

const helperClasses = "mt-1.5 text-xs text-muted-foreground/70";

const errorClasses = "mt-2 flex items-center gap-1.5 text-xs text-red-400";

export default function BottleneckStep({
  form,
  errors,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Bottleneck */}
      <div data-error={!!errors.bottleneck}>
        <label htmlFor="bottleneck" className={labelClasses}>
          Main operational or strategic bottleneck{" "}
          <span className="text-rose">*</span>
        </label>
        <p className={helperClasses}>
          Describe the biggest pain point your team is facing right now.
        </p>
        <textarea
          id="bottleneck"
          name="bottleneck"
          value={form.bottleneck}
          onChange={onChange}
          onBlur={onBlur}
          rows={4}
          placeholder="e.g. Our document review process is almost entirely manual. Each regulatory submission requires 3-4 people to review hundreds of pages, creating a significant backlog every quarter..."
          className={`${textareaClasses} ${errors.bottleneck ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
          aria-invalid={!!errors.bottleneck}
        />
        <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground/70">
          <span>{form.bottleneck.length} characters</span>
          {form.bottleneck.length < 20 && form.bottleneck.length > 0 && (
            <span className="text-amber-400">
              {20 - form.bottleneck.length} more needed
            </span>
          )}
        </div>
        {errors.bottleneck && (
          <p className={errorClasses}>
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.bottleneck}
          </p>
        )}
      </div>

      {/* Desired Outcome */}
      <div data-error={!!errors.desiredOutcome}>
        <label htmlFor="desiredOutcome" className={labelClasses}>
          Desired business outcome <span className="text-rose">*</span>
        </label>
        <p className={helperClasses}>
          What would success look like for your team?
        </p>
        <textarea
          id="desiredOutcome"
          name="desiredOutcome"
          value={form.desiredOutcome}
          onChange={onChange}
          onBlur={onBlur}
          rows={3}
          placeholder="e.g. Reduce review cycle time by 50% and free up the team for higher-value analytical work."
          className={`${textareaClasses} ${errors.desiredOutcome ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
          aria-invalid={!!errors.desiredOutcome}
        />
        {errors.desiredOutcome && (
          <p className={errorClasses}>
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.desiredOutcome}
          </p>
        )}
      </div>

      {/* Optional fields section */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          Optional context (helps us tailor recommendations)
        </p>

        <div className="space-y-5">
          {/* Current Tools */}
          <div>
            <label htmlFor="currentTools" className={labelClasses}>
              Current tools or systems
              <span className="ml-1.5 text-xs font-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="currentTools"
              name="currentTools"
              type="text"
              value={form.currentTools}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="e.g. Excel trackers, SharePoint, SAP, Veeva"
              className={inputClasses}
            />
          </div>

          {/* Data Availability */}
          <div>
            <label htmlFor="dataAvailability" className={labelClasses}>
              Data availability
              <span className="ml-1.5 text-xs font-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="dataAvailability"
              name="dataAvailability"
              type="text"
              value={form.dataAvailability}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="e.g. PDFs, SOPs, batch records, meeting notes in shared folders"
              className={inputClasses}
            />
            <p className={helperClasses}>
              What types of documents or data does your team work with?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

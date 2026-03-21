import type { AssessmentInput, AssessmentValidationErrors } from "@/types/assessment";

interface Props {
  form: AssessmentInput;
  errors: AssessmentValidationErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function BottleneckStep({ form, errors, onChange }: Props) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-base font-semibold text-slate-900">Business Problem</legend>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Main operational or strategic bottleneck *
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Describe the biggest pain point your team is facing right now.
        </p>
        <textarea
          name="bottleneck"
          value={form.bottleneck}
          onChange={onChange}
          rows={3}
          placeholder="e.g. Our document review process is almost entirely manual and creates a backlog every quarter..."
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.bottleneck && <p className="mt-1 text-xs text-red-500">{errors.bottleneck}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Desired business outcome *
        </label>
        <textarea
          name="desiredOutcome"
          value={form.desiredOutcome}
          onChange={onChange}
          rows={2}
          placeholder="e.g. Reduce review cycle time by 50% and free up the team for higher-value work."
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {errors.desiredOutcome && <p className="mt-1 text-xs text-red-500">{errors.desiredOutcome}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Current tools or systems</label>
        <input
          name="currentTools"
          value={form.currentTools}
          onChange={onChange}
          placeholder="e.g. Excel trackers, SharePoint, SAP (optional)"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Data availability</label>
        <input
          name="dataAvailability"
          value={form.dataAvailability}
          onChange={onChange}
          placeholder="e.g. PDFs, SOPs, meeting notes in shared folders (optional)"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
    </fieldset>
  );
}

const STARTERS = [
  "Find AI use cases for my team",
  "What should we pilot first?",
  "Assess feasibility and risks",
  "Draft a stakeholder summary",
];

interface Props {
  onSelect: (prompt: string) => void;
}

export default function PromptStarters({ onSelect }: Props) {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {STARTERS.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

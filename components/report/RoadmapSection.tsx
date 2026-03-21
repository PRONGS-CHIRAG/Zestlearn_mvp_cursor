interface Roadmap {
  days_30: string[];
  days_60: string[];
  days_90: string[];
}

interface Props {
  roadmap: Roadmap;
}

const columns = [
  { label: "30 Days", key: "days_30" as const },
  { label: "60 Days", key: "days_60" as const },
  { label: "90 Days", key: "days_90" as const },
];

export default function RoadmapSection({ roadmap }: Props) {
  return (
    <section>
      <h3 className="text-lg font-semibold text-slate-900">30 / 60 / 90 Day Roadmap</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {columns.map(({ label, key }) => (
          <div key={key} className="rounded-xl bg-slate-50 border border-slate-100 p-4">
            <h4 className="text-sm font-semibold text-slate-700">{label}</h4>
            <ul className="mt-3 space-y-2">
              {roadmap[key].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

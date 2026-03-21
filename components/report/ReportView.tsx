import type { OpportunityReport } from "@/types/report";
import UseCaseCard from "./UseCaseCard";
import RoadmapSection from "./RoadmapSection";
import RiskSection from "./RiskSection";

interface Props {
  report: OpportunityReport;
}

export default function ReportView({ report }: Props) {
  return (
    <div className="space-y-8">
      {/* Problem Summary */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900">Problem Summary</h2>
        <p className="mt-2 text-slate-700">{report.problem_summary}</p>
      </section>

      {/* Pain Points */}
      {report.current_pain_points.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Current Pain Points</h3>
          <ul className="mt-2 space-y-1">
            {report.current_pain_points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                {p}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Use Cases */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900">Recommended AI Use Cases</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {report.recommended_use_cases.map((uc, i) => (
            <UseCaseCard key={i} useCase={uc} />
          ))}
        </div>
      </section>

      {/* Best First Pilot */}
      <section className="rounded-xl bg-indigo-50 p-6 border border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-800">Best First Pilot</h3>
        <p className="mt-1 font-medium text-indigo-900">{report.best_first_pilot.title}</p>
        <p className="mt-2 text-sm text-indigo-700">{report.best_first_pilot.why_this_first}</p>
        {report.best_first_pilot.success_metrics.length > 0 && (
          <ul className="mt-3 space-y-1">
            {report.best_first_pilot.success_metrics.map((m, i) => (
              <li key={i} className="text-sm text-indigo-700">• {m}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Risks */}
      <RiskSection useCases={report.recommended_use_cases} />

      {/* Roadmap */}
      <RoadmapSection roadmap={report.roadmap_30_60_90} />

      {/* Open Questions */}
      {report.open_questions.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-slate-900">Open Questions</h3>
          <ul className="mt-2 space-y-1">
            {report.open_questions.map((q, i) => (
              <li key={i} className="text-sm text-slate-700">• {q}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

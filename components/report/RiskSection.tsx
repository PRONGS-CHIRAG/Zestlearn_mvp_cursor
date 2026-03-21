import type { RecommendedUseCase } from "@/types/report";

interface Props {
  useCases: RecommendedUseCase[];
}

export default function RiskSection({ useCases }: Props) {
  const allRisks = useCases.flatMap((uc) =>
    uc.risks.map((risk) => ({ risk, useCase: uc.title }))
  );

  if (allRisks.length === 0) return null;

  return (
    <section>
      <h3 className="text-lg font-semibold text-slate-900">Risks & Considerations</h3>
      <div className="mt-4 space-y-2">
        {allRisks.map((r, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
            <span className="mt-0.5 text-amber-500">⚠</span>
            <div>
              <p className="text-sm text-slate-800">{r.risk}</p>
              <p className="text-xs text-slate-500">Related to: {r.useCase}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import type { RecommendedUseCase } from "@/types/report";

const difficultyStyles = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-600",
};

interface Props {
  useCase: RecommendedUseCase;
}

export default function UseCaseCard({ useCase }: Props) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-slate-900">{useCase.title}</h4>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyStyles[useCase.difficulty]}`}>
          {useCase.difficulty}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{useCase.description}</p>
      <p className="mt-2 text-xs text-slate-500">
        <span className="font-medium text-slate-700">Business value: </span>
        {useCase.business_value}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">Priority score</span>
        <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600">
          {useCase.priority_score}/10
        </span>
      </div>
    </div>
  );
}

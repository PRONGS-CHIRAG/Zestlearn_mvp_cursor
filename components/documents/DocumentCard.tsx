import type { DocumentSummary } from "@/types/document";
import ProcessingStatusBadge from "./ProcessingStatusBadge";

interface Props {
  document: DocumentSummary;
}

export default function DocumentCard({ document }: Props) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-slate-900">{document.fileName}</p>
          <p className="text-xs text-slate-500 uppercase">{document.fileType}</p>
        </div>
        <ProcessingStatusBadge status={document.processingStatus} />
      </div>
      {document.summary && (
        <p className="mt-3 text-sm text-slate-600 line-clamp-3">{document.summary}</p>
      )}
      {document.tags && document.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {document.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

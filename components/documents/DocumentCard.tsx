"use client";

import { useState } from "react";

export type ProcessingStatus = "uploading" | "processing" | "ready" | "error";

export interface DocumentData {
  id: string;
  fileName: string;
  fileType: string;
  size: number;
  status: ProcessingStatus;
  progress?: number;
  summary?: string;
  uploadedAt: Date;
  pageCount?: number;
  tags?: string[];
}

interface Props {
  document: DocumentData;
  onDelete?: (id: string) => Promise<void>;
  onDownload?: (id: string) => void;
  onView?: (id: string) => void;
}

// Status badge component
function StatusBadge({ status }: { status: ProcessingStatus }) {
  const config = {
    uploading: {
      label: "Uploading",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      dot: "bg-blue-400",
      animate: true,
    },
    processing: {
      label: "Processing",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
      dot: "bg-amber-400",
      animate: true,
    },
    ready: {
      label: "Ready",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      dot: "bg-emerald-400",
      animate: false,
    },
    error: {
      label: "Error",
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
      dot: "bg-red-400",
      animate: false,
    },
  };

  const { label, bg, text, border, dot, animate } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${bg} ${text} ${border}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dot} ${animate ? "animate-pulse" : ""}`}
      />
      {label}
    </span>
  );
}

// File type icon component
function FileTypeIcon({ type, className = "" }: { type: string; className?: string }) {
  const lowerType = type.toLowerCase();

  // PDF
  if (lowerType.includes("pdf")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 ${className}`}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
    );
  }

  // Word docs
  if (lowerType.includes("word") || lowerType.includes("docx") || lowerType.includes("doc")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ${className}`}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
    );
  }

  // Spreadsheets
  if (lowerType.includes("csv") || lowerType.includes("excel") || lowerType.includes("xlsx") || lowerType.includes("xls")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ${className}`}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
          />
        </svg>
      </div>
    );
  }

  // Text files
  if (lowerType.includes("txt") || lowerType.includes("text")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-slate-500/10 text-slate-400 ${className}`}>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
    );
  }

  // Default
  return (
    <div className={`flex items-center justify-center rounded-lg bg-white/5 text-muted-foreground ${className}`}>
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </div>
  );
}

export default function DocumentCard({ document, onDelete, onDownload, onView }: Props) {
  const [showSummary, setShowSummary] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop()?.toUpperCase() || "FILE";
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(document.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02] hover:shadow-xl hover:shadow-black/20">
      <div className="flex items-start gap-4">
        {/* File type icon */}
        <FileTypeIcon type={document.fileType} className="h-12 w-12 shrink-0 border border-white/[0.06]" />

        {/* File info */}
        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h4 className="truncate text-sm font-semibold text-foreground">
              {document.fileName}
            </h4>
            <StatusBadge status={document.status} />
          </div>

          {/* Meta info */}
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-medium">
              {getFileExtension(document.fileName)}
            </span>
            <span>{formatFileSize(document.size)}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{formatDate(document.uploadedAt)}</span>
            {document.pageCount && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{document.pageCount} pages</span>
              </>
            )}
          </div>

          {/* Progress bar for uploading/processing */}
          {(document.status === "uploading" || document.status === "processing") &&
            document.progress !== undefined && (
              <div className="mb-3">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      document.status === "uploading"
                        ? "bg-gradient-to-r from-blue-500 to-blue-400"
                        : "bg-gradient-to-r from-amber-500 to-amber-400"
                    }`}
                    style={{ width: `${document.progress}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {document.status === "uploading" ? "Uploading" : "Analyzing document"}{" "}
                  <span className="font-medium text-foreground">{document.progress}%</span>
                </p>
              </div>
            )}

          {/* Tags */}
          {document.tags && document.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {document.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-rose/20 bg-rose/10 px-2.5 py-0.5 text-xs font-medium text-rose"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Summary preview */}
          {document.status === "ready" && document.summary && (
            <div>
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-1.5 text-xs font-medium text-rose transition-colors hover:text-rose/80"
              >
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${showSummary ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {showSummary ? "Hide summary" : "View summary"}
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  showSummary ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {document.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {document.status === "ready" && onView && (
            <button
              onClick={() => onView(document.id)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              title="View document"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
          {document.status === "ready" && onDownload && (
            <button
              onClick={() => onDownload(document.id)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              title="Download"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
              title="Delete"
            >
              {isDeleting ? (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

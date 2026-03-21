"use client";

import { useState, useRef, useCallback } from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  status: "uploading" | "processing" | "ready" | "error";
  progress?: number;
  summary?: string;
  uploadedAt: Date;
  pageCount?: number;
}

interface Props {
  workspaceId: string;
  documents?: Document[];
  onUpload?: (files: File[]) => Promise<void>;
  onDelete?: (documentId: string) => Promise<void>;
}

// Status badge component
function StatusBadge({ status }: { status: Document["status"] }) {
  const config = {
    uploading: {
      label: "Uploading",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      dot: "bg-blue-400",
      animate: true,
    },
    processing: {
      label: "Processing",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      dot: "bg-amber-400",
      animate: true,
    },
    ready: {
      label: "Ready",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
      animate: false,
    },
    error: {
      label: "Error",
      bg: "bg-red-500/10",
      text: "text-red-400",
      dot: "bg-red-400",
      animate: false,
    },
  };

  const { label, bg, text, dot, animate } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot} ${animate ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}

// Document card component
function DocumentCard({
  document,
  onDelete,
}: {
  document: Document;
  onDelete?: (id: string) => void;
}) {
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

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    }
    if (type.includes("word") || type.includes("docx")) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    }
    if (type.includes("csv") || type.includes("excel") || type.includes("spreadsheet")) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
        </svg>
      );
    }
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    );
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    await onDelete(document.id);
    setIsDeleting(false);
  };

  return (
    <div className="group rounded-xl border border-white/5 bg-gradient-to-b from-card to-background p-4 transition-all hover:border-white/10 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-start gap-4">
        {/* File icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-muted/50 text-muted-foreground">
          {getFileIcon(document.type)}
        </div>

        {/* File info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-3">
            <h4 className="truncate text-sm font-semibold text-foreground">
              {document.name}
            </h4>
            <StatusBadge status={document.status} />
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
          {(document.status === "uploading" || document.status === "processing") && document.progress !== undefined && (
            <div className="mt-3">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    document.status === "uploading" ? "bg-blue-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${document.progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {document.status === "uploading" ? "Uploading" : "Analyzing"} ({document.progress}%)
              </p>
            </div>
          )}

          {/* Summary preview */}
          {document.status === "ready" && document.summary && (
            <div className="mt-3">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-1 text-xs font-medium text-rose hover:text-rose/80"
              >
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${showSummary ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {showSummary ? "Hide summary" : "Show summary"}
              </button>
              {showSummary && (
                <p className="mt-2 rounded-lg border border-white/5 bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
                  {document.summary}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {document.status === "ready" && (
            <button
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              title="Download"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
            title="Delete"
          >
            {isDeleting ? (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        </div>
        <h4 className="mb-2 text-lg font-semibold text-foreground">
          No documents yet
        </h4>
        <p className="max-w-sm text-sm text-muted-foreground">
          Upload documents above to ground AI recommendations in your company
          context. SOPs, strategy docs, and process flows work great.
        </p>
      </div>
    </div>
  );
}

export default function DocumentsPanel({ workspaceId, documents = [], onUpload, onDelete }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock documents for demo
  const demoDocuments: Document[] = documents.length > 0 ? documents : [
    {
      id: "1",
      name: "Q4_Manufacturing_SOP_v2.pdf",
      type: "application/pdf",
      size: 2457600,
      status: "ready",
      summary: "Standard operating procedures for Q4 manufacturing processes including quality control checkpoints, batch documentation requirements, and compliance protocols for FDA 21 CFR Part 11.",
      uploadedAt: new Date(Date.now() - 86400000 * 2),
      pageCount: 24,
    },
    {
      id: "2",
      name: "Clinical_Trial_Data_Export.csv",
      type: "text/csv",
      size: 856320,
      status: "processing",
      progress: 67,
      uploadedAt: new Date(Date.now() - 3600000),
    },
    {
      id: "3",
      name: "2024_Digital_Strategy_Roadmap.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 1245184,
      status: "ready",
      summary: "Digital transformation roadmap for 2024 covering AI adoption priorities, data infrastructure upgrades, and process automation targets across R&D and manufacturing.",
      uploadedAt: new Date(Date.now() - 86400000 * 5),
      pageCount: 18,
    },
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && onUpload) {
      setIsUploading(true);
      await onUpload(files);
      setIsUploading(false);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onUpload) {
      setIsUploading(true);
      await onUpload(files);
      setIsUploading(false);
    }
  }, [onUpload]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayDocuments = documents.length > 0 ? documents : demoDocuments;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Documents</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload context documents to ground AI recommendations
          </p>
        </div>
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Upload File
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.csv,.xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
          isDragging
            ? "border-rose bg-rose/5 shadow-lg shadow-rose/10"
            : "border-white/10 bg-card/30 hover:border-white/20 hover:bg-card/50"
        }`}
      >
        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
          isDragging 
            ? "border-rose/30 bg-rose/10" 
            : "border-white/5 bg-muted/50"
        }`}>
          <svg
            className={`h-7 w-7 transition-colors ${isDragging ? "text-rose" : "text-muted-foreground"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-base font-semibold text-foreground">
          {isDragging ? "Drop files here" : "Drag and drop files"}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          or click to browse from your computer
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["PDF", "DOCX", "TXT", "CSV", "XLSX"].map((type) => (
            <span key={type} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
              {type}
            </span>
          ))}
          <span className="text-xs text-muted-foreground">up to 10MB</span>
        </div>
      </div>

      {/* Document stats */}
      {displayDocuments.length > 0 && (
        <div className="flex items-center gap-6 rounded-xl border border-white/5 bg-card/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">{displayDocuments.length}</span>
            <span className="text-sm text-muted-foreground">documents</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-400">
              {displayDocuments.filter((d) => d.status === "ready").length}
            </span>
            <span className="text-sm text-muted-foreground">ready</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-400">
              {displayDocuments.filter((d) => d.status === "processing").length}
            </span>
            <span className="text-sm text-muted-foreground">processing</span>
          </div>
        </div>
      )}

      {/* Documents list */}
      {displayDocuments.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Uploaded Documents</h3>
          <div className="space-y-2">
            {displayDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} onDelete={onDelete} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

interface Props {
  workspaceId: string;
}

type ConvexStatus = "uploaded" | "processing" | "done" | "error";
type DisplayStatus = "uploading" | "processing" | "ready" | "error";

function toDisplayStatus(s: ConvexStatus): DisplayStatus {
  if (s === "uploaded") return "processing";
  if (s === "done") return "ready";
  return s;
}

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: DisplayStatus }) {
  const config = {
    uploading: { label: "Uploading", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400", animate: true },
    processing: { label: "Processing", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", animate: true },
    ready: { label: "Ready", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", animate: false },
    error: { label: "Error", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400", animate: false },
  };
  const { label, bg, text, dot, animate } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${bg} ${text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot} ${animate ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// DocumentCard
// ---------------------------------------------------------------------------

interface DocCardProps {
  name: string;
  fileType: string;
  status: DisplayStatus;
  summary?: string;
  createdAt: number;
  tags?: string[];
}

function DocumentCard({ name, fileType, status, summary, createdAt, tags }: DocCardProps) {
  const [showSummary, setShowSummary] = useState(false);

  const formatDate = (ts: number) =>
    new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(
      new Date(ts)
    );

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    }
    if (type.includes("markdown") || name.endsWith(".md")) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    }
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    );
  };

  return (
    <div className="group rounded-xl border border-white/5 bg-gradient-to-b from-card to-background p-4 transition-all hover:border-white/10 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-muted/50 text-muted-foreground">
          {getFileIcon(fileType)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-3">
            <h4 className="truncate text-sm font-semibold text-foreground">{name}</h4>
            <StatusBadge status={status} />
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{formatDate(createdAt)}</span>
          </div>

          {tags && tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {status === "ready" && summary && (
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
                <p className="mt-2 whitespace-pre-wrap rounded-lg border border-white/5 bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
                  {summary}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        </div>
        <h4 className="mb-2 text-lg font-semibold text-foreground">No documents yet</h4>
        <p className="max-w-sm text-sm text-muted-foreground">
          Upload documents above to ground AI recommendations in your company
          context. SOPs, process docs, and strategy files work great.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ACCEPTED_EXTENSIONS = ".pdf,.txt,.md";
const ACCEPTED_LABELS = ["PDF", "TXT", "MD"];

export default function DocumentsPanel({ workspaceId }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadInfo, setUploadInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch real documents from Convex (auto-refreshes via subscription)
  const convexDocs = useQuery(api.documents.listWorkspaceDocuments, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const documents = convexDocs ?? [];
  const isLoading = convexDocs === undefined;

  // ── Upload handler ──────────────────────────────────────────────────────

  async function uploadFile(file: File) {
    setUploadError(null);
    setUploadInfo(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("workspaceId", workspaceId);
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setUploadError(json.error || "Upload failed. Please try again.");
        return;
      }

      if (json.aiStatus === "skipped" || json.aiStatus === "failed") {
        setUploadInfo(
          `"${file.name}" uploaded but AI summary ${json.aiStatus === "skipped" ? "was skipped" : "failed"}: ${json.aiError || "unknown reason"}. The document is saved and can be re-processed later.`
        );
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleFiles(files: File[]) {
    for (const file of files) {
      await uploadFile(file);
    }
    // Reset the file input so re-selecting the same file triggers onChange
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Drag & drop ─────────────────────────────────────────────────────────

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

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) await handleFiles(files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [workspaceId]
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) await handleFiles(files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [workspaceId]
  );

  const handleUploadClick = () => fileInputRef.current?.click();

  // ── Computed stats ──────────────────────────────────────────────────────

  const readyCount = documents.filter((d) => d.processingStatus === "done").length;
  const processingCount = documents.filter((d) => d.processingStatus === "processing" || d.processingStatus === "uploaded").length;

  // ── Render ──────────────────────────────────────────────────────────────

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
              Uploading…
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
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Upload error */}
      {uploadError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-400">Upload failed</p>
            <p className="mt-0.5 text-sm text-red-400/80">{uploadError}</p>
          </div>
          <button onClick={() => setUploadError(null)} className="ml-auto text-xs text-red-400/60 hover:text-red-400">
            Dismiss
          </button>
        </div>
      )}

      {/* AI warning */}
      {uploadInfo && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-amber-400/90">{uploadInfo}</p>
          <button onClick={() => setUploadInfo(null)} className="ml-auto text-xs text-amber-400/60 hover:text-amber-400">Dismiss</button>
        </div>
      )}

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
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
            isDragging ? "border-rose/30 bg-rose/10" : "border-white/5 bg-muted/50"
          }`}
        >
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
        <p className="mb-3 text-sm text-muted-foreground">or click to browse from your computer</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {ACCEPTED_LABELS.map((type) => (
            <span key={type} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
              {type}
            </span>
          ))}
          <span className="text-xs text-muted-foreground">up to 10 MB</span>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted/30" />
          ))}
        </div>
      )}

      {/* Document stats */}
      {!isLoading && documents.length > 0 && (
        <div className="flex items-center gap-6 rounded-xl border border-white/5 bg-card/30 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">{documents.length}</span>
            <span className="text-sm text-muted-foreground">documents</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-400">{readyCount}</span>
            <span className="text-sm text-muted-foreground">ready</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-400">{processingCount}</span>
            <span className="text-sm text-muted-foreground">processing</span>
          </div>
        </div>
      )}

      {/* Documents list */}
      {!isLoading && documents.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Uploaded Documents</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <DocumentCard
                key={doc._id}
                name={doc.fileName}
                fileType={doc.fileType}
                status={toDisplayStatus(doc.processingStatus)}
                summary={doc.summary ?? undefined}
                createdAt={doc.createdAt}
                tags={doc.tags ?? undefined}
              />
            ))}
          </div>
        </div>
      ) : (
        !isLoading && <EmptyState />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

interface Props {
  workspaceId: string;
}

export default function DocumentsPanel({ workspaceId }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO: Handle file upload
  };

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
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Upload File
        </button>
      </div>

      {/* Upload dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
          isDragging
            ? "border-rose bg-rose/5"
            : "border-white/10 bg-card/30 hover:border-white/20 hover:bg-card/50"
        }`}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-muted/50">
          <svg
            className={`h-8 w-8 ${isDragging ? "text-rose" : "text-muted-foreground"}`}
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
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {isDragging ? "Drop files here" : "Drag and drop files"}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          or click to browse from your computer
        </p>
        <p className="text-xs text-muted-foreground">
          Supports PDF, DOCX, TXT, CSV up to 10MB
        </p>
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
    </div>
  );
}

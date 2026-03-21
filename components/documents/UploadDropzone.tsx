"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
  workspaceId: string;
  onUpload: (files: File[]) => Promise<void>;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
}

const ACCEPTED_TYPES = {
  "application/pdf": "PDF",
  "text/plain": "TXT",
};

export default function UploadDropzone({
  workspaceId,
  onUpload,
  accept = ".pdf,.txt",
  maxSizeMB = 10,
  disabled = false,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFiles = useCallback(
    (files: File[]): { valid: File[]; errors: string[] } => {
      const valid: File[] = [];
      const errors: string[] = [];

      files.forEach((file) => {
        // Check file type
        const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const acceptedExtensions = accept.split(",").map((ext) => ext.trim().toLowerCase());

        if (!acceptedExtensions.includes(extension)) {
          errors.push(`${file.name}: Unsupported file type`);
          return;
        }

        // Check file size
        if (file.size > maxSizeBytes) {
          errors.push(`${file.name}: File exceeds ${maxSizeMB}MB limit`);
          return;
        }

        valid.push(file);
      });

      return { valid, errors };
    },
    [accept, maxSizeBytes, maxSizeMB]
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0 || disabled) return;

      setError(null);
      const files = Array.from(fileList);
      const { valid, errors } = validateFiles(files);

      if (errors.length > 0) {
        setError(errors.join(". "));
        return;
      }

      if (valid.length === 0) return;

      setIsUploading(true);
      try {
        await onUpload(valid);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      } finally {
        setIsUploading(false);
        // Reset input
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    },
    [disabled, onUpload, validateFiles]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && !isUploading) {
        setIsDragging(true);
      }
    },
    [disabled, isUploading]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled || isUploading) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, isUploading, handleFiles]
  );

  const handleClick = () => {
    if (!disabled && !isUploading) {
      inputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          disabled
            ? "cursor-not-allowed border-white/5 bg-card/20 opacity-50"
            : isDragging
            ? "border-rose bg-rose/5 shadow-lg shadow-rose/10"
            : isUploading
            ? "border-rose/50 bg-rose/5"
            : "border-white/10 bg-card/30 hover:border-white/20 hover:bg-card/50"
        }`}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload files"
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Upload icon */}
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-300 ${
            isDragging
              ? "border-rose/30 bg-rose/10"
              : isUploading
              ? "border-rose/20 bg-rose/5"
              : "border-white/5 bg-muted/50"
          }`}
        >
          {isUploading ? (
            <svg className="h-8 w-8 animate-spin text-rose" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            <svg
              className={`h-8 w-8 transition-colors duration-300 ${
                isDragging ? "text-rose" : "text-muted-foreground"
              }`}
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
          )}
        </div>

        {/* Text content */}
        <div className="space-y-2">
          {isUploading ? (
            <>
              <h3 className="text-base font-semibold text-rose">Uploading...</h3>
              <p className="text-sm text-muted-foreground">Please wait while your files are being uploaded</p>
            </>
          ) : isDragging ? (
            <>
              <h3 className="text-base font-semibold text-rose">Drop files here</h3>
              <p className="text-sm text-rose/70">Release to upload your documents</p>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold text-foreground">Drag and drop files</h3>
              <p className="text-sm text-muted-foreground">
                or{" "}
                <span className="font-medium text-rose hover:text-rose-light">click to browse</span>{" "}
                from your computer
              </p>
            </>
          )}
        </div>

        {/* File type badges */}
        {!isUploading && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              PDF
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              TXT
            </span>
            <span className="text-xs text-muted-foreground/70">up to {maxSizeMB}MB</span>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          aria-hidden="true"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-400">Upload Error</p>
            <p className="mt-0.5 text-xs text-red-400/80">{error}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setError(null);
            }}
            className="shrink-0 rounded p-1 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

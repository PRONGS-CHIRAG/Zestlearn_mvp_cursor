"use client";

import { useRef } from "react";

interface Props {
  workspaceId: string;
  onUpload: (file: File) => void;
}

export default function UploadDropzone({ workspaceId, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    // TODO: POST to /api/upload with workspaceId + file
    onUpload(files[0]);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-white px-6 py-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
    >
      <p className="text-sm font-medium text-slate-700">
        Drop a file here or <span className="text-indigo-600">click to upload</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">PDF and TXT supported</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}

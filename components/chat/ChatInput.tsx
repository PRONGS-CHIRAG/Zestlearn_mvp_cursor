"use client";

import { useState, useRef } from "react";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setValue("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="mt-3 flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Ask a consulting question…"
        className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleSend}
        disabled={loading || !value.trim()}
        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-40"
      >
        {loading ? "…" : "Send"}
      </button>
    </div>
  );
}

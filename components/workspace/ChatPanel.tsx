"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AVAILABLE_MODELS } from "@/lib/ai/models";

interface Props {
  workspaceId: string;
}

const PROMPT_STARTERS = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    text: "What are the top AI opportunities for our team?",
    category: "Opportunities",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    text: "How can we automate our data analysis workflows?",
    category: "Automation",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    text: "What's the best first pilot project for us?",
    category: "Strategy",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    text: "What risks should we consider with AI adoption?",
    category: "Risk",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    text: "How do we ensure compliance with AI regulations?",
    category: "Compliance",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    text: "What ROI can we expect from AI implementation?",
    category: "ROI",
  },
];

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Simple markdown-ish renderer for assistant messages
function MessageContent({ content, role }: { content: string; role: string }) {
  return (
    <div
      className={`prose prose-sm max-w-none ${
        role === "user"
          ? "prose-invert"
          : "prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-li:text-foreground/90"
      }`}
    >
      {content.split("\n").map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="mb-2 font-semibold">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }
        if (line.startsWith("*") && line.endsWith("*")) {
          return (
            <p key={i} className="mb-1 italic text-muted-foreground">
              {line.replace(/\*/g, "")}
            </p>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <p key={i} className="mb-1 pl-3">
              <span className="mr-2 text-rose">-</span>
              {line.substring(2)}
            </p>
          );
        }
        if (line === "") return <br key={i} />;
        return (
          <p key={i} className="mb-2">
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatPanel({ workspaceId }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(AVAILABLE_MODELS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Real messages from Convex
  const convexMessages = useQuery(api.chat.listRecentMessagesByWorkspace, {
    workspaceId: workspaceId as Id<"workspaces">,
    limit: 50,
  });
  const messages = convexMessages ?? [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingIndicator, scrollToBottom]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text || isLoading) return;

    if (!selectedModelId) {
      setError("Please select exactly 1 model before sending.");
      return;
    }

    setInputValue("");
    setError(null);
    setIsLoading(true);
    setTypingIndicator(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId,
          message: text,
          modelId: selectedModelId,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "Failed to get a response. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat request failed.");
    } finally {
      setIsLoading(false);
      setTypingIndicator(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showPromptStarters = messages.length === 0 && !typingIndicator;

  return (
    <div className="flex h-[calc(100vh-220px)] flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose/20 bg-gradient-to-br from-rose/20 to-pink-500/10">
            <svg className="h-6 w-6 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI Consultant</h2>
            <p className="text-sm text-muted-foreground">
              Your strategic AI advisor for pharma and biotech
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-400">Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/5 bg-gradient-to-b from-card/80 to-background">
        {showPromptStarters ? (
          <div className="flex h-full flex-col items-center justify-center p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose/20 bg-gradient-to-br from-rose/10 to-pink-500/5">
                <svg className="h-8 w-8 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                How can I help you today?
              </h3>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                I&apos;m your AI consultant, trained to help pharma and biotech teams
                identify and implement practical AI opportunities.
              </p>
            </div>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {PROMPT_STARTERS.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handleSend(prompt.text)}
                  className="group flex items-start gap-3 rounded-xl border border-white/5 bg-muted/20 p-4 text-left transition-all hover:border-rose/30 hover:bg-muted/40"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-muted/50 text-muted-foreground transition-colors group-hover:border-rose/30 group-hover:text-rose">
                    {prompt.icon}
                  </div>
                  <div>
                    <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {prompt.category}
                    </span>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground">
                      {prompt.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-6">
            {messages.map((msg) => {
              const modelLabel =
                msg.role === "assistant" && msg.metadata?.modelId
                  ? AVAILABLE_MODELS.find((m) => m.id === (msg.metadata as { modelId?: string }).modelId)?.label
                  : undefined;

              return (
                <div
                  key={msg._id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[85%] gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-rose to-pink-500"
                          : "border border-white/10 bg-muted/50"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      )}
                    </div>

                    {/* Message bubble */}
                    <div className="flex flex-col gap-1">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-rose to-pink-500 text-white"
                            : "border border-white/5 bg-muted/30"
                        }`}
                      >
                        <MessageContent content={msg.content} role={msg.role} />
                      </div>
                      <div
                        className={`flex items-center gap-2 text-[10px] text-muted-foreground ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span>{formatTime(msg.createdAt)}</span>
                        {modelLabel && (
                          <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">
                            {modelLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {typingIndicator && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-muted/50">
                    <svg className="h-4 w-4 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-1 py-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2">
          <p className="flex-1 text-sm text-red-400">{error}</p>
          <button onClick={() => setError(null)} className="text-xs text-red-400/60 hover:text-red-400">
            Dismiss
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="mt-4">
        {/* Model selector */}
        <div className="mb-3 flex items-center gap-3">
          <label className="text-xs font-medium text-muted-foreground">Model:</label>
          <select
            value={selectedModelId}
            onChange={(e) => setSelectedModelId(e.target.value)}
            className="rounded-lg border border-white/10 bg-card/50 px-3 py-1.5 text-xs text-foreground outline-none transition-colors focus:border-rose/50 focus:ring-1 focus:ring-rose/20"
          >
            {AVAILABLE_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} — {m.description}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/50 p-2 transition-all focus-within:border-rose/50 focus-within:ring-2 focus-within:ring-rose/20">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI opportunities for your team..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-rose to-pink-500 text-white shadow-lg shadow-rose/20 transition-all hover:brightness-110 disabled:opacity-50 disabled:shadow-none"
          >
            {isLoading ? (
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            )}
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <p className="text-xs text-muted-foreground">
            Press Enter to send
          </p>
          <p className="text-xs text-muted-foreground">
            AI responses are validated before display
          </p>
        </div>
      </div>
    </div>
  );
}

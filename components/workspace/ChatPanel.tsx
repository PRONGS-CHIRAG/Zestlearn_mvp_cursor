"use client";

import { useState } from "react";

interface Props {
  workspaceId: string;
}

const PROMPT_STARTERS = [
  "What are the top AI opportunities for our team?",
  "How can we automate our data analysis process?",
  "What's the best first pilot project for us?",
  "What risks should we consider with AI adoption?",
];

export default function ChatPanel({ workspaceId }: Props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    // TODO: Send to API and stream response
  };

  return (
    <div className="flex h-[calc(100vh-220px)] flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Consultant</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Chat with your AI consultant to explore opportunities
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-400">Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-rose/20 bg-rose/10">
              <svg
                className="h-8 w-8 text-rose"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Start a conversation
            </h3>
            <p className="mb-8 max-w-sm text-sm text-muted-foreground">
              Ask questions about AI opportunities for your organization, or try
              one of the suggestions below.
            </p>

            {/* Prompt starters */}
            <div className="grid w-full max-w-lg gap-2">
              {PROMPT_STARTERS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setMessage(prompt)}
                  className="rounded-xl border border-white/5 bg-muted/30 p-4 text-left text-sm text-muted-foreground transition-all hover:border-rose/30 hover:bg-muted/50 hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-rose to-pink-500 text-white"
                      : "border border-white/5 bg-muted/30 text-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="mt-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/50 p-2 focus-within:border-rose/50 focus-within:ring-1 focus-within:ring-rose/20">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about AI opportunities..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-rose to-pink-500 text-white transition-all hover:brightness-110 disabled:opacity-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

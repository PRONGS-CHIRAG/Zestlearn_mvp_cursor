"use client";

import { useState, useCallback } from "react";
import type { ChatMessage } from "@/types/chat";

// TODO: wire message list to Convex query listRecentMessagesByWorkspace

export function useChat(workspaceId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      setLoading(true);
      setError(null);

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        workspaceId,
        role: "user",
        content,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workspaceId, message: content }),
        });
        const data = await res.json();
        if (data.success && data.reply) {
          const assistantMsg: ChatMessage = {
            id: crypto.randomUUID(),
            workspaceId,
            role: "assistant",
            content: data.reply,
            createdAt: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else {
          setError(data.error ?? "Chat failed.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [workspaceId]
  );

  return { messages, loading, error, sendMessage };
}

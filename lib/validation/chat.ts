import type { ChatRequest } from "@/types/chat";

export function validateChatRequest(input: Partial<ChatRequest>): {
  valid: boolean;
  error?: string;
} {
  if (!input.workspaceId?.trim()) return { valid: false, error: "workspaceId is required." };
  if (!input.message?.trim()) return { valid: false, error: "Message cannot be empty." };
  if (input.message.length > 4000) return { valid: false, error: "Message is too long (max 4000 chars)." };
  return { valid: true };
}

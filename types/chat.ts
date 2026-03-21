export interface ChatMessage {
  id: string;
  workspaceId: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
}

export interface ChatRequest {
  workspaceId: string;
  message: string;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  citations?: string[];
  usedContext?: {
    documentsUsed: number;
    memoryPatternsUsed: number;
    recentMessagesUsed: number;
  };
  error?: string;
}

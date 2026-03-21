export interface MemoryPattern {
  id: string;
  workspaceId?: string;
  scope: "workspace" | "shared";
  category: string;
  functionArea?: string;
  industry?: string;
  patternText: string;
  confidenceScore?: number;
  sourceType: "report" | "chat" | "seed" | "document";
  createdAt?: number;
}

export interface MemoryQueryResponse {
  success: boolean;
  insights: MemoryPattern[];
  error?: string;
}

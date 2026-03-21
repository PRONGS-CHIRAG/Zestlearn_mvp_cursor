export interface DocumentSummary {
  id: string;
  fileName: string;
  fileType: string;
  storagePath?: string;
  extractedText?: string;
  summary?: string;
  tags?: string[];
  processingStatus: "uploaded" | "processing" | "done" | "error";
  createdAt?: number;
}

export interface DocumentUploadResponse {
  success: boolean;
  documentId?: string;
  processingStatus?: "uploaded" | "processing";
  error?: string;
}

export interface DocumentProcessingResult {
  documentId: string;
  extractedText: string;
  summary: string;
  tags: string[];
  processingStatus: "done" | "error";
}

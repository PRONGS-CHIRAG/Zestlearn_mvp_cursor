// ---------------------------------------------------------------------------
// Supported MIME types and file extensions for document upload
// ---------------------------------------------------------------------------

export const SUPPORTED_MIME_TYPES = [
  "text/plain",
  "text/markdown",
  "application/pdf",
] as const;

export type SupportedMimeType = (typeof SUPPORTED_MIME_TYPES)[number];

export const SUPPORTED_EXTENSIONS = [".txt", ".md", ".pdf"] as const;
export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];

export function isSupportedType(mimeType: string): mimeType is SupportedMimeType {
  return (SUPPORTED_MIME_TYPES as readonly string[]).includes(mimeType);
}

export function isSupportedExtension(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  const ext = lower.slice(lower.lastIndexOf("."));
  return (SUPPORTED_EXTENSIONS as readonly string[]).includes(ext);
}

/** Human-readable label for the upload dropzone hint. */
export const SUPPORTED_EXTENSIONS_LABEL = SUPPORTED_EXTENSIONS.join(", ");

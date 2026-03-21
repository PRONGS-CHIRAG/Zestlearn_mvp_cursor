export const SUPPORTED_TYPES = ["text/plain", "application/pdf"] as const;
export type SupportedMimeType = (typeof SUPPORTED_TYPES)[number];

export const SUPPORTED_EXTENSIONS = [".txt", ".pdf"] as const;

export function isSupportedType(mimeType: string): mimeType is SupportedMimeType {
  return (SUPPORTED_TYPES as readonly string[]).includes(mimeType);
}

export function isSupportedExtension(fileName: string): boolean {
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf("."));
  return (SUPPORTED_EXTENSIONS as readonly string[]).includes(ext);
}

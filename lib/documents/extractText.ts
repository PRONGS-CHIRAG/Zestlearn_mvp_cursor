import { isSupportedExtension } from "./supportedTypes";

// ---------------------------------------------------------------------------
// ExtractionResult — always returned, never throws
// ---------------------------------------------------------------------------

export interface ExtractionResult {
  /** Extracted plain text. Empty string when extraction fails. */
  text: string;
  /** MIME type of the source file. */
  mimeType: string;
  /** Human-readable reason when extraction could not produce text. */
  error?: string;
  /** True when we fell back gracefully (partial text may still be present). */
  partial?: boolean;
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

/**
 * Extract plain text from an uploaded file buffer.
 *
 * Supported formats: .txt, .md — decoded as UTF-8
 *                    .pdf      — extracted via pdf-parse; falls back cleanly
 *
 * Never throws. On failure, `text` is empty (or partial) and `error` is set.
 */
export async function extractText(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<ExtractionResult> {
  const lower = fileName.toLowerCase();
  const ext = lower.slice(lower.lastIndexOf("."));

  // Guard: reject unsupported extensions early
  if (!isSupportedExtension(fileName)) {
    return {
      text: "",
      mimeType,
      error: `Unsupported file extension "${ext}". Accepted: .txt, .md, .pdf`,
    };
  }

  // ── Plain text / Markdown ────────────────────────────────────────────────
  if (
    mimeType === "text/plain" ||
    mimeType === "text/markdown" ||
    ext === ".txt" ||
    ext === ".md"
  ) {
    return extractPlainText(fileBuffer, mimeType);
  }

  // ── PDF ──────────────────────────────────────────────────────────────────
  if (mimeType === "application/pdf" || ext === ".pdf") {
    return extractPdf(fileBuffer);
  }

  // Fallback — extension matched but MIME type unrecognised
  return {
    text: "",
    mimeType,
    error: `Could not determine how to extract text from "${fileName}".`,
  };
}

// ---------------------------------------------------------------------------
// Plain text / Markdown
// ---------------------------------------------------------------------------

function extractPlainText(fileBuffer: Buffer, mimeType: string): ExtractionResult {
  try {
    const text = fileBuffer.toString("utf-8").trim();
    if (!text) {
      return { text: "", mimeType, error: "File is empty." };
    }
    return { text, mimeType };
  } catch (err) {
    return {
      text: "",
      mimeType,
      error: `Failed to decode file as UTF-8: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

// ---------------------------------------------------------------------------
// PDF
// ---------------------------------------------------------------------------

async function extractPdf(fileBuffer: Buffer): Promise<ExtractionResult> {
  const mimeType = "application/pdf";

  // Validate PDF magic bytes before parsing (%PDF-)
  if (
    fileBuffer.length < 5 ||
    fileBuffer.slice(0, 5).toString("ascii") !== "%PDF-"
  ) {
    return {
      text: "",
      mimeType,
      error: "File does not appear to be a valid PDF (missing %PDF- header).",
    };
  }

  try {
    // pdf-parse is a CommonJS module — use a namespace import so TypeScript is
    // happy regardless of whether the bundler wraps it in `{ default }` or not.
    const pdfParse = await import("pdf-parse");
    // Resolve whether it came through as the function directly or as .default
    const parse =
      typeof pdfParse === "function"
        ? (pdfParse as unknown as (buf: Buffer, opts?: object) => Promise<{ text: string }>)
        : (pdfParse as unknown as { default: (buf: Buffer, opts?: object) => Promise<{ text: string }> }).default;

    const data = await parse(fileBuffer, {
      // Suppress the default "render_page" behaviour that tries to write debug
      // files — not available in Vercel's read-only serverless filesystem.
      pagerender: undefined,
    });

    const text = (data.text ?? "").trim();

    if (!text) {
      return {
        text: "",
        mimeType,
        partial: true,
        error:
          "PDF parsed successfully but contained no extractable text. " +
          "The file may be scanned/image-only.",
      };
    }

    return { text, mimeType };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    // pdf-parse can fail on encrypted, malformed, or XFA-only PDFs.
    // Return a controlled partial result so the upload still succeeds.
    return {
      text: "",
      mimeType,
      partial: true,
      error: `PDF text extraction failed: ${message}. The document was saved but could not be summarised automatically.`,
    };
  }
}

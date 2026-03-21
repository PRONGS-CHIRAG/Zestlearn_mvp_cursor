import { isSupportedExtension } from "./supportedTypes";

export interface ExtractionResult {
  text: string;
  mimeType: string;
  error?: string;
}

export async function extractText(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<ExtractionResult> {
  if (!isSupportedExtension(fileName)) {
    return { text: "", mimeType, error: `Unsupported file type: ${fileName}` };
  }

  if (mimeType === "text/plain") {
    return { text: fileBuffer.toString("utf-8"), mimeType };
  }

  if (mimeType === "application/pdf") {
    // TODO: implement PDF text extraction
    // Recommended: use pdf-parse or pdfjs-dist
    // import pdfParse from "pdf-parse";
    // const data = await pdfParse(fileBuffer);
    // return { text: data.text, mimeType };
    return {
      text: "",
      mimeType,
      error: "PDF extraction not yet implemented. Please paste text directly.",
    };
  }

  return { text: "", mimeType, error: "Unsupported file type" };
}

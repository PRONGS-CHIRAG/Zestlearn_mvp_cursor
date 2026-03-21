function getFilenameFromDisposition(disposition: string | null): string | null {
  if (!disposition) {
    return null;
  }

  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const basicMatch = disposition.match(/filename="?([^"]+)"?/i);
  return basicMatch?.[1] ?? null;
}

export async function downloadReportPdf(workspaceId: string): Promise<void> {
  const params = new URLSearchParams({ workspaceId });
  const response = await fetch(`/api/report/pdf?${params.toString()}`);

  if (!response.ok) {
    let message = "Unable to download the report PDF.";

    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) {
        message = data.error;
      }
    } catch {
      // Ignore JSON parse failures and use the fallback message.
    }

    throw new Error(message);
  }

  const blob = await response.blob();
  const downloadUrl = URL.createObjectURL(blob);
  const fileName =
    getFilenameFromDisposition(response.headers.get("content-disposition")) ??
    "zestlearn-report.pdf";

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(downloadUrl);
}

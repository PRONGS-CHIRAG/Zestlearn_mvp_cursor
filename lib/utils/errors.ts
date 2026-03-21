export function toReadableError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message.includes("fetch");
}

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

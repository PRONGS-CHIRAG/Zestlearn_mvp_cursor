type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, data?: unknown): void {
  const prefix = `[ZestLearn][${level.toUpperCase()}]`;
  if (data !== undefined) {
    console[level](`${prefix} ${message}`, data);
  } else {
    console[level](`${prefix} ${message}`);
  }
}

export const logger = {
  info: (message: string, data?: unknown) => log("info", message, data),
  warn: (message: string, data?: unknown) => log("warn", message, data),
  error: (message: string, data?: unknown) => log("error", message, data),
};

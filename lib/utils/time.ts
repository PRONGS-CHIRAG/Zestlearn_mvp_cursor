export function now(): number {
  return Date.now();
}

export function msToSeconds(ms: number): number {
  return Math.round(ms / 1000);
}

export function isOlderThan(timestamp: number, days: number): boolean {
  return Date.now() - timestamp > days * 24 * 60 * 60 * 1000;
}

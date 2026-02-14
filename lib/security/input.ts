const CONTROL_CHARS_REGEX = /[\u0000-\u001f\u007f]/g;

export function sanitizeText(value: string, maxLength: number): string {
  return value.replace(CONTROL_CHARS_REGEX, "").trim().slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  // Pragmatic RFC 5322-lite validation for UX/server-side gatekeeping.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}


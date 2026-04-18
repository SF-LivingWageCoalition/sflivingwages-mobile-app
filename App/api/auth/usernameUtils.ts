/**
 * Pure helpers for generating and sanitizing username candidates.
 */

/**
 * Extract a sanitized base string from the local part of an email, suitable for username generation.
 */
export const makeBaseFromEmail = (email: string): string => {
  const local = (email.split("@")[0] || "user").toLowerCase().normalize("NFKC");
  const noDiacritics = local.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  let sanitized = noDiacritics.replace(/[^a-z0-9._-]/g, "");
  sanitized = sanitized.replace(/[._-]{2,}/g, "_");
  sanitized = sanitized.replace(/^[_.-]+|[_.-]+$/g, "");
  if (sanitized.length === 0) return "user";
  return sanitized;
};

/**
 * Generate a short, deterministic hash from a string, suitable for creating unique suffixes.
 */
export const shortHash = (input: string, len = 4): string => {
  const n = Math.abs(
    [...input].reduce(
      (acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0,
      Date.now(),
    ),
  );
  return n.toString(36).slice(-len);
};

/**
 * Generate a username candidate by appending an attempt number or hash suffix to a base string.
 */
export const generateCandidate = (
  base: string,
  attempt: number,
  seed?: string,
): string => {
  if (attempt === 0) return base;
  if (attempt <= 9) return `${base}${attempt}`;
  return `${base}-${shortHash((seed ?? base) + String(attempt))}`;
};

export default {
  makeBaseFromEmail,
  shortHash,
  generateCandidate,
};

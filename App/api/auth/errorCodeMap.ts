import { translate } from "../../translation";
import type { TxKeyPath } from "../../translation";

/**
 * Build a translation key for a given numeric code.
 * We store error messages in the locale under `errors.simpleJwt.codes['<n>']`.
 *
 * @param code - The numeric error code.
 * @returns The translation key for the error code.
 */
function getTxKeyForCode(code: number): string {
  return `errors.simpleJwt.codes.${code}`;
}

/**
 * Extract a numeric error code from the plugin response payload.
 * Per Simple JWT Login behavior we expect a numeric `errorCode` on the
 * top-level `data` object (i.e. `payload.data.errorCode`). We also accept
 * a top-level `errorCode` fallback.
 *
 * @param payload - The parsed response payload from the server.
 * @returns The numeric error code, or undefined if not found.
 */
function extractNumericCode(payload: any): number | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const candidate = payload?.data?.errorCode ?? payload?.errorCode;
  if (candidate === undefined || candidate === null) return undefined;
  const n =
    typeof candidate === "number" ? candidate : parseInt(String(candidate), 10);
  return Number.isNaN(n) ? undefined : n;
}

/**
 * Given a parsed API response (or error payload), return a user-facing
 * translated message and the numeric error code when available.
 *
 * @param payload - The parsed response payload from the server.
 * @returns An object with `message`, and optionally `errorCode` or `errorKey`.
 */
export function getFriendlyErrorInfo(payload: any): {
  message: string;
  errorCode?: number;
  errorKey?: string;
} {
  // Prefer server-provided numeric code
  const code = extractNumericCode(payload);
  if (typeof code === "number") {
    const txKey = getTxKeyForCode(code);
    // translate will return the key if not found; we still return that so the
    // UI will show something useful (and missing keys can be filled in later).
    return { message: translate(txKey as TxKeyPath), errorCode: code };
  }

  // Next, check for WooCommerce-style string codes (e.g. "registration-error-email-exists").
  const wcCode = payload?.data?.code ?? payload?.code;
  if (typeof wcCode === "string" && wcCode.length > 0) {
    const txKey = `errors.woocommerce.codes.${wcCode}`;
    return { message: translate(txKey as TxKeyPath), errorKey: wcCode };
  }

  // Some server responses include a textual message at common locations.
  const serverMsg =
    payload?.data?.message ??
    payload?.message ??
    payload?.data?.error ??
    undefined;
  if (typeof serverMsg === "string" && serverMsg.length > 0) {
    return { message: serverMsg, errorCode: code };
  }

  // Final fallback: generic localized unexpected error
  return {
    message:
      translate("errors.unexpectedError" as TxKeyPath) ||
      "An unexpected error occurred.",
    errorCode: code,
  };
}

export { getTxKeyForCode };

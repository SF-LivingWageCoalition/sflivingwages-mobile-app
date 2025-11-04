import { translate } from "../../translation/i18n";

/**
 * Build a translation key for a given numeric code.
 * We store error messages in the locale under `errors.simpleJwt.codes['<n>']`.
 */
function getTxKeyForCode(code: number): string {
  return `errors.simpleJwt.codes.${code}`;
}

/**
 * Extract a numeric error code from the plugin response payload.
 * Per Simple JWT Login behavior we expect a numeric `errorCode` on the
 * top-level `data` object (i.e. `payload.data.errorCode`). We also accept
 * a top-level `errorCode` fallback.
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
    return { message: translate(txKey as any), errorCode: code };
  }

  // Next, check for WooCommerce-style string codes (e.g. "registration-error-email-exists").
  const wcCode = payload?.data?.code ?? payload?.code;
  if (typeof wcCode === "string" && wcCode.length > 0) {
    const txKey = `errors.woocommerce.codes.${wcCode}`;
    return { message: translate(txKey as any), errorKey: wcCode };
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
  return { message: translate("errors.unexpectedError"), errorCode: code };
}

export { getTxKeyForCode };

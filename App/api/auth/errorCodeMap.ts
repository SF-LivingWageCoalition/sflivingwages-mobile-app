import { translate } from "../../translation";
import type { TxKeyPath } from "../../translation";
import type { ApiErrorPayload, ErrorInfo } from "./types";

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
 * Type guard to check if a value is a non-null object.
 * @param x - The value to check.
 * @returns True if x is a non-null object, false otherwise.
 */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
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
function extractNumericCode(payload: ApiErrorPayload): number | undefined {
  if (!isObject(payload)) return undefined;
  const obj = payload as Record<string, unknown>;
  const data = obj["data"]; // may be undefined

  let candidate: unknown = undefined;
  if (isObject(data) && "errorCode" in data) {
    candidate = (data as Record<string, unknown>)["errorCode"];
  } else if ("errorCode" in obj) {
    candidate = obj["errorCode"];
  }

  if (candidate === undefined || candidate === null) return undefined;

  if (typeof candidate === "number") return candidate;
  if (typeof candidate === "string") {
    const n = parseInt(candidate, 10);
    return Number.isNaN(n) ? undefined : n;
  }

  return undefined;
}

/**
 * Given a parsed API response (or error payload), return a user-facing
 * translated message and the numeric error code when available.
 *
 * @param payload - The parsed response payload from the server.
 * @returns An object with `message`, and optionally `errorCode` or `errorKey`.
 */
export function getFriendlyErrorInfo(payload: ApiErrorPayload): ErrorInfo {
  // Prefer server-provided numeric code
  const code = extractNumericCode(payload);
  if (typeof code === "number") {
    const txKey = getTxKeyForCode(code);
    return { message: translate(txKey as TxKeyPath), errorCode: code };
  }

  // Next, check for WooCommerce-style string codes (e.g. "registration-error-email-exists").
  let wcCode: unknown = undefined;
  if (isObject(payload)) {
    const obj = payload as Record<string, unknown>;
    const data = obj["data"];
    if (isObject(data) && "code" in data)
      wcCode = (data as Record<string, unknown>)["code"];
    else if ("code" in obj) wcCode = obj["code"];
  }

  if (typeof wcCode === "string" && wcCode.length > 0) {
    const txKey = `errors.woocommerce.codes.${wcCode}`;
    return { message: translate(txKey as TxKeyPath), errorKey: wcCode };
  }

  // Some server responses include a textual message at common locations.
  let serverMsg: unknown = undefined;
  if (isObject(payload)) {
    const obj = payload as Record<string, unknown>;
    const data = obj["data"];
    if (isObject(data) && "message" in data)
      serverMsg = (data as Record<string, unknown>)["message"];
    else if ("message" in obj) serverMsg = obj["message"];
    if (isObject(data) && "error" in data && serverMsg === undefined)
      serverMsg = (data as Record<string, unknown>)["error"];
  }

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

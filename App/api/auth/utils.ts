/**
 * Utility functions for API auth operations.
 * Includes fetch wrappers, result handling, and JSON parsing.
 * Depends on error classes from errors.ts.
 */

import { ApiError, TimeoutError } from "./errors";
import type {
  ParseJsonSafeResult,
  ApiResult,
  ValidationData,
  JwtItem,
  ApiErrorPayload,
} from "./types";
import { FETCH_TIMEOUT_MS } from "./config";
import { getFriendlyErrorInfo } from "./errorCodeMap";

/**
 * Helper that wraps fetch with an AbortController to enforce a timeout.
 * Returns the same Response as fetch or throws when aborted/errored.
 * Throws a TimeoutError if the request times out.
 */
export const fetchWithTimeout = async (
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs: number = FETCH_TIMEOUT_MS,
): Promise<Response> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, {
      ...(init || {}),
      signal,
    } as RequestInit);
    return response;
  } catch (err: unknown) {
    if (
      typeof err === "object" &&
      err !== null &&
      ((err as { name?: unknown }).name === "AbortError" ||
        (err as { code?: unknown }).code === "ERR_ABORTED")
    ) {
      throw new TimeoutError();
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
};

/**
 * Utility: unwrap an ApiResult or throw an Error.
 * Use this when callers prefer exception control flow instead of checking .success.
 */
export const unwrapOrThrow = <T>(
  result: ApiResult<T>,
  fallbackMessage?: string,
): T => {
  if (result.success) return result.data;
  const msg = result.errorMessage ?? fallbackMessage ?? "API request failed";
  // Preserve the ApiResult's data type in the thrown ApiError so callers can
  // benefit from typed `error.data` (ApiError<T>).
  throw new ApiError<T>(msg, result.status, result.data as T);
};

/**
 * Helper to create a consistent failure ApiResult.
 */
export const apiFailure = <T = unknown>(
  errorMessage?: string,
  status?: number,
  data?: T,
): ApiResult<T> => ({ success: false, errorMessage, status, data });

/**
 * Maps runtime exceptions to ApiResult failures, converting timeouts to status 408.
 */
export const apiFailureFromException = <T = unknown>(
  err: unknown,
): ApiResult<T> => {
  const message = err instanceof Error ? err.message : String(err ?? "");
  if (err instanceof TimeoutError || message === "Request timed out") {
    return apiFailure<T>(message, 408, undefined);
  }
  return apiFailure<T>(message, undefined, undefined);
};

/**
 * Create a standardized ApiResult failure using server payloads that may
 * include Simple JWT numeric `errorCode` or WooCommerce string `code`.
 * The returned `data` will include the detected `errorCode` or `errorKey`.
 */
export const apiFailureWithServerCode = <T = unknown>(
  payload: unknown,
  status?: number,
): ApiResult<T> => {
  try {
    // If the payload itself looks like an ApiResult (wrapped by other helpers
    // or returned by upstream code), prefer the inner server payload so we
    // don't create nested `.data.data` shapes. Use the inner payload for
    // extracting friendly info and return a failure whose `data` is the
    // normalized server payload.
    const serverPayload =
      payload &&
      typeof payload === "object" &&
      typeof (payload as Record<string, unknown>)["success"] === "boolean"
        ? ((payload as Record<string, unknown>)["data"] ?? payload)
        : payload;

    const info = getFriendlyErrorInfo(serverPayload as ApiErrorPayload);
    const augmented = {
      ...(serverPayload as Record<string, unknown>),
    } as Record<string, unknown> & Partial<ApiErrorPayload>;
    if (info.errorCode !== undefined) augmented.errorCode = info.errorCode;
    if (info.errorKey !== undefined) augmented.errorKey = info.errorKey;
    return apiFailure<T>(info.message, status, augmented as T);
  } catch (e) {
    return apiFailure<T>(undefined, status, payload as T);
  }
};

/**
 * Safe JSON parser that handles invalid JSON gracefully.
 * If parsing fails, returns an object with `{ __parseError: true, text }`.
 * If reading text also fails, returns `{ __parseError: true, text: null }`.
 */
export const parseJsonSafe = async <T = unknown>(
  response: Response,
): Promise<ParseJsonSafeResult<T>> => {
  try {
    return (await response.json()) as T;
  } catch (jsonErr) {
    try {
      const text = await response.text();
      return { __parseError: true, text };
    } catch (textErr) {
      return { __parseError: true, text: null };
    }
  }
};

/**
 * Runtime validator that checks a deserialized `ValidationData['data']`
 * has the minimal expected fields (user.ID and a jwt array).
 * Used to validate data received from the auth API.
 */
export const isValidValidationData = (
  d: unknown,
): d is ValidationData["data"] => {
  if (!d || typeof d !== "object") return false;
  const x = d as Record<string, unknown>;
  if (!("user" in x)) return false;
  const user = x["user"];
  if (!user || typeof user !== "object") return false;
  const userRec = user as Record<string, unknown>;
  if (!("ID" in userRec)) return false;
  const jwtVal = x["jwt"];
  if (!Array.isArray(jwtVal) || jwtVal.length === 0) return false;
  return true;
};

/**
 * Normalize a JWT-like value into a canonical array of decoded JWT items.
 *
 * Accepts one of the common server shapes:
 * - an array of decoded JWT objects (returned by some validate endpoints)
 * - a single decoded JWT object with a `token` property
 * - a raw JWT string (returned by fetch/refresh/revoke endpoints)
 *
 * Always returns an array (possibly empty) so callers can safely index into
 * the result (`jwtArray[0]?.token`) and persist a consistent shape to Redux.
 *
 * Exported so code across the auth layer can standardize values before
 * storing or consuming JWTs.
 */
export const normalizeJwt = (maybeJwt: unknown): JwtItem[] => {
  if (Array.isArray(maybeJwt)) return maybeJwt as JwtItem[];
  if (
    maybeJwt &&
    typeof maybeJwt === "object" &&
    "token" in (maybeJwt as Record<string, unknown>)
  ) {
    const candidate = maybeJwt as Record<string, unknown>;
    if (typeof candidate["token"] === "string") return [maybeJwt as JwtItem];
    return [];
  }
  if (typeof maybeJwt === "string") return [{ token: maybeJwt } as JwtItem];
  return [];
};

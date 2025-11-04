/**
 * Utility functions for API auth operations.
 * Includes fetch wrappers, result handling, and JSON parsing.
 * Depends on error classes from errors.ts.
 */

import { ApiError, TimeoutError } from "./errors";
import type { ParseJsonSafeResult, ApiResult, ValidationData } from "./types";
import { FETCH_TIMEOUT_MS } from "./config";
import { getFriendlyErrorInfo } from "./errorCodeMap";

/**
 * Helper that wraps fetch with an AbortController to enforce a timeout.
 * Returns the same Response as fetch or throws when aborted/errored.
 * Throws a TimeoutError if the request times out.
 *
 * @param input - The resource that you wish to fetch.
 * @param init - An options object containing any custom settings.
 * @param timeoutMs - Timeout in milliseconds (default from config).
 * @returns A Promise that resolves to the Response object.
 * @throws TimeoutError if the request times out.
 * @throws Other errors thrown by fetch.
 */
export const fetchWithTimeout = async (
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs: number = FETCH_TIMEOUT_MS
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
  } catch (err: any) {
    if (err && (err.name === "AbortError" || err.code === "ERR_ABORTED")) {
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
 *
 * @param result - The ApiResult to unwrap.
 * @param fallbackMessage - Optional fallback error message if result.errorMessage is absent.
 * @returns The data from the ApiResult if successful.
 * @throws ApiError with details from the ApiResult if not successful.
 */
export const unwrapOrThrow = <T>(
  result: ApiResult<T>,
  fallbackMessage?: string
): T => {
  if (result.success) return result.data;
  const msg = result.errorMessage ?? fallbackMessage ?? "API request failed";
  throw new ApiError(msg, (result as any).status, (result as any).data);
};

/**
 * Helper to create a consistent failure ApiResult.
 *
 * @param errorMessage - Optional error message describing the failure.
 * @param status - Optional HTTP status code associated with the failure.
 * @param data - Optional additional data related to the failure.
 * @returns An ApiResult representing the failure.
 */
export const apiFailure = <T = any>(
  errorMessage?: string,
  status?: number,
  data?: T
): ApiResult<T> => ({ success: false, errorMessage, status, data });

/**
 * Maps runtime exceptions to ApiResult failures, converting timeouts to status 408.
 * @param err - The exception to map.
 * @returns An ApiResult representing the failure.
 */
export const apiFailureFromException = <T = any>(
  err: unknown
): ApiResult<T> => {
  const message = (err as any)?.message ?? String(err ?? "");
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
export const apiFailureWithServerCode = <T = any>(
  payload: any,
  status?: number
): ApiResult<T> => {
  try {
    const info = getFriendlyErrorInfo(payload);
    const augmented = { ...(payload as any) } as any;
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
 *
 * @param response - The Response object to parse JSON from.
 * @returns A Promise resolving to the parsed JSON or a parse error object.
 */
export const parseJsonSafe = async <T = any>(
  response: Response
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
 * @param d - The data to validate.
 * @returns True if the data matches the expected shape, false otherwise.
 */
export const isValidValidationData = (
  d: unknown
): d is ValidationData["data"] => {
  if (!d || typeof d !== "object") return false;
  const x = d as any;
  if (!x.user || !x.user.ID) return false;
  if (!x.jwt || !Array.isArray(x.jwt) || x.jwt.length === 0) return false;
  return true;
};

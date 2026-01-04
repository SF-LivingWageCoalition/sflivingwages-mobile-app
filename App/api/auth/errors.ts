/*
 * Auth API - Errors
 *
 * Contains error classes used by the auth API helpers and services.
 * Kept minimal and framework-agnostic so other modules can import them.
 */

/**
 * Rich ApiError that preserves HTTP status and raw data when available.
 * Thrown by helpers to let callers inspect `error.status` or `error.data`.
 */
export class ApiError<T = unknown> extends Error {
  public status?: number;
  public data?: T;
  public code?: string;

  constructor(message: string, status?: number, data?: T, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.code = code;
    // Fix prototype chain for environments that require it
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * A typed error used to signal a request timeout in `fetchWithTimeout`.
 * Thrown from the network layer so callers can map timeouts to a concrete
 * status code (e.g. 408) when building ApiResult failures.
 */
export class TimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

import { ApiError } from "./errors";
import { translate } from "../../translation";
import type { TxKeyPath } from "../../translation";
import { getFriendlyErrorInfo } from "./errorCodeMap";

/**
 * Convert an unknown error (often an ApiError) into a user-facing message.
 *
 * Priority: server-friendly message (via getFriendlyErrorInfo) ->
 * server message -> caller default key -> generic fallback.
 */
export function mapApiErrorToMessage(
  error: unknown,
  defaultKey?: string
): string {
  const fallback =
    translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
    "An unexpected error occurred.";
  if (error instanceof ApiError) {
    // If the server included a numeric `errorCode` (Simple JWT Login provides
    // this on `data.errorCode`), prefer a mapped/translated message based on
    // that code. This keeps messages consistent and localizable.
    // Only call getFriendlyErrorInfo when payload is a non-null object (not an array).
    const apiErr = error as ApiError<unknown>;
    const payload = apiErr.data;
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      try {
        const info = getFriendlyErrorInfo(payload);
        // If server-provided friendly info exists, use its message.
        if (
          (info?.errorCode !== undefined || info?.errorKey !== undefined) &&
          info?.message
        ) {
          return info.message;
        }
      } catch {
        // ignore and continue to status-based mapping
      }
    }
    const status = apiErr.status;
    const serverMessage = apiErr.message;
    // Network error (status === 0)
    if (status === 0) {
      return (
        translate("errors.networkError" as TxKeyPath) ||
        serverMessage ||
        fallback
      );
    }
    // Timeout (408)
    if (status === 408) {
      return (
        translate("errors.requestTimedOut" as TxKeyPath) ||
        serverMessage ||
        fallback
      );
    }
    // Auth/permission errors (401, 403)
    if (status === 401 || status === 403) {
      return (
        translate((defaultKey ?? "errors.loginFailed") as TxKeyPath) ||
        serverMessage ||
        fallback
      );
    }
    // Bad request / validation (400)
    if (status === 400) {
      return (
        translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
        serverMessage ||
        fallback
      );
    }
    // Conflict / registration (409)
    if (status === 409) {
      return (
        translate("errors.registrationFailed" as TxKeyPath) ||
        serverMessage ||
        fallback
      );
    }
    // Server errors (>= 500)
    if (status && status >= 500) {
      return (
        translate("errors.unexpectedError" as TxKeyPath) ||
        serverMessage ||
        fallback
      );
    }

    // Fallback: server message -> defaultKey translation -> generic fallback
    return (
      serverMessage ||
      translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
      fallback
    );
  }

  // Non-ApiError: prefer error.message, then translation, then fallback
  const message =
    typeof error === "object" && error !== null && "message" in error
      ? ((error as { message?: unknown }).message as string | undefined)
      : undefined;
  return (
    message ||
    translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
    fallback
  );
}

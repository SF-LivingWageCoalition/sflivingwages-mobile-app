import { ApiError } from "./errors";
import { translate } from "../../translation";

/**
 * Map an unknown error (possibly ApiError) to a user-facing translation string.
 * - `defaultKey` is a translation key used for the caller's default message
 *   (for example: 'errors.loginFailed' or 'errors.registrationFailed').
 */
export function mapApiErrorToMessage(
  error: unknown,
  defaultKey?: string
): string {
  const fallback =
    translate((defaultKey ?? "errors.unexpectedError") as any) ||
    "An unexpected error occurred.";
  if (error instanceof ApiError) {
    const status = error.status;
    const serverMessage = error.message;
    console.log("mapApiErrorToMessage: ApiError status =", status);
    console.log("mapApiErrorToMessage: ApiError message =", serverMessage);
    // 1) Network-level failures (status 0) - treat as network error
    if (status === 0) {
      return (
        translate("errors.networkError" as any) || serverMessage || fallback
      );
    }
    // 2) Timeout mapping: treat 408 as a network timeout and show a specific message
    if (status === 408) {
      return (
        translate("errors.requestTimedOut" as any) || serverMessage || fallback
      );
    }
    // 3) Authentication / permission errors
    if (status === 401 || status === 403) {
      return (
        translate((defaultKey ?? "errors.loginFailed") as any) ||
        serverMessage ||
        fallback
      );
    }
    // 4) Bad request / validation-like errors
    if (status === 400) {
      return (
        translate((defaultKey ?? "errors.unexpectedError") as any) ||
        serverMessage ||
        fallback
      );
    }
    // 5) Conflict / registration-specific
    if (status === 409) {
      return (
        translate("errors.registrationFailed") || serverMessage || fallback
      );
    }
    // 6) Server errors
    if (status && status >= 500) {
      return translate("errors.unexpectedError") || serverMessage || fallback;
    }

    // Fallback: prefer the server-provided message, then the caller's default key,
    // then the generic fallback string.
    return (
      serverMessage ||
      translate((defaultKey ?? "errors.unexpectedError") as any) ||
      fallback
    );
  }

  const message = (error as any)?.message;
  return (
    message ||
    translate((defaultKey ?? "errors.unexpectedError") as any) ||
    fallback
  );
}

export function mapApiErrorToTelemetry(error: unknown) {
  if (error instanceof ApiError) {
    return { status: error.status, data: error.data };
  }
  return { status: undefined, data: undefined };
}

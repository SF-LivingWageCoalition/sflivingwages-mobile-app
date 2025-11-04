import { ApiError } from "./errors";
import { translate } from "../../translation";
import { getFriendlyErrorInfo } from "./errorCodeMap";

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
    // If the server included a numeric `errorCode` (Simple JWT Login provides
    // this on `data.errorCode`), prefer a mapped/translated message based on
    // that code. This keeps messages consistent and localizable.
    try {
      const payload = (error as any).data;
      if (payload) {
        const info = getFriendlyErrorInfo(payload);
        // Prefer server-code-based translations when available (Simple JWT numeric codes
        // or WooCommerce string codes). Return that translated message directly.
        if (
          (info.errorCode !== undefined || info.errorKey !== undefined) &&
          info.message
        ) {
          return info.message;
        }
      }
    } catch (e) {
      // ignore and continue to status-based mapping
    }
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
    const data = error.data as any;
    const errorCode = data?.data?.errorCode ?? data?.errorCode;
    const errorKey =
      data?.data?.errorKey ?? data?.errorKey ?? data?.code ?? data?.data?.code;
    return { status: error.status, data: error.data, errorCode, errorKey };
  }
  return { status: undefined, data: undefined };
}

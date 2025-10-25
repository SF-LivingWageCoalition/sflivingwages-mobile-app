import { ApiError } from "../../api/auth/authApi";
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
    if (status === 400 || status === 401) {
      return (
        translate((defaultKey ?? "errors.loginFailed") as any) ||
        serverMessage ||
        fallback
      );
    }
    if (status === 409) {
      return (
        translate("errors.registrationFailed") || serverMessage || fallback
      );
    }
    if (status && status >= 500) {
      return translate("errors.unexpectedError") || serverMessage || fallback;
    }
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

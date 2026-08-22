import type { TxKeyPath } from "../../translation";
import { translate } from "../../translation";
import { getFriendlyErrorInfo } from "./errorCodeMap";
import { ApiError } from "./errors";

type StatusDataError = {
  status?: number;
  data?: unknown;
  message?: string;
};

const mapStatusDataToMessage = (
  status: number | undefined,
  data: unknown,
  message: string | undefined,
  fallback: string,
  defaultKey?: string,
): string => {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    try {
      const info = getFriendlyErrorInfo(data as Record<string, unknown>);
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

  // Network error (status === 0)
  if (status === 0) {
    return translate("errors.networkError" as TxKeyPath) || message || fallback;
  }
  // Timeout (408)
  if (status === 408) {
    return (
      translate("errors.requestTimedOut" as TxKeyPath) || message || fallback
    );
  }
  // Auth/permission errors (401, 403)
  if (status === 401 || status === 403) {
    return (
      translate((defaultKey ?? "errors.loginFailed") as TxKeyPath) ||
      message ||
      fallback
    );
  }
  // Bad request / validation (400)
  if (status === 400) {
    return (
      translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
      message ||
      fallback
    );
  }
  // Conflict / registration (409)
  if (status === 409) {
    return (
      translate("errors.registrationFailed" as TxKeyPath) || message || fallback
    );
  }
  // Server errors (>= 500)
  if (status && status >= 500) {
    return (
      translate("errors.unexpectedError" as TxKeyPath) || message || fallback
    );
  }

  return (
    message ||
    translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
    fallback
  );
};

/**
 * Convert an unknown error (often an ApiError) into a user-facing message.
 *
 * Priority: server-friendly message (via getFriendlyErrorInfo) ->
 * server message -> caller default key -> generic fallback.
 */
export function mapApiErrorToMessage(
  error: unknown,
  defaultKey?: string,
): string {
  const fallback =
    translate((defaultKey ?? "errors.unexpectedError") as TxKeyPath) ||
    "An unexpected error occurred.";
  if (error instanceof ApiError) {
    const apiErr = error as ApiError<unknown>;
    return mapStatusDataToMessage(
      apiErr.status,
      apiErr.data,
      apiErr.message,
      fallback,
      defaultKey,
    );
  }

  if (error && typeof error === "object") {
    const candidate = error as StatusDataError;
    if (typeof candidate.status === "number") {
      return mapStatusDataToMessage(
        candidate.status,
        candidate.data,
        candidate.message,
        fallback,
        defaultKey,
      );
    }
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

/**
 * Extract a numeric HTTP status from a variety of error values we may
 * receive from the auth layer or thunks. Returns `undefined` when no
 * numeric status is available.
 */
export const getStatusFromError = (e: unknown): number | undefined => {
  if (!e || typeof e !== "object") return undefined;
  if (e instanceof ApiError) return e.status;
  const obj = e as Record<string, unknown>;
  const cand =
    (obj.status as unknown) ??
    (obj.data && (obj.data as Record<string, unknown>).status) ??
    undefined;
  return typeof cand === "number" ? cand : undefined;
};

/**
 * Predicate: whether a server error code indicates "username exists".
 * Centralized here so error-to-message logic and registration flows
 * can reuse the same interpretation.
 */
export const isUsernameExistsCode = (code: unknown): boolean => {
  if (code === undefined || code === null) return false;
  return (
    code === 38 ||
    code === "38" ||
    code === "registration-error-username-exists"
  );
};

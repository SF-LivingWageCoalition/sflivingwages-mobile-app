import { useState } from "react";
import type { ZodType } from "zod";
import { mapApiErrorToMessage } from "../api/auth/errorHelpers";
import { mapZodErrorToFormErrors } from "../validation/mapZodError";

type FieldErrors = Record<string, string>;

interface UseAuthFormParams<T> {
  initialValues: T;
  /**
   * Schema factory (e.g. `loginSchema`). Called at submit time so localized
   * validation messages are evaluated when used (see `authSchema.ts`).
   */
  schema: () => ZodType<T>;
  /** Runs only when validation passes. Throwing maps to a general error. */
  onValid: (values: T) => Promise<void> | void;
  /** Translation key used as the fallback error message. */
  fallbackErrorKey: string;
}

/**
 * Generic auth form controller shared by the auth modal and the standalone
 * auth screens. Owns form values, field/general errors and loading state, and
 * runs the common submit flow: reset errors -> safeParse -> map zod errors ->
 * run `onValid` -> map API errors.
 */
export function useAuthForm<T extends Record<string, unknown>>({
  initialValues,
  schema,
  onValid,
  fallbackErrorKey,
}: UseAuthFormParams<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const setField = <K extends keyof T>(key: K, value: T[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setGeneralError(null);
    setLoading(false);
  };

  const submit = async () => {
    setErrors({});
    setGeneralError(null);

    const parsed = schema().safeParse(values);
    if (!parsed.success) {
      const { fieldErrors, generalError: gen } = mapZodErrorToFormErrors(
        parsed.error,
      );
      setErrors(fieldErrors);
      if (gen) setGeneralError(gen);
      return;
    }

    setLoading(true);
    try {
      await onValid(parsed.data);
    } catch (error: unknown) {
      setGeneralError(mapApiErrorToMessage(error, fallbackErrorKey));
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    setField,
    errors,
    generalError,
    setGeneralError,
    loading,
    submit,
    reset,
  };
}

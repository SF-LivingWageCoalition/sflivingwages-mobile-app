import type { ZodError } from "zod";

// See `App/validation/README.md` for usage guidance on schema factories and
// the mapper helper implemented here.

interface MapOptions {
  joinMessages?: boolean;
  // Normalize a zod path array to a string key used by forms.
  pathNormalizer?: (path: Array<string | number>) => string | undefined;
}

export function mapZodErrorToFormErrors(
  zodError: ZodError,
  options?: MapOptions
): { fieldErrors: Record<string, string>; generalError?: string } {
  const fieldErrors: Record<string, string> = {};
  let generalError: string | undefined;

  const joinMessages = options?.joinMessages ?? false;
  const normalizer =
    options?.pathNormalizer ??
    ((path: Array<string | number>) => {
      if (!path || path.length === 0) return undefined;
      const first = path[0];
      return typeof first === "number" ? String(first) : String(first);
    });

  zodError.errors.forEach((issue) => {
    const key = normalizer(issue.path as Array<string | number>);
    if (key) {
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      else if (joinMessages)
        fieldErrors[key] = `${fieldErrors[key]}\n${issue.message}`;
    } else {
      if (!generalError) generalError = issue.message;
      else if (joinMessages) generalError = `${generalError}\n${issue.message}`;
    }
  });

  return { fieldErrors, generalError };
}

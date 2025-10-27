# Validation schemas and mappers

This folder contains zod schema _factories_ and helpers used by the app's
authentication screens (login/register/forgot-password). The goal is to keep
schema definitions, localized error messages, and error-to-form mapping
centralized and easy to reuse.

Files

- `authValidation.ts` — schema factories (createLoginSchema, createRegisterSchema, createForgotPasswordSchema).
  - Factories are functions that build zod schemas at runtime so localized
    messages (via the `translate()` helper) are evaluated when the schema is
    used. This avoids capturing translations at module initialization time and
    ensures validation messages reflect the current locale.
- `mapZodError.ts` — a small utility that converts a `ZodError` into:
  - `fieldErrors: Record<string, string>` (maps field keys to first error message)
  - `generalError?: string` (for errors that don't have a field path)

Why factories?

- Calling `translate()` at module import time captures the translation value
  only once. If the app supports changing languages at runtime, that captured
  string becomes stale. Factories call `translate()` when they run, so schema
  messages are always current.

Usage examples

- Build and validate in a screen (Login):

```ts
import { createLoginSchema } from "../../validation/authValidation";

const schema = createLoginSchema();
const parsed = schema.safeParse({ userEmail, userPassword });
if (!parsed.success) {
  const { fieldErrors, generalError } = mapZodErrorToFormErrors(parsed.error);
  setErrors(fieldErrors);
  setGeneralError(generalError);
  return;
}

// use parsed.data safely
```

- Map Zod error in a centralized helper (recommended):

```ts
import { mapZodErrorToFormErrors } from "../../validation/mapZodError";

const { fieldErrors, generalError } = mapZodErrorToFormErrors(zodError);
```

API notes

- `createLoginSchema()` / `createRegisterSchema()` / `createForgotPasswordSchema()`
  - Return a `z.ZodObject` ready to run `parse()` or `safeParse()` against.
- `mapZodErrorToFormErrors(zodError, options?)`
  - Returns `{ fieldErrors, generalError }`.
  - Options include `joinMessages` and `pathNormalizer` if you need
    custom behavior for nested keys or multiple messages per field.

Types

- The validation module also exports TypeScript types inferred from the
  schemas (for example `LoginInput`, `RegisterInput`, `ForgotPasswordInput`).
  These are produced with `z.infer` / `ReturnType` in `authValidation.ts` and
  can be imported where you want strongly-typed form handlers:

```ts
import type { LoginInput } from "../../validation/authValidation";

function handleSubmit(data: LoginInput) {
  // `data.userEmail` and `data.userPassword` are strongly typed here
}
```

Using these shared types ensures forms and API calls agree on the expected
shape of the data and reduces duplication.

Tips and future improvements

- If you add more validation helpers, keep them in this folder so schemas and
  mappers are colocated and discoverable.
- Consider exporting the schema input types (z.infer<...>) so form handlers
  and tests can share the same types.
- If you prefer the helper under a `utils/` folder, keep the naming specific
  (e.g., `mapZodError.ts`) to avoid ambiguity.

That's it — these small conventions make form validation consistent, localized,
and easier to maintain across the app.

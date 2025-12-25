# Validation schemas and mappers

This folder contains zod schema _factories_ and helpers used by the app's
authentication screens (login/register/forgot-password). The goal is to keep
schema definitions, localized error messages, and error-to-form mapping
centralized and easy to reuse.

Files

- `authSchema.ts` — schema factories (`loginSchema`, `registerSchema`, `forgotPasswordSchema`).
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
import { loginSchema } from "../../validation/authSchema";

const schema = loginSchema();
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

- `loginSchema()` / `registerSchema()` / `forgotPasswordSchema()`
  - Return a `z.ZodObject` ready to run `parse()` or `safeParse()` against.
- `mapZodErrorToFormErrors(zodError, options?)`
  - Returns `{ fieldErrors, generalError }`.
  - Options include `joinMessages` and `pathNormalizer` if you need
    custom behavior for nested keys or multiple messages per field.

Types

- The validation module exports TypeScript types inferred from the
  schemas (for example `LoginFormValues`, `RegisterFormValues`, `ForgotPasswordFormValues`).
  These are produced with `z.infer` / `ReturnType` in `authSchema.ts` and
  can be imported where you want strongly-typed form handlers:

```ts
import type { LoginFormValues } from "../../validation/authSchema";

function handleSubmit(data: LoginFormValues) {
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

## Password schema

This repository includes a `passwordSchema()` helper used by registration and
password-change flows. It centralizes the password policy so validation and
error messages stay consistent and localized via `translate()`.

Policy enforced by the current `passwordSchema()` (summary):

- Minimum length: 10 characters
- At least one lowercase letter (`/[a-z]/`)
- At least one uppercase letter (`/[A-Z]/`)
- At least one digit (`/[0-9]/` / `\d`)
- At least one special character from an explicit allowed set (see below)
- No whitespace characters allowed (`/\s/`)

Allowed special characters (explicit whitelist used in the schema):

!"#$%&'()\*+,-./:;<=>?@[]^\_{}|~`

This means the schema treats characters from that set as valid "special"
characters. Underscore (`_`) is included in the allowed set. Backslash (`\`) and
emoji are not considered allowed special characters by the whitelist.

Example of the refine used to require at least one allowed special character:

```ts
.refine((val) => /[!"#$%&'()*+,\-./:;<=>?@\[\]^_{}|~`]/.test(val), {
  message:
    translate("validation.passwordSpecial") ||
    "Password must contain one of the following special characters: !\"#$%&'()*+,-./:;<=>?@[]^_{}|~`",
})
```

Notes and alternatives

- If you want to allow underscore to be _not_ treated as a special character,
  modify the allowed set accordingly (e.g., remove `_`).
- If you prefer to allow emoji or other Unicode symbol categories, you can use
  Unicode property escapes (requires the `u` flag and a JS engine that supports
  `\p{...}`):

```ts
// allow any Unicode punctuation or symbol as "special"
/[\p{P}\p{S}]/u;
```

- If the JS runtime does not support Unicode property escapes (older engines
  or some JS runtimes used by React Native), prefer an explicit whitelist or
  add a small runtime detection + fallback.
- To enforce that only letters, digits, whitespace and the allowed special
  characters appear in the password (i.e., forbid emoji or other symbols),
  combine a positive test for the allowed special set with a negative test for
  any other non-word/non-space symbol. Example:

```ts
const allowedSpecial = /[!"#$%&'()*+,\-./:;<=>?@\[\]^_{}|~`]/;
const disallowedOther = /[^\w\s!"#$%&'()*+,\-./:;<=>?@\[\]^_{}|~`]/;

.refine((val) => allowedSpecial.test(val) && !disallowedOther.test(val), {
  message: "Password must contain at least one allowed special character and no other symbols.",
})
```

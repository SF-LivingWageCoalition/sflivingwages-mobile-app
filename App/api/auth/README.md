<!-- Table of contents updated to match current headings -->

# Auth API — developer reference

Maintainer: `@scottmotion` — Last updated: 2025-10-24

This folder provides the authentication API helpers used by the app to interact with the WordPress backend (JWT auth, token validation, user registration, WooCommerce customer creation, and password reset flows). The authentication UI/screens live under `App/screens` (for example: `App/screens/LoginScreen`, `App/screens/RegisterScreen`, `App/screens/ForgotPasswordScreen`). The auth navigator is implemented at `App/navigation/AuthNav.tsx`.

## Preamble

The mobile app's authentication flow relies primarily on 2 external API's hosted on the website:

- Simple JWT Login
  - The API provided by this plugin is used to fetch and validate a JSON Web Token (JWT), which constitutes the user login process. It is also used to send password reset emails and logout users by revoking the JWT token (via the plugin's revoke endpoint). It also provides an endpoint to register users, however we defer to WooCommerce for this in order to remain consistent with the website.
  - Note that there are 2 sets of documentation for this API, and that they may present minor conflicts with its actual use (e.g. content of Requests/Responses), therefore you should thoroughly test any changes to helpers or implementation of endpoints.
- WooCommerce
  - The API provided by this pugin is used to register new customers (users) inline with the website's authentication method.
  - Since WooCommerce is an Automattic product (owners of WordPress) it is regularly updated and the documentation for this API is fairly reliable.

See the [references](#references) section for links to the above-mentioned documentation.

## Table of contents

- [Files & Purpose](#files--purpose)
- [Primary Functions](#primary-functions)
- [Quick Start (1 minute)](#quick-start-1-minute)
- [Contract (at-a-glance)](#contract-at-a-glance)
- [Error codes, translation keys, and UI guidance](#error-codes-translation-keys-and-ui-guidance)
- [Environment Variables](#environment-variables)
- [Quick Debug Checklist](#quick-debug-checklist)
- [Try with curl (PowerShell-friendly)](#try-with-curl-powershell-friendly)
- [JWT Shapes & Normalization (short)](#jwt-shapes--normalization-short)
- [Detailed API Responses (examples)](#detailed-api-responses-examples)
  - [fetchToken — example responses](#fetchtoken--example-responses)
  - [validateToken — example responses](#validatetoken--example-responses)
  - [refreshToken — example responses](#refreshtoken--example-responses)
  - [revokeToken — example responses](#revoketoken--example-responses)
  - [loginUser — example responses](#loginuser--example-responses)
  - [registerCustomer — example responses](#registercustomer--example-responses)
  - [registerUser — example responses](#registeruser--example-responses)
  - [sendPasswordReset — example responses](#sendpasswordreset--example-responses)
  - [logoutUser — example responses](#logoutuser--example-responses)
  - [Non-JSON / Parse Errors (what `parseJsonSafe` returns)](#non-json--parse-errors-what-parsejsonsafe-returns)
- [Telemetry Guidance](#telemetry-guidance)
- [How to Contribute / Keep this README Current](#how-to-contribute--keep-this-readme-current)
- [References](#references)

---

## Files & Purpose

Implementation quick-reference: file paths and a one-line purpose to help you jump to the code or related translation files.

| File                                                        | Purpose                                                                                 |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `App/screens/LoginScreen/LoginScreen.tsx`                   | Login screen UI                                                                         |
| `App/screens/RegisterScreen/RegisterScreen.tsx`             | Registration screen UI                                                                  |
| `App/screens/ForgotPasswordScreen/ForgotPasswordScreen.tsx` | Password reset / forgot password screen UI                                              |
| `App/navigation/AuthNav.tsx`                                | Navigator that wires auth-related screens together                                      |
| `App/api/auth/authApi.ts`                                   | Core auth client (fetchToken, validateToken, loginUser) and token-normalization helpers |
| `App/api/auth/types.ts`                                     | Type definitions and `ApiResult<T>` shapes used across helpers                          |
| `App/api/auth/config.ts`                                    | Environment-driven config and `base64Credentials` helper for WooCommerce                |
| `App/api/auth/errorHelpers.ts`                              | Map server error codes to user-facing messages and telemetry helpers                    |
| `App/api/auth/utils.ts`                                     | Low-level helpers (parseJsonSafe, failure factories, `unwrapOrThrow`)                   |
| `App/api/auth/errorCodeMap.ts`                              | Numeric and string error-code mappings referenced by `errorHelpers`                     |
| `App/api/auth/errors.ts`                                    | Runtime `ApiError` type and related error helpers                                       |
| `App/translation/locales/simpleJwt.*.ts`                    | Localization files for Simple JWT Login responses                                       |
| `App/translation/locales/wooCommerce.*.ts`                  | Localization files for Woo Commerce responses                                           |
| `App/validation/authValidation.ts`                          | Zod schema factories for auth form validation                                           |
| `App/redux/features/userSlice/userSlice.ts`                 | Redux slice for user state: actions/reducers/selectors for authenticated user data      |

---

## Primary Functions

The primary exported functions from `App/api/auth/authApi.ts`, a short description of their purpose, and their return values:

| Function                               | Purpose                                                                                                                                                      | Returns                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `fetchToken(email, password)`          | Request a JWT from the Simple JWT Login endpoint.                                                                                                            | `ApiResult<TokenData>`                                                                       |
| `validateToken(jwtToken)`              | Validate a JWT with the Simple JWT Login endpoint.                                                                                                           | `ApiResult<ValidationData>`                                                                  |
| `refreshToken(jwtToken)`               | Refresh a JWT via the Simple JWT Login endpoint (returns a new token).                                                                                       | `ApiResult<TokenData>`                                                                       |
| `revokeToken(jwtToken)`                | Revoke a JWT on the server using the Simple JWT Login revoke endpoint.                                                                                       | `ApiResult<TokenData>`                                                                       |
| `loginUser(email, password, dispatch)` | High-level login flow: fetches a token, validates it, and on success dispatches `setUser` to populate Redux user state.                                      | `ApiResult<ValidationData['data']>`                                                          |
| `registerCustomer(email, password)`    | Create a WooCommerce customer via the WooCommerce REST API.                                                                                                  | `ApiResult<CustomerRegistrationData>`                                                        |
| `registerUser(email, password)`        | Register a WordPress user via the Simple JWT Login plugin (alternate to WooCommerce).                                                                        | `ApiResult<UserRegistrationData>`                                                            |
| `sendPasswordReset(email)`             | Request a password reset email via Simple JWT Login.                                                                                                         | `ApiResult<PasswordResetData>`                                                               |
| `logoutUser()`                         | Clear local user auth state and attempt a best-effort revoke of the JWT on the server. Returns a normalized ApiResult so callers can inspect revoke outcome. | `Promise<LogoutResult>` (alias of `ApiResult<{ revoked: boolean; tokenData?: TokenData }>` ) |

### Note about `logoutUser()`

`logoutUser()` is a no-argument helper you can call as `await logoutUser()`.
Implementation details:

- It reads the current JWT from the persisted Redux store via the `selectJwt` selector.
- It attempts a best-effort server-side revoke by calling `revokeToken(jwt)`; the helper returns a normalized `LogoutResult` so callers may inspect the revoke outcome. On success `result.success === true` and `result.data` is always present with a `revoked: boolean` flag. If a revoke was attempted and succeeded, `result.data.revoked === true` and `result.data.tokenData` may contain server-provided token info. If the revoke failed the function returns a standard failure `ApiResult` (inspect `.status`, `.errorMessage`, and `.data` for details).
- It always clears local auth state by dispatching `clearUser()` (so callers do not need to supply a `dispatch`).

If you prefer the logout logic to live inside Redux for testability, consider converting this helper into a Redux thunk that calls `getState()` and `dispatch`.

---

## Quick Start (1 minute)

1. Copy the repo root `.env.example` to `.env` and populate the _EXPO_PUBLIC_ values locally (do NOT commit secrets).
2. Call `fetchToken(email, password)` to obtain a raw JWT string.
3. Call `validateToken(jwt)` to get decoded JWT(s) + user data.
4. If your app supports token refresh, call `refreshToken(jwt)` to obtain a refreshed JWT before the current token expires, then re-run `validateToken` as needed.
5. `loginUser` will dispatch `setUser(validatedData)` on success.

Example (exception style)

```ts
try {
  const tokenData = unwrapOrThrow(await fetchToken(email, password));
  // fetchToken returns the token in tokenData.data?.jwt (shape: ApiResult<TokenData>)
  const jwt = tokenData.data?.jwt ?? (tokenData as any).jwt;
  const validated = unwrapOrThrow(await validateToken(jwt));
  // loginUser already dispatches setUser(validated)
} catch (err) {
  if (err instanceof ApiError) {
    // err.status and err.data are available for telemetry/UX decisions
  }
}
```

---

## Contract (at-a-glance)

- Inputs: plain JS objects (email/password, customer data, etc.)
- Outputs: `ApiResult<T>` — a minimal contract for all helpers
  - Success: `{ success: true, data: T, status?: number }`
  - Failure: `{ success: false, errorMessage?: string, status?: number, data?: any }`
- Optional throw-style helper: `unwrapOrThrow(result)` — returns `data` or throws `ApiError` (contains `status` and `data`).
- Side-effects: `loginUser` dispatches `setUser(validatedData)` on success.

Implementation details (see `App/api/auth/authApi.ts` and `App/api/auth/types.ts`): exported types are defined in `types.ts` (for example `TokenData`, `ValidationData`, `PasswordResetData`, `ApiResult<T>`). `ApiError` and runtime helpers remain exported from `authApi.ts`.

---

## Error codes, translation keys, and UI guidance

To make UX consistent across different server plugins (Simple JWT Login and WooCommerce) the auth helpers now attach a machine-readable error identifier to ApiResult failures when the server provides one:

- For Simple JWT Login numeric errors the library exposes `errorCode` (number) on the returned `result.data` object.
- For WooCommerce string error codes the library exposes `errorKey` (string) on `result.data`.

When available the helper `mapApiErrorToMessage` (in `App/api/auth/errorHelpers.ts`) will prefer returning a translated, user-facing message derived from `errorCode` / `errorKey` rather than raw server text. The low-level failure factory `apiFailureWithServerCode` (in `App/api/auth/utils.ts`) attaches these fields so callers can both present translated text and use the machine-readable identifier for telemetry or conditional UI logic.

Example failure shapes you may see from auth helpers:

Simple JWT (numeric code)

```json
{
  "success": false,
  "status": 400,
  "errorMessage": "Wrong user credentials.",
  "data": {
    "errorCode": 48,
    "message": "Wrong user credentials"
  }
}
```

WooCommerce (string code)

```json
{
  "success": false,
  "status": 400,
  "errorMessage": "An account is already registered with your email address.",
  "data": {
    "code": "registration-error-email-exists",
    "message": "An account is already registered with your email address. Please log in.",
    "data": { "status": 400 },
    "errorKey": "registration-error-email-exists"
  }
}
```

UI guidance:

- Prefer `result.errorMessage` when present — it is already localized when a code mapping exists.
- If `result.errorMessage` is not present, use `mapApiErrorToMessage(result)` to obtain a best-effort translation (this function will check `errorCode` / `errorKey` and fall back to status-based messages).
- For telemetry and analytics send only the structured `errorCode` / `errorKey` (do not send PII).

See `App/api/auth/errorHelpers.ts` and `App/api/auth/utils.ts` for implementation details and examples.

---

## Environment Variables

Store secrets locally and never commit them. Example entries (copy from `.env.example`):

```env
EXPO_PUBLIC_BASE_URL=https://www.livingwage-sf.org
EXPO_PUBLIC_JWT_ROUTE=/wp-json/simple-jwt-login/v1
EXPO_PUBLIC_WC_ROUTE=/wp-json/wc/v3
EXPO_PUBLIC_JWT_DE_KEY=<decryption_key_here>
EXPO_PUBLIC_JWT_DE_ALG=<jwt_algorithm>
EXPO_PUBLIC_JWT_TYP=<jwt_type>
EXPO_PUBLIC_JWT_AUTH_KEY=<auth_key>
EXPO_PUBLIC_CONSUMER_KEY=<wc_consumer_key>
EXPO_PUBLIC_CONSUMER_SECRET=<wc_consumer_secret>
EXPO_PUBLIC_FETCH_TIMEOUT_MS=10000
```

Security note: sanitize PII before sending any payloads to telemetry.

Note: these EXPO_PUBLIC environment variables are now read and exported from `App/api/auth/config.ts` and consumed by the auth client and helpers (for example `BASE_URL`, `JWT_ROUTE`, `JWT_AUTH_KEY`, `FETCH_TIMEOUT_MS`, and `base64Credentials`). Centralizing config in `config.ts` reduces duplication, guarantees consistent runtime behavior (for example `base64Credentials` safely returns `undefined` when keys are missing), and makes it easier to stub or mock values when debugging or writing unit tests.

Example usage:

```ts
// Example: how the rest of the auth code consumes values
import {
  BASE_URL,
  JWT_ROUTE,
  JWT_AUTH_KEY,
  base64Credentials,
  FETCH_TIMEOUT_MS,
} from "./config";
```

---

## Quick Debug Checklist

1. Check HTTP status (`result.status`): 4xx = client issue; 5xx = server issue.
2. Inspect `Content-Type` and response body. If non-JSON, `parseJsonSafe` returns `{ __parseError: true, text }`.
   If using Basic auth for WooCommerce endpoints, ensure `EXPO_PUBLIC_CONSUMER_KEY` and `EXPO_PUBLIC_CONSUMER_SECRET` are set — `base64Credentials` in `App/api/auth/config.ts` returns `undefined` when keys are missing; using an undefined Basic auth value will cause authentication failures.
3. If `res.data?.__parseError` is true, check server/proxy logs (Nginx/Cloud) for upstream errors.
4. If `res.data?.errorCode` or `res.data?.errorKey` exists, map that code to a friendly message (do not display raw server text).
5. For unknown/5xx errors show `errors.unexpectedError` and capture sanitized telemetry (status + structured error code only).

---

## Try with curl (PowerShell-friendly)

Replace `$BASE` and placeholders with your `EXPO_PUBLIC_BASE_URL` and `EXPO_PUBLIC_JWT_ROUTE`.

fetchToken (POST email/password):

```powershell
$BASE = 'https://staging.example.com'
curl.exe -i -X POST "$BASE${EXPO_PUBLIC_JWT_ROUTE}/auth" `
  -H "Content-Type: application/json" `
  -d '{"email":"user@example.com","password":"hunter2","AUTH_KEY":"<auth_key>"}'
```

validateToken (POST with Authorization):

```powershell
curl.exe -i -X POST "$BASE${EXPO_PUBLIC_JWT_ROUTE}/auth/validate" `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer eyJ0e..." `
  -d '{"AUTH_KEY":"<auth_key>"}'
```

registerCustomer (WooCommerce POST with Basic auth):

```powershell
curl.exe -i -X POST "$BASE${EXPO_PUBLIC_WC_ROUTE}/customers" `
  -H "Content-Type: application/json" `
  -H "Authorization: Basic <base64(consKey:consSecret)>" `
  -d '{"email":"new@example.com","password":"pass1234","first_name":"Test","last_name":"User"}'
```

(The app computes this value from `EXPO_PUBLIC_CONSUMER_KEY`/`EXPO_PUBLIC_CONSUMER_SECRET` and exposes it via `App/api/auth/config.ts` as `base64Credentials`.)

sendPasswordReset (example):

```powershell
curl.exe -i -X POST "$BASE${EXPO_PUBLIC_JWT_ROUTE}/user/reset_password&email=user@example.com&AUTH_KEY=<auth_key>" `
  -H "cache-control: no-cache"
```

---

## JWT Shapes & Normalization (short)

- `fetchToken` returns a raw JWT string at `data.jwt`.
- `validateToken` returns decoded JWT objects in `data.jwt` (an array of decoded JWTs).

Use this small helper to normalize either shape before persisting:

```ts
type DecodedJwt = { token: string; header?: any; payload?: any };

function normalizeJwt(maybeJwt: unknown): DecodedJwt[] {
  if (Array.isArray(maybeJwt)) return maybeJwt as DecodedJwt[];
  if (maybeJwt && typeof maybeJwt === "object" && (maybeJwt as any).token)
    return [maybeJwt as DecodedJwt];
  if (typeof maybeJwt === "string") return [{ token: maybeJwt }];
  return [];
}
```

Refer to `App/api/auth/authApi.ts` for the canonical implementation (normalization helpers like `normalizeJwt` live there) and to `App/api/auth/types.ts` for the typed shapes.

---

## Detailed API Responses (examples)

Keep these as a reference for debugging. Update when server shapes change.

### fetchToken — example responses

Success (token returned):

```json
{ "data": { "jwt": "eyJ0e..." }, "success": true }
```

Failure (wrong credentials):

```json
{
  "data": { "errorCode": 48, "message": "Wrong user credentials" },
  "success": false
}
```

### validateToken — example responses

Success (token valid, excerpt):

```json
{
  "data": {
    "jwt": [
      {
        "token": "eyJ...",
        "payload": {
          "id": "31",
          "email": "user@example.com",
          "exp": 1710000000
        }
      }
    ],
    "roles": ["customer"],
    "user": { "ID": "31", "user_email": "user@example.com" }
  },
  "success": true
}
```

Failure (expired token example):

```json
{
  "data": {
    "errorCode": 14,
    "message": "Expired token"
  },
  "success": false
}
```

### refreshToken — example responses

Success (refreshed token returned):

```json
{ "data": { "jwt": "eyJ0e..." }, "success": true }
```

Failure (invalid/expired token or other error):

```json
{
  "data": { "errorCode": 14, "message": "Expired or invalid token" },
  "success": false
}
```

### revokeToken — example responses

Success (token revoked). The Simple JWT Login docs show a success response
that includes a message and returns a refreshed or confirmation JWT in
`data.jwt`. In this codebase we expect the server to return the new/confirmed
JWT in `data.jwt` (i.e. `data` is not null). Example:

```json
{
  "success": true,
  "message": "Token was revoked",
  "data": { "jwt": "NEW_OR_CONFIRMED_JWT_HERE" }
}
```

Failure (invalid/expired token or other error):

```json
{
  "data": { "errorCode": 0, "message": "Token was already revoked." },
  "success": false
}
```

### loginUser — example responses

Success (login flow returns user, roles and jwt, excerpt):

```json
{
  "success": true,
  "data": {
    "user": { "ID": "31", "user_email": "user@example.com" },
    "roles": ["customer"],
    "jwt": [
      {
        "token": "eyJ...",
        "payload": { "id": "31", "email": "user@example.com" }
      }
    ]
  }
}
```

Failure (validation / expired token example):

```json
{
  "data": { "errorCode": 14, "message": "Expired token" },
  "success": false
}
```

### registerCustomer — example responses

Success (customer created, excerpt):

```json
{
  "id": 123,
  "first_name": "Test",
  "last_name": "Testerson",
  "role": "customer"
}
```

Failure (email exists):

```json
{
  "code": "registration-error-email-exists",
  "message": "An account is already registered with your email address. Please log in.",
  "data": { "status": 400 }
}
```

### registerUser — example responses

Success (user created, excerpt):

```json
{
  "success": true,
  "id": "31",
  "message": "User was successfully created.",
  "user": {
    "ID": 1,
    "user_login": "myuser",
    "user_email": "myuser@simplejwtlogin.com"
  },
  "roles": ["subscriber"],
  "jwt": "eyJhbGci..."
}
```

Failure (email already exists):

```json
{
  "success": false,
  "data": { "errorCode": 38, "message": "User already exists." }
}
```

### sendPasswordReset — example responses

Success (reset email sent):

```json
{ "message": "Reset password email has been sent.", "success": true }
```

Failure (wrong user):

```json
{
  "data": { "errorCode": 64, "message": "Wrong user." },
  "success": false
}
```

### logoutUser — example responses

Success — no token present (local logout only):

```json
{
  "success": true,
  "data": { "revoked": false }
}
```

Success — token revoked on server:

```json
{
  "success": true,
  "status": 200,
  "data": {
    "revoked": true,
    "tokenData": { "jwt": "NEW_OR_CONFIRMED_JWT_HERE" }
  }
}
```

Failure — server rejected revoke (e.g., user not found):

```json
{
  "success": false,
  "status": 400,
  "errorMessage": "User not found",
  "data": { "errorCode": 24, "message": "User not found." }
}
```

### Non-JSON / Parse Errors (what `parseJsonSafe` returns)

If the server returns non-JSON content (HTML error page, plain text, etc.), `parseJsonSafe` will not throw — it returns an object indicating the parse failure. Example:

```json
{
  "__parseError": true,
  "text": "<html>\n  <head>... (truncated)</head>\n  <body>Server error</body>\n</html>"
}
```

---

## Telemetry Guidance

- Capture `result.status` and structured `errorCode` only. Do NOT include emails or full user objects.

Example:

```ts
telemetry.captureEvent("auth.fetchToken.failure", {
  status: result.status,
  code: result.data?.errorCode ?? result.data?.errorKey,
});
```

You can also use the helper `mapApiErrorToTelemetry(error)` exported from `App/api/auth/errorHelpers.ts` to safely extract status and structured data from an `ApiError` before sending telemetry. Example:

```ts
// inside a catch or error handler
const telemetryPayload = mapApiErrorToTelemetry(err);
telemetry.captureEvent("auth.fetchToken.failure", {
  status: telemetryPayload.status,
  code: telemetryPayload.data?.errorCode ?? telemetryPayload.data?.errorKey,
  // intentionally omit PII (email, full user objects)
});
```

Common HTTP status → suggested translation keys (docs only)

| HTTP status | Suggested translation key |
| ----------: | ------------------------- |
|           0 | errors.networkError       |
|         400 | errors.invalidRequest     |
|         401 | errors.loginFailed        |
|         403 | errors.loginFailed        |
|         408 | errors.requestTimedOut    |
|         409 | errors.registrationFailed |
|         500 | errors.unexpectedError    |

---

## How to Contribute / Keep this README Current

- When API shapes or error codes change, update the "Detailed API responses" and add a short note indicating the source (mock vs live).
- If you add translation keys, include them in `App/translation/locales/*.ts`.
- Run a typecheck before opening a PR:

```powershell
npx tsc --noEmit
```

Local setup: populate `.env` with the EXPO*PUBLIC*\* values. `App/api/auth/config.ts` reads them at runtime — do not commit secrets.

If you prefer to keep this file shorter, we can move the large example JSON blobs into `docs/auth-responses.md` and keep this README as a brief developer guide.

---

## References

- Testing Site: https://www.wpmockup.xyz
- Live Site: https://www.livingwage-sf.org
- Simple JWT Login plugin: https://wordpress.org/plugins/simple-jwt-login/
- Simple JWT Login website: https://simplejwtlogin.com/
- Simple JWT Login docs: https://simplejwtlogin.com/docs
- Simple JWT Login API docs: https://simplejwtlogin.com/api/simple-jwt-login
- WooCommerce plugin: https://wordpress.org/plugins/woocommerce/
- WooCommerce website: https://woocommerce.com/
- WooCommerce REST API docs: https://developer.woocommerce.com/docs/apis/rest-api/

Canonical API code: `App/api/auth/authApi.ts` (types and normalization live there). Authentication screens live under `App/screens` (see `App/screens/LoginScreen/LoginScreen.tsx`, `App/screens/RegisterScreen/RegisterScreen.tsx`, and `App/screens/ForgotPasswordScreen/ForgotPasswordScreen.tsx`). The auth navigator is at `App/navigation/AuthNav.tsx`.

---

Maintainer notes: keep this README as the canonical developer guide for `App/api/auth`. When in doubt, update the examples here along with any code changes.

<!-- Table of contents updated to match current headings -->

# Auth API — developer reference

Maintainer: `@scottmotion` — Last updated: 2025-10-24

This folder provides the authentication API helpers used by the app to interact with the WordPress backend (JWT auth, token validation, user registration, WooCommerce customer creation, and password reset flows). The authentication UI/screens live under `App/screens` (for example: `App/screens/LoginScreen`, `App/screens/RegisterScreen`, `App/screens/ForgotPasswordScreen`). The auth navigator is implemented at `App/navigation/AuthNav.tsx`.

## Preamble

The mobile app's authentication flow relies primarily on 2 external API's hosted on the website:

- Simple JWT Login
  - The API provided by this plugin is used to fetch and validate a JSON Web Token (JWT), which constitutes the user login process. It is also used to send password reset emails and logout users by revoking the JWT token (TODO: implement revoke token). It also provides an endpoint to register users, however we defer to WooCommerce for this in order to remain consistent with the website.
  - Note that there are 2 sets of documentation for this API, and that they may present minor conflicts with its actual use (e.g. content of Requests/Responses), therefore you should thoroughly test any changes to helpers or implementation of endpoints.
- WooCommerce
  - The API provided by this pugin is used to register new customers (users) inline with the website's authentication method.
  - Since WooCommerce is an Automattic product (owners of WordPress) it is regularly updated and the documentation for this API is fairly reliable.

See the [references](#references) section for links to the above-mentioned documentation.

## Table of contents

- [Quick Links](#quick-links)
- [Quick Start (1 minute)](#quick-start-1-minute)
- [Contract (at-a-glance)](#contract-at-a-glance)
- [Environment Variables](#environment-variables)
- [Quick Debug Checklist](#quick-debug-checklist)
- [Try with curl (PowerShell-friendly)](#try-with-curl-powershell-friendly)
- [JWT Shapes & Normalization (short)](#jwt-shapes--normalization-short)
- [Detailed API Responses (examples)](#detailed-api-responses-examples)
  - [fetchToken — example responses](#fetchtoken---example-responses)
  - [validateToken — example responses](#validatetoken---example-responses)
  - [loginUser — example responses](#loginuser---example-responses)
  - [registerCustomer — example responses](#registercustomer---example-responses)
  - [registerUser — example responses](#registeruser---example-responses)
  - [sendPasswordReset — example responses](#sendpasswordreset---example-responses)
  - [Non-JSON / Parse Errors (what `parseJsonSafe` returns)](#non-json---parse-errors-what-parsejsonsafe-returns)
- [Telemetry Guidance](#telemetry-guidance)
- [How to Contribute / Keep this README Current](#how-to-contribute--keep-this-readme-current)
- [References](#references)

### Quick Links

- Login screen: `App/screens/LoginScreen/LoginScreen.tsx`
- Register screen: `App/screens/RegisterScreen/RegisterScreen.tsx`
- Forgot password screen: `App/screens/ForgotPasswordScreen/ForgotPasswordScreen.tsx`
- Auth navigator: `App/navigation/AuthNav.tsx`
- Auth API: `App/api/auth/authApi.ts`
- Auth types: `App/api/auth/types.ts`
- Auth config: `App/api/auth/config.ts`

---

## Quick Start (1 minute)

1. Copy the repo root `.env.example` to `.env` and populate the _EXPO_PUBLIC_ values locally (do NOT commit secrets).
2. Call `fetchToken(email, password)` to obtain a raw JWT string.
3. Call `validateToken(jwt)` to get decoded JWT(s) + user data.
4. `loginUser` will dispatch `setUser(validatedData)` on success.

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
4. If `res.data?.data?.errorCode` exists, map that code to a friendly message (do not display raw server text).
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
  code: result.data?.data?.errorCode,
});
```

You can also use the helper `mapApiErrorToTelemetry(error)` exported from `App/api/auth/errorHelpers.ts` to safely extract status and structured data from an `ApiError` before sending telemetry. Example:

```ts
// inside a catch or error handler
const telemetryPayload = mapApiErrorToTelemetry(err);
telemetry.captureEvent("auth.fetchToken.failure", {
  status: telemetryPayload.status,
  code: telemetryPayload.data?.data?.errorCode,
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

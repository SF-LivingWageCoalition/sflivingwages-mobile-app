<!-- Table of contents updated to match current headings -->

# Auth API — developer reference

Maintainer: `@scottmotion` — Last updated: 2025-11-25

This folder provides the authentication API helpers used by the app to interact with the WordPress backend (JWT auth, token validation, user registration, WooCommerce customer creation, and password reset flows). The authentication UI/screens live under `App/screens` (for example: `App/screens/LoginScreen`, `App/screens/RegisterScreen`, `App/screens/ForgotPasswordScreen`). The auth navigator is implemented at `App/navigation/AuthNav.tsx`.

## Preamble

The mobile app's authentication flow relies primarily on 2 external APIs hosted on the website:

- Simple JWT Login
  - The API provided by this plugin is used to fetch and validate a JSON Web Token (JWT), which constitutes the user login process. It is also used to send password reset emails and logout users by revoking the JWT token (via the plugin's revoke endpoint). It also provides an endpoint to register users, however we defer to WooCommerce for this in order to remain consistent with the website.
  - Note that there are 2 sets of documentation for this API, and that they may present minor conflicts with its actual use (e.g. content of Requests/Responses), therefore you should thoroughly test any changes to helpers or implementation of endpoints.
- WooCommerce
  - The API provided by this plugin is used to register new customers (users) inline with the website's authentication method.
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
- [JWT Shapes & Normalization (short)](#jwt-shapes--normalization-short)
- [Auth API Helpers](#auth-api-helpers)
  - [fetchToken()](#fetchtoken)
  - [validateToken()](#validatetoken)
  - [refreshToken()](#refreshtoken)
  - [revokeToken()](#revoketoken)
  - [loginUser()](#loginuser)
  - [registerCustomer()](#registercustomer)
  - [registerUser()](#registeruser)
  - [sendPasswordReset()](#sendpasswordreset)
  - [logoutUser()](#logoutuser)
  - [Non-JSON / Parse Errors (what `parseJsonSafe` returns)](#non-json--parse-errors-what-parsejsonsafe-returns)
- [How to Contribute / Keep this README Current](#how-to-contribute--keep-this-readme-current)
- [References](#references)

---

## Files & Purpose

Implementation quick-reference: file paths and a one-line purpose to help you jump to the code or related translation files.

| File                                                        | Purpose                                                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `App/screens/LoginScreen/LoginScreen.tsx`                   | Login screen UI                                                                    |
| `App/screens/RegisterScreen/RegisterScreen.tsx`             | Registration screen UI                                                             |
| `App/screens/ForgotPasswordScreen/ForgotPasswordScreen.tsx` | Password reset / forgot password screen UI                                         |
| `App/navigation/AuthNav.tsx`                                | Navigator that wires auth-related screens together                                 |
| `App/api/auth/authApi.ts`                                   | Core auth client (fetchToken, validateToken, loginUser, etc.);                     |
| `App/api/auth/types.ts`                                     | Type definitions and `ApiResult<T>` shapes used across helpers                     |
| `App/api/auth/config.ts`                                    | Environment-driven config and `base64Credentials` helper for WooCommerce           |
| `App/api/auth/errorHelpers.ts`                              | Map server error codes to user-facing messages                                     |
| `App/api/auth/utils.ts`                                     | Low-level helpers (parseJsonSafe, failure factories, `unwrapOrThrow`)              |
| `App/api/auth/errorCodeMap.ts`                              | Numeric and string error-code mappings referenced by `errorHelpers`                |
| `App/api/auth/errors.ts`                                    | Runtime `ApiError` type and related error helpers                                  |
| `App/translation/locales/simpleJwt.*.ts`                    | Localization files for Simple JWT Login responses                                  |
| `App/translation/locales/wooCommerce.*.ts`                  | Localization files for Woo Commerce responses                                      |
| `App/validation/authValidation.ts`                          | Zod schema factories for auth form validation                                      |
| `App/redux/features/userSlice/userSlice.ts`                 | Redux slice for user state: actions/reducers/selectors for authenticated user data |

---

## Primary Functions

The primary exported functions from `App/api/auth/authApi.ts`, a short description of their purpose, and their return values:

| Function                               | Purpose                                                                                                                                                | Returns                               |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `fetchToken(email, password)`          | Request a JWT from the Simple JWT Login endpoint.                                                                                                      | `ApiResult<TokenData>`                |
| `validateToken(jwtToken)`              | Validate a JWT with the Simple JWT Login endpoint.                                                                                                     | `ApiResult<ValidationData>`           |
| `refreshToken(jwtToken)`               | Refresh a JWT via the Simple JWT Login endpoint (returns a new token).                                                                                 | `ApiResult<TokenData>`                |
| `revokeToken(jwtToken)`                | Revoke a JWT on the server using the Simple JWT Login revoke endpoint.                                                                                 | `ApiResult<TokenData>`                |
| `loginUser(email, password, dispatch)` | High-level login flow: fetches a token, validates it, and on success dispatches `setUser` to populate Redux user state.                                | `ApiResult<ValidationData['data']>`   |
| `registerCustomer(email, password)`    | Create a WooCommerce customer via the WooCommerce REST API.                                                                                            | `ApiResult<CustomerRegistrationData>` |
| `registerUser(email, password)`        | Register a WordPress user via the Simple JWT Login plugin (alternate to WooCommerce).                                                                  | `ApiResult<UserRegistrationData>`     |
| `sendPasswordReset(email)`             | Request a password reset email via Simple JWT Login.                                                                                                   | `ApiResult<PasswordResetData>`        |
| `logoutUser()`                         | Clear local user auth state and attempt a best-effort revoke of the JWT on the server. Returns a `LogoutResult` so callers can inspect revoke outcome. | `Promise<LogoutResult>`               |

### Note about `logoutUser()`

`logoutUser()` is a no-argument helper you can call as `await logoutUser()`.
Implementation details:

- It reads the current JWT from the persisted Redux store via the `selectJwt` selector.
- It attempts a best-effort server-side revoke by calling `revokeToken(jwt)`; `logoutUser` returns a `LogoutResult` so callers may inspect the revoke outcome. On success `result.success === true` and `result.data` is always present with a `revoked: boolean` flag. If a revoke was attempted and succeeded, `result.data.revoked === true` and `result.data.tokenData` may contain the raw server-provided payload (for example, `data.jwt` as a string). Callers that need a normalized `JwtItem[]` should call `normalizeJwt` before storing tokens in Redux. If the revoke failed the function returns a standard failure `ApiResult` (inspect `.status`, `.errorMessage`, and `.data` for details).
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
    // err.status and err.data are available for UX decisions
  }
}
```

---

## Contract (at-a-glance)

- Inputs: plain JS objects (email/password, customer data, etc.)
- Outputs: `ApiResult<T>` — a minimal contract for all helpers
  - Success: `{ success: true, data: T, status?: number }`
  - Failure: `{ success: false, errorMessage?: string, status?: number, data?: unknown }`
- Optional throw-style helper: `unwrapOrThrow(result)` — returns `data` or throws `ApiError` (contains `status` and `data`).
- Side-effects: `loginUser` dispatches `setUser(validatedData)` on success.

Implementation details (see `App/api/auth/authApi.ts` and `App/api/auth/types.ts`): exported types are defined in `types.ts` (for example `TokenData`, `ValidationData`, `PasswordResetData`, `ApiResult<T>`). `ApiError` is defined in `App/api/auth/errors.ts` and runtime helpers (for example `unwrapOrThrow`, `normalizeJwt`, `parseJsonSafe`) live in `App/api/auth/utils.ts`.

---

## Error codes, translation keys, and UI guidance

To make UX consistent across different server plugins (Simple JWT Login and WooCommerce) the auth helpers now attach a machine-readable error identifier to ApiResult failures when the server provides one:

- For Simple JWT Login numeric errors the library exposes `errorCode` (number) on the returned `result.data` object.
- For WooCommerce string error codes the library exposes `errorKey` (string) on `result.data`.

When available the helper `mapApiErrorToMessage` (in `App/api/auth/errorHelpers.ts`) will prefer returning a translated, user-facing message derived from `errorCode` / `errorKey` rather than raw server text. The low-level failure factory `apiFailureWithServerCode` (in `App/api/auth/utils.ts`) attaches these fields so callers can both present translated text and use the machine-readable identifier for conditional UI logic.

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

UI guidance:

- Prefer `result.errorMessage` when present — it is already localized when a code mapping exists.
- If `result.errorMessage` is not present, use `mapApiErrorToMessage(result)` to obtain a best-effort translation (this function will check `errorCode` / `errorKey` and fall back to status-based messages).

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

Note: these EXPO_PUBLIC environment variables are read and exported from `App/api/auth/config.ts` and consumed by the auth client and helpers (for example `BASE_URL`, `JWT_ROUTE`, `JWT_AUTH_KEY`, `FETCH_TIMEOUT_MS`, and `base64Credentials`).

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
5. For unknown/5xx errors show `errors.unexpectedError`.

---

## JWT Shapes & Normalization (short)

Notes:

- `fetchToken` returns a raw JWT string at `data.jwt`.
- `validateToken` typically returns decoded JWT object(s) in `data.jwt` (usually an array).

Normalization guidance:

- The project now exports a single runtime helper: `normalizeJwt` (in `App/api/auth/utils.ts`).
- The canonical normalized shape is `JwtItem` (defined and exported from `App/api/auth/types.ts`).
- Always call `normalizeJwt` at the point where a token value is written into the Redux store (for example, before `dispatch(setUser(...))`). This guarantees the `userSlice.jwt` array contains a predictable runtime shape.

Compact example:

```ts
import { normalizeJwt } from "./utils";
import type { JwtItem } from "./types";
// Import the exported payload type from the user slice
import type { SetUserPayload } from "../../redux/features/userSlice/userSlice";

const maybeJwt = tokenData.data?.jwt ?? validatedData?.jwt;
const jwtArray: JwtItem[] = normalizeJwt(maybeJwt);

const payload: SetUserPayload = {
  user: validatedData!.user,
  roles: validatedData!.roles,
  jwt: jwtArray,
};

dispatch(setUser(payload));
```

Additional note: the revoke endpoint (and refresh) typically return a raw
JWT string in `data.jwt`. The auth helpers no longer perform automatic
normalization for revoke responses; callers that need the canonical
`JwtItem[]` shape should call `normalizeJwt` explicitly before writing
tokens into the Redux store (for example, before `dispatch(setUser(...))`).

---

## Auth API Helpers

Keep these as a reference for debugging. Update when server shapes change.

All helpers except logoutUser() return Promise\<ApiResult\<T>>:

- Success: { success: true; data: T; status?: number }
- Failure: { success: false; errorMessage?: string; status?: number; data?: unknown }

Prefer checking `result.success`. If you want exception-style flow use
`unwrapOrThrow(result)` which throws an exported `ApiError` (includes
`.status` and `.data`).

### `fetchToken()`

Fetch a JWT token using email and password via the Simple JWT Login plugin.

Usage: fetchToken("\<email>", "\<password>")

Returns: ApiResult\<TokenData> where on success `data.jwt` is the raw JWT string.

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

### `validateToken()`

Validate a JWT token via the Simple JWT Login plugin.

Note: see https://wordpress.org/support/topic/unable-to-find-user-property-in-jwt/ for a common error.

Usage: validateToken("\<jwt_token>")

Returns: ApiResult\<ValidationData> where on success `data` contains `user`, `roles`, and `jwt` (array of decoded JWT objects).

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

### `refreshToken()`

Refresh a JWT token via the Simple JWT Login plugin.

Usage: refreshToken("\<jwt_token>")

Returns: ApiResult\<TokenData> where on success `data.jwt` is the new raw JWT string.

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

### `revokeToken()`

Revoke a JWT token via the Simple JWT Login plugin.

Usage: revokeToken("\<jwt_token>")

Returns: ApiResult\<TokenData> where on success the server returns the refreshed/confirmed JWT in `data.jwt` (i.e. `data` is expected to contain a `jwt` value rather than being null).

Success (token revoked):

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

### `loginUser()`

Login a WP user via the Simple JWT Login plugin.

Usage: loginUser("\<email>", "\<password>", dispatch)

Returns: ApiResult\<ValidationData['data']> where `data` is the validated payload.

Success (login flow returns user, roles and jwt):

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

### `registerCustomer()`

Register a new WooCommerce customer via the WooCommerce REST API.

Usage: registerCustomer("\<email>", "\<password>")

Returns: ApiResult\<CustomerRegistrationData>

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

### `registerUser()`

Register a new user via the Simple JWT Login plugin.

Note: the site primarily uses WooCommerce customers; this function is provided for completeness.

Usage: registerUser("\<email>", "\<password>")

Returns: ApiResult\<UserRegistrationData>

On success: returns { success: true, data: UserRegistrationData, status?: number }
On failure: returns { success: false, errorMessage?: string, status?: number, data?: unknown }
The returned data may include fields such as 'data', 'errorCode', and 'message' for error cases.

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

### `sendPasswordReset()`

Send a password reset email to the specified email address.

Note: the Simple JWT Login plugin requires building a potentially fragile URL using `&email=` instead of `?email=`. This form is a plugin-specific quirk; it is intentional and not a typo.

Usage: sendPasswordReset("\<email>")

Returns ApiResult\<PasswordResetData>

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

### `logoutUser()`

Logout the current user.

Usage:

```
const result = await logoutUser();
if (result.success) {
  // logged out; result.data.revoked may be true/false
} else {
  // handle failure (result.status, result.errorMessage, result.data)
}
```

Returns: LogoutResult

Behavior:

- Attempts a best-effort server-side revoke of the current JWT (if present).
- Always clears local auth state by dispatching `clearUser()` so the UI and navigation can react to the logged-out state.

Side effects:

- May perform a network call to revoke the token (network or server errors are handled and do not prevent clearing local state).
- Dispatches the Redux action `clearUser()` in a `finally` block.

Returns:

- Promise<LogoutResult> — on success `data.revoked === true` when the server revoke succeeded; otherwise `revoked === false`. On failure the result follows the ApiResult failure shape and may include `status` and `data`.

Note: The function reads the current JWT from the Redux store (via selector). If no token is present it will still clear local state and return a success result indicating nothing was revoked.

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

## How to Contribute / Keep this README Current

- When API shapes or error codes change, update the "Detailed API responses" and add a short note indicating the source (mock vs live).
- If you add translation keys, include them in `App/translation/locales/*.ts`.
- Run a typecheck before opening a PR:

```powershell
npx tsc --noEmit
```

Local setup: populate `.env` with the EXPO_PUBLIC values. `App/api/auth/config.ts` reads them at runtime — do not commit secrets.

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

Canonical API code: `App/api/auth/authApi.ts`. Types: `App/api/auth/types.ts`. Normalization helper: `App/api/auth/utils.ts`. Authentication screens live under `App/screens` (see `App/screens/LoginScreen/LoginScreen.tsx`, `App/screens/RegisterScreen/RegisterScreen.tsx`, and `App/screens/ForgotPasswordScreen/ForgotPasswordScreen.tsx`). The auth navigator is at `App/navigation/AuthNav.tsx`.

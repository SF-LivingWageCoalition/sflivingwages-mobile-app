<!-- Table of contents updated to match current headings -->

# User Redux Slice - developer reference

Maintainer: `@scottmotion` - Last updated: 2026-06-12

## Preamble

This folder contains the Redux user domain for authentication state persistence and session lifecycle updates. It stores normalized user identity data (`user`), role data (`roles`), and JWT data (`jwt`) under the `userData` branch in the Redux store.

This slice is intentionally split into focused modules:

- `userSlice.ts` contains reducers and `extraReducers` lifecycle handling.
- `userThunks.ts` contains async flows for login, validation/refresh, and logout.
- `selectors.ts` contains thunk-safe selectors (to avoid slice<->thunk import cycles).
- `types.ts` contains thunk fulfillment/rejection payload aliases.

The store wiring lives in `App/redux/store/store.ts`, where this reducer is mounted as `userData` and persisted with `redux-persist`.

## Table of contents

- [Files & Purpose](#files--purpose)
- [Store Integration](#store-integration)
- [State Contract](#state-contract)
- [Actions](#actions)
  - [setUser(payload)](#setuserpayload)
  - [clearUser()](#clearuser)
- [Async Thunks](#async-thunks)
  - [loginUserThunk](#loginuserthunk)
  - [validateUserThunk](#validateuserthunk)
  - [logoutUserThunk](#logoutuserthunk)
- [Selectors](#selectors)
- [Lifecycle Behavior (extraReducers)](#lifecycle-behavior-extrareducers)
- [Quick Usage](#quick-usage)
- [Debug Checklist](#debug-checklist)

---

## Files & Purpose

| File                                          | Purpose                                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `App/redux/features/userSlice/userSlice.ts`   | Slice state, synchronous reducers (`setUser`, `clearUser`), and thunk lifecycle handling in `extraReducers`.       |
| `App/redux/features/userSlice/userThunks.ts`  | Async auth-related thunks (`loginUserThunk`, `validateUserThunk`, `logoutUserThunk`).                              |
| `App/redux/features/userSlice/selectors.ts`   | Read-only selectors (`selectUser`, `selectRoles`, `selectJwt`, `selectIsLoggedIn`).                                |
| `App/redux/features/userSlice/types.ts`       | Shared types for thunk fulfilled and rejected payloads.                                                            |
| `App/redux/store/store.ts`                    | Root reducer wiring (`userData` key), persistence config, and store setup.                                         |
| `App/redux/features/userUiSlice/selectors.ts` | `selectUserUiIsValidating` selector used by `validateUserThunk.condition` to prevent duplicate validation runs.    |
| `App/api/auth/authApi.ts`                     | API calls invoked by thunks (`loginUser`, `validateToken`, `refreshToken`, `logoutUser`).                          |
| `App/api/auth/utils.ts`                       | Runtime helpers used by slice/thunks (`normalizeJwt`, `unwrapOrThrow`, `unwrapNewToken`, `isValidValidationData`). |

---

## Store Integration

In `App/redux/store/store.ts`:

- The reducer is mounted under `userData`.
- Persisted storage whitelist includes `userData`.
- `RootState` shape includes:
  - `state.userData`
  - `state.userUi`

This is why selectors in this folder read from `state.userData.*`.

---

## State Contract

The slice state in `userSlice.ts` is:

```ts
interface DataState {
  user?: User | undefined;
  roles: string[];
  jwt: JwtItem[];
}
```

Initial values:

```ts
const initialState: DataState = {
  user: undefined,
  roles: [],
  jwt: [],
};
```

Notes:

- `jwt` is expected to be normalized `JwtItem[]` shape.
- Thunk-driven state updates normalize JWT via `normalizeJwt(...)`.
- Manual updates via `setUser` do not auto-normalize JWT; callers should provide normalized values.

---

## Actions

### `setUser(payload)`

Type:

```ts
type SetUserPayload = Partial<DataState>;
```

Behavior:

- Partial merge semantics.
- Any omitted field keeps its current state value.
- Does not clear fields by omission.

Reducer logic:

```ts
state.user = payload.user ?? state.user;
state.roles = payload.roles ?? state.roles;
state.jwt = payload.jwt ?? state.jwt;
```

Use when you want targeted state updates without resetting other user fields.

### `clearUser()`

Behavior:

- Fully resets auth-related user state.

Reducer logic:

```ts
state.user = undefined;
state.roles = [];
state.jwt = [];
```

Use for local sign-out or hard session reset.

---

## Async Thunks

### `loginUserThunk`

Signature:

```ts
createAsyncThunk<ValidationData["data"], { email: string; password: string }>;
```

Flow:

1. Calls `authApi.loginUser(email, password)`.
2. Uses `unwrapOrThrow` for exception-style handling.
3. Guards payload with `isValidValidationData`.
4. Returns validated auth payload for reducer handling.

Primary responsibility: authenticate credentials and deliver validated user/jwt data.

### `validateUserThunk`

Signature:

```ts
createAsyncThunk<
  ValidateUserFulfilled,
  void,
  { state: RootState; rejectValue: ValidateUserRejectValue }
>;
```

Flow:

1. Reads current token from `selectJwt(state)?.[0]?.token`.
2. If token is missing, rejects with `{ status: 0 }`.
3. Attempts `authApi.validateToken(token)`.
4. On failed validation, attempts refresh via `authApi.refreshToken(token)`.
5. If refresh returns a token (`unwrapNewToken`), validates refreshed token.
6. Returns validated payload on success; otherwise rejects with derived status.

Condition gate:

- `condition` returns `false` when `selectUserUiIsValidating(state)` is `true`.
- This prevents concurrent validation executions.

### `logoutUserThunk`

Signature:

```ts
createAsyncThunk<void, void, { state: RootState }>;
```

Flow:

1. Reads current token from `selectJwt(state)?.[0]?.token`.
2. Calls `authApi.logoutUser(token)`.
3. Slice clears local state on fulfilled lifecycle.

---

## Selectors

Defined in `selectors.ts`:

- `selectUser(state)` -> `state.userData.user`
- `selectRoles(state)` -> `state.userData.roles`
- `selectJwt(state)` -> `state.userData.jwt`
- `selectIsLoggedIn(state)` -> boolean

`selectIsLoggedIn` criteria:

- `user?.ID` is truthy.
- `jwt.length > 0`.
- `jwt[0].token` exists and is truthy.

This selector assumes JWT has already been normalized.

---

## Lifecycle Behavior (extraReducers)

`userSlice.ts` handles thunk lifecycle events as follows:

- `loginUserThunk.fulfilled`
  - If payload is valid: sets `user`, `roles`, and normalized `jwt`.
- `validateUserThunk.fulfilled`
  - Same as login fulfilled: updates `user`, `roles`, and normalized `jwt`.
- `validateUserThunk.rejected`
  - If `action.payload?.status === 401`: clears user state.
  - Other statuses keep current local state unchanged.
- `logoutUserThunk.fulfilled`
  - Clears user state regardless of server response body details.

---

## Quick Usage

Basic login + validation usage in components/services:

```ts
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import {
  loginUserThunk,
  validateUserThunk,
  logoutUserThunk,
} from "./userThunks";

const dispatch = useDispatch<AppDispatch>();

// Login
await dispatch(loginUserThunk({ email, password }));

// Validate existing persisted token (with refresh fallback)
await dispatch(validateUserThunk());

// Logout
await dispatch(logoutUserThunk());
```

Manual partial update example:

```ts
import { setUser } from "./userSlice";

dispatch(setUser({ roles: ["customer", "member"] }));
```

Manual full clear:

```ts
import { clearUser } from "./userSlice";

dispatch(clearUser());
```

---

## Debug Checklist

1. Confirm reducer mount key is `userData` in `store.ts`.
2. If user appears logged out unexpectedly, inspect `validateUserThunk.rejected` status (401 triggers state clear).
3. If validation runs repeatedly, verify `userUi.isValidating` is toggled correctly by the UI slice/thunks.
4. If login succeeds but selectors fail, confirm `jwt` contains normalized objects with `.token`.
5. If persisted sessions do not restore, verify `redux-persist` storage availability and whitelist includes `userData`.

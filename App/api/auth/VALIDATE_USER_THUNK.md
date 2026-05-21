# Validate User on App Resume / Critical Actions

This note contains a minimal suggestion for validating the currently-logged-in user when the app is re-opened (app resume) and before critical actions, reusing the existing `authApi` in this folder.

Goal

- Lightweight: reuse `authApi.validateToken`, `authApi.logoutUser`, and existing `userSlice` actions.
- Note: this file focuses on a small helper pattern to call before critical actions.

Contract (short)

- Input: existing persisted JWT in `user` slice (your slice stores `jwt` array).
- Output: update `user` slice with validated payload (use `setUser`) or clear state via `logoutUser()` / `clearUser()` on 401.
- Errors: network failures kept non-fatal (no automatic logout). Use UI to surface retry when needed.

Implementation notes (minimal changes)

1. Helper thunk location

Place the improved `validateUser` helper (shown in section 3) in `App/redux/features/userSlice/userSlice.ts` so callers can `dispatch(validateUser())` before critical actions.

Notes:

- Reuses `authApi.validateToken` and `authApi.logoutUser` which already handle clearing local state.
- `normalizeJwt` is exported/available in `authApi` utils — it normalizes `jwt` to the array shape your store expects.

(Removed: app-level wiring examples for PersistGate/AppState.)
Focus: use the helper below directly from components or thunks that perform protected actions.

3. Helper: validate before critical actions (manual call)

- In components or thunks that perform sensitive backend operations, call `await dispatch(validateUser())` first and check whether the user/token remains present before proceeding.

Example (recommended helper thunk placed in `App/redux/features/userSlice/userSlice.ts`):

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth/authApi";
import { setUser } from "./userSlice"; // adjust path as needed
import type { RootState } from "../../store/store";

// Returns `true` when the user is validated (or refreshed+validated), `false` otherwise.
export const validateUser = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>("user/validateUser", async (_, { getState, dispatch }) => {
  const state = getState();
  const jwtArray = state.user?.jwt;
  const token =
    Array.isArray(jwtArray) && jwtArray[0] ? jwtArray[0].token : undefined;
  if (!token) return false;

  // 1) Try to validate current token
  const v = await authApi.validateToken(token);
  if (v.success && v.data && v.data.data) {
    const validated = v.data.data;
    const jwtNormalized = authApi.normalizeJwt(validated.jwt ?? token);
    dispatch(
      setUser({
        user: validated.user,
        roles: validated.roles,
        jwt: jwtNormalized,
      }),
    );
    return true;
  }

  // 2) If validation failed, attempt refresh (recoverable path)
  try {
    const r = await authApi.refreshToken(token);
    let newTokenStr: string | undefined;
    if (r.success && r.data) {
      const maybe = (r.data as any).data ?? (r.data as any);
      if (typeof maybe === "string") newTokenStr = maybe;
      else if (Array.isArray(maybe) && maybe[0]?.jwt)
        newTokenStr = maybe[0].jwt;
      else if (maybe && typeof maybe === "object" && maybe.jwt)
        newTokenStr = maybe.jwt;
    }

    if (newTokenStr) {
      const v2 = await authApi.validateToken(newTokenStr);
      if (v2.success && v2.data && v2.data.data) {
        const validated = v2.data.data;
        const jwtNormalized = authApi.normalizeJwt(
          validated.jwt ?? newTokenStr,
        );
        dispatch(
          setUser({
            user: validated.user,
            roles: validated.roles,
            jwt: jwtNormalized,
          }),
        );
        return true;
      }
    }

    // 3) Unrecoverable: if API signaled 401 or refresh didn't yield a usable token, clear session
    const status = (v && (v as any).status) ?? (r && (r as any).status);
    if (status === 401) {
      await authApi.logoutUser();
      return false;
    }

    // Non-401 network/other errors: keep existing state (do not logout automatically)
    return false;
  } catch (err) {
    // Network/unexpected error: do not logout automatically. Caller can surface retry UI.
    return false;
  }
});
```

Usage in components/thunks before critical actions:

```ts
const result = await dispatch(validateUser() as any);
if (!result) {
  // validation failed (or could not be recovered) — show login/abort action
  return;
}
// proceed with protected API call
```

Optional: middleware

- If you prefer automatic enforcement, add a small middleware that checks `action.meta?.requireAuth` and runs `validateUser()` before allowing the action through. This adds complexity and is optional.

Edge cases and extras

- If you have refresh tokens, attempt `authApi.refreshToken()` on 401 before logout.
- Consider throttling `validateUser` calls (set `isValidating` flag in slice) to avoid duplicates when many actions try to validate concurrently.
- For network failures, prefer not to log out the user automatically — surface a retry UI for critical actions.

Prevent concurrent validations (add `isValidating` to your slice)

If multiple components or thunks may call `validateUser()` concurrently, add a simple `isValidating` flag to the `user` slice. The pattern below uses the `pending`/`fulfilled`/`rejected` lifecycle actions from `createAsyncThunk` and also checks the flag at the start of the thunk so duplicate calls return early.

Example (slice changes and how `validateUser` can check `isValidating`):

```ts
// App/redux/features/userSlice/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth/authApi";
import type { RootState } from "../../store/store";

type UserState = {
  user?: any;
  roles?: any[];
  jwt?: any[];
  isValidating: boolean;
};

const initialState: UserState = {
  user: undefined,
  roles: [],
  jwt: [],
  isValidating: false,
};

export const validateUser = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>("user/validateUser", async (_, { getState, dispatch }) => {
  const state = getState();
  // If another validation is already running, return early.
  if (state.user?.isValidating) return false;

  // ...payload: validate token, attempt refresh, dispatch setUser/logout as shown earlier...
  // Return true on success, false otherwise.
  return false;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser, clearUser, etc.
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUser.pending, (state) => {
        state.isValidating = true;
      })
      .addCase(validateUser.fulfilled, (state) => {
        state.isValidating = false;
      })
      .addCase(validateUser.rejected, (state) => {
        state.isValidating = false;
      });
  },
});

export default userSlice.reducer;
```

Notes:

- `createAsyncThunk` dispatches the `pending` action synchronously before the payload runs; the pending reducer sets `isValidating = true`. The thunk's payload checks `getState().user.isValidating` and will return early if validation is already in progress.
- This prevents duplicate long-running validation/refresh work and keeps UI state simple (`isValidating` can be shown as a spinner).
- Edge case: extremely tight races are possible in unusual dispatch timings, but this approach is reliable for typical app flows. If you need stronger guarantees, consider a mutex utility or central request coordinator.

Why this is minimal

- No new network layer or axios changes.
- Reuses `authApi`'s consistent ApiResult shape, validation, and logout side-effects.
- Only new code: one small thunk and callers that invoke it before critical actions (no invasive app-level wiring required).

---

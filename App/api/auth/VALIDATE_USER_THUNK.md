# Validate User on App Resume / Critical Actions

This note describes an improved, minimal `validateUser` thunk to run when the app resumes or before protected actions. It reuses existing `authApi` functions and `userSlice` state/selectors and recommends a small helper extraction to keep the thunk concise.

Goals

- Reuse existing helpers: `authApi.validateToken`, `authApi.refreshToken`, `authApi.logoutUser`, and `authApi.normalizeJwt`.
- Prefer Redux selectors (`selectJwt`) and `userSlice` actions (`setUser`, `clearUser`) instead of ad-hoc state indexing.
- Keep network errors non-fatal (no automatic logout on non-401 errors).

Key reuse points

- `validateToken`, `refreshToken`, `logoutUser` — see `App/api/auth/authApi.ts`.
- `normalizeJwt` and runtime helpers — see `App/api/auth/utils.ts`.
- `setUser`, `clearUser`, `selectJwt`, `selectIsLoggedIn` — see `App/redux/features/userSlice/userSlice.ts`.
- `RootState` type — see `App/redux/store/store.ts`.

Small helper to add (optional but recommended)

- `unwrapNewToken(result: ApiResult<any>): string | undefined` in `App/api/auth/utils.ts`: centralizes the parsing logic that extracts a new token string from `refreshToken` responses (handles string, array, or object shapes). This keeps the thunk readable and consistent.

Improved thunk (recommended placement: `App/redux/features/userSlice/userSlice.ts`)

Notes on the implementation below:

- Use the `selectJwt` selector to find the current token.
  -- Use an `isValidating` flag in the non-persisted `userUi` slice to prevent duplicate concurrent validations.
- Call `normalizeJwt` before dispatching `setUser`.

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth/authApi";
import { normalizeJwt, unwrapNewToken } from "../../../api/auth/utils"; // optional helper
// `setUser` and `selectJwt` are defined later in this file's `userSlice.ts`.
// Define this thunk *above* the `createSlice` call so the slice can reference
// the thunk in `extraReducers` while still exposing `setUser` and selectors.
import { selectUserUiIsValidating, setIsValidating } from "../userUiSlice";
import type { RootState } from "../../store/store";

export const validateUser = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>("user/validateUser", async (_, { getState, dispatch }) => {
  const state = getState();
  // Prevent concurrent validations — use the non-persisted UI selector
  if (selectUserUiIsValidating(state)) return false;

  const jwtArray = selectJwt(state);
  const token =
    Array.isArray(jwtArray) && jwtArray[0] ? jwtArray[0].token : undefined;
  if (!token) return false;

  dispatch(setIsValidating(true));
  try {
    // 1) Validate current token
    const v = await authApi.validateToken(token);
    if (v.success && v.data && v.data.data) {
      const validated = v.data.data;
      const jwtNormalized = normalizeJwt(validated.jwt ?? token);
      dispatch(
        setUser({
          user: validated.user,
          roles: validated.roles,
          jwt: jwtNormalized,
        }),
      );
      return true;
    }

    // 2) Try refresh (recoverable path)
    const r = await authApi.refreshToken(token);
    const newTokenStr = unwrapNewToken(r);
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

    // 3) If API signaled 401, force logout; otherwise keep existing state
    const status = (v && (v as any).status) ?? (r && (r as any).status);
    if (status === 401) {
      await authApi.logoutUser();
      return false;
    }
    return false;
  } catch (err) {
    // network/unexpected error: do not logout automatically — surface a retry UI instead
    return false;
  } finally {
    dispatch(setIsValidating(false));
  }
});
```

Usage (components/thunks):

```ts
// Prefer `.unwrap()` to get the thunk payload or throw on rejection
try {
  const ok = await dispatch(validateUser()).unwrap();
  if (!ok) {
    // validation failed — show login/abort
    return;
  }
  // proceed with protected API call
} catch (err) {
  // thunk rejected or network error — surface retry UI
}
```

Slice concurrency guard (option 2 — recommended)

Instead of persisting `isValidating` on the `user` slice (transient UI state), move it into a small dedicated `userUi` slice that is not persisted. This keeps persistent auth data separate from ephemeral UI flags and avoids spinners or blocked logic after app rehydration.

Example `App/redux/features/userUiSlice/userUiSlice.ts` (non-persisted):

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserUiState = { isValidating: boolean };

const initialState: UserUiState = { isValidating: false };

const userUiSlice = createSlice({
  name: "userUi",
  initialState,
  reducers: {
    setIsValidating: (state, action: PayloadAction<boolean>) => {
      state.isValidating = action.payload;
    },
  },
});

export const { setIsValidating } = userUiSlice.actions;
export default userUiSlice.reducer;

// Selector (export from this file):
import type { RootState } from "../../store/store"; // import in the slice file for typing
export const selectUserUiIsValidating = (state: RootState): boolean =>
  (state as any).userUi?.isValidating ?? false;
```

Update your store configuration so `userUi` is not persisted (the app's current `persistConfig.whitelist` includes only `userData`, so `userUi` will be omitted automatically). See `App/redux/store/store.ts`.

Updated thunk usage (import selector from the new slice):

```ts
import { selectUserUiIsValidating } from "../userUiSlice";

// inside thunk payload:
if (selectUserUiIsValidating(state)) return false;
```

Rationale:

- Keeps persisted `userData` clean (only long-lived auth data).
- Prevents showing a stale `isValidating` state after rehydrate.
- Minimal change: add a tiny `userUi` slice and use its selector in the thunk.

Why these changes?

- Cleaner state access: `selectJwt` centralizes how tokens are read from the store.
- Smaller thunk: `unwrapNewToken` moves messy response-shape parsing out of the thunk.
- Safe behavior: non-401 network failures do not cause an automatic logout.

Next steps (concrete)

- Implement `unwrapNewToken(result: ApiResult<any>): string | undefined` in `App/api/auth/utils.ts`.
- Create the small non-persisted `userUi` slice (`App/redux/features/userUiSlice/userUiSlice.ts`) that exposes `setIsValidating` and `selectUserUiIsValidating`.
- Register the `userUi` reducer in the root reducer (`App/redux/store/store.ts`) so it is available at `state.userUi` and is not included in the persist `whitelist`.
- Place the `validateUser` thunk in `App/redux/features/userSlice/userSlice.ts` **above** the `createSlice` call so `extraReducers` can reference it. In the thunk use `selectJwt(state)` and `selectUserUiIsValidating(state)`.
- Ensure `validateUser` returns `boolean` and only calls `authApi.logoutUser()` on 401 status; keep network errors non-fatal.

If you'd like, I can implement all of the above now and update the slice and utils files.

---

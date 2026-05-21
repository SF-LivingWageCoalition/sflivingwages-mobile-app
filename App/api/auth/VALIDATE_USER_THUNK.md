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
- Use an `isValidating` flag in the slice to prevent duplicate concurrent validations.
- Call `normalizeJwt` before dispatching `setUser`.

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth/authApi";
import { unwrapNewToken } from "../../../api/auth/utils"; // optional helper
import { setUser } from "./userSlice";
import { selectJwt } from "./userSlice";
import type { RootState } from "../../store/store";

export const validateUser = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>("user/validateUser", async (_, { getState, dispatch }) => {
  const state = getState();
  // Prevent concurrent validations — use a selector instead of ad-hoc state indexing
  if (selectIsValidating(state)) return false;

  const jwtArray = selectJwt(state);
  const token =
    Array.isArray(jwtArray) && jwtArray[0] ? jwtArray[0].token : undefined;
  if (!token) return false;

  // 1) Validate current token
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

  // 2) Try refresh (recoverable path)
  try {
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

Slice concurrency guard (brief)

Add `isValidating: boolean` to the `user` slice state and toggle it via the thunk lifecycle actions (`pending`/`fulfilled`/`rejected`). This prevents duplicate validations and keeps UI state simple (spinner while validating).

Example (add to `App/redux/features/userSlice/userSlice.ts`):

```ts
// Add `isValidating` to your state
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setUser, clearUser, etc. (keep your existing reducers)
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

// Selector to read the validating flag (add this to your slice file exports)
import type { RootState } from "../../store/store"; // add to your slice file
export const selectIsValidating = (state: RootState): boolean =>
  (state as any).userData?.isValidating ?? false;
```

Why these changes?

- Cleaner state access: `selectJwt` centralizes how tokens are read from the store.
- Smaller thunk: `unwrapNewToken` moves messy response-shape parsing out of the thunk.
- Safe behavior: non-401 network failures do not cause an automatic logout.

Next steps (concrete)

- Implement `unwrapNewToken(result: ApiResult<any>): string | undefined` in `App/api/auth/utils.ts`.
- Add `isValidating: boolean` to the `user` slice state (`App/redux/features/userSlice/userSlice.ts`) and export `selectIsValidating`.
- Place the `validateUser` thunk in `App/redux/features/userSlice/userSlice.ts` **above** the `createSlice` call so `extraReducers` can reference it.
- In the thunk use `selectJwt(state)` and `selectIsValidating(state)` (the slice is mounted at `userData` in the store — see `App/redux/store/store.ts`) rather than ad-hoc `state.user` checks.
- Ensure `validateUser` returns `boolean` and only calls `authApi.logoutUser()` on 401 status; keep network errors non-fatal.

If you'd like, I can implement all of the above now and update the slice and utils files.

---

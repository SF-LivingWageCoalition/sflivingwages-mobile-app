# Validate User on App Resume / Critical Actions

This note describes an improved, minimal `validateUserThunk` thunk to run when the app resumes or before protected actions. It reuses existing `authApi` functions and `userSlice` state/selectors and recommends a small helper extraction to keep the thunk concise.

Goals

- Reuse existing helpers: `authApi.validateToken`, `authApi.refreshToken`, `authApi.logoutUser`, and `normalizeJwt`.
- Prefer Redux selectors (`selectJwt`) and `userSlice` actions (`setUser`, `clearUser`) instead of ad-hoc state indexing.
- Keep network errors non-fatal (no automatic logout on non-401 errors).

Key reuse points

- `validateToken`, `refreshToken`, `logoutUser` — see `App/api/auth/authApi.ts`.
- `normalizeJwt` and runtime helpers — see `App/api/auth/utils.ts`.
- `setUser`, `clearUser`, `selectJwt`, `selectIsLoggedIn` — see `App/redux/features/userSlice/userSlice.ts`.
- `RootState` type — see `App/redux/store/store.ts`.

Small helper to add (optional but recommended)

- `unwrapNewToken(result: ApiResult<any>): string | undefined` in `App/api/auth/utils.ts`: centralizes the parsing logic that extracts a new token string from `refreshToken` responses (handles string, array, or object shapes). This keeps the thunk readable and consistent.

Example `unwrapNewToken` implementation (add to `App/api/auth/utils.ts`):

```ts
// Return the first normalized token string when present, otherwise undefined
export const unwrapNewToken = (res: ApiResult<any>): string | undefined => {
  if (!res) return undefined;
  const payload = res.data as any;
  const maybe = payload?.data?.jwt ?? payload?.jwt ?? payload;
  const arr = normalizeJwt(maybe);
  return arr && arr.length > 0 ? arr[0].token : undefined;
};
```

Improved thunk (recommended placement: `App/redux/features/userSlice/userSlice.ts`)

Notes on the implementation below:

- Use the `selectJwt` selector to find the current token.
- Use an `isValidating` flag in the non-persisted `userUi` slice to prevent duplicate concurrent validations.
- Keep the thunk pure: fulfill with the validated data on success and use `rejectWithValue({ status })` for failure cases.
- Call `normalizeJwt` before writing tokens into the store.

Recommended pattern (reject-with-value)

This pattern is idiomatic with Redux Toolkit: the thunk fulfills with typed validated data on success, and rejects via `rejectWithValue` carrying a typed failure payload (for example `{ status?: number }`). Callers can use `unwrap()` inside a try/catch to receive the validated data on success or handle the failure payload in the catch branch.

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth/authApi";
import {
  normalizeJwt,
  unwrapNewToken,
  isValidValidationData,
} from "../../../api/auth/utils";
import { selectUserUiIsValidating } from "../userUiSlice";
import { selectJwt } from "./userSlice"; // export selectors from the slice file
import type { RootState } from "../../store/store";

export const validateUserThunk = createAsyncThunk<
  ValidationData["data"],
  void,
  { state: RootState; rejectValue: { status?: number } }
>(
  "user/validateUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = selectJwt(state)[0]?.token;
    if (!token) return rejectWithValue({ status: 0 });

    try {
      // 1) Validate current token
      const v = await authApi.validateToken(token);
      if (v.success && isValidValidationData(v.data?.data)) return v.data!.data;

      // 2) Try refresh (recoverable path)
      const r = await authApi.refreshToken(token);
      const newTokenStr = unwrapNewToken(r);
      if (newTokenStr) {
        const v2 = await authApi.validateToken(newTokenStr);
        if (v2.success && isValidValidationData(v2.data?.data))
          return v2.data!.data;
      }

      const status = (v && (v as any).status) ?? (r && (r as any).status) ?? 0;
      return rejectWithValue({ status });
    } catch (err) {
      return rejectWithValue({ status: 0 });
    }
  },
  {
    condition: (_, { getState }) =>
      !selectUserUiIsValidating(getState() as RootState),
  },
);
```

Slice example (handle fulfilled + rejected)

```ts
builder.addCase(validateUserThunk.fulfilled, (state, action) => {
  const validated = action.payload; // typed `ValidationData['data']`
  state.user = validated.user;
  state.roles = validated.roles ?? [];
  state.jwt = normalizeJwt(validated.jwt ?? "");
});

builder.addCase(validateUserThunk.rejected, (state, action) => {
  const status = action.payload?.status; // typed rejectValue
  if (status === 401) {
    state.user = undefined;
    state.roles = [];
    state.jwt = [];
  }
});
```

Usage (components/thunks)

```ts
// Use `unwrap()` inside try/catch: on success it returns the validated data; on failure it throws
try {
  const validated = await dispatch(validateUserThunk()).unwrap();
  // success: `validated` is `ValidationData['data']`
} catch (err) {
  const status = (err as any)?.status;
  if (status === 401) {
    // forced logout — UI can navigate to login
  } else {
    // network/unexpected error — surface retry UI
  }
}
```

Slice concurrency guard (option 2 — recommended)

Use a small dedicated `userUi` slice that is not persisted to hold transient UI flags like `isValidating`.

Example `App/redux/features/userUiSlice/userUiSlice.ts` (non-persisted):

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

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

export const selectUserUiIsValidating = (state: RootState): boolean =>
  state.userUi?.isValidating ?? false;
```

Update your store configuration so `userUi` is not persisted (the app's current `persistConfig.whitelist` includes only `userData`, so `userUi` will be omitted automatically). See `App/redux/store/store.ts`.

Rationale:

- Keeps persisted `userData` clean (only long-lived auth data).
- Prevents showing a stale `isValidating` state after rehydrate.
- Minimal change: add a tiny `userUi` slice and use its selector in the thunk.
- Safe behavior: non-401 network failures do not cause an automatic logout.

Next steps (concrete)

- Implement `unwrapNewToken(result: ApiResult<any>): string | undefined` in `App/api/auth/utils.ts`.
- Create the small non-persisted `userUi` slice (`App/redux/features/userUiSlice/userUiSlice.ts`) that exposes `setIsValidating` and `selectUserUiIsValidating`.
- Register the `userUi` reducer in the root reducer (`App/redux/store/store.ts`) so it is available at `state.userUi` and is not included in the persist `whitelist`.
- Place the `validateUserThunk` thunk in `App/redux/features/userSlice/userSlice.ts` **above** the `createSlice` call so `extraReducers` can reference it. In the thunk use `selectJwt(state)` and `selectUserUiIsValidating(state)`.
- Ensure `validateUserThunk` returns `boolean` and only calls `authApi.logoutUser()` on 401 status; keep network errors non-fatal.

If you'd like, I can implement all of the above now and update the slice and utils files.

---

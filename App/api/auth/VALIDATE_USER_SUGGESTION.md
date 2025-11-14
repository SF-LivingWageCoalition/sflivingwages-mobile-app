# Validate User on App Resume / Critical Actions

This note contains a minimal suggestion for validating the currently-logged-in user when the app is re-opened (app resume) and before critical actions, reusing the existing `authApi` in this folder.

Goal

- Lightweight: reuse `authApi.validateToken`, `authApi.logoutUser`, and existing `userSlice` actions.
- Two triggers: 1) after redux-persist rehydration (PersistGate `onBeforeLift`) and 2) when the app becomes active (AppState `active`).
- Also show a small helper pattern to call before critical actions.

Contract (short)

- Input: existing persisted JWT in `user` slice (your slice stores `jwt` array).
- Output: update `user` slice with validated payload (use `setUser`) or clear state via `logoutUser()` / `clearUser()` on 401.
- Errors: network failures kept non-fatal (no automatic logout). Use UI to surface retry when needed.

Implementation notes (minimal changes)

1. validateUser thunk (place in `App/redux/features/userSlice/userSlice.ts`)

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth/authApi";
import { setUser } from "./userSlice"; // adjust path as needed
import type { RootState } from "../../store/store";

export const validateUser = createAsyncThunk<void, void, { state: RootState }>(
  "user/validateUser",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const jwtArray = state.user?.jwt;
    const token =
      Array.isArray(jwtArray) && jwtArray[0] ? jwtArray[0].token : undefined;
    if (!token) return;

    const result = await authApi.validateToken(token);
    if (result.success && result.data) {
      const validated = result.data.data; // validation endpoint places payload here
      if (validated) {
        const jwtNormalized = authApi.normalizeJwt(validated.jwt ?? token);
        const payload = {
          user: validated.user,
          roles: validated.roles,
          jwt: jwtNormalized,
        };
        dispatch(setUser(payload));
      }
    } else {
      if (result.status === 401) {
        await authApi.logoutUser();
      }
      // otherwise: network/other error -> keep existing state
    }
  }
);
```

Notes:

- Reuses `authApi.validateToken` and `authApi.logoutUser` which already handle clearing local state.
- `normalizeJwt` is exported/available in `authApi` utils — it normalizes `jwt` to the array shape your store expects.

2. Wire into `App.tsx` (very small edits)

- PersistGate: dispatch validate after rehydration using `onBeforeLift`.

```tsx
// near PersistGate import & usage
import { store, persistor } from "./App/redux/store/store";
import { validateUser } from "./App/redux/features/userSlice/userSlice";

<PersistGate
  loading={null}
  persistor={persistor}
  onBeforeLift={() => {
    const state = store.getState();
    const jwt = state.user?.jwt;
    if (jwt && jwt.length > 0) {
      store.dispatch(validateUser() as any);
    }
  }}
>
  {/* ... */}
</PersistGate>;
```

- AppState listener: dispatch validate when app becomes active (add to your `App` component)

```tsx
import React, { useEffect, useRef } from "react";
import { AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "./App/redux/features/userSlice/userSlice";
import type { RootState } from "./App/redux/store/store";

const appState = useRef(AppState.currentState);
const token = useSelector((s: RootState) => s.user?.jwt?.[0]?.token);
const dispatch = useDispatch();

useEffect(() => {
  const sub = AppState.addEventListener("change", (next) => {
    if (
      appState.current.match(/inactive|background/) &&
      next === "active" &&
      token
    ) {
      dispatch(validateUser() as any);
    }
    appState.current = next;
  });
  return () => sub.remove();
}, [token, dispatch]);
```

3. Validate before critical actions (manual call)

- In components or thunks that perform sensitive backend operations, call `await dispatch(validateUser())` first and check that the token/user remains present before proceeding.

Example:

```ts
await dispatch(validateUser() as any);
const state = store.getState();
if (!state.user?.jwt?.[0]?.token) {
  // block action / show login
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

Why this is minimal

- No new network layer or axios changes.
- Reuses `authApi`'s consistent ApiResult shape, validation, and logout side-effects.
- Only new code: one small thunk + two tiny wiring spots in `App.tsx` (PersistGate + AppState).

---

If you want, I can apply these edits directly in the repo: add the thunk to your `userSlice` and patch `App.tsx`. Reply with `apply` and I will make the changes and run a quick check for TypeScript errors.

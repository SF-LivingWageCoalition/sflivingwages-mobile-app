# Validate User on App Resume / Critical Actions

This note documents the intended behavior and the current implementation locations for the
`validateUserThunk` flow (validate -> refresh -> optional logout) and supporting helpers.

Summary / status

- unwrapNewToken: implemented in `App/api/auth/utils.ts` (use `unwrapNewToken` to extract refreshed tokens).
- validateUserThunk: implemented in `App/redux/features/userSlice/userThunks.ts` (pure thunk; uses `rejectWithValue`).
- userUi concurrency guard: implemented in `App/redux/features/userUiSlice` (selector `selectUserUiIsValidating` and reducer present).
- Store persistence: `App/redux/store/store.ts` persists only `userData` (whitelist), so `userUi` is not persisted.

Goals (unchanged)

- Reuse existing helpers: `authApi.validateToken`, `authApi.refreshToken`, `authApi.logoutUser`, and `normalizeJwt`.
- Prefer Redux selectors (`selectJwt`) and `userSlice` actions (`setUser`, `clearUser`) instead of ad-hoc state indexing.
- Keep network errors non-fatal (no automatic logout on non-401 errors).

Where to look (code locations)

- Auth API functions: `App/api/auth/authApi.ts` (contains `validateToken`, `refreshToken`, `logoutUser`).
- Auth utils: `App/api/auth/utils.ts` (contains `normalizeJwt`, `unwrapNewToken`, `unwrapOrThrow`, `isValidValidationData`).
- Thunks: `App/redux/features/userSlice/userThunks.ts` (contains `validateUserThunk`, `loginUserThunk`, `logoutUserThunk`).
- Slice: `App/redux/features/userSlice/userSlice.ts` (state, `setUser`, `clearUser`, extraReducers wired to thunks).
- UI guard slice: `App/redux/features/userUiSlice` (slice + selectors wired to `validateUserThunk` lifecycle).
- Store: `App/redux/store/store.ts` (persists only `userData`).

Implementation notes

- `validateUserThunk` (in `userThunks.ts`) follows the intended flow: validate current token, attempt refresh on recoverable failures, and return validated payload on success. It uses `rejectWithValue({ status })` for failure cases so callers can inspect status codes.
- `unwrapNewToken` is implemented in `App/api/auth/utils.ts` and normalizes a variety of refresh response shapes into a single token string when available.
- A small `userUi` slice exists and sets `isValidating` during `validateUserThunk.pending` and clears it on `fulfilled`/`rejected`. The slice exports `selectUserUiIsValidating`.
- The `userSlice` uses `extraReducers` to handle `validateUserThunk.fulfilled` and `validateUserThunk.rejected` (clearing user state on 401 rejects).

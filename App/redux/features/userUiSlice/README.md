# User UI Slice - developer reference

Maintainer: `@scottmotion` - Last updated: 2026-06-12

## Preamble

This folder contains the Redux Toolkit slice that manages user-related UI state. It currently tracks whether user validation is in flight (`isValidating`) and is intentionally separated from persisted auth/user domain data.

The slice is wired to the user validation thunk lifecycle (`validateUserThunk.pending|fulfilled|rejected`) so UI state is updated automatically during token validation and refresh checks.

---

## Table of contents

- [Files & Purpose](#files--purpose)
- [State Contract](#state-contract)
- [Actions & Reducers](#actions--reducers)
- [Thunk Lifecycle Integration](#thunk-lifecycle-integration)
- [Selector Contract](#selector-contract)
- [Store Integration](#store-integration)
- [Quick Start (1 minute)](#quick-start-1-minute)
- [Quick Debug Checklist](#quick-debug-checklist)
- [Architecture Notes](#architecture-notes)

---

## Files & Purpose

| File                                            | Purpose                                                                           |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| `App/redux/features/userUiSlice/userUiSlice.ts` | Defines UI slice state, reducer, action creators, and thunk lifecycle handling    |
| `App/redux/features/userUiSlice/selectors.ts`   | Slice selectors (thunk-safe import target)                                        |
| `App/redux/features/userSlice/userThunks.ts`    | Dispatches async auth flows and reads `selectUserUiIsValidating` for thunk gating |
| `App/redux/store/store.ts`                      | Registers `userUi` reducer in root state                                          |

---

## State Contract

`UserUiState`:

```ts
type UserUiState = { isValidating: boolean };
```

Initial state:

```ts
const initialState: UserUiState = { isValidating: false };
```

Behavioral guarantees:

- `isValidating` defaults to `false`.
- `isValidating` is set to `true` only while `validateUserThunk` is pending.
- `isValidating` is reset to `false` for both fulfilled and rejected thunk outcomes.

---

## Actions & Reducers

Defined in `userUiSlice.ts`:

- `setIsValidating(boolean)`
  - Manual override action for explicit UI state updates.
  - Reducer logic: `state.isValidating = action.payload`.

Exported members:

- `setIsValidating`
- default reducer export (`userUiSlice.reducer`)
- selector re-export: `selectUserUiIsValidating`

---

## Thunk Lifecycle Integration

`extraReducers` reacts to `validateUserThunk` lifecycle actions:

- `pending` -> `isValidating = true`
- `fulfilled` -> `isValidating = false`
- `rejected` -> `isValidating = false`

This keeps loading indicators synchronized with token validation without requiring each caller to dispatch UI actions manually.

---

## Selector Contract

`selectUserUiIsValidating(state: RootState): boolean`

Implementation behavior:

- Returns `state.userUi?.isValidating ?? false`.
- Fallback `false` protects call sites during edge cases (for example, partial state hydration or test stubs).

---

## Store Integration

The root reducer registers this slice as `userUi`:

```ts
const rootReducer = combineReducers({
  userData: userSlice,
  userUi: userUiReducer,
});
```

Persistence behavior:

- `redux-persist` whitelist currently includes only `userData`.
- `userUi` is not persisted, so `isValidating` resets on app restart (intended for transient UI state).

---

## Quick Start (1 minute)

1. Read current validation status:

```ts
const isValidating = useAppSelector(selectUserUiIsValidating);
```

2. Trigger validation flow (which auto-updates `isValidating`):

```ts
dispatch(validateUserThunk());
```

3. Optional manual override (rare):

```ts
dispatch(setIsValidating(true));
```

---

## Quick Debug Checklist

1. If UI appears stuck loading, verify `validateUserThunk` is dispatching and reaches fulfilled/rejected.
2. Confirm there are no custom reducers overriding `isValidating` after thunk completion.
3. Check that components read `selectUserUiIsValidating` (not raw `state.userUi.isValidating`) for safer fallback behavior.
4. Confirm `userUi` remains excluded from persistence if transient behavior is expected.

---

## Architecture Notes

- Keep thunk-consumed selectors in `selectors.ts` to avoid runtime import cycles.
- Re-export selectors from `userUiSlice.ts` only as a convenience/public API surface.
- This slice should remain UI-only. Do not store token/user identity data here; keep domain auth data in `userSlice`.

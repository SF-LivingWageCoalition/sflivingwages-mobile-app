import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { JwtItem } from "../../../api/auth/types";

/**
 * JwtItem (canonical) — imported from `App/api/auth/types.ts`.
 * This slice stores an array of normalized `JwtItem` values in `jwt`.
 * The canonical shape includes at minimum a `token: string` and may include
 * optional `header` and `payload` objects decoded from the JWT.
 *
 * IMPORTANT: callers MUST normalize incoming token values with
 * `normalizeJwt(...)` (exported from `App/api/auth/utils.ts`) before
 * dispatching `setUser` so the store always contains the expected
 * array-of-items runtime shape.
 */

/** Basic WordPress user info stored in Redux (subset of WP user object). */
interface User {
  ID: string;
  user_login: string;
  user_nicename: string;
  user_email: string;
  user_url: string;
  user_registered: string;
  user_activation_key: string;
  user_status: string;
  display_name: string;
}

/**
 * Defines the shape of the user-related state in the Redux store.
 * Includes user information, roles, and JWT tokens.
 *
 * Note: `jwt`, when present, is an array of normalized `JwtItem` values.
 * The app expects `jwt` to be normalized (use `normalizeJwt` before writing).
 *
 * @property user - The user information, or undefined if no user is set.
 * @property roles - The roles assigned to the user.
 * @property jwt - An array of JWT items associated with the user.
 */
interface DataState {
  // `user` is undefined when no user is set (clearer than an object of empty strings)
  user?: User | undefined;
  roles: string[];
  // `jwt` is an array of JwtItem; empty array means no token
  jwt: JwtItem[];
}

/**
 * Payload type for the `setUser` action — callers should provide a partial
 * update of the DataState. This is exported so call-sites can import the
 * payload shape when constructing payloads programmatically.
 */
export type SetUserPayload = Partial<DataState>;

/**
 * Initial state for the user slice.
 * `user` is undefined, `roles` is an empty array, and `jwt` is an empty array.
 */
const initialState: DataState = {
  user: undefined,
  roles: [],
  jwt: [],
};

/**
 * Redux slice for managing user-related state.
 * Includes actions to set and clear user information.
 */
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    /**
     * Update user-related state with a partial DataState.
     *
     * Merge strategy B: fields omitted from the payload are left unchanged.
     * Note: to clear the user/tokens, call `clearUser()` explicitly.
     */
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const p = action.payload;
      // merge: only replace when a value is provided; otherwise keep existing
      state.user = p.user ?? state.user;
      state.roles = p.roles ?? state.roles;
      state.jwt = p.jwt ?? state.jwt;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.roles = [];
      state.jwt = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: RootState) =>
  state.userData.user as User | undefined;
export const selectRoles = (state: RootState) =>
  state.userData.roles as string[];
export const selectJwt = (state: RootState) => state.userData.jwt as JwtItem[];

/**
 * Returns true when the user is considered logged in.
 *
 * Criteria:
 * - `user?.ID` is truthy
 * - `jwt` is present and `jwt.length > 0`
 * - the first item has a non-empty `token` (`jwt[0].token`)
 *
 * Note: This selector assumes `jwt` is a normalized `JwtItem[]`.
 *
 * @param state - Root Redux state
 * @returns boolean — whether the user is logged in
 */
export const selectIsLoggedIn = (state: RootState): boolean => {
  const user = selectUser(state);
  const jwt = selectJwt(state);
  return Boolean(user?.ID && jwt.length > 0 && jwt[0].token);
};

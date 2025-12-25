import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { JwtItem } from "../../../api/auth/types";

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
 *
 * Note: `jwt`, when present, is an array of normalized `JwtItem` values.
 * The app expects `jwt` to be normalized (use `normalizeJwt` before writing).
 */
interface DataState {
  user?: User | undefined;
  roles: string[];
  jwt: JwtItem[];
}

/**
 * Payload type for the `setUser` action — callers should provide a partial
 * update of the DataState.
 */
export type SetUserPayload = Partial<DataState>;

/**
 * Initial state for the user slice.
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
     * Merge strategy: fields omitted from the payload are left unchanged.
     * Note: to clear the user/tokens, call `clearUser()` explicitly.
     */
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const p = action.payload;
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
 */
export const selectIsLoggedIn = (state: RootState): boolean => {
  const user = selectUser(state);
  const jwt = selectJwt(state);
  return Boolean(user?.ID && jwt.length > 0 && jwt[0].token);
};

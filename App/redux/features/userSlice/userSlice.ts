import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

/**
 * Represents a JSON Web Token (JWT) item.
 * Includes the token string, header, and payload information.
 *
 * @property token - The JWT token string.
 * @property header - The header information of the JWT.
 * @property payload - The payload information of the JWT.
 */
interface JwtItem {
  token: string;
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    email?: string;
    exp?: number;
    iat?: number;
    id?: string;
    iss?: string;
    site?: string;
    username?: string;
  };
}

/**
 * Represents the structure of the user data stored in the Redux state.
 * Includes user information, roles, and JWT tokens.
 *
 * @property user - The user information.
 * @property roles - The roles assigned to the user.
 * @property jwt - An array of JWT items associated with the user.
 */
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
 * @property user - The user information, or undefined if no user is set.
 * @property roles - The roles assigned to the user.
 * @property jwt - An array of JWT items associated with the user.
 */
interface DataState {
  // `user` is undefined when no user is set (clearer than an object of empty strings)
  user?: User | undefined;
  roles?: string[];
  // `jwt` is an array of JwtItem; empty array means no token
  jwt?: JwtItem[];
}

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
    setUser: (state, action: PayloadAction<DataState>) => {
      state.user = action.payload.user;
      state.roles = action.payload.roles;
      state.jwt = action.payload.jwt;
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
  state.userData.roles as string[] | undefined;
export const selectJwt = (state: RootState) =>
  state.userData.jwt as JwtItem[] | undefined;

/**
 * Determine if the user is logged in based on the Redux state.
 * We require a user ID and at least one non-empty token
 *
 * @param state
 * @returns
 */
export const selectIsLoggedIn = (state: RootState): boolean => {
  const user = selectUser(state);
  const jwt = selectJwt(state);
  return Boolean(user?.ID && jwt && jwt.length > 0 && jwt[0].token);
};

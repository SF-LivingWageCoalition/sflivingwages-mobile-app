import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

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

interface DataState {
  // `user` is undefined when no user is set (clearer than an object of empty strings)
  user?: User | undefined;
  roles?: string[];
  // `jwt` is an array of JwtItem; empty array means no token
  jwt?: JwtItem[];
}

const initialState: DataState = {
  user: undefined,
  roles: [],
  jwt: [],
};

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

// Determine login status: we require a user ID and at least one non-empty token
export const selectIsLoggedIn = (state: RootState): boolean => {
  const user = selectUser(state);
  const jwt = selectJwt(state);
  return Boolean(user?.ID && jwt && jwt.length > 0 && jwt[0].token);
};

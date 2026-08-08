import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { JwtItem } from "../../../api/auth/types";
import { normalizeJwt, isValidValidationData } from "../../../api/auth/utils";
import {
  validateUserThunk,
  loginUserThunk,
  logoutUserThunk,
  deleteAccountThunk,
} from "./userThunks";
import type { ValidateUserFulfilled, ValidateUserRejectValue } from "./types";

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
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const userUpdate = action.payload;
      state.user = userUpdate.user ?? state.user;
      state.roles = userUpdate.roles ?? state.roles;
      state.jwt = userUpdate.jwt ?? state.jwt;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.roles = [];
      state.jwt = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        const validatedUserData = action.payload;
        if (!validatedUserData) return;
        if (isValidValidationData(validatedUserData)) {
          state.user = validatedUserData.user;
          state.roles = validatedUserData.roles ?? [];
          state.jwt = normalizeJwt(validatedUserData.jwt ?? "");
        }
      })
      .addCase(
        validateUserThunk.fulfilled,
        (state, action: PayloadAction<ValidateUserFulfilled>) => {
          const validatedUserData = action.payload;
          if (!validatedUserData) return;
          if (isValidValidationData(validatedUserData)) {
            state.user = validatedUserData.user;
            state.roles = validatedUserData.roles ?? [];
            state.jwt = normalizeJwt(validatedUserData.jwt ?? "");
          }
        },
      )
      .addCase(
        validateUserThunk.rejected,
        (state, action: PayloadAction<ValidateUserRejectValue | undefined>) => {
          const status = action.payload?.status;
          if (status === 401) {
            state.user = undefined;
            state.roles = [];
            state.jwt = [];
          }
        },
      )
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = undefined;
        state.roles = [];
        state.jwt = [];
      })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.user = undefined;
        state.roles = [];
        state.jwt = [];
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
export {
  selectUser,
  selectRoles,
  selectJwt,
  selectIsLoggedIn,
} from "./selectors";

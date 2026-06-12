import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { JwtItem } from "../../../api/auth/types";
import { normalizeJwt, isValidValidationData } from "../../../api/auth/utils";
import {
  validateUserThunk,
  loginUserThunk,
  logoutUserThunk,
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

// Thunks moved to `userThunks.ts` to keep the slice focused on state and
// to avoid circular imports. The slice updates state in response to the
// thunks' lifecycle actions via `extraReducers` below.

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
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        const validated = action.payload;
        if (!validated) return;
        if (isValidValidationData(validated)) {
          state.user = validated.user;
          state.roles = validated.roles ?? [];
          state.jwt = normalizeJwt(validated.jwt ?? "");
        }
      })
      .addCase(
        validateUserThunk.fulfilled,
        (state, action: PayloadAction<ValidateUserFulfilled>) => {
          const validated = action.payload;
          if (!validated) return;
          if (isValidValidationData(validated)) {
            state.user = validated.user;
            state.roles = validated.roles ?? [];
            state.jwt = normalizeJwt(validated.jwt ?? "");
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

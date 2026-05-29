import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ValidationData } from "../../../api/auth/types";
import type { ValidateUserFulfilled, ValidateUserRejectValue } from "./types";
import * as authApi from "../../../api/auth/authApi";
import { selectUserUiIsValidating } from "../userUiSlice/selectors";
import { selectJwt } from "./selectors";
import {
  unwrapNewToken,
  unwrapOrThrow,
  isValidValidationData,
} from "../../../api/auth/utils";

/**
 * Thunk: loginUserThunk
 * - Pure API client call: returns validated payload on success.
 */
export const loginUserThunk = createAsyncThunk<
  ValidationData["data"],
  { email: string; password: string },
  { state: RootState }
>("user/loginUser", async ({ email, password }) => {
  const res = await authApi.loginUser(email, password);
  const validated = unwrapOrThrow(res);
  if (!isValidValidationData(validated))
    throw new Error("Invalid validation data");
  return validated!;
});

/**
 * Thunk: validateUserThunk
 * - Validates the currently persisted JWT, attempts refresh on recoverable failures,
 *   and returns a payload describing the result so the slice can update state.
 * - Important: this thunk is pure (no direct slice imports) so the slice can
 *   consume its lifecycle actions via `extraReducers`.
 */
export const validateUserThunk = createAsyncThunk<
  ValidateUserFulfilled,
  void,
  { state: RootState; rejectValue: ValidateUserRejectValue }
>(
  "user/validateUser",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = selectJwt(state)?.[0]?.token;
    if (!token) return rejectWithValue({ status: 0 });

    try {
      const v = await authApi.validateToken(token);
      if (v.success) {
        const validated = v.data?.data;
        if (isValidValidationData(validated)) return validated!;
      }

      const r = await authApi.refreshToken(token);
      let v2Status: number | undefined;
      const newTokenStr = unwrapNewToken(r);
      if (newTokenStr) {
        const v2 = await authApi.validateToken(newTokenStr);
        v2Status = v2?.status;
        if (v2.success) {
          const validated2 = v2.data?.data;
          if (isValidValidationData(validated2)) return validated2!;
        }
      }

      const status = v2Status ?? v?.status ?? r?.status ?? 0;
      return rejectWithValue({ status });
    } catch (err) {
      return rejectWithValue({ status: 0 });
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !selectUserUiIsValidating(state);
    },
  },
);

/**
 * Thunk: logoutUserThunk
 * - Calls pure `authApi.logoutUser(token)` and lets the slice clear local state
 *   in response to the fulfilled action.
 */
export const logoutUserThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("user/logoutUser", async (_, { getState }) => {
  const state = getState() as RootState;
  const token = selectJwt(state)?.[0]?.token;
  await authApi.logoutUser(token);
});

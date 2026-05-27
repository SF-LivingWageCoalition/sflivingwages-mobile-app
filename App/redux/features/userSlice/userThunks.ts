import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ValidationData } from "../../../api/auth/types";
import * as authApi from "../../../api/auth/authApi";
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
  | { ok: true; validated: ValidationData["data"] }
  | { ok: false; status?: number },
  void,
  { state: RootState }
>(
  "user/validateUser",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = (state as any).userData?.jwt?.[0]?.token as
      | string
      | undefined;
    if (!token) return { ok: false, status: 0 };

    try {
      const v = await authApi.validateToken(token);
      if (v.success) {
        const validated = v.data?.data;
        if (isValidValidationData(validated)) {
          return { ok: true, validated: validated! };
        }
      }

      const r = await authApi.refreshToken(token);
      const newTokenStr = unwrapNewToken(r as any);
      if (newTokenStr) {
        const v2 = await authApi.validateToken(newTokenStr);
        if (v2.success) {
          const validated2 = v2.data?.data;
          if (isValidValidationData(validated2)) {
            return { ok: true, validated: validated2! };
          }
        }
      }

      const status = (v && (v as any).status) ?? (r && (r as any).status);
      return { ok: false, status: status ?? 0 };
    } catch (err) {
      return { ok: false, status: 0 };
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !(state as any).userUi?.isValidating;
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
  const token = (state as any).userData?.jwt?.[0]?.token as string | undefined;
  await authApi.logoutUser(token);
});

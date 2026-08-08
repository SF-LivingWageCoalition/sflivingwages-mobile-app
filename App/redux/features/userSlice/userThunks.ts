import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ValidationData } from "../../../api/auth/types";
import type { ValidateUserFulfilled, ValidateUserRejectValue } from "./types";
import * as authApi from "../../../api/auth/authApi";
import { selectUserUiIsValidating } from "../userUiSlice/selectors";
import { selectJwt, selectUser } from "./selectors";
import {
  unwrapNewToken,
  unwrapOrThrow,
  isValidValidationData,
} from "../../../api/auth/utils";

// Keep thunks as pure auth workflow wrappers; state changes belong in slice extraReducers.
export const loginUserThunk = createAsyncThunk<
  ValidationData["data"],
  { email: string; password: string },
  { state: RootState }
>("user/loginUser", async ({ email, password }) => {
  const loginResponse = await authApi.loginUser(email, password);
  const validatedUserData = unwrapOrThrow(loginResponse);
  if (!isValidValidationData(validatedUserData))
    throw new Error("Invalid validation data");
  return validatedUserData!;
});

export const validateUserThunk = createAsyncThunk<
  ValidateUserFulfilled,
  void,
  { state: RootState; rejectValue: ValidateUserRejectValue }
>(
  "user/validateUser",
  async (_, { getState, rejectWithValue }) => {
    const rootState = getState() as RootState;
    const token = selectJwt(rootState)?.[0]?.token;
    if (!token) return rejectWithValue({ status: 0 });

    try {
      const initialValidationResponse = await authApi.validateToken(token);
      if (initialValidationResponse.success) {
        const initialValidatedUserData = initialValidationResponse.data?.data;
        if (isValidValidationData(initialValidatedUserData))
          return initialValidatedUserData!;
      }

      const refreshResponse = await authApi.refreshToken(token);
      let postRefreshValidationStatus: number | undefined;
      const refreshedToken = unwrapNewToken(refreshResponse);
      if (refreshedToken) {
        const postRefreshValidationResponse =
          await authApi.validateToken(refreshedToken);
        postRefreshValidationStatus = postRefreshValidationResponse?.status;
        if (postRefreshValidationResponse.success) {
          const postRefreshValidatedUserData =
            postRefreshValidationResponse.data?.data;
          if (isValidValidationData(postRefreshValidatedUserData))
            return postRefreshValidatedUserData!;
        }
      }

      const status =
        postRefreshValidationStatus ??
        initialValidationResponse?.status ??
        refreshResponse?.status ??
        0;
      return rejectWithValue({ status });
    } catch (error) {
      return rejectWithValue({ status: 0 });
    }
  },
  {
    condition: (_, { getState }) => {
      const rootState = getState() as RootState;
      return !selectUserUiIsValidating(rootState);
    },
  },
);

export const logoutUserThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("user/logoutUser", async (_, { getState }) => {
  const rootState = getState() as RootState;
  const token = selectJwt(rootState)?.[0]?.token;
  await authApi.logoutUser(token);
});

export const deleteAccountThunk = createAsyncThunk<
  void,
  { password: string },
  { state: RootState }
>("user/deleteAccount", async ({ password }, { getState }) => {
  const rootState = getState() as RootState;
  const user = selectUser(rootState);
  const customerId = Number.parseInt(user?.ID ?? "", 10);
  const email = user?.user_email;

  if (!email || !Number.isFinite(customerId) || customerId <= 0) {
    throw new Error("Missing account details for deletion");
  }

  const deleteResult = await authApi.deleteCustomerAccount(
    customerId,
    email,
    password,
  );
  unwrapOrThrow(deleteResult, "Could not delete account");
});

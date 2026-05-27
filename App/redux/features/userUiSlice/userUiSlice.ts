import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { validateUserThunk } from "../userSlice/userThunks";

type UserUiState = { isValidating: boolean };

const initialState: UserUiState = { isValidating: false };

const userUiSlice = createSlice({
  name: "userUi",
  initialState,
  reducers: {
    setIsValidating: (state, action: PayloadAction<boolean>) => {
      state.isValidating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUserThunk.pending, (state) => {
        state.isValidating = true;
      })
      .addCase(validateUserThunk.fulfilled, (state) => {
        state.isValidating = false;
      })
      .addCase(validateUserThunk.rejected, (state) => {
        state.isValidating = false;
      });
  },
});

export const { setIsValidating } = userUiSlice.actions;
export default userUiSlice.reducer;

export const selectUserUiIsValidating = (state: RootState): boolean =>
  (state as any).userUi?.isValidating ?? false;

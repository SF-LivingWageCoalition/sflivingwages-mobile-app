import type { RootState } from "../../store/store";

export const selectUserUiIsValidating = (state: RootState): boolean =>
  state.userUi?.isValidating ?? false;
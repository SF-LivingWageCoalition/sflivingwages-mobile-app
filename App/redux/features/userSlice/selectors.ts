import type { RootState } from "../../store/store";

export const selectUser = (state: RootState) => state.userData.user;
export const selectRoles = (state: RootState) => state.userData.roles;
export const selectJwt = (state: RootState) => state.userData.jwt;

/**
 * Returns true when the user is considered logged in.
 */
export const selectIsLoggedIn = (state: RootState): boolean => {
  const user = selectUser(state);
  const jwt = selectJwt(state);
  return Boolean(user?.ID && jwt.length > 0 && jwt[0].token);
};

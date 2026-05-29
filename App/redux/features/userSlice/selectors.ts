import type { RootState } from "../../store/store";

export const selectUser = (state: RootState) => state.userData.user;
export const selectRoles = (state: RootState) => state.userData.roles;
export const selectJwt = (state: RootState) => state.userData.jwt;

/**
 * Returns true when the user is considered logged in.
 *
 * Criteria:
 * - `user?.ID` is truthy
 * - `jwt` is present and `jwt.length > 0`
 * - the first item has a non-empty `token` (`jwt[0].token`)
 *
 * Note: This selector assumes `jwt` is a normalized `JwtItem[]`.
 */
export const selectIsLoggedIn = (state: RootState): boolean => {
  const user = selectUser(state);
  const jwt = selectJwt(state);
  return Boolean(user?.ID && jwt.length > 0 && jwt[0].token);
};
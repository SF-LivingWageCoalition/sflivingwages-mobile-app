/*
  Auth API — brief contract

  - All helpers in this file return ApiResult<T>:
      Success: { success: true; data: T; status?: number }
      Failure: { success: false; errorMessage?: string; status?: number; data?: unknown }

  - Prefer checking `result.success`. If you want exception-style flow use
    `unwrapOrThrow(result)` which throws an exported `ApiError` (includes
    `.status` and `.data`).

  - This header is intentionally short. See `App/api/auth/README.md` for full
    examples and references (plugin/docs links).
*/

// Import Redux actions and types for user state management
import {
  clearUser,
  setUser,
  selectJwt,
} from "../../redux/features/userSlice/userSlice";
import type { SetUserPayload } from "../../redux/features/userSlice/userSlice";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { store } from "../../redux/store/store";

// Import types used in the API functions
import type {
  TokenData,
  ValidationData,
  UserRegistrationData,
  CustomerRegistrationData,
  PasswordResetData,
  ApiResult,
  LogoutResult,
} from "./types";

// Import shared auth configuration constants
import {
  BASE_URL,
  JWT_ROUTE,
  WC_ROUTE,
  JWT_DE_KEY,
  JWT_DE_ALG,
  JWT_TYP,
  JWT_AUTH_KEY,
  base64Credentials,
} from "./config";

// Import utility functions
import {
  fetchWithTimeout,
  apiFailureFromException,
  parseJsonSafe,
  isValidValidationData,
  apiFailureWithServerCode,
} from "./utils";
import { normalizeJwt } from "./utils";
import type { JwtItem } from "./types";

/**
 * API functions for authentication (fetching and validating JWT tokens)
 */

/**
 * Fetch a JWT token using email and password via the Simple JWT Login plugin.
 * Side-effects: none.
 * Returns: ApiResult<TokenData> where on success `data.jwt` is the raw JWT string.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise<ApiResult<TokenData>>
 *
 * Usage: fetchToken("<email>", "<password>");
 * See `App/api/auth/README.md` for example API responses.
 */
export const fetchToken = async (
  email: string,
  password: string
): Promise<ApiResult<TokenData>> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}${JWT_ROUTE}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        AUTH_KEY: JWT_AUTH_KEY,
      }),
    });

    const tokenData = await parseJsonSafe(response);
    if (response.ok) {
      // Token fetch succeeded
      return { success: true, data: tokenData, status: response.status };
      // Handle successful token fetch (e.g., store token, navigate to another screen)
    } else {
      // Token fetch failed
      return apiFailureWithServerCode<TokenData>(tokenData, response.status);
    }
  } catch (error: unknown) {
    // General error during token fetch process - return a failed ApiResult
    return apiFailureFromException(error);
  }
};

/**
 * Validate a JWT token via the Simple JWT Login plugin.
 * Side-effects: none. Returns ApiResult<ValidationData> where on success
 * `data` contains `user`, `roles`, and `jwt` (array of decoded JWT objects).
 *
 * Note: see https://wordpress.org/support/topic/unable-to-find-user-property-in-jwt/ for a common error.
 *
 * @param jwtToken - The JWT token to validate
 * @returns Promise<ApiResult<ValidationData>>
 *
 * Usage: validateToken("<jwt_token>");
 * See `App/api/auth/README.md` for example API responses.
 */
export const validateToken = async (
  jwtToken: string
): Promise<ApiResult<ValidationData>> => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${JWT_ROUTE}/auth/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          AUTH_KEY: JWT_AUTH_KEY,
        }),
      }
    );

    const validationData = await parseJsonSafe(response);
    if (response.ok) {
      // Token validation succeeded
      return { success: true, data: validationData, status: response.status };
    } else {
      // Token validation failed
      return apiFailureWithServerCode<ValidationData>(
        validationData,
        response.status
      );
    }
  } catch (error: unknown) {
    // General error during token validation process - return failed ApiResult
    return apiFailureFromException(error);
  }
};

/**
 * Refresh a JWT token via the Simple JWT Login plugin.
 * Side-effects: none.
 * Returns: ApiResult<TokenData> where on success `data.jwt` is the new raw JWT string.
 *
 * @param jwtToken - The JWT token to refresh
 * @returns Promise<ApiResult<TokenData>>
 *
 * Usage: refreshToken("<jwt_token>");
 * See `App/api/auth/README.md` for example API responses.
 */
export const refreshToken = async (
  jwtToken: string
): Promise<ApiResult<TokenData>> => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${JWT_ROUTE}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          AUTH_KEY: JWT_AUTH_KEY,
        }),
      }
    );

    const tokenData = await parseJsonSafe(response);
    if (response.ok) {
      // Token refresh succeeded
      return { success: true, data: tokenData, status: response.status };
    } else {
      // Token refresh failed
      return apiFailureWithServerCode<TokenData>(tokenData, response.status);
    }
  } catch (error: unknown) {
    // General error during token refresh process - return failed ApiResult
    return apiFailureFromException(error);
  }
};

/**
 * Revoke a JWT token via the Simple JWT Login plugin.
 * Side-effects: none.
 * Returns: ApiResult<TokenData> where on success the server returns the
 * refreshed/confirmed JWT in `data.jwt` (i.e. `data` is expected to
 * contain a `jwt` value rather than being null).
 *
 * Note: the Simple JWT Login revoke endpoint commonly responds with a
 * success message and a JWT in the response `data`. The client posts
 * `{ JWT, AUTH_CODE }` (AUTH_CODE optional depending on plugin settings).
 *
 * @param jwtToken - The JWT token to revoke
 * @returns Promise<ApiResult<TokenData>>
 *
 * Usage: revokeToken("<jwt_token>");
 * See `App/api/auth/README.md` for example API responses.
 */
export const revokeToken = async (
  jwtToken: string
): Promise<ApiResult<TokenData>> => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${JWT_ROUTE}/auth/revoke`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          AUTH_KEY: JWT_AUTH_KEY,
        }),
      }
    );

    const responseData = await parseJsonSafe(response);
    if (response.ok) {
      // Return the parsed server payload unchanged so callers can inspect it.
      return { success: true, data: responseData, status: response.status };
    } else {
      // Token revocation failed
      return apiFailureWithServerCode<TokenData>(responseData, response.status);
    }
  } catch (error: unknown) {
    // General error during token revocation process - return failed ApiResult
    return apiFailureFromException(error);
  }
};

/**
 * Login a WP user via the Simple JWT Login plugin.
 * Side-effect: on successful login `dispatch(setUser(validatedData))` is called to populate Redux user state.
 * If the Redux dispatch fails (e.g., due to middleware errors), the function will catch the error and return an ApiResult failure.
 * Returns: ApiResult<ValidationData['data']> where `data` is the validated payload.
 *
 * @param email - User's email address
 * @param password - User's password
 * @param dispatch - Redux dispatch function to set user data on successful login
 * @returns Promise<ApiResult<ValidationData['data']>>
 *
 * Usage: loginUser("<email>", "<password>", dispatch);
 * See `App/api/auth/README.md` for example API responses and side-effects.
 */
export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch
): Promise<ApiResult<ValidationData["data"]>> => {
  try {
    // First, fetch the JWT token
    const tokenResult = await fetchToken(email, password);
    // Use optional chaining and local variables to simplify checks
    const jwt = (
      tokenResult.success ? tokenResult.data?.data?.jwt : undefined
    ) as string | undefined;
    if (tokenResult.success && typeof jwt === "string" && jwt.length > 0) {
      // Token fetch success. Validate the received token
      try {
        const validationResult = await validateToken(jwt);
        const validatedData = validationResult.success
          ? validationResult.data?.data
          : undefined;
        if (validationResult.success && isValidValidationData(validatedData)) {
          // Token validation success. Set user data in Redux store
          // Normalize the payload to the DataState shape expected by the store.
          // Normalize the JWT(s) returned by the validation endpoint into a
          // canonical array shape so the Redux store always receives the same
          // runtime shape (array of items with `.token`, optional header/payload).
          const jwtArray = normalizeJwt(validatedData!.jwt ?? jwt);
          const payload: SetUserPayload = {
            user: validatedData!.user,
            roles: validatedData!.roles,
            jwt: jwtArray as JwtItem[],
          };
          dispatch(setUser(payload)); // Set user data in Redux store
          return { success: true, data: validatedData };
        } else {
          // Token validation failed.
          const payload = validationResult.data?.data ?? validationResult.data;
          return apiFailureWithServerCode<ValidationData["data"]>(
            payload,
            validationResult.status
          );
        }
      } catch (error: unknown) {
        // Error during token validation
        return apiFailureFromException(error);
      }
    } else {
      // Token fetch failed.
      const payload = tokenResult.data?.data ?? tokenResult.data;
      return apiFailureWithServerCode<ValidationData["data"]>(
        payload,
        tokenResult.status
      );
    }
  } catch (error: unknown) {
    // General error during login process
    return apiFailureFromException(error);
  }
};

/**
 * Register a new WooCommerce customer via the WooCommerce REST API.
 * Side-effects: none. Returns ApiResult<CustomerRegistrationData>.
 *
 * @param email
 * @param password
 * @returns Promise<ApiResult<CustomerRegistrationData>>
 *
 * Usage: registerCustomer("<email>", "<password>");
 * See `App/api/auth/README.md` for example API responses.
 */
export const registerCustomer = async (
  email: string,
  password: string
): Promise<ApiResult<CustomerRegistrationData>> => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${WC_ROUTE}/customers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64Credentials,
          "cache-control": "no-cache",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: email, // Unique username required. Use email, generate unique, or add field to form.
        }),
      }
    );

    const registrationData = await parseJsonSafe(response);
    if (response.ok) {
      // Registration was successful
      return { success: true, data: registrationData, status: response.status };
    } else {
      // Registration failed
      return apiFailureWithServerCode<CustomerRegistrationData>(
        registrationData,
        response.status
      );
    }
  } catch (error: unknown) {
    // General error during registration process - return failed ApiResult
    return apiFailureFromException<CustomerRegistrationData>(error);
  }
};

/**
 * Register a new user via the Simple JWT Login plugin.
 * Side-effects: none. Returns ApiResult<UserRegistrationData>.
 * Note: the site primarily uses WooCommerce customers; this function is provided for completeness.
 *
 * On success: returns { success: true, data: UserRegistrationData, status?: number }
 * On failure: returns { success: false, errorMessage?: string, status?: number, data?: unknown }
 * The returned data may include fields such as 'data', 'errorCode', and 'message' for error cases.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise<ApiResult<UserRegistrationData>>
 *
 * Usage: registerUser("<email>", "<password>");
 * See `App/api/auth/README.md` for example API responses and error handling.
 */
export const registerUser = async (
  email: string,
  password: string
): Promise<ApiResult<UserRegistrationData>> => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}${JWT_ROUTE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        AUTH_KEY: JWT_AUTH_KEY,
      }),
    });

    const registrationData = await parseJsonSafe(response);
    if (response.ok) {
      // Registration was successful
      return { success: true, data: registrationData, status: response.status };
    } else {
      // Registration failed
      return apiFailureWithServerCode<UserRegistrationData>(
        registrationData,
        response.status
      );
    }
  } catch (error: unknown) {
    // General error during registration process - return failed ApiResult
    return apiFailureFromException<UserRegistrationData>(error);
  }
};

/**
 * Send a password reset email to the specified email address.
 * Side-effects: none. Returns ApiResult<PasswordResetData>.
 * Note: the Simple JWT Login plugin requires building the URL using &email=... instead of ?email=...
 *
 * @param email
 * @returns Promise<ApiResult<PasswordResetData>>
 *
 * Usage: sendPasswordReset("<email>");
 * See `App/api/auth/README.md` for example API responses.
 */
export const sendPasswordReset = async (
  email: string
): Promise<ApiResult<PasswordResetData>> => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${JWT_ROUTE}/user/reset_password&email=${email}&AUTH_KEY=${JWT_AUTH_KEY}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      }
    );

    const passwordResetData = await parseJsonSafe(response);
    if (response.ok) {
      // Password reset succeeded
      return {
        success: true,
        data: passwordResetData,
        status: response.status,
      };
    } else {
      // Password reset failed
      return apiFailureWithServerCode<PasswordResetData>(
        passwordResetData,
        response.status
      );
    }
  } catch (error: unknown) {
    // General error during password reset process - return failed ApiResult
    return apiFailureFromException<PasswordResetData>(error);
  }
};

/**
 * Logout the current user.
 *
 * Behavior:
 * - Attempts a best-effort server-side revoke of the current JWT (if present).
 * - Always clears local auth state by dispatching `clearUser()` so the UI and
 *   navigation can react to the logged-out state.
 *
 * Side effects:
 * - May perform a network call to revoke the token (network or server errors
 *   are handled and do not prevent clearing local state).
 * - Dispatches the Redux action `clearUser()` in a `finally` block.
 *
 * Returns:
 * - Promise<LogoutResult> — on success `data.revoked === true` when the server
 *   revoke succeeded; otherwise `revoked === false`. On failure the result
 *   follows the ApiResult failure shape and may include `status` and `data`.
 *
 * Note: The function reads the current JWT from the Redux store (via selector).
 * If no token is present it will still clear local state and return a success
 * result indicating nothing was revoked.
 *
 * @param none
 * @returns Promise<LogoutResult>
 *
 * Usage example:
 *   const result = await logoutUser();
 *   if (result.success) {
 *     // logged out; result.data.revoked may be true/false
 *   } else {
 *     // handle failure (result.status, result.errorMessage, result.data)
 *   }
 * See `App/api/auth/README.md` for example API responses.
 */
export const logoutUser = async (): Promise<LogoutResult> => {
  try {
    // Read the token from the persisted store via selector and attempt revoke.
    const state = store.getState() as RootState;
    const currentToken = selectJwt(state)?.[0]?.token;
    if (!currentToken) {
      // Local logout succeeded but nothing to revoke on server.
      return { success: true, data: { revoked: false } };
    }

    try {
      // Attempt server revoke and normalize the success path to the LogoutResult
      const revokeResult = await revokeToken(currentToken);
      if (revokeResult.success) {
        return {
          success: true,
          data: { revoked: true, tokenData: revokeResult.data as TokenData },
          status: revokeResult.status,
        };
      }

      // Server returned a non-OK response; convert to a LogoutResult failure
      // while preserving server payload and HTTP status.
      return apiFailureWithServerCode<{ revoked: false }>(
        revokeResult.data ?? { message: "revoke failed" },
        revokeResult.status
      );
    } catch (err: unknown) {
      return apiFailureFromException<{ revoked: false }>(err);
    }
  } catch (error: unknown) {
    return apiFailureFromException<{ revoked: false }>(error);
  } finally {
    // Always clear local state even if revoke fails or wasn't provided.
    store.dispatch(clearUser()); // Clear user data from Redux store
  }
};

/*
  Auth API — brief contract

  - All helpers in this file return ApiResult<T>:
      Success: { success: true; data: T; status?: number }
      Failure: { success: false; errorMessage?: string; status?: number; data?: unknown }

  - Prefer checking `result.success`. If you want exception-style flow use
    `unwrapOrThrow(result)` which throws an exported `ApiError` (includes
    `.status` and `.data`).

  - This header is intentionally short. See `App/api/auth/README.md` for full
    examples, telemetry guidance, and references (plugin/docs links).
*/

// Import Redux actions and types for user state management
import {
  clearUser,
  setUser,
  selectJwt,
} from "../../redux/features/userSlice/userSlice";
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
    console.log(
      `authApi: fetchToken() called with email '${email}' and password: '${password}'`
    );
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
      console.log(
        "authApi: Token fetch succeeded with status:",
        response.status
      );
      console.log("authApi: Token fetch response data:", tokenData);
      return { success: true, data: tokenData, status: response.status };
      // Handle successful token fetch (e.g., store token, navigate to another screen)
    } else {
      // Token fetch failed
      console.error(
        "authApi: Token fetch failed with status:",
        response.status
      );
      console.log("authApi: Response data from failed token fetch:", tokenData);
      if (tokenData && tokenData.data) {
        // Log error details
        console.error("authApi: Error code:", tokenData.data.errorCode);
        console.error("authApi: Error message:", tokenData.data.message);
      }
      return apiFailureWithServerCode<TokenData>(tokenData, response.status);
    }
  } catch (error: any) {
    // General error during token fetch process - return a failed ApiResult
    console.error("authApi: Error fetching token:", error);
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
    console.log("authApi: validateToken() called");
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
      console.log(
        "authApi: Token validation succeeded with status:",
        response.status
      );
      console.log("authApi: Token validation response data:", validationData);
      return { success: true, data: validationData, status: response.status };
    } else {
      // Token validation failed
      console.log(
        "authApi: Token validation failed with status:",
        response.status
      );
      console.log("authApi: Token validation response data:", validationData);
      return apiFailureWithServerCode<ValidationData>(
        validationData,
        response.status
      );
    }
  } catch (error: any) {
    // General error during token validation process - return failed ApiResult
    console.error("authApi: Error validating token:", error);
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
    console.log("authApi: refreshToken() called");
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
      console.log(
        "authApi: Token refresh succeeded with status:",
        response.status
      );
      console.log("authApi: Token refresh response data:", tokenData);
      return { success: true, data: tokenData, status: response.status };
    } else {
      // Token refresh failed
      console.log(
        "authApi: Token refresh failed with status:",
        response.status
      );
      console.log("authApi: Token refresh response data:", tokenData);
      return apiFailureWithServerCode<TokenData>(tokenData, response.status);
    }
  } catch (error: any) {
    // General error during token refresh process - return failed ApiResult
    console.error("authApi: Error refreshing token:", error);
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
    console.log("authApi: revokeToken() called");
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
      // Token revocation succeeded
      console.log(
        "authApi: Token revocation succeeded with status:",
        response.status
      );
      console.log("authApi: Token revocation response data:", responseData);
      return { success: true, data: responseData, status: response.status };
    } else {
      // Token revocation failed
      console.log(
        "authApi: Token revocation failed with status:",
        response.status
      );
      console.log("authApi: Token revocation response data:", responseData);
      return apiFailureWithServerCode<TokenData>(responseData, response.status);
    }
  } catch (error: any) {
    // General error during token revocation process - return failed ApiResult
    console.error("authApi: Error revoking token:", error);
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
    console.log("authApi: loginUser() called");
    // First, fetch the JWT token
    const tokenResult = await fetchToken(email, password);
    // Use optional chaining and local variables to simplify checks
    const jwt = (
      tokenResult.success ? tokenResult.data?.data?.jwt : undefined
    ) as string | undefined;
    if (tokenResult.success && typeof jwt === "string" && jwt.length > 0) {
      // Token fetch success. Validate the received token
      try {
        console.log("authApi: validateToken() called within loginUser()");
        const validationResult = await validateToken(jwt);
        const validatedData = validationResult.success
          ? validationResult.data?.data
          : undefined;
        if (validationResult.success && isValidValidationData(validatedData)) {
          // Token validation success. Set user data in Redux store
          console.log("authApi: Login successful");
          // Normalize the payload to the DataState shape expected by the store.
          const jwtArray = Array.isArray(validatedData!.jwt)
            ? (validatedData!.jwt as any[])
            : validatedData!.jwt
            ? [validatedData!.jwt as any]
            : [];
          const payload = {
            user: validatedData!.user,
            roles: validatedData!.roles,
            jwt: jwtArray,
          } as any;
          dispatch(setUser(payload)); // Set user data in Redux store
          return { success: true, data: validatedData };
        } else {
          // Token validation failed.
          console.log("authApi: Login failed during validation");
          console.log("authApi: Validation result:", validationResult);
          const payload = validationResult.data?.data ?? validationResult.data;
          return apiFailureWithServerCode<ValidationData["data"]>(
            payload,
            validationResult.status
          );
        }
      } catch (error: any) {
        // Error during token validation
        console.error("authApi: Error in validateToken():", error);
        return apiFailureFromException(error);
      }
    } else {
      // Token fetch failed.
      console.log("authApi: Login failed during token fetch");
      console.log("authApi: Token result:", tokenResult);
      const payload = tokenResult.data?.data ?? tokenResult.data;
      return apiFailureWithServerCode<ValidationData["data"]>(
        payload,
        tokenResult.status
      );
    }
  } catch (error: any) {
    // General error during login process
    console.error("authApi: Error in loginUser():", error);
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
  console.log(
    `authApi: registerCustomer() called with email '${email}' and password: '${password}'`
  );
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
          first_name: "Test",
          last_name: "Testerson",
          username: email, // Unique username required. Use email, generate unique, or add field to form.
          // billing: {
          //   first_name: "Test",
          //   last_name: "Testerson",
          //   address_1: "123 Main St",
          //   city: "Anytown",
          //   state: "CA",
          //   postcode: "12345",
          //   country: "US",
          //   email: email,
          //   phone: "555-555-5555",
          // },
          // shipping: {
          //   first_name: "Test",
          //   last_name: "Testerson",
          //   address_1: "123 Main St",
          //   city: "Anytown",
          //   state: "CA",
          //   postcode: "12345",
          //   country: "US",
          // },
        }),
      }
    );

    const registrationData = await parseJsonSafe(response);
    if (response.ok) {
      // Registration was successful
      console.log(
        "authApi: Customer registration succeeded with status:",
        response.status
      );
      console.log(
        "authApi: Customer registration response data:",
        registrationData
      );
      return { success: true, data: registrationData, status: response.status };
    } else {
      // Registration failed
      console.log(
        "authApi: Customer registration failed with status:",
        response.status
      );
      console.log(
        "authApi: Customer registration response data:",
        registrationData
      );
      if (registrationData && registrationData.data) {
        // Log error details
        console.error("authApi: Error status:", registrationData.data.status);
        console.error("authApi: Error code:", registrationData.code);
        console.error("authApi: Error message:", registrationData.message);
      }
      return apiFailureWithServerCode<CustomerRegistrationData>(
        registrationData,
        response.status
      );
    }
  } catch (error: any) {
    // General error during registration process - return failed ApiResult
    console.error("authApi: Error during customer registration:", error);
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
    console.log(
      `authApi: registerUser() called with email '${email}' and password: '${password}'`
    );
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
      console.log(
        "authApi: Registration succeeded with status:",
        response.status
      );
      console.log("authApi: Registration response data:", registrationData);
      return { success: true, data: registrationData, status: response.status };
    } else {
      // Registration failed
      console.error(
        "authApi: Registration failed with status:",
        response.status
      );
      console.log("authApi: Registration response data:", registrationData);
      if (registrationData && registrationData.data) {
        // Log error details
        console.error("authApi: Error code:", registrationData.data.errorCode);
        console.error("authApi: Error message:", registrationData.data.message);
      }
      return apiFailureWithServerCode<UserRegistrationData>(
        registrationData,
        response.status
      );
    }
  } catch (error: any) {
    // General error during registration process - return failed ApiResult
    console.error("authApi: Error during registration:", error);
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
    console.log(`authApi: sendPasswordReset() called with email: '${email}'`);
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
      console.log(
        "authApi: Forgot password succeeded with status:",
        response.status
      );
      console.log("authApi: Forgot password response data:", passwordResetData);
      return {
        success: true,
        data: passwordResetData,
        status: response.status,
      };
    } else {
      // Password reset failed
      console.log(
        "authApi: Forgot password failed with status:",
        response.status
      );
      console.log("authApi: Forgot password response data:", passwordResetData);
      return apiFailureWithServerCode<PasswordResetData>(
        passwordResetData,
        response.status
      );
    }
  } catch (error: any) {
    // General error during password reset process - return failed ApiResult
    console.error("authApi: Error sending password reset email:", error);
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
    console.log("authApi: logoutUser() called");
    // Read the token from the persisted store via selector and attempt revoke.
    const state = store.getState() as RootState;
    const currentToken = selectJwt(state)?.[0]?.token;
    if (!currentToken) {
      console.log("authApi: No token present to revoke");
      // Local logout succeeded but nothing to revoke on server.
      return { success: true, data: { revoked: false } };
    }

    try {
      // Attempt server revoke and normalize the success path to the LogoutResult
      const revokeResult = await revokeToken(currentToken);
      console.log("authApi: revokeToken result:", revokeResult);
      if (revokeResult.success) {
        return {
          success: true,
          data: { revoked: true, tokenData: revokeResult.data },
          status: revokeResult.status,
        };
      }

      // Server returned a non-OK response; convert to a LogoutResult failure
      // while preserving server payload and HTTP status.
      return apiFailureWithServerCode<{ revoked: false }>(
        revokeResult.data ?? { message: "revoke failed" },
        revokeResult.status
      );
    } catch (err: any) {
      console.warn(
        "authApi: revokeToken failed (continuing to clear local state):",
        err
      );
      return apiFailureFromException<{ revoked: false }>(err);
    }
  } catch (error: any) {
    console.error("authApi: Error in logoutUser():", error);
    return apiFailureFromException<{ revoked: false }>(error);
  } finally {
    // Always clear local state even if revoke fails or wasn't provided.
    store.dispatch(clearUser()); // Clear user data from Redux store
    console.log("authApi: User logged out");
  }
};

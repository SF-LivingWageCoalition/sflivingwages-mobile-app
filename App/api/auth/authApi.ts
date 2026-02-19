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
import { makeBaseFromEmail, generateCandidate } from "./usernameUtils";
import type { JwtItem } from "./types";

/**
 * API helper functions for authentication.
 * Each function interacts with the WordPress backend using the Simple JWT Login plugin and WooCommerce REST API where applicable.
 */

/**
 * Fetch a JWT token using email and password via the Simple JWT Login plugin.
 */
export const fetchToken = async (
  email: string,
  password: string,
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

    const tokenData = await parseJsonSafe<TokenData>(response);
    if (response.ok) {
      // Token fetch succeeded
      return {
        success: true,
        data: tokenData as TokenData,
        status: response.status,
      };
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
 */
export const validateToken = async (
  jwtToken: string,
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
      },
    );

    const validationData = await parseJsonSafe<ValidationData>(response);
    if (response.ok) {
      // Token validation succeeded
      return {
        success: true,
        data: validationData as ValidationData,
        status: response.status,
      };
    } else {
      // Token validation failed
      return apiFailureWithServerCode<ValidationData>(
        validationData,
        response.status,
      );
    }
  } catch (error: unknown) {
    // General error during token validation process - return failed ApiResult
    return apiFailureFromException(error);
  }
};

/**
 * Refresh a JWT token via the Simple JWT Login plugin.
 */
export const refreshToken = async (
  jwtToken: string,
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
      },
    );

    const tokenData = await parseJsonSafe<TokenData>(response);
    if (response.ok) {
      // Token refresh succeeded
      return {
        success: true,
        data: tokenData as TokenData,
        status: response.status,
      };
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
 */
export const revokeToken = async (
  jwtToken: string,
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
      },
    );

    const responseData = await parseJsonSafe<TokenData>(response);
    if (response.ok) {
      // Return the parsed server payload unchanged so callers can inspect it.
      return {
        success: true,
        data: responseData as TokenData,
        status: response.status,
      };
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
 */
export const loginUser = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
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
            validationResult.status,
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
        tokenResult.status,
      );
    }
  } catch (error: unknown) {
    // General error during login process
    return apiFailureFromException(error);
  }
};

/**
 * Register a new WooCommerce customer via the WooCommerce REST API.
 */
export const registerCustomer = async (
  email: string,
  password: string,
): Promise<ApiResult<CustomerRegistrationData>> => {
  // username generation utilities moved to ./utils

  const attemptRegister = async (
    usernameCandidate: string,
  ): Promise<{
    success: boolean;
    result?: ApiResult<CustomerRegistrationData>;
    serverCode?: unknown;
  }> => {
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
            username: usernameCandidate,
          }),
        },
      );

      const registrationData =
        await parseJsonSafe<CustomerRegistrationData>(response);
      if (response.ok) {
        return {
          success: true,
          result: {
            success: true,
            data: registrationData as CustomerRegistrationData,
            status: response.status,
          },
        };
      }

      // extract server error code if present
      const serverCode =
        (registrationData && (registrationData as any).code) ??
        ((registrationData as any)?.data &&
          (registrationData as any).data.code) ??
        (registrationData as any)?.status;

      return {
        success: false,
        result: apiFailureWithServerCode<CustomerRegistrationData>(
          registrationData,
          response.status,
        ),
        serverCode,
      };
    } catch (err: unknown) {
      return {
        success: false,
        result: apiFailureFromException<CustomerRegistrationData>(err),
      };
    }
  };

  try {
    // First attempt: try using a concise username derived from email local-part
    const base = makeBaseFromEmail(email);
    const maxAttempts = 12;

    for (let i = 0; i < maxAttempts; i++) {
      const candidate = generateCandidate(base, i, email);
      const attempt = await attemptRegister(candidate);
      if (attempt.success && attempt.result) {
        return attempt.result;
      }

      // If server explicitly says "user already exists" (SimpleJWT code 38), continue trying
      const sc = attempt.serverCode;
      if (
        sc === 38 ||
        sc === "38" ||
        (attempt.result &&
          (attempt.result as any).data &&
          (attempt.result as any).data.code === 38)
      ) {
        // try next candidate
        continue;
      }

      // Other failures: return the server's failure immediately
      return attempt.result as ApiResult<CustomerRegistrationData>;
    }

    // Exhausted attempts — return a final failure indicating username generation exhausted
    return apiFailureWithServerCode<CustomerRegistrationData>(
      { message: "Could not generate unique username" } as any,
      409,
    );
  } catch (error: unknown) {
    return apiFailureFromException<CustomerRegistrationData>(error);
  }
};

/**
 * Send a password reset email to the specified email address.
 */
export const sendPasswordReset = async (
  email: string,
): Promise<ApiResult<PasswordResetData>> => {
  try {
    const response = await fetchWithTimeout(
      `${BASE_URL}${JWT_ROUTE}/user/reset_password&email=${email}&AUTH_KEY=${JWT_AUTH_KEY}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      },
    );

    const passwordResetData = await parseJsonSafe<PasswordResetData>(response);
    if (response.ok) {
      // Password reset succeeded
      return {
        success: true,
        data: passwordResetData as PasswordResetData,
        status: response.status,
      };
    } else {
      // Password reset failed
      return apiFailureWithServerCode<PasswordResetData>(
        passwordResetData,
        response.status,
      );
    }
  } catch (error: unknown) {
    // General error during password reset process - return failed ApiResult
    return apiFailureFromException<PasswordResetData>(error);
  }
};

/**
 * Logout the current user.
 */
export const logoutUser = async (): Promise<LogoutResult> => {
  // Read the token(s) from the persisted store via selector.
  const state = store.getState() as RootState;
  const jwtItems = selectJwt(state);
  const currentToken = jwtItems?.[0]?.token;

  // If there's no token to revoke on the server, clear local state and return early.
  if (!currentToken) {
    try {
      return { success: true, data: { revoked: false } };
    } finally {
      store.dispatch(clearUser());
    }
  }

  // Attempt a best-effort revoke on the server.
  // Errors are handled by the single catch below and we always clear local state in `finally`.
  try {
    const revokeResult = await revokeToken(currentToken);
    if (revokeResult.success) {
      return {
        success: true,
        data: { revoked: true, tokenData: revokeResult.data as TokenData },
        status: revokeResult.status,
      };
    }

    return apiFailureWithServerCode<{ revoked: false }>(
      revokeResult.data ?? { message: "revoke failed" },
      revokeResult.status,
    );
  } catch (err: unknown) {
    return apiFailureFromException<{ revoked: false }>(err);
  } finally {
    store.dispatch(clearUser());
  }
};

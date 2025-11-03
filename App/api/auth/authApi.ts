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

import { clearUser, setUser } from "../../redux/features/userSlice/userSlice";
import type { AppDispatch } from "../../redux/store/store";
import type {
  TokenData,
  ValidationData,
  UserRegistrationData,
  CustomerRegistrationData,
  PasswordResetData,
  ApiResult,
  ParseJsonSafeResult,
} from "./types";

/**
 * Configuration Constants
 * These constants are used for API requests and authentication.
 */

// Base URLs for the API
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL; // Base URL for WordPress APIs

// API Routes
const JWT_ROUTE = process.env.EXPO_PUBLIC_JWT_ROUTE; // Route for Simple JWT Login plugin API
const WC_ROUTE = process.env.EXPO_PUBLIC_WC_ROUTE; // Route for WooCommerce REST API

// JWT configuration
const JWT_DE_KEY = process.env.EXPO_PUBLIC_JWT_DE_KEY; // Key used for JWT decryption
const JWT_DE_ALG = process.env.EXPO_PUBLIC_JWT_DE_ALG; // Algorithm used for JWT decryption
const JWT_TYP = process.env.EXPO_PUBLIC_JWT_TYP; // Type of token

// Auth key for Simple JWT Login plugin
const JWT_AUTH_KEY = process.env.EXPO_PUBLIC_JWT_AUTH_KEY; // Auth key for Simple JWT Login plugin

// WooCommerce REST API credentials
const consumerKey = process.env.EXPO_PUBLIC_CONSUMER_KEY; // WooCommerce Consumer Key (read/write)
const consumerSecret = process.env.EXPO_PUBLIC_CONSUMER_SECRET; // WooCommerce Consumer Secret (read/write)
const base64Credentials =
  typeof Buffer !== "undefined"
    ? Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")
    : btoa(`${consumerKey}:${consumerSecret}`); // Base64 encoded credentials

// Fetch timeout (ms) - configurable via env var, fallback to 10s
const FETCH_TIMEOUT_MS =
  Number(process.env.EXPO_PUBLIC_FETCH_TIMEOUT_MS) || 10000;

/**
 * Custom Error Classes
 * These classes represent specific error types for API requests.
 */

/**
 * Rich ApiError that preserves HTTP status and raw data when available.
 * Thrown by `unwrapOrThrow` to let callers inspect error.status or error.data.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * A typed error used to signal a request timeout in `fetchWithTimeout`.
 * We throw this from the network layer so callers can map timeouts to a
 * concrete status code (e.g. 408) when building ApiResult failures.
 */
class TimeoutError extends Error {
  constructor(message = "Request timed out") {
    super(message);
    this.name = "TimeoutError";
  }
}

/**
 * API Helper Functions
 * These functions perform API requests related to authentication.
 */

/**
 * Helper that wraps fetch with an AbortController to enforce a timeout.
 * Returns the same Response as fetch or throws when aborted/errored.
 * Throws a TimeoutError if the request times out.
 *
 * @param input - Request info (URL or Request object)
 * @param init - Optional fetch init options
 * @param timeoutMs - Timeout in milliseconds (default: FETCH_TIMEOUT_MS)
 * @returns A promise that resolves to the fetch Response
 * @throws TimeoutError when the request times out
 * Usage:
 *   fetchWithTimeout("<url>", { method: "GET" }, 5000);
 */
const fetchWithTimeout = async (
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs: number = FETCH_TIMEOUT_MS
): Promise<Response> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, {
      ...(init || {}),
      signal,
    } as RequestInit);
    return response;
  } catch (err: any) {
    // If the controller aborted the request, surface a clear timeout error
    if (err && (err.name === "AbortError" || err.code === "ERR_ABORTED")) {
      throw new TimeoutError();
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
};

/**
 * Utility: unwrap an ApiResult or throw an Error.
 * Use this when callers prefer exception control flow instead of checking .success.
 *
 * @param result - The ApiResult to unwrap
 * @param fallbackMessage - Optional fallback error message if none in result
 * @returns The data from the ApiResult if successful
 * @throws ApiError if the result is a failure
 * Usage:
 *  const data = unwrapOrThrow(await someApiFunction());
 */
export const unwrapOrThrow = <T>(
  result: ApiResult<T>,
  fallbackMessage?: string
): T => {
  if (result.success) return result.data;
  const msg = result.errorMessage ?? fallbackMessage ?? "API request failed";
  throw new ApiError(msg, (result as any).status, (result as any).data);
};

/**
 * Helper to create a consistent failure ApiResult.
 *
 * @param errorMessage - The error message to include in the result
 * @param status - The HTTP status code (optional)
 * @param data - Additional data to include in the result (optional)
 * @returns An ApiResult representing the failure
 */
const apiFailure = <T = any>(
  errorMessage?: string,
  status?: number,
  data?: T
): ApiResult<T> => ({ success: false, errorMessage, status, data });

/**
 * Maps runtime exceptions to ApiResult failures, converting timeouts to status 408.
 * Use this to consistently handle errors from API calls and return a standardized failure result.
 *
 * @param err - The error to map
 * @returns An ApiResult representing the failure
 */
const apiFailureFromException = <T = any>(err: unknown): ApiResult<T> => {
  const message = (err as any)?.message ?? String(err ?? "");
  if (err instanceof TimeoutError || message === "Request timed out") {
    return apiFailure<T>(message, 408, undefined);
  }
  return apiFailure<T>(message, undefined, undefined);
};

/**
 * Safe JSON parser that handles invalid JSON gracefully.
 * If parsing fails, returns an object with `{ __parseError: true, text }` where:
 *   - `__parseError`: boolean, always true for parse errors
 *   - `text`: string | null, the raw response text if available, otherwise null
 *
 * @param response - The fetch Response to parse
 * @returns A promise that resolves to the parsed JSON (type T) or a parse error object
 *          { __parseError: true, text: string | null }
 */
const parseJsonSafe = async <T = any>(
  response: Response
): Promise<ParseJsonSafeResult<T>> => {
  try {
    return (await response.json()) as T;
  } catch (jsonErr) {
    try {
      const text = await response.text();
      return { __parseError: true, text };
    } catch (textErr) {
      return { __parseError: true, text: null };
    }
  }
};

/**
 * Runtime validator that checks a deserialized `ValidationData['data']`
 * has the minimal expected fields (user.ID and a jwt array).
 *
 * Expected structure of ValidationData['data']:
 * {
 *   user: { ID: number, ... },
 *   roles: string[] | unknown,
 *   jwt: Array<any> // must be a non-empty array
 * }
 */
const isValidValidationData = (d: unknown): d is ValidationData["data"] => {
  if (!d || typeof d !== "object") return false;
  const x = d as any;
  if (!x.user || !x.user.ID) return false;
  if (!x.jwt || !Array.isArray(x.jwt) || x.jwt.length === 0) return false;
  return true;
};

/**
 * API functions for authentication (fetching and validating JWT tokens)
 */

/**
 * Fetch a JWT token using email and password via the Simple JWT Login plugin.
 * Side-effects: none.
 * Returns: ApiResult<TokenData> where on success `data.data.jwt` is the raw JWT string.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise<ApiResult<TokenData>>
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
      const message = tokenData?.data?.message ?? "Failed to fetch token";
      return apiFailure<TokenData>(message, response.status, tokenData as any);
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
 * `data.data` contains `user`, `roles`, and `jwt` (array of decoded JWT objects).
 *
 * Note: see https://wordpress.org/support/topic/unable-to-find-user-property-in-jwt/ for a common error.
 *
 * @param jwtToken - The JWT token to validate
 * @returns Promise<ApiResult<ValidationData>>
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
      const message =
        validationData?.data?.message ?? "Token validation failed";
      return apiFailure<ValidationData>(
        message,
        response.status,
        validationData as any
      );
    }
  } catch (error: any) {
    // General error during token validation process - return failed ApiResult
    console.error("authApi: Error validating token:", error);
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
          const message = !validationResult.success
            ? validationResult.errorMessage ??
              validationResult.data?.data?.message ??
              "Token validation failed."
            : "Token validation failed.";
          return apiFailure<ValidationData["data"]>(
            message,
            validationResult.status,
            validationResult.data?.data as any
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
      const message = !tokenResult.success
        ? tokenResult.errorMessage ??
          tokenResult.data?.data?.message ??
          "Invalid credentials or unable to fetch token."
        : tokenResult.data?.data?.message ??
          "Invalid credentials or unable to fetch token.";
      return apiFailure<ValidationData["data"]>(
        message,
        tokenResult.status,
        tokenResult.data?.data as any
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
      const message =
        registrationData?.message ??
        registrationData?.data?.status ??
        "Customer registration failed";
      return apiFailure<CustomerRegistrationData>(
        message,
        response.status,
        registrationData as any
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
      const message = registrationData?.data?.message ?? "Registration failed";
      return apiFailure<UserRegistrationData>(
        message,
        response.status,
        registrationData as any
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
      const message =
        passwordResetData?.data?.message ?? "Password reset failed";
      return apiFailure<PasswordResetData>(
        message,
        response.status,
        passwordResetData as any
      );
    }
  } catch (error: any) {
    // General error during password reset process - return failed ApiResult
    console.error("authApi: Error sending password reset email:", error);
    return apiFailureFromException<PasswordResetData>(error);
  }
};

/**
 * Synchronously logs out the current user by clearing authentication data from the Redux store.
 *
 * Side effects: This will clear user state, which may trigger downstream effects in the app (e.g., navigation, UI updates).
 *
 * @param dispatch - Redux dispatch function to clear user data.
 * @returns {void}
 *
 * Usage:
 *    logoutUser(dispatch);
 */
export const logoutUser = (dispatch: AppDispatch): void => {
  dispatch(clearUser()); // Clear user data from Redux store
  console.log("authApi: User logged out");
};

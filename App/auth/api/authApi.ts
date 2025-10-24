/*
  Auth API — brief contract

  - All helpers in this file return ApiResult<T>:
      Success: { success: true; data: T; status?: number }
      Failure: { success: false; errorMessage?: string; status?: number; data?: unknown }

  - Prefer checking `result.success`. If you want exception-style flow use
    `unwrapOrThrow(result)` which throws an exported `ApiError` (includes
    `.status` and `.data`).

  - This header is intentionally short. See `App/auth/README.md` for full
    examples, telemetry guidance, and references (plugin/docs links).
*/

import { clearUser, setUser } from "../../redux/features/userSlice/userSlice";
import type { AppDispatch } from "../../redux/store/store";

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
 * Type Definitions
 * These types define the structure of data returned by the API.
 */

// Define the structure of the token data returned by the API
export type TokenData = {
  data?: {
    jwt?: string;
    // error information if any
    errorCode?: number;
    message?: string;
  };
  success: boolean;
  // error?: string;
};

// Define the structure of the validation data returned by the API
export type ValidationData = {
  data?: {
    user?: {
      ID: string; // User ID
      display_name: string; // User display name
      user_activation_key: string; // User activation key
      user_email: string; // User email
      user_login: string; // User login name
      user_nicename: string; // User nice name
      user_registered: string; // User registration date
      user_status: string; // User status
      user_url: string; // User URL
    };
    roles?: string[]; // User roles
    jwt?: [
      {
        token: string; // JWT token
        header: {
          alg: string; // Algorithm used
          typ: string; // Type of token
        };
        payload: {
          email?: string; // User email
          exp?: number; // Expiration timestamp
          iat?: number; // Issued at timestamp
          id?: string; // User ID
          iss?: string; // Issuer
          site?: string; // Site URL
          username?: string; // User name
        };
      }
    ];
    // error information if any
    errorCode?: number;
    message?: string;
  };
  success: boolean;
  // error?: string;
};

// Define the structure of the newly registered user data returned by the API
export type UserRegistrationData = {
  success: boolean; // Success status
  id?: string; // User ID
  message?: string; // Message from the API
  user?: {
    ID: string; // User ID
    user_login: string; // User login name
    user_nicename: string; // User nice name
    user_email: string; // User email
    user_url: string; // User URL
    user_registered: string; // User registration date
    user_activation_key: string; // User activation key
    user_status: string; // User status
    display_name: string; // User display name
    user_level: number; // User level
  };
  roles?: string[]; // User roles
  jwt?: string; // JWT token
  // error information if any
  data?: {
    errorCode: number; // Error code if any
    message: string; // Error message if any
  };
};

// Define the structure of the newly created WooCommerce customer data returned by the API
export type CustomerRegistrationData = {
  // Customer information
  id?: number; // Customer ID
  date_created?: string; // Date the customer was created
  date_created_gmt?: string; // Date the customer was created (GMT)
  date_modified?: string; // Date the customer was modified
  date_modified_gmt?: string; // Date the customer was modified (GMT)
  email?: string; // Customer email
  first_name?: string; // Customer first name
  last_name?: string; // Customer last name
  role?: string; // Customer role
  username?: string; // Customer username
  billing?: object; // Billing information
  shipping?: object; // Shipping information
  is_paying_customer?: boolean; // Whether the customer is a paying customer
  avatar_url?: string; // Avatar URL
  meta_data?: object[]; // Meta data
  _links?: object; // Links
  // Error information if any
  code?: string; // Error code if any
  message?: string; // Error message if any
  data?: {
    status: number; // HTTP status code if any
    details?: object; // Additional error details if any
  };
};

// Define the structure of the password reset data returned by the API
export type PasswordResetData = {
  success: boolean; // Success status
  message?: string; // Message from the API
  data?: {
    errorCode: number; // Error code if any
    message: string; // Error message if any
  };
};

// Generic API result wrapper used by other helpers to provide consistent shape
export type ApiResult<T> =
  | { success: true; data: T; status?: number }
  | { success: false; errorMessage?: string; status?: number; data?: any };

/**
 * API Helper Functions
 * These functions perform API requests related to authentication.
 */

/**
 * Helper that wraps fetch with an AbortController to enforce a timeout.
 * Returns the same Response as fetch or throws when aborted/errored.
 * @param input - Request info (URL or Request object)
 * @param init - Optional fetch init options
 * @param timeoutMs - Timeout in milliseconds (default: FETCH_TIMEOUT_MS)
 * @returns A promise that resolves to the fetch Response
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
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
};

// Improved timeout behavior: surface a clearer error when aborted by the
// controller (timeout). Callers catch this and convert to ApiResult failures.

/**
 * Utility: unwrap an ApiResult or throw an Error.
 * Use this when callers prefer exception control flow instead of checking .success.
 * @param result - The ApiResult to unwrap
 * Usage:
 *  const data = unwrapOrThrow(await someApiFunction());
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

export const unwrapOrThrow = <T>(
  result: ApiResult<T>,
  fallbackMessage?: string
): T => {
  if (result.success) return result.data;
  const msg = result.errorMessage ?? fallbackMessage ?? "API request failed";
  throw new ApiError(msg, (result as any).status, (result as any).data);
};

/**
 * Result type for `parseJsonSafe`:
 * - When the response body is valid JSON the function returns the parsed value (T).
 * - When parsing fails it returns an object with `__parseError: true` and the raw text (or null).
 */
export type ParseJsonSafeResult<T = any> =
  | T
  | { __parseError: true; text: string | null };

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
 * See `App/auth/README.md` for example API responses.
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
      console.error(
        "authApi: Token fetch failed with status:",
        response.status
      );
      console.log("authApi: Response data from failed token fetch:", tokenData);
      const message = tokenData?.data?.message ?? "Failed to fetch token";
      return {
        success: false,
        errorMessage: message,
        status: response.status,
        data: tokenData,
      };
    }
  } catch (error: any) {
    // General error during token fetch process - return a failed ApiResult
    console.error("authApi: Error fetching token:", error);
    return { success: false, errorMessage: error?.message || String(error) };
  }
};

/**
 * Validate a JWT token via the Simple JWT Login plugin.
 * Side-effects: none. Returns ApiResult<ValidationData> where on success
 * `data.data` contains `user`, `roles`, and `jwt` (array of decoded JWT objects).
 *
 * Note: see https://wordpress.org/support/topic/unable-to-find-user-property-in-jwt/ for a common error.
 * @param jwtToken - The JWT token to validate
 * @returns Promise<ApiResult<ValidationData>>
 * Usage: validateToken("<jwt_token>");
 * See `App/auth/README.md` for example API responses.
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
      return {
        success: false,
        errorMessage: message,
        status: response.status,
        data: validationData,
      };
    }
  } catch (error: any) {
    // General error during token validation process - return failed ApiResult
    console.error("authApi: Error validating token:", error);
    return { success: false, errorMessage: error?.message || String(error) };
  }
};

/**
 * Login a WP user via the Simple JWT Login plugin.
 * Side-effect: on successful login `dispatch(setUser(validatedData))` is called to populate Redux user state.
 * Returns: ApiResult<ValidationData['data']> where `data` is the validated payload.
 *
 * @param email - User's email address
 * @param password - User's password
 * @param dispatch - Redux dispatch function to set user data on successful login
 * @returns Promise<ApiResult<ValidationData['data']>>
 * Usage: loginUser("<email>", "<password>", dispatch);
 * See `App/auth/README.md` for example API responses and side-effects.
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
          return { success: false, errorMessage: message };
        }
      } catch (error: any) {
        // Error during token validation
        console.error("authApi: Error in validateToken():", error);
        return {
          success: false,
          errorMessage: error?.message || String(error),
        };
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
      return { success: false, errorMessage: message };
    }
  } catch (error: any) {
    // General error during login process
    console.error("authApi: Error in loginUser():", error);
    return { success: false, errorMessage: error?.message || String(error) };
  }
};

/**
 * Register a new user via the Simple JWT Login plugin.
 * Side-effects: none. Returns ApiResult<UserRegistrationData>.
 * Note: the site primarily uses WooCommerce customers; this function is provided for completeness.
 *
 * @param email
 * @param password
 * @returns Promise<ApiResult<UserRegistrationData>>
 * Usage: registerUser("<email>", "<password>");
 * See `App/auth/README.md` for example API responses.
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
      return {
        success: false,
        errorMessage: message,
        status: response.status,
        data: registrationData,
      };
    }
  } catch (error: any) {
    // General error during registration process - return failed ApiResult
    console.error("authApi: Error during registration:", error);
    return { success: false, errorMessage: error?.message || String(error) };
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
 * See `App/auth/README.md` for example API responses.
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
          username: email,
          billing: {
            first_name: "Test",
            last_name: "Testerson",
            address_1: "123 Main St",
            city: "Anytown",
            state: "CA",
            postcode: "12345",
            country: "US",
            email: email,
            phone: "555-555-5555",
          },
          shipping: {
            first_name: "Test",
            last_name: "Testerson",
            address_1: "123 Main St",
            city: "Anytown",
            state: "CA",
            postcode: "12345",
            country: "US",
          },
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
      return {
        success: false,
        errorMessage: message,
        status: response.status,
        data: registrationData,
      };
    }
  } catch (error: any) {
    // General error during registration process - return failed ApiResult
    console.error("authApi: Error during customer registration:", error);
    return { success: false, errorMessage: error?.message || String(error) };
  }
};

/**
 * Send a password reset email to the specified email address.
 * Side-effects: none. Returns ApiResult<PasswordResetData>.
 *
 * @param email
 * @returns Promise<ApiResult<PasswordResetData>>
 * Usage: sendPasswordReset("<email>");
 * See `App/auth/README.md` for example API responses.
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
      return {
        success: false,
        errorMessage: message,
        status: response.status,
        data: passwordResetData,
      };
    }
  } catch (error: any) {
    // General error during password reset process - return failed ApiResult
    console.error("authApi: Error sending password reset email:", error);
    return { success: false, errorMessage: error?.message || String(error) };
  }
};

/**
 * Logs out the current user by clearing authentication data from the Redux store.
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

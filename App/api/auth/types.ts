/*
  Shared types for the Auth API.

  This file contains only type declarations moved from `authApi.ts` so other
  modules can import them without pulling in network helpers or runtime code.
*/

// Define the structure of the token data returned by the API
export type TokenData = {
  data?: {
    jwt?: string;
    errorCode?: number;
    message?: string;
  };
  success: boolean;
};

// Define the structure of the validation data returned by the API
export type ValidationData = {
  data?: {
    user?: {
      ID: string;
      display_name: string;
      user_activation_key: string;
      user_email: string;
      user_login: string;
      user_nicename: string;
      user_registered: string;
      user_status: string;
      user_url: string;
    };
    roles?: string[];
    jwt?: [
      {
        token: string;
        header: {
          alg: string;
          typ: string;
        };
        payload: {
          email?: string;
          exp?: number;
          iat?: number;
          id?: string;
          iss?: string;
          site?: string;
          username?: string;
        };
      }
    ];
    errorCode?: number;
    message?: string;
  };
  success: boolean;
};

// Define the structure of the newly created WooCommerce customer data returned by the API
export type CustomerRegistrationData = {
  id?: number;
  date_created?: string;
  date_created_gmt?: string;
  date_modified?: string;
  date_modified_gmt?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  username?: string;
  billing?: object;
  shipping?: object;
  is_paying_customer?: boolean;
  avatar_url?: string;
  meta_data?: object[];
  _links?: object;
  code?: string;
  message?: string;
  data?: {
    status: number;
    details?: object;
  };
};

// Define the structure of the password reset data returned by the API
export type PasswordResetData = {
  success: boolean;
  message?: string;
  data?: {
    errorCode: number;
    message: string;
  };
};

// Logout result keeps the same ApiResult<T> wrapper used across this API
// surface, but guarantees that on success `data` is defined and indicates
// whether a server-side revoke was performed.
export type LogoutResult = ApiResult<{
  revoked: boolean;
  tokenData?: TokenData;
}>;

// Export a reusable JwtItem type that describes the normalized runtime shape
// used by the auth layer. Prefer importing and using this type when
// normalizing values with `normalizeJwt` so the normalized arrays are
// strongly typed across modules.
export type JwtItem = {
  token: string;
  header?: { alg?: string; typ?: string } | Record<string, unknown>;
  payload?: Record<string, unknown>;
};

// Generic API result wrapper used by other helpers to provide consistent shape
export type ApiResult<T> =
  | { success: true; data: T; status?: number }
  | {
      success: false;
      errorMessage?: string;
      status?: number;
      data?: T | Record<string, unknown>;
    };

// Result type for `parseJsonSafe` (kept here so other modules can reuse the shape)
export type ParseJsonSafeResult<T = unknown> =
  | T
  | { __parseError: true; text: string | null };

// Define the structure of the error data returned by the API
export interface ApiErrorData {
  errorCode?: number | string;
  code?: string;
  message?: string;
  error?: string;
}

// Define the structure of the error payload returned by the API
export interface ApiErrorPayload {
  errorCode?: number | string;
  code?: string;
  message?: string;
  error?: string;
  data?: ApiErrorData;
}

// Define the structure of the friendly error info returned by getFriendlyErrorInfo
export interface ErrorInfo {
  message: string;
  errorCode?: number;
  errorKey?: string;
}

/*
  Shared types for the Auth API.

  This file contains only type declarations moved from `authApi.ts` so other
  modules can import them without pulling in network helpers or runtime code.
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

// Logout result keeps the same ApiResult<T> wrapper used across this API
// surface, but guarantees that on success `data` is defined and indicates
// whether a server-side revoke was performed.
export type LogoutResult = ApiResult<{
  // true if a revoke request was attempted and the server returned success
  revoked: boolean;
  // optional token payload returned by the revoke endpoint on success
  tokenData?: TokenData;
}>;

// Generic API result wrapper used by other helpers to provide consistent shape
export type ApiResult<T> =
  | { success: true; data: T; status?: number }
  | { success: false; errorMessage?: string; status?: number; data?: any };

// Result type for `parseJsonSafe` (kept here so other modules can reuse the shape)
export type ParseJsonSafeResult<T = any> =
  | T
  | { __parseError: true; text: string | null };

// App/auth/api/authApi.ts

// import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice/userSlice";

/**
 * Testing Site: https://www.wpmockup.xyz
 * Live Site: https://www.livingwage-sf.org
 *
 * Simple JWT Login plugin: https://wordpress.org/plugins/simple-jwt-login/
 * Simple JWT Login site: https://simplejwtlogin.com/
 *
 * WooCommerce plugin: https://wordpress.org/plugins/woocommerce/
 * WooCommerce site: https://woocommerce.com/
 * WooCommerce REST API: https://developer.woocommerce.com/docs/apis/rest-api/
 * WooCommerce REST API Docs: https://woocommerce.github.io/woocommerce-rest-api-docs/
 *
 */

/**
 * Configuration Constants
 * These constants are used for API requests and authentication.
 */

// Base URLs for the API
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL; // Base URL for WordPress APIs

// API Routes
const JWT_ROUTE = process.env.EXPO_PUBLIC_JWT_ROUTE; // Route for Simple JWT Login plugin
const WC_ROUTE = process.env.EXPO_PUBLIC_WC_ROUTE; // Route for WooCommerce REST API

// JWT Decrytion Key / Algorithm / Token Type
const JWT_DE_KEY = process.env.EXPO_PUBLIC_JWT_DE_KEY; // Key used for JWT decryption
const JWT_DE_ALG = process.env.EXPO_PUBLIC_JWT_DE_ALG; // Algorithm used for JWT decryption
const JWT_TYP = process.env.EXPO_PUBLIC_JWT_TYP; // Type of token

const JWT_AUTH_KEY = process.env.EXPO_PUBLIC_JWT_AUTH_KEY; // Auth key for Simple JWT Login plugin

// WooCommerce REST API credentials
const consumerKey = process.env.EXPO_PUBLIC_CONSUMER_KEY; // WooCommerce Consumer Key (read/write)
const consumerSecret = process.env.EXPO_PUBLIC_CONSUMER_SECRET; // WooCommerce Consumer Secret (read/write)
const base64Credentials = btoa(`${consumerKey}:${consumerSecret}`); // Base64 encoded credentials

/**
 * Type Definitions
 * These types define the structure of data returned by the API.
 */

// Define the structure of the token data returned by the API
type TokenData = {
  data?: {
    jwt: string;
  };
  success: boolean;
  error?: string;
};

// Define the structure of the validation data returned by the API
type ValidationData = {
  data?: {
    user: {
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
    roles: string[]; // User roles
    jwt: [
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
  };
  success: boolean;
  error?: string;
};

// Define the structure of the user data returned by the API
type UserRegistrationData = {
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
  data?: {
    errorCode?: number; // Error code if any
    message?: string; // Error message if any
  };
};

// Define the structure of the password reset data returned by the API
type PasswordResetData = {
  message?: string; // Message from the API
  success: boolean; // Success status
  data?: {
    errorCode?: number; // Error code if any
    message?: string; // Error message if any
  };
};

/**
 * API functions for authentication (fetching and validating JWT tokens)
 */

/**
 * Fetch a JWT token using email and password via the Simple JWT Login plugin.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns A promise that resolves to the token data or undefined
 *
 * Example responses:
 * Successful token fetch response data:
 * {
 *  "data":
 *    {
 *      "jwt": "eyJ0e...",
 *    },
 *  "success": true
 * }
 *
 * Failed token fetch response data (using wrong password):
 * {
 *  "data":
 *   {
 *    "errorCode": 48,
 *    "message": "Wrong user credentials"
 *  },
 * "success": false
 * }
 *
 */
export const fetchToken = async (
  email: string,
  password: string
): Promise<TokenData | undefined> => {
  try {
    console.log(
      `authApi: fetchToken() called with email '${email}' and password: '${password}'`
    );
    const response = await fetch(
      `${BASE_URL}${JWT_ROUTE}/auth&email=${email}&password=${password}&AUTH_KEY=${JWT_AUTH_KEY}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(
        "authApi: Token fetch succeeded with status:",
        response.status
      );
      console.log("authApi: Token fetch response data:", data);
      // Handle successful token fetch (e.g., store token, navigate to another screen)
    } else {
      console.log("authApi: Token fetch failed with status:", response.status);
      console.log("authApi: Response data from failed token fetch:", data);
      console.error("authApi: Error code:", data.data.errorCode);
      console.error("authApi: Error message:", data.data.message);
    }
    return data;
  } catch (error) {
    console.error("authApi: Error fetching token:", error);
  }
};

/**
 * Validate a JWT token via the Simple JWT Login plugin.
 *
 * Note this error resolution (even when autologin is disabled):
 * https://wordpress.org/support/topic/unable-to-find-user-property-in-jwt/
 *
 * @param jwtToken - The JWT token to validate
 * @returns A promise that resolves to the validation data or undefined
 *
 * Example response on successful validation:
 * {
 *  "data":
 *    {
 *      "jwt": [[Object]],
 *      "roles": ["customer"],
 *      "user":
 *        {
 *          "ID": "31",
 *          "display_name": "tosspot@scottmotion.com",
 *          "user_activation_key": "",
 *          "user_email": "tosspot@scottmotion.com",
 *          "user_login": "tosspot@scottmotion.com",
 *          "user_nicename": "tosspotscottmotion-com",
 *          "user_registered": "2025-10-06 01:46:52",
 *          "user_status": "0",
 *          "user_url": ""
 *        }
 *    },
 *  "success": true
 * }
 *
 * Example response on failed validation:
 * {
 *  "data":
 *   {
 *    "errorCode": 14,
 *    "message": "Expired token"
 *  },
 *  "success": false
 * }
 */
export const validateToken = async (
  jwtToken: string
): Promise<ValidationData | undefined> => {
  try {
    console.log("authApi: validateToken() called");
    const response = await fetch(`${BASE_URL}${JWT_ROUTE}/auth/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        //   alg: "HS256",
        //   typ: "JWT",
        "cache-control": "no-cache",
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(
        "authApi: Token validation succeeded with status:",
        response.status
      );
      console.log("authApi: Token validation response data:", data);
      // Handle successful token validation (e.g., navigate to another screen)
    } else {
      console.log(
        "authApi: Token validation failed with status:",
        response.status
      );
      console.error("authApi: Error code:", data.data.errorCode);
      console.error("authApi: Error message:", data.data.message);
    }
    return data;
  } catch (error) {
    console.error("authApi: Error validating token:", error);
  }
};

/**
 * Register a new user with the given email and password via the Simple JWT Login plugin.
 *
 * @param email
 * @param password
 *
 * Example response when registration is successful:
 * {
 *  "success": true,
 *  "id": "31",
 *  "message": "User was successfully created.",
 *  "user": {
 *    "ID": 1,
 *    "user_login": "myuser",
 *    "user_nicename": "My User",
 *    "user_email": "myuser@simplejwtlogin.com",
 *    "user_url": "https://simplejwtlogin.com",
 *    "user_registered": "2021-01-01 23:31:50",
 *    "user_activation_key": "test",
 *    "user_status": "0",
 *    "display_name": "myuser",
 *    "user_level": 10
 *  }
 * "roles": ["subscriber"],
 * "jwt": "eyJhbGci..."
 * }
 *
 * Example response when registration fails (using existing email):
 * {
 *  "success": false,
 *  "data": {
 *    "errorCode": 38,
 *    "message": "User already exists."
 *  }
 * }
 */
export const registerUser = async (
  email: string,
  password: string
): Promise<UserRegistrationData | undefined> => {
  try {
    console.log(
      `authApi: registerUser() called with email '${email}' and password: '${password}'`
    );
    const response = await fetch(
      `${BASE_URL}${JWT_ROUTE}/users&email=${email}&password=${password}&AUTH_KEY=${JWT_AUTH_KEY}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(
        "authApi: Registration succeeded with status:",
        response.status
      );
      console.log("authApi: Registration response data:", data);
      // Handle successful registration (e.g., navigate to login, show success message)
    } else {
      console.error(
        "authApi: Registration failed with status:",
        response.status
      );
      console.log("authApi: Registration response data:", data);
      console.error("authApi: Error code:", data.data.errorCode);
      console.error("authApi: Error message:", data.data.message);
      // Handle registration failure (e.g., show error message)
    }
    return data;
  } catch (error) {
    console.error("authApi: Error during registration:", error);
    // Handle network or other errors
  }
};

/**
 * Send a password reset email to the specified email address.
 *
 * @param email
 * @returns
 *
 * Example response on successful password reset request:
 * {
 *  "message": "Reset password email has been sent.",
 *  "success": true
 * }
 *
 * Example response on failed password reset request (using wrong password):
 * {
 *  "data":
 *  {
 *      "errorCode": 64,
 *      "message": "Wrong user."
 *   },
 *  "success": false
 * }
 */
export const sendPasswordReset = async (
  email: string
): Promise<PasswordResetData | undefined> => {
  try {
    console.log(`authApi: sendPasswordReset() called with email: '${email}'`);
    const response = await fetch(
      `${BASE_URL}${JWT_ROUTE}/user/reset_password&email=${email}&AUTH_KEY=${JWT_AUTH_KEY}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(
        "authApi: Forgot password succeeded with status:",
        response.status
      );
      console.log("authApi: Forgot password response data:", data);
      // Handle successful password reset (e.g., show a confirmation message)
    } else {
      console.log(
        "authApi: Forgot password failed with status:",
        response.status
      );
      console.log("authApi: Forgot password response data:", data);
      console.error("authApi: Error code:", data.data.errorCode);
      console.error("authApi: Error message:", data.data.message);
      // Handle failed password reset (e.g., show an error message)
    }
    return data;
  } catch (error) {
    console.error("authApi: Error sending password reset email:", error);
  }
};

// Logout function to clear authentication data
export const logout = (dispatch: Function): void => {
  // Clear any stored authentication data (e.g., tokens, user info)
  dispatch(clearUser()); // Clear user data from Redux store
  // Additional cleanup actions can be performed here
  console.log("authApi: User logged out");
};

// App/auth/api/authApi.ts

// import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice/userSlice";

// const dispatch = useDispatch();

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

/**
 * API functions for authentication (fetching and validating JWT tokens)
 */

// Fetch JWT Token (Authenticate)
export const fetchToken = async (
  email: string,
  password: string
): Promise<TokenData | undefined> => {
  try {
    console.log("fetchToken called from authAPI");
    const response = await fetch(
      `${BASE_URL}${JWT_ROUTE}/auth&email=${email}&password=${password}&AUTH_KEY=${JWT_AUTH_KEY}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      }
    );
    console.log("Response received from authAPI");
    // console.log("Response status:", response.status);
    if (response.ok) {
      const data = await response.json();
      console.log("Token fetch succeeded with status:", response.status);
      console.log("Token fetch response data:", data);
      /**
       * Token fetch response data:
       * {
       *  "data":
       *    {
       *      "jwt": "eyJ0e...",
       *    },
       *  "success": true
       * }
       */
      // Handle successful token fetch (e.g., store token, navigate to another screen)
      return data; // Return token data
    } else {
      const data = await response.json();
      console.log("Response data from failed token fetch:", data);
      /**
       * Token fetch response data (using wrong password):
       * {
       *  "data":
       *   {
       *    "errorCode": 48,
       *    "message": "Wrong user credentials"
       *  },
       * "success": false
       * }
       */
      console.log("Token fetch failed with status:", response.status);
      console.error("Error code:", data.data.errorCode);
      console.error("Error message:", data.data.message);
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

// Validate JWT Token (Validate)
// Note this error resolution (even when autologin is disabled): https://wordpress.org/support/topic/unable-to-find-user-property-in-jwt/
export const validateToken = async (
  jwtToken: string
): Promise<ValidationData | undefined> => {
  try {
    console.log("validateToken called from authAPI");
    const response = await fetch(`${BASE_URL}${JWT_ROUTE}/auth/validate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        //   alg: "HS256",
        //   typ: "JWT",
        "cache-control": "no-cache",
      },
    });
    console.log("Response received from authAPI");
    // console.log("Response status:", response.status);
    if (response.ok) {
      const data = await response.json();
      console.log("Token validation succeeded with status:", response.status);
      console.log("Token is valid");
      console.log("Token validation response data:", data);
      /**
       * Token validation response data:
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
       */
      // Handle successful token validation (e.g., navigate to another screen)
      return data; // Return validation data
    } else {
      const data = await response.json();
      console.log("Token validation failed with status:", response.status);
      console.error("Error code:", data.data.errorCode);
      console.error("Error message:", data.data.message);
    }
  } catch (error) {
    console.error("Error validating token:", error);
  }
};

// Logout function to clear authentication data
export const logout = (dispatch: Function): void => {
  // Clear any stored authentication data (e.g., tokens, user info)
  dispatch(clearUser()); // Clear user data from Redux store
  // Additional cleanup actions can be performed here
  console.log("User logged out");
};

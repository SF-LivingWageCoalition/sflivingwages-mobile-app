// App/auth/api/authApi.ts

/**
 * Testing Site: https://www.wpmockup.xyz
 * login: admin
 * password: wordpress80!
 *
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

// Base URLs for the API
const BASE_URL = "https://www.livingwage-sf.org"; // Base URL for the API
const BASE_URL_TEST = "https://www.wpmockup.xyz"; // Test:WPMockup.xyz - Base URL for the API

// API Routes
const JWT_ROUTE = "/?rest_route=/simple-jwt-login/v1"; // Route for Simple JWT Login plugin
const WC_ROUTE = "/wp-json/wc/v3"; // Route for WooCommerce REST API

// JWT Decrytion Key / Algorithm / Token Type
const JWT_DE_KEY = "SomeDecryptionKey!"; // Key used for JWT decryption
const JWT_DE_ALG = "HS256"; // Algorithm used for JWT decryption
const JWT_TYP = "JWT"; // Type of token

// WooCommerce REST API credentials
const consumerKey = "ck_6d1c6dbe7375c9c6bbd4ec4ae76435657b02ea0f"; // SFLWC WooCommerce Consumer Key (read/write)
const consumerSecret = "cs_f3e3af1864b234c83e62e375bdb61f5d8b2c3834"; // SFLWC WooCommerce Consumer Secret (read/write)
const base64Credentials = btoa(`${consumerKey}:${consumerSecret}`); // SFLWC - Base64 encoded credentials

// WooCommerce REST API credentials for Test:WPMockup.xyz
const consumerKeyTest = "ck_3bab6ef08070db9a9644d0fbe68d9d092d892980"; // Test:WPMockup.xyz - WooCommerce Consumer Key (read/write)
const consumerSecretTest = "cs_9c65d16a588d4892f62f2b858e02eb6cc9839b74"; // Test:WPMockup.xyz - WooCommerce Consumer Secret (read/write)
const base64CredentialsTest = btoa(`${consumerKeyTest}:${consumerSecretTest}`); // Test:WPMockup.xyz - Base64 encoded credentials

// Define the structure of the token data returned by the API
type TokenData = {
  data?: {
    jwt?: string;
  };
  success?: boolean;
};

// Define the structure of the validation data returned by the API
type ValidationData = {
  data?: {
    user_id?: number; // User ID
    email?: string; // User email
    display_name?: string; // User display name
    roles?: string[]; // User roles
    capabilities?: { [key: string]: boolean }; // User capabilities
    exp?: number; // Expiration time (timestamp)
    iat?: number; // Issued at time (timestamp)
  };
  success?: boolean;
};

// API functions for authentication (fetching and validating JWT tokens)

// Fetch JWT Token (Authenticate)
export const fetchToken = async (
  email: string,
  password: string
): Promise<TokenData | undefined> => {
  try {
    const response = await fetch(
      `${BASE_URL_TEST}${JWT_ROUTE}/auth&email=${email}&password=${password}`,
      {
        method: "POST",
        headers: { "cache-control": "no-cache" },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Token fetch response data:", data);
      // Handle successful token fetch (e.g., store token, navigate to another screen)
      // setAuthenticationData(data); // TODO: Remove later?
      // setToken(data.data.jwt);
      // const token = data.data.jwt;
      return data; // Return token data
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

// Validate JWT Token (Validate)
export const validateToken = async (
  jwtToken: string
): Promise<ValidationData | undefined> => {
  try {
    const response = await fetch(
      `${BASE_URL_TEST}${JWT_ROUTE}/auth/validate&JWT=${jwtToken}`,
      {
        method: "POST",
        // headers: {
        //   // Authorization: `Bearer ${data.data.jwt}`,
        //   alg: "HS256",
        //   typ: "JWT",
        //   "cache-control": "no-cache",
        // },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Token validation response data:", data);
      // Handle successful token validation (e.g., navigate to another screen)
      //   setTokenIsValid(true);
      //   setValidationData(data); // TODO: Remove later? Set token/user data in Redux store?
      //   setIsLoggedIn(true); // TODO: Move to login function
      return data; // Return validation data
    }
  } catch (error) {
    console.error("Error validating token:", error);
  }
};

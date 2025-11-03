/**
 * Auth Configuration Constants
 * These constants are used for API requests and authentication.
 * - Exports environment-backed constants used by the auth API layer
 * - Keep types permissive (string | undefined) so consumers can handle missing env
 */

// Base URLs for the API
export const BASE_URL: string | undefined = process.env.EXPO_PUBLIC_BASE_URL; // Base URL for WordPress APIs

// API Routes
export const JWT_ROUTE: string | undefined = process.env.EXPO_PUBLIC_JWT_ROUTE; // Route for Simple JWT Login plugin API
export const WC_ROUTE: string | undefined = process.env.EXPO_PUBLIC_WC_ROUTE; // Route for WooCommerce REST API

// JWT configuration
export const JWT_DE_KEY: string | undefined =
  process.env.EXPO_PUBLIC_JWT_DE_KEY; // Key used for JWT decryption
export const JWT_DE_ALG: string | undefined =
  process.env.EXPO_PUBLIC_JWT_DE_ALG; // Algorithm used for JWT decryption
export const JWT_TYP: string | undefined = process.env.EXPO_PUBLIC_JWT_TYP; // Type of token

// Auth key for Simple JWT Login plugin
export const JWT_AUTH_KEY: string | undefined =
  process.env.EXPO_PUBLIC_JWT_AUTH_KEY; // Auth key for Simple JWT Login plugin

// WooCommerce REST API credentials
export const consumerKey: string | undefined =
  process.env.EXPO_PUBLIC_CONSUMER_KEY; // WooCommerce Consumer Key (read/write)
export const consumerSecret: string | undefined =
  process.env.EXPO_PUBLIC_CONSUMER_SECRET; // WooCommerce Consumer Secret (read/write)

// Base64 encoded credentials for Basic auth (if keys are available). Try Buffer first, then btoa.
export const base64Credentials: string | undefined = (() => {
  if (
    typeof consumerKey === "undefined" ||
    typeof consumerSecret === "undefined"
  )
    return undefined;
  try {
    // Node / some bundlers provide Buffer
    if (typeof Buffer !== "undefined") {
      return Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    }
  } catch (e) {
    // ignore and fall back to btoa below
  }
  // Fallback to btoa if available (browser-like envs)
  if (typeof (global as any).btoa !== "undefined") {
    return (global as any).btoa(`${consumerKey}:${consumerSecret}`);
  }
  if (typeof (globalThis as any).btoa !== "undefined") {
    return (globalThis as any).btoa(`${consumerKey}:${consumerSecret}`);
  }
  return undefined;
})();

// Fetch timeout (ms) - configurable via env var, fallback to 10s
export const FETCH_TIMEOUT_MS: number =
  Number(process.env.EXPO_PUBLIC_FETCH_TIMEOUT_MS) || 10000;

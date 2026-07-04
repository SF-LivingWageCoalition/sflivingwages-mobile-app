/**
 * This file contains configuration constants for the Violations API.
 * These constants are used for API requests related to workplace violations.
 * - Exports environment-backed constants used by the violations API layer
 * - Keep types permissive (string | undefined) so consumers can handle missing env
 */
// Base URLs for the API
export const BASE_URL: string | undefined = process.env.EXPO_PUBLIC_BASE_URL; // Base URL for WordPress APIs

// API Routes
export const VIOLATIONS_ROUTE: string | undefined =
  process.env.EXPO_PUBLIC_VIOLATIONS_ROUTE; // Route for Violations Custom Post Type API

// Auth key for Simple JWT Login plugin
export const JWT_AUTH_KEY: string | undefined =
  process.env.EXPO_PUBLIC_JWT_AUTH_KEY; // Auth key for Simple JWT Login plugin

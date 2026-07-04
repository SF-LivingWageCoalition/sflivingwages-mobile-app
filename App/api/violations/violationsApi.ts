import { BASE_URL, VIOLATIONS_ROUTE, JWT_AUTH_KEY } from "./config";
import type { ApiResult } from "../auth/types";
import { apiFailureFromException, fetchWithTimeout } from "../auth/utils";

export type ViolationPayload = {
  businessName: string;
  businessAddress: string;
  fullName: string;
  userEmail: string;
  userPhone: string;
  violations: string[];
};

export type ViolationResponse = {
  id: number;
};

/**
 * Submit a workplace violation report to the backend API.
 *
 * TODO: Replace the endpoint path once the real endpoint URL is confirmed.
 * The endpoint is constructed from BASE_URL with a placeholder path.
 * The JWT is sent as a Bearer token in the Authorization header.
 */
export const submitViolation = async (
  payload: ViolationPayload,
  jwt: string,
): Promise<ApiResult<ViolationResponse>> => {
  try {
    const endpoint = `${BASE_URL}${VIOLATIONS_ROUTE}`;
    const response = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = (await response.json()) as ViolationResponse;
      return { success: true, data, status: response.status };
    }

    return {
      success: false,
      errorMessage: `Server returned ${response.status}`,
      status: response.status,
    };
  } catch (error: unknown) {
    return apiFailureFromException(error);
  }
};

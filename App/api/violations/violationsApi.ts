import { BASE_URL, VIOLATIONS_ROUTE } from "../config";

import type { ApiResult } from "../auth/types";
import { apiFailureFromException, fetchWithTimeout } from "../auth/utils";

export type ViolationPayload = {
  title: string;
  status: "draft" | "pending" | "publish";
  acf: {
    business_name: string;
    business_address: string;
    full_name: string;
    user_email: string;
    user_phone: string;
    description: string;
    violation_type: string[];
    latitude: number;
    longitude: number;
    timestamp: number;
  };
};

export type ViolationResponse = {
  id: number;
};

/**
 * Submit a workplace violation report to the backend Violations API.
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

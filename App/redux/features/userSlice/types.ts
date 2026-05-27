import type { ValidationData } from "../../../api/auth/types";

// Payload type when validateUserThunk fulfills
export type ValidateUserFulfilled = ValidationData["data"];

// Payload type when validateUserThunk rejects via `rejectWithValue`
export type ValidateUserRejectValue = { status?: number };

/**
 * Shared types for the Auth API.
 */

export type TokenData = {
  data?: {
    jwt?: string;
    errorCode?: number;
    message?: string;
  };
  success: boolean;
};

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

export type PasswordResetData = {
  success: boolean;
  message?: string;
  data?: {
    errorCode: number;
    message: string;
  };
};

export type LogoutResult = ApiResult<{
  revoked: boolean;
  tokenData?: TokenData;
}>;

export type JwtItem = {
  token: string;
  header?: { alg?: string; typ?: string } | Record<string, unknown>;
  payload?: Record<string, unknown>;
};

export type ApiResult<T> =
  | { success: true; data: T; status?: number }
  | {
      success: false;
      errorMessage?: string;
      status?: number;
      data?: T | Record<string, unknown>;
    };

export type ParseJsonSafeResult<T = unknown> =
  | T
  | { __parseError: true; text: string | null };

export interface ApiErrorData {
  errorCode?: number | string;
  code?: string;
  message?: string;
  error?: string;
}

export interface ApiErrorPayload {
  errorCode?: number | string;
  code?: string;
  message?: string;
  error?: string;
  data?: ApiErrorData;
}

export interface ErrorInfo {
  message: string;
  errorCode?: number;
  errorKey?: string;
}

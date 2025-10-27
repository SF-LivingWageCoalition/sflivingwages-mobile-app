import { z } from "zod";
import { translate } from "../translation";

// NOTE: See `App/validation/README.md` for guidance on schema factories and
// the `mapZodErrorToFormErrors` mapper. The factories here intentionally build
// schemas at runtime so `translate()` is evaluated when the schema is used.
//
// Factory functions that build zod schemas at runtime so localized messages
// are fetched when the schema is used (rather than at module init time).
export function createLoginSchema() {
  return z.object({
    userEmail: z
      .string()
      .nonempty(translate("validation.emailRequired") || "Email is required")
      .email(translate("validation.emailInvalid") || "Invalid email address"),
    userPassword: z
      .string()
      .nonempty(
        translate("validation.passwordRequired") || "Password is required"
      )
      .min(
        8,
        translate("validation.passwordTooShort") ||
          "Password must be at least 8 characters"
      ),
  });
}

export const createRegisterSchema = createLoginSchema;

export function createForgotPasswordSchema() {
  return z.object({
    userEmail: z
      .string()
      .nonempty(translate("validation.emailRequired") || "Email is required")
      .email(translate("validation.emailInvalid") || "Invalid email address"),
  });
}

// Export inferred types based on the factory return types.
export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterInput = z.infer<ReturnType<typeof createRegisterSchema>>;
export type ForgotPasswordInput = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

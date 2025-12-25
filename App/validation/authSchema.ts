import { z } from "zod";
import { translate } from "../translation";
import { passwordSchema, type StrongPassword } from "./passwordSchema";

// NOTE: See `App/validation/README.md` for guidance on schema factories and
// the `mapZodErrorToFormErrors` mapper. The factories here intentionally build
// schemas at runtime so `translate()` is evaluated when the schema is used.
//
// Factory functions that build zod schemas at runtime so localized messages
// are fetched when the schema is used (rather than at module init time).
export function loginSchema() {
  return z.object({
    userEmail: z
      .string()
      .nonempty(translate("validation.emailRequired") || "Email is required")
      .email(translate("validation.emailInvalid") || "Invalid email address"),
    userPassword: z
      .string()
      .nonempty(
        translate("validation.passwordRequired") || "Password is required"
      ),
  });
}

export function registerSchema() {
  return z.object({
    userEmail: z
      .string()
      .nonempty(translate("validation.emailRequired") || "Email is required")
      .email(translate("validation.emailInvalid") || "Invalid email address"),
    userPassword: passwordSchema() as z.ZodType<StrongPassword>,
  });
}

export function forgotPasswordSchema() {
  return z.object({
    userEmail: z
      .string()
      .nonempty(translate("validation.emailRequired") || "Email is required")
      .email(translate("validation.emailInvalid") || "Invalid email address"),
  });
}

// Export inferred types based on the factory return types.
export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;

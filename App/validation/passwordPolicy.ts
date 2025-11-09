import { z } from "zod";
import { translate } from "../translation";

// Strong password schema moved out for review. Not yet wired into login/register.
// Policy: min 10, at least one lowercase, one uppercase, one number, one special char, no spaces.
export function createStrongPasswordSchema() {
  return z
    .string()
    .nonempty(
      translate("validation.passwordRequired" as any) || "Password is required"
    )
    .min(
      10,
      translate("validation.passwordTooShort" as any) ||
        "Password must be at least 10 characters"
    )
    .refine((val) => /[a-z]/.test(val), {
      message:
        translate("validation.passwordLowercase" as any) ||
        "Password must contain a lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message:
        translate("validation.passwordUppercase" as any) ||
        "Password must contain an uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message:
        translate("validation.passwordNumber" as any) ||
        "Password must contain a number",
    })
    .refine((val) => /[^\w\s]/.test(val), {
      message:
        translate("validation.passwordSpecial" as any) ||
        "Password must contain a special character",
    })
    .refine((val) => !/\s/.test(val), {
      message:
        translate("validation.passwordNoSpaces" as any) ||
        "Password must not contain spaces",
    });
}

export type StrongPassword = z.infer<
  ReturnType<typeof createStrongPasswordSchema>
>;

// Example usage (for later wiring):
// const schema = z.object({ userPassword: createStrongPasswordSchema(), ... });

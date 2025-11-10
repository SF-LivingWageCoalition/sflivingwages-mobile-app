import { z } from "zod";
import { translate } from "../translation";

// Policy: min 10, at least one lowercase, one uppercase, one number, one special char, no spaces.
// Allowed special characters: !"#$%&'()*+,-./:;<=>?@[]^_{}|~`
// See: https://wordpress.org/documentation/article/password-best-practices/
export function passwordSchema() {
  const allowedSpecials = new Set([
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "]",
    "^",
    "_",
    "{",
    "}",
    "|",
    "~",
    "`",
  ]);

  return (
    z
      .string()
      .nonempty(
        translate("validation.passwordRequired") || "Password is required"
      )
      .min(
        10,
        translate("validation.passwordTooShort") ||
          "Password must be at least 10 characters"
      )
      .refine((val) => /[a-z]/.test(val), {
        message:
          translate("validation.passwordLowercase") ||
          "Password must contain a lowercase letter",
      })
      .refine((val) => /[A-Z]/.test(val), {
        message:
          translate("validation.passwordUppercase") ||
          "Password must contain an uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message:
          translate("validation.passwordNumber") ||
          "Password must contain a number",
      })
      // Ensure at least one allowed special character is present
      .refine((val) => val.split("").some((ch) => allowedSpecials.has(ch)), {
        message:
          translate("validation.passwordSpecial") ||
          "Password must contain a special character",
      })
      // Ensure no characters outside letters, numbers, and the allowed special set
      .refine(
        (val) =>
          val
            .split("")
            .every((ch) => /[A-Za-z0-9]/.test(ch) || allowedSpecials.has(ch)),
        {
          message:
            translate("validation.passwordInvalidChars") ||
            "Password contains invalid characters",
        }
      )
      .refine((val) => !/\s/.test(val), {
        message:
          translate("validation.passwordNoSpaces") ||
          "Password must not contain spaces",
      })
  );
}

export type StrongPassword = z.infer<ReturnType<typeof passwordSchema>>;

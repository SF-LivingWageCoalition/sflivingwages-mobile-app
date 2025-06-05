import { translate } from "../../../translation/i18n";
import { z } from "zod";

export const assistanceSchema = z.object({
  fullName: z.string().min(1, translate("assistScreen.validation.fullName")),
  userEmail: z.string().email(translate("assistScreen.validation.userEmail")),
  userPhone: z
    .string()
    .min(10, translate("assistScreen.validation.userPhone"))
    .regex(/\d{10,}/, translate("assistScreen.validation.userPhoneLength")),
  list: z.array(z.string()).min(1, translate("assistScreen.validation.list")),
});

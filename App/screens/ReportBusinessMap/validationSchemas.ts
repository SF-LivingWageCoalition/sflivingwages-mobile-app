import { z } from "zod";

export const reportSchema = z.object({
  violationType: z
    .union([z.string(), z.null()])
    .refine(
      (val) => val !== null && val.length > 0,
      "Please select a violation type"
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  selectedPlace: z
    .union([
      z.object({
        details: z
          .object({
            location: z
              .object({
                latitude: z.number(),
                longitude: z.number(),
              })
              .optional(),
          })
          .optional(),
      }),
      z.null(),
    ])
    .refine(
      (place) => place !== null && place.details?.location,
      "Please select a business location"
    ),
});

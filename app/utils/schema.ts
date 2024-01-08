import { z } from "zod";

export const CreateRecordSchema = z.object({
  name: z.string().min(2),
  country: z.string().default("Ukraine"),
  description: z.string().min(2),
  minimalPriceUAH: z.number().min(1),
  region: z.string(),
  city: z.string().optional(),
  latLngTuple: z.array(z.number().optional()).max(2).min(2).optional(),
});

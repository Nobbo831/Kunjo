import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),

  details: z.string().optional(),
  operational_range: z.string().optional(),

  has_custom: z.string().optional(),
});
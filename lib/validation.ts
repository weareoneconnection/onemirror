import { z } from "zod";

export const simulateSchema = z.object({
  input: z.string().min(3, "Please enter at least 3 characters.").max(280, "Please keep the input under 280 characters."),
  source: z.string().max(50).optional()
});

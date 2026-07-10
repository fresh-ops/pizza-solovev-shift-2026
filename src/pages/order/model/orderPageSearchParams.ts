import { z } from "zod";

export const zOrderStep = z.enum(["personal", "payment", "done"]);

export type OrderStep = z.infer<typeof zOrderStep>;

export const zOrderPageSearchParams = z.object({
  step: zOrderStep.optional(),
});

export type OrderPageSearchParams = z.infer<typeof zOrderPageSearchParams>;

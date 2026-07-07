import { z } from "zod";

import { zOrderedPizza } from "@/shared/api";

export const zCartItem = zOrderedPizza.extend({
  cartId: z.string(),
  count: z.number().int().positive(),
});

export type CartItem = z.infer<typeof zCartItem>;

export const zCart = z.object({
  items: z.array(zCartItem),
});

export type Cart = z.infer<typeof zCart>;

export const DEFAULT_CART: Cart = {
  items: [],
};

import { z } from "zod";

import { zOrderedPizza, zPizza } from "@/shared/api";

export const zCartItem = z.object({
  cartId: z.string(),
  count: z.number().int().positive(),
  pizza: zPizza,
  order: zOrderedPizza,
});

export type CartItem = z.infer<typeof zCartItem>;

export const zCart = z.object({
  items: z.array(zCartItem),
});

export type Cart = z.infer<typeof zCart>;

export const DEFAULT_CART: Cart = {
  items: [],
};

import { z } from "zod";

import type { Cart } from "../model/Cart";

import { DEFAULT_CART, zCart } from "../model/Cart";

const CART_KEY = "cart";

const zJsonString = z.string().transform((str, ctx) => {
  try {
    return JSON.parse(str);
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Invalid JSON string format",
    });
    return z.NEVER;
  }
});

const CartParser = zJsonString.pipe(zCart);

export const loadLocalCart = () => {
  const serializedCart = localStorage.getItem(CART_KEY);
  const result = CartParser.safeParse(serializedCart);

  return result.success ? result.data : DEFAULT_CART;
};

export const saveLocalCart = (cart: Cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

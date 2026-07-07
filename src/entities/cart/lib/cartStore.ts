import { createStore } from "@siberiacancode/reactuse";

import { DEFAULT_CART, type Cart } from "../model/Cart";

export const cartStore = createStore<Cart>(DEFAULT_CART);

import { createStore } from "@siberiacancode/reactuse";

import { type Cart } from "../model/Cart";
import { loadLocalCart, saveLocalCart } from "./localStorage";

export const cartStore = createStore<Cart>(loadLocalCart);

cartStore.subscribe(saveLocalCart);

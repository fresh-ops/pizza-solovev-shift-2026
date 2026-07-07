import type { OrderedPizza } from "@/shared/api";

import { type Cart } from "../model/Cart";
import { cartStore } from "./cartStore";

const addItem = (item: OrderedPizza) =>
  cartStore.set((state) => ({
    ...state,
    items: [...state.items, { ...item, cartId: crypto.randomUUID(), count: 1 }],
  }));

const clear = () => cartStore.set((state) => ({ ...state, items: [] }));

export interface UseCartReturn extends Cart {
  addItem: (item: OrderedPizza) => void;
  clear: () => void;
}

export const useCart = (): UseCartReturn => {
  const items = cartStore.use((state) => state.items);

  return {
    items,
    addItem,
    clear,
  };
};

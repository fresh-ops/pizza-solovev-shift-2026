import { type Cart, type CartItem } from "../model/Cart";
import { cartStore } from "./cartStore";

const addItem = (item: CartItem) =>
  cartStore.set((state) => ({ ...state, items: [...state.items, item] }));

const clear = () => cartStore.set((state) => ({ ...state, items: [] }));

export interface UseCartReturn extends Cart {
  addItem: (item: CartItem) => void;
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

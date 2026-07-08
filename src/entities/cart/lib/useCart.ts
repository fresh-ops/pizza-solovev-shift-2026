import _ from "lodash";

import type { OrderedPizza } from "@/shared/api";

import { type Cart, type CartItem } from "../model/Cart";
import { cartStore } from "./cartStore";

const addItem = (newItem: OrderedPizza) =>
  cartStore.set((state) => {
    const keys = Object.keys(newItem) as Array<keyof OrderedPizza>;
    const matchingIndex = state.items.findIndex((item) =>
      keys.every((key) => _.isEqual(item[key], newItem[key])),
    );

    if (matchingIndex !== -1) {
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === matchingIndex ? { ...item, count: item.count + 1 } : item,
        ),
      };
    }

    return {
      ...state,
      items: [...state.items, { ...newItem, cartId: crypto.randomUUID(), count: 1 }],
    };
  });

const removeItem = (item: CartItem) =>
  cartStore.set((state) => ({
    ...state,
    items: state.items.filter(({ cartId }) => cartId !== item.cartId),
  }));

const increaseCount = (item: CartItem) =>
  cartStore.set((state) => ({
    ...state,
    items: state.items.map((it) => ({
      ...it,
      count: it.cartId === item.cartId ? it.count + 1 : it.count,
    })),
  }));

const decreaseCount = (item: CartItem) =>
  item.count > 1
    ? cartStore.set((state) => ({
        ...state,
        items: state.items.map((it) => ({
          ...it,
          count: it.cartId === item.cartId ? it.count - 1 : it.count,
        })),
      }))
    : removeItem(item);

const clear = () => cartStore.set((state) => ({ ...state, items: [] }));

export interface UseCartReturn extends Cart {
  addItem: (item: OrderedPizza) => void;
  removeItem: (item: CartItem) => void;
  increaseCount: (item: CartItem) => void;
  decreaseCount: (item: CartItem) => void;
  clear: () => void;
}

export const useCart = (): UseCartReturn => {
  const items = cartStore.use((state) => state.items);

  return {
    items,
    addItem,
    removeItem,
    increaseCount,
    decreaseCount,
    clear,
  };
};

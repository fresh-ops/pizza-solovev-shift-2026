import _ from "lodash";

import type { OrderedPizza, Pizza } from "@/shared/api";

import type { Cart, CartItem } from "../model/Cart";

import { cartStore } from "./cartStore";

const addItem = (pizza: Pizza, order: OrderedPizza) =>
  cartStore.set((state) => {
    const keys = Object.keys(order) as Array<keyof OrderedPizza>;
    const matchingIndex = state.items.findIndex((item) =>
      keys.every((key) => _.isEqual(item.order[key], order[key])),
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
      items: [...state.items, { pizza, order, cartId: crypto.randomUUID(), count: 1 }],
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

const getCorresponding = (order: OrderedPizza) => {
  const keys = Object.keys(order) as Array<keyof OrderedPizza>;
  return cartStore
    .get()
    .items.find((item) => keys.every((key) => _.isEqual(item.order[key], order[key])));
};

const clear = () => cartStore.set((state) => ({ ...state, items: [] }));

export interface UseCartReturn extends Cart {
  addItem: (pizza: Pizza, order: OrderedPizza) => void;
  removeItem: (item: CartItem) => void;
  increaseCount: (item: CartItem) => void;
  decreaseCount: (item: CartItem) => void;
  getCorresponding: (pizza: OrderedPizza) => CartItem | undefined;
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
    getCorresponding,
    clear,
  };
};

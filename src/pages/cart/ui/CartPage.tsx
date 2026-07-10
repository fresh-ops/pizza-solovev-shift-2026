import { Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import type { CartItem } from "@/entities/cart";

import { useCart } from "@/entities/cart";
import { pizzaControllerGetPizzasCatalogOptions, type Pizza } from "@/shared/api";

import { CartItemCard } from "./CartItemCard";

export interface CartPageProps {}

export const CartPage = () => {
  const catalogQuery = useSuspenseQuery(pizzaControllerGetPizzasCatalogOptions({}));
  const cart = useCart();
  const items = useMemo(() => {
    const catalogMap = new Map(catalogQuery.data.catalog.map((item) => [item.id, item]));

    return cart.items.flatMap<{ cartItem: CartItem; pizza: Pizza }>((cartItem) => {
      const pizza = catalogMap.get(cartItem.id);
      return pizza ? [{ cartItem, pizza }] : [];
    });
  }, [catalogQuery.data.catalog, cart.items]);

  return (
    <>
      <Title>Корзина</Title>
      {items.map((item) => (
        <CartItemCard
          key={item.cartItem.cartId}
          {...item}
          onIncreaseCount={cart.increaseCount}
          onDecreaseCount={cart.decreaseCount}
          onRemove={cart.removeItem}
        />
      ))}
    </>
  );
};

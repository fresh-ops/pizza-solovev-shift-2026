import { Title } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { useCart } from "@/entities/cart";
import { pizzaControllerGetPizzasCatalogOptions } from "@/shared/api";

import { CartItemCard, type CartItemCardProps } from "./CartItemCard";

export interface CartPageProps {}

export const CartPage = () => {
  const catalogQuery = useSuspenseQuery(pizzaControllerGetPizzasCatalogOptions({}));
  const cart = useCart();
  const items = useMemo(() => {
    const cartItemMap = new Map(cart.items.map((item) => [item.id, item]));

    return catalogQuery.data.catalog.reduce<Pick<CartItemCardProps, "cartItem" | "pizza">[]>(
      (acc, pizza) => {
        const cartItem = cartItemMap.get(pizza.id);
        if (cartItem) {
          acc.push({ cartItem, pizza });
        }
        return acc;
      },
      [],
    );
  }, [catalogQuery.data.catalog, cart.items]);

  return (
    <>
      <Title>Корзина</Title>
      {items.map((item) => (
        <CartItemCard key={item.cartItem.cartId} {...item} />
      ))}
    </>
  );
};

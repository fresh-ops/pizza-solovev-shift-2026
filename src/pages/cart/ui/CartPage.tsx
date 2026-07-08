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
    const catalogMap = new Map(catalogQuery.data.catalog.map((item) => [item.id, item]));

    return cart.items.reduce<Pick<CartItemCardProps, "cartItem" | "pizza">[]>((acc, cartItem) => {
      const pizza = catalogMap.get(cartItem.id);
      if (pizza) {
        acc.push({ cartItem, pizza });
      }
      return acc;
    }, []);
  }, [catalogQuery.data.catalog, cart.items]);

  return (
    <>
      <Title>Корзина</Title>
      {items.map((item) => (
        <CartItemCard key={item.cartItem.cartId} {...item} onRemove={cart.removeItem} />
      ))}
    </>
  );
};

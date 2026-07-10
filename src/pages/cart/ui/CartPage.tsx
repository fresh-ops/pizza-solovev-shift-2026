import { Title } from "@mantine/core";

import { useCart } from "@/entities/cart";

import { CartItemCard } from "./CartItemCard";

export interface CartPageProps {}

export const CartPage = () => {
  const cart = useCart();

  return (
    <>
      <Title>Корзина</Title>
      {cart.items.map((item) => (
        <CartItemCard
          key={item.cartId}
          cartItem={item}
          onIncreaseCount={cart.increaseCount}
          onDecreaseCount={cart.decreaseCount}
          onRemove={cart.removeItem}
        />
      ))}
    </>
  );
};

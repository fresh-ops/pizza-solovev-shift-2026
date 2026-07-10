import { Divider, Text, Title } from "@mantine/core";

import { useCart } from "@/entities/cart";
import { calculatePizzaPrice } from "@/entities/pizza";

import { CartItemCard } from "./CartItemCard";

export interface CartPageProps {}

export const CartPage = () => {
  const cart = useCart();
  const prices = cart.items.map(
    ({ order, pizza, count }) => count * calculatePizzaPrice(order, pizza),
  );
  const totalPrice = prices.reduce((acc, price) => acc + price);

  return (
    <>
      <Title>Корзина</Title>
      {cart.items.map((item, index) => (
        <CartItemCard
          key={item.cartId}
          cartItem={item}
          price={prices[index]}
          onIncreaseCount={cart.increaseCount}
          onDecreaseCount={cart.decreaseCount}
          onRemove={cart.removeItem}
        />
      ))}
      <Divider />
      <Text size="lg" fw="bold">
        Стоимость заказа: {totalPrice} ₽
      </Text>
    </>
  );
};

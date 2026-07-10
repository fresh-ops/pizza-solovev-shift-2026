import { Button, Divider, Group, Text, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

import { useCart } from "@/entities/cart";
import { calculatePizzaPrice } from "@/entities/pizza";

import { CartItemCard } from "./CartItemCard";

export interface CartPageProps {}

export const CartPage = () => {
  const navigate = useNavigate();
  const cart = useCart();
  const prices = cart.items.map(
    ({ order, pizza, count }) => count * calculatePizzaPrice(order, pizza),
  );
  const totalPrice = prices.reduce((acc, price) => acc + price, 0);

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
      <Group justify="space-between">
        <Text size="lg" fw="bold">
          Стоимость заказа: {totalPrice} ₽
        </Text>
        <Button onClick={() => navigate({ to: "/order" })} radius="lg">
          Оформить заказ
        </Button>
      </Group>
    </>
  );
};

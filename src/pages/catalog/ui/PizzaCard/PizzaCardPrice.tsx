import { Text } from "@mantine/core";

import { calculatePizzaStartingPrice, type Pizza } from "@/entities/pizza";
export interface PizzaCardPriceProps {
  pizza: Pizza;
}

export const PizzaCardPrice = ({ pizza }: PizzaCardPriceProps) => {
  const price = calculatePizzaStartingPrice(pizza);
  return (
    <Text size="xl" fw={700}>
      От {price} ₽
    </Text>
  );
};

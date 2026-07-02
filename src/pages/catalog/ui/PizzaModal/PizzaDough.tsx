import { Text } from "@mantine/core";

import type { OrderedPizza } from "@/shared/api";

export interface PizzaDoughProps {
  orderedPizza: OrderedPizza;
}

export const PizzaDough = ({ orderedPizza }: PizzaDoughProps) => {
  return (
    <Text>
      {orderedPizza.dough}, {orderedPizza.size}
    </Text>
  );
};

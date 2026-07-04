import { Button, Group, Image, SegmentedControl, SimpleGrid, Stack, Text } from "@mantine/core";
import { useMemo, useState } from "react";

import type { OrderedPizza, Pizza } from "@/shared/api";

import { getAssetUrl, toggleArrayItem } from "@/shared/lib";

import { calculateOrderedPizzaPrice } from "../../lib/calculateOrderedPizzaPrice";
import { PizzaToppingCard } from "./PizzaToppingCard";

export interface PizzaModalContentProps {
  pizza: Pizza;
}

export const PizzaModalContent = ({ pizza }: PizzaModalContentProps) => {
  const [orderingPizza, setOrderingPizza] = useState<OrderedPizza>({
    id: pizza.id,
    toppings: [],
    size: "small",
    dough: "thin",
  });
  const price = useMemo(
    () => calculateOrderedPizzaPrice(orderingPizza, pizza),
    [orderingPizza, pizza],
  );

  return (
    <Group align="flex-start">
      <Image src={getAssetUrl(pizza.img)} flex={1} />
      <Stack gap="xs" flex={1}>
        <Text size="lg" fw={700}>
          {pizza.name}
        </Text>
        <Text>
          {orderingPizza.dough}, {orderingPizza.size}
        </Text>
        <Text>{pizza.description}</Text>
        <SegmentedControl
          value={orderingPizza.size}
          onChange={(size) => setOrderingPizza({ ...orderingPizza, size })}
          data={pizza.sizes.map((size) => size.type)}
          fullWidth
          withItemsBorders={false}
          radius="xl"
        />
        <SimpleGrid cols={3}>
          {pizza.toppings.map((topping) => (
            <PizzaToppingCard
              key={topping.type}
              topping={topping}
              isSelected={orderingPizza.toppings.includes(topping.type)}
              onClick={() =>
                setOrderingPizza({
                  ...orderingPizza,
                  toppings: toggleArrayItem(topping.type, orderingPizza.toppings),
                })
              }
            />
          ))}
        </SimpleGrid>
        <Button radius="xl">Добавить за {price} ₽</Button>
      </Stack>
    </Group>
  );
};

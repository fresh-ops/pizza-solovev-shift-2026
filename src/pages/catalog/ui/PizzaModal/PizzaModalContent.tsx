import { Button, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { useState } from "react";

import type { Pizza } from "@/shared/api";

import { getAssetUrl, toggleArrayItem } from "@/shared/lib";

import { calculateOrderedPizzaPrice } from "../../lib/calculateOrderedPizzaPrice";
import { getDefaultOrderedPizzaFor } from "../../lib/getDefaultOrderedPizzaFor";
import { PizzaDough } from "./PizzaDough";
import { PizzaSizeControl } from "./PizzaSizeControl";
import { PizzaToppingCard } from "./PizzaToppingCard";

export interface PizzaModalContentProps {
  pizza: Pizza;
}

export const PizzaModalContent = ({ pizza }: PizzaModalContentProps) => {
  const [orderingPizza, setOrderingPizza] = useState(getDefaultOrderedPizzaFor(pizza));
  const price = calculateOrderedPizzaPrice(orderingPizza, pizza);

  return (
    <Group align="flex-start">
      <Image src={getAssetUrl(pizza.img)} flex={1} />
      <Stack gap="xs" flex={1}>
        <Text size="lg" fw={700}>
          {pizza.name}
        </Text>
        <PizzaDough orderedPizza={orderingPizza} />
        <Text>{pizza.description}</Text>
        <PizzaSizeControl
          value={orderingPizza.size}
          sizes={pizza.sizes.map((size) => size.type)}
          onChange={(size) => setOrderingPizza({ ...orderingPizza, size })}
        />
        <SimpleGrid cols={3}>
          {pizza.toppings.map((t) => (
            <PizzaToppingCard
              key={t.type}
              topping={t}
              isSelected={orderingPizza.toppings.includes(t.type)}
              onClick={() =>
                setOrderingPizza({
                  ...orderingPizza,
                  toppings: toggleArrayItem(t.type, orderingPizza.toppings),
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

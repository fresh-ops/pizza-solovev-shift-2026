import { Image, Stack, Text } from "@mantine/core";
import { useMemo } from "react";

import type { Pizza } from "@/entities/pizza";

import { calculatePizzaStartingPrice } from "@/entities/pizza";
import { getAssetUrl } from "@/shared/lib";

export interface PizzaCardProps {
  pizza: Pizza;
  onClick?: () => void;
}

export const PizzaCard = ({ pizza, onClick }: PizzaCardProps) => {
  const price = useMemo(() => calculatePizzaStartingPrice(pizza), [pizza]);

  return (
    <Stack onClick={onClick}>
      <Image src={getAssetUrl(pizza.img)} />
      <Stack justify="space-between" flex={1}>
        <Stack gap="xs">
          <Text size="lg" fw={700}>
            {pizza.name}
          </Text>
          <Text c="dimmed" lh={"sm"}>
            {pizza.description}
          </Text>
        </Stack>
        <Text size="xl" fw={700}>
          От {price} ₽
        </Text>
      </Stack>
    </Stack>
  );
};

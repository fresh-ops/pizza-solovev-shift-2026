import { Image, Stack } from "@mantine/core";

import { type Pizza } from "@/entities/pizza";
import { getAssetUrl } from "@/shared/lib";

import { PizzaCardDescription } from "./PizzaCardDescription";
import { PizzaCardPrice } from "./PizzaCardPrice";

export interface PizzaCardProps {
  pizza: Pizza;
}

export const PizzaCard = ({ pizza }: PizzaCardProps) => {
  return (
    <Stack>
      <Image src={getAssetUrl(pizza.img)} />
      <Stack justify="space-between" flex={1}>
        <PizzaCardDescription pizza={pizza} />
        <PizzaCardPrice pizza={pizza} />
      </Stack>
    </Stack>
  );
};

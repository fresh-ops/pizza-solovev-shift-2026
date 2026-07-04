import { Button, Image, Paper, Stack, Text } from "@mantine/core";
import { CheckIcon } from "@phosphor-icons/react";

import type { PizzaIngredient } from "@/shared/api";

import { getAssetUrl } from "@/shared/lib";

export interface PizzaToppingCardProps {
  topping: PizzaIngredient;
  isSelected: boolean;
  onClick?: () => void;
}

export const PizzaToppingCard = ({ topping, isSelected, onClick }: PizzaToppingCardProps) => (
  <Paper
    radius="lg"
    {...(isSelected && { shadow: "md" })}
    style={{
      transition: "0.2s ease",
    }}
    onClick={onClick}
  >
    <Stack align="center" p="sm">
      <Image src={getAssetUrl(topping.img)} />
      <Text>{topping.type}</Text>
      <Button size="compact-sm" fullWidth radius="md" variant={isSelected ? "filled" : "outline"}>
        {isSelected && <CheckIcon weight="bold" />}
        {!isSelected && `${topping.price}₽`}
      </Button>
    </Stack>
  </Paper>
);

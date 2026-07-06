import { Button, Image, Paper, Stack, Text } from "@mantine/core";
import { CheckIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import type { PizzaIngredient } from "@/shared/api";

import { getAssetUrl } from "@/shared/lib";

export interface PizzaToppingCardProps {
  topping: PizzaIngredient;
  isSelected: boolean;
  onClick?: () => void;
}

export const PizzaToppingCard = ({ topping, isSelected, onClick }: PizzaToppingCardProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      radius="lg"
      {...(isSelected && { shadow: "md" })}
      style={{
        transition: "0.2s ease",
      }}
      onClick={onClick}
    >
      <Stack h="100%" p="xs" justify="space-around">
        <Image src={getAssetUrl(topping.img)} />
        <Text flex={1} ta="center" size="sm">
          {t(`ingredient.${topping.type}`)}
        </Text>
        <Button size="compact-sm" fullWidth radius="md" variant={isSelected ? "filled" : "outline"}>
          {isSelected && <CheckIcon weight="bold" />}
          {!isSelected && `${topping.price}₽`}
        </Button>
      </Stack>
    </Paper>
  );
};

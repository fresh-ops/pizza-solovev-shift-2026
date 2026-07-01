import { Stack, Text } from "@mantine/core";

import { type Pizza } from "@/entities/pizza";

export interface PizzaCardInfoProps {
  pizza: Pizza;
}

export const PizzaCardDescription = ({ pizza }: PizzaCardInfoProps) => {
  return (
    <Stack gap="xs">
      <Text size="lg" fw={700}>
        {pizza.name}
      </Text>
      <Text c="dimmed" lh={"sm"}>
        {pizza.description}
      </Text>
    </Stack>
  );
};

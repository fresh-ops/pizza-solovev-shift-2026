import {
  ActionIcon,
  Button,
  Group,
  Image,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { OrderedPizza, Pizza } from "@/shared/api";

import { getAssetUrl, toggleArrayItem } from "@/shared/lib";

import { calculateOrderedPizzaPrice } from "../../lib/calculateOrderedPizzaPrice";
import { PizzaToppingCard } from "./PizzaToppingCard";

export interface PizzaModalContentProps {
  pizza: Pizza;
  orderingPizza: OrderedPizza;
  count: number;
  onChange: (pizza: OrderedPizza) => void;
  onAddItem: (pizza: OrderedPizza) => void;
  onRemoveItem: (pizza: OrderedPizza) => void;
}

export const PizzaModalContent = ({
  pizza,
  orderingPizza,
  count,
  onChange,
  onAddItem,
  onRemoveItem,
}: PizzaModalContentProps) => {
  const { t } = useTranslation();
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
          {t(`dough.${orderingPizza.dough}`)}, {t(`size.${orderingPizza.size}`)}
        </Text>
        <Text>{pizza.description}</Text>
        <SegmentedControl
          value={orderingPizza.size}
          onChange={(size) => onChange({ ...orderingPizza, size })}
          data={pizza.sizes.map(({ type }) => ({ label: t(`size.${type}`), value: type }))}
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
                onChange({
                  ...orderingPizza,
                  toppings: toggleArrayItem(topping.type, orderingPizza.toppings),
                })
              }
            />
          ))}
        </SimpleGrid>
        {count <= 0 && (
          <Button radius="xl" onClick={() => onAddItem(orderingPizza)}>
            Добавить за {price} ₽
          </Button>
        )}
        {count > 0 && (
          <ActionIcon.Group w="100%">
            <ActionIcon size="md" flex={1} onClick={() => onRemoveItem(orderingPizza)}>
              <MinusIcon />
            </ActionIcon>
            <ActionIcon.GroupSection size="md" flex={2}>
              {count}
            </ActionIcon.GroupSection>
            <ActionIcon size="md" flex={1} onClick={() => onAddItem(orderingPizza)}>
              <PlusIcon />
            </ActionIcon>
          </ActionIcon.Group>
        )}
      </Stack>
    </Group>
  );
};

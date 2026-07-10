import { ActionIcon, Group, Image, Paper, Text } from "@mantine/core";
import { MinusIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import type { CartItem } from "@/entities/cart";

import { getAssetUrl } from "@/shared/lib";

export interface CartItemCardProps {
  cartItem: CartItem;
  price: number;
  onIncreaseCount: (item: CartItem) => void;
  onDecreaseCount: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
}

export const CartItemCard = ({
  cartItem,
  price,
  onIncreaseCount,
  onDecreaseCount,
  onRemove,
}: CartItemCardProps) => {
  const { t } = useTranslation();

  return (
    <Paper radius="lg" shadow="sm">
      <Group p="sm">
        <Image maw={100} h="auto" src={getAssetUrl(cartItem.pizza.img)} />
        <Text flex={1}>{cartItem.pizza.name}</Text>
        <Text flex={1} c="dimmed">
          {t(`dough.${cartItem.order.dough}`)}, {t(`size.${cartItem.order.size}`)}
          {cartItem.order.toppings.length > 0 &&
            " + " + cartItem.order.toppings.map((topping) => t(`ingredient.${topping}`)).join(", ")}
        </Text>
        <ActionIcon.Group>
          <ActionIcon size="md" onClick={() => onDecreaseCount(cartItem)}>
            <MinusIcon />
          </ActionIcon>
          <ActionIcon.GroupSection size="md">{cartItem.count}</ActionIcon.GroupSection>
          <ActionIcon size="md" onClick={() => onIncreaseCount(cartItem)}>
            <PlusIcon />
          </ActionIcon>
        </ActionIcon.Group>
        <Text flex={1} ta="center">
          {price} ₽
        </Text>
        <ActionIcon onClick={() => onRemove(cartItem)} variant="transparent">
          <XIcon />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

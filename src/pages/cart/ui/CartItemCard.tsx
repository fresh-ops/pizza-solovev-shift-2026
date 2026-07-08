import { ActionIcon, Group, Image, Paper, Text } from "@mantine/core";
import { MinusIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import type { CartItem } from "@/entities/cart";
import type { Pizza } from "@/shared/api";

import { getAssetUrl } from "@/shared/lib";

export interface CartItemCardProps {
  pizza: Pizza;
  cartItem: CartItem;
  onIncreaseCount: (item: CartItem) => void;
  onDecreaseCount: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
}

export const CartItemCard = ({
  pizza,
  cartItem,
  onIncreaseCount,
  onDecreaseCount,
  onRemove,
}: CartItemCardProps) => {
  const { t } = useTranslation();

  return (
    <Paper radius="lg" shadow="sm">
      <Group p="sm">
        <Image maw={100} h="auto" src={getAssetUrl(pizza.img)} />
        <Text flex={1}>{pizza.name}</Text>
        <Text flex={1} c="dimmed">
          {t(`dough.${cartItem.dough}`)}, {t(`size.${cartItem.size}`)}
          {cartItem.toppings.length > 0 &&
            " + " + cartItem.toppings.map((topping) => t(`ingredient.${topping}`)).join(", ")}
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
        <ActionIcon onClick={() => onRemove(cartItem)} variant="transparent">
          <XIcon />
        </ActionIcon>
      </Group>
    </Paper>
  );
};

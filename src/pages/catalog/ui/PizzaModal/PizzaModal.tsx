import { Image, Stack, Text, Modal, type ModalProps, SimpleGrid } from "@mantine/core";
import { useTranslation } from "react-i18next";

import type { OrderedPizza, Pizza } from "@/entities/pizza";

import { calculatePizzaPrice } from "@/entities/pizza";
import { getAssetUrl } from "@/shared/lib";

import { PizzaConfigurator } from "./PizzaConfigurator";
import { PizzaCountControls } from "./PizzaCountControls";

export interface PizzaModalProps extends Omit<ModalProps, "opened"> {
  pizza?: Pizza;
  orderingPizza: OrderedPizza;
  count: number;
  onPizzaChange: (pizza: OrderedPizza) => void;
  onAddItem: (pizza: Pizza, order: OrderedPizza) => void;
  onRemoveItem: (pizza: OrderedPizza) => void;
}

export const PizzaModal = ({
  pizza,
  orderingPizza,
  count,
  onPizzaChange,
  onAddItem,
  onRemoveItem,
  ...props
}: PizzaModalProps) => {
  const { t } = useTranslation();
  const price = pizza ? calculatePizzaPrice(orderingPizza, pizza) : 0;
  const updatePizza = (changes: Partial<OrderedPizza>) =>
    onPizzaChange({ ...orderingPizza, ...changes });

  return (
    <Modal {...props} opened={!!pizza}>
      {pizza && (
        <SimpleGrid cols={2}>
          <Image src={getAssetUrl(pizza.img)} />
          <Stack gap="xs" flex={1}>
            <Text size="lg" fw={700}>
              {pizza.name}
            </Text>
            <Text>
              {t(`dough.${orderingPizza.dough}`)}, {t(`size.${orderingPizza.size}`)}
            </Text>
            <Text>{pizza.description}</Text>
            <PizzaConfigurator
              value={orderingPizza}
              onChange={updatePizza}
              sizes={pizza.sizes}
              toppings={pizza.toppings}
            />
            <PizzaCountControls
              count={count}
              price={price}
              onIncrease={() => onAddItem(pizza, orderingPizza)}
              onDecrease={() => onRemoveItem(orderingPizza)}
            />
          </Stack>
        </SimpleGrid>
      )}
    </Modal>
  );
};

import { Modal, type ModalProps } from "@mantine/core";

import type { OrderedPizza, Pizza } from "@/shared/api";

import { PizzaModalContent } from "./PizzaModalContent";

export interface PizzaModalProps extends Omit<ModalProps, "opened"> {
  pizza?: Pizza;
  orderingPizza: OrderedPizza;
  count: number;
  onPizzaChange: (pizza: OrderedPizza) => void;
  onAddItem: (pizza: OrderedPizza) => void;
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
}: PizzaModalProps) => (
  <Modal {...props} opened={!!pizza}>
    {pizza && (
      <PizzaModalContent
        {...{ pizza, orderingPizza, count, onChange: onPizzaChange, onAddItem, onRemoveItem }}
      />
    )}
  </Modal>
);

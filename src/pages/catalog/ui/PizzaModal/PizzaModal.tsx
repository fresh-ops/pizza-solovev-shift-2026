import { Modal, type ModalProps } from "@mantine/core";

import type { OrderedPizza, Pizza } from "@/shared/api";

import { PizzaModalContent } from "./PizzaModalContent";

export interface PizzaModalProps extends Omit<ModalProps, "opened"> {
  pizza?: Pizza;
  orderingPizza: OrderedPizza;
  onPizzaChange: (pizza: OrderedPizza) => void;
}

export const PizzaModal = ({ pizza, orderingPizza, onPizzaChange, ...props }: PizzaModalProps) => (
  <Modal {...props} opened={!!pizza}>
    {pizza && (
      <PizzaModalContent pizza={pizza} orderingPizza={orderingPizza} onChange={onPizzaChange} />
    )}
  </Modal>
);

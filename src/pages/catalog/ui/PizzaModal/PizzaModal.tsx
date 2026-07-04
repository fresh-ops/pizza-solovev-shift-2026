import { Modal, type ModalProps } from "@mantine/core";

import type { Pizza } from "@/shared/api";

import { ErrorMessage } from "@/shared/ui";

import { PizzaModalContent } from "./PizzaModalContent";

export interface PizzaModalProps extends ModalProps {
  pizza?: Pizza;
}

export const PizzaModal = ({ pizza, ...props }: PizzaModalProps) => (
  <Modal {...props}>
    {!pizza && <ErrorMessage />}
    {pizza && <PizzaModalContent pizza={pizza} />}
  </Modal>
);

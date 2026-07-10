import { ActionIcon, Button } from "@mantine/core";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export interface PizzaCountControlsProps {
  count: number;
  price: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const PizzaCountControls = ({
  count,
  price,
  onIncrease,
  onDecrease,
}: PizzaCountControlsProps) =>
  count <= 0 ? (
    <Button radius="xl" onClick={onIncrease}>
      Добавить за {price} ₽
    </Button>
  ) : (
    <ActionIcon.Group>
      <ActionIcon size="md" flex={1} onClick={onDecrease}>
        <MinusIcon />
      </ActionIcon>
      <ActionIcon.GroupSection size="md" flex={2}>
        {count}
      </ActionIcon.GroupSection>
      <ActionIcon size="md" flex={1} onClick={onIncrease}>
        <PlusIcon />
      </ActionIcon>
    </ActionIcon.Group>
  );

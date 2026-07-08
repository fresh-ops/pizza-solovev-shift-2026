import { SegmentedControl, SimpleGrid } from "@mantine/core";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import type { OrderedPizza, PizzaIngredient, PizzaSize } from "@/shared/api";

import { PizzaToppingCard } from "./PizzaToppingCard";

export interface PizzaConfiguratorProps {
  value: OrderedPizza;
  onChange: (changes: Partial<OrderedPizza>) => void;
  sizes: PizzaSize[];
  toppings: PizzaIngredient[];
}

export const PizzaConfigurator = ({ value, onChange, sizes, toppings }: PizzaConfiguratorProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SegmentedControl
        value={value.size}
        onChange={(size) => onChange({ size })}
        data={sizes.map(({ type }) => ({ label: t(`size.${type}`), value: type }))}
        fullWidth
        withItemsBorders={false}
        radius="xl"
      />
      <SimpleGrid cols={3}>
        {toppings.map((topping) => (
          <PizzaToppingCard
            key={topping.type}
            topping={topping}
            isSelected={value.toppings.includes(topping.type)}
            onClick={() =>
              onChange({
                toppings: _.xor([topping.type], value.toppings),
              })
            }
          />
        ))}
      </SimpleGrid>
    </>
  );
};

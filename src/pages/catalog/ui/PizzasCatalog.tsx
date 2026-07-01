import { SimpleGrid } from "@mantine/core";

import type { Pizza } from "@/shared/api";

import { PizzaCard } from "./PizzaCard";

export interface PizzasCatalogProps {
  pizzas: Pizza[];
}

export const PizzasCatalog = ({ pizzas }: PizzasCatalogProps) => {
  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
      {pizzas.map((p) => (
        <PizzaCard pizza={p} key={p.id} />
      ))}
    </SimpleGrid>
  );
};

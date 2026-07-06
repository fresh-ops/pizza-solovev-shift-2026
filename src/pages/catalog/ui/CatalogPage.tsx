import { Container, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

import { pizzaControllerGetPizzasCatalogOptions, type Pizza } from "@/shared/api";

import { PizzaCard } from "./PizzaCard";
import { PizzaModal } from "./PizzaModal";

export const CatalogPage = () => {
  const catalogQuery = useSuspenseQuery(pizzaControllerGetPizzasCatalogOptions({}));
  const [selectedPizza, setSelectedPizza] = useState<Pizza>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container my="xl">
      <PizzaModal pizza={selectedPizza} opened={opened} onClose={close} centered size="xl" />
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
        {catalogQuery.data.catalog.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onClick={() => {
              setSelectedPizza(pizza);
              open();
            }}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

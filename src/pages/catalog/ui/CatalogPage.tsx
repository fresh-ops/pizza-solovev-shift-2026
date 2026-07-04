import { Container, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import type { Pizza } from "@/shared/api";

import { ErrorMessage } from "@/shared/ui";

import { usePizzasCatalogQuery } from "../lib/usePizzasCatalogQuery";
import { PizzaCard } from "./PizzaCard";
import { PizzaModal } from "./PizzaModal";

export const CatalogPage = () => {
  const { data, error, isError } = usePizzasCatalogQuery();
  const [selectedPizza, setSelectedPizza] = useState<Pizza>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container my="xl">
      <PizzaModal pizza={selectedPizza} opened={opened} onClose={close} centered size="xl" />
      {isError && <ErrorMessage fw={900} error={error} />}
      {data && (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
          {data.catalog.map((pizza) => (
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
      )}
    </Container>
  );
};

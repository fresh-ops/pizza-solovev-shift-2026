import { Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import type { Pizza } from "@/shared/api";

import { ErrorMessage } from "@/shared/ui";

import { usePizzasCatalogQuery } from "../lib/usePizzasCatalogQuery";
import { PizzaModal } from "./PizzaModal";
import { PizzasCatalog } from "./PizzasCatalog";

export const CatalogPage = () => {
  const { data, error, isError } = usePizzasCatalogQuery();
  const [selectedPizza, setSelectedPizza] = useState<Pizza>();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container my="xl">
      <PizzaModal pizza={selectedPizza} opened={opened} onClose={close} centered size="xl" />
      {isError && <ErrorMessage fw={900} error={error} />}
      {data && (
        <PizzasCatalog
          pizzas={data.catalog}
          onPizzaSelect={(pizza) => {
            setSelectedPizza(pizza);
            open();
          }}
        />
      )}
    </Container>
  );
};

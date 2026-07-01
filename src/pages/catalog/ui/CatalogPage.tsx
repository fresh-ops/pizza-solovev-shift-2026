import { Container } from "@mantine/core";

import { ErrorMessage } from "@/shared/ui";

import { usePizzasCatalogQuery } from "../lib/usePizzasCatalogQuery";
import { PizzasCatalog } from "./PizzasCatalog";

export const CatalogPage = () => {
  const { data, error, isError } = usePizzasCatalogQuery();

  return (
    <Container my="xl">
      {isError && <ErrorMessage fw={900} error={error} />}
      {data && <PizzasCatalog pizzas={data.catalog} />}
    </Container>
  );
};

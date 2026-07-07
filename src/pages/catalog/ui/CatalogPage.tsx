import { Container, SimpleGrid } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { useCart } from "@/entities/cart";
import { pizzaControllerGetPizzasCatalogOptions } from "@/shared/api";

import { PizzaCard } from "./PizzaCard";
import { PizzaModal } from "./PizzaModal";

export const CatalogPage = () => {
  const navigate = useNavigate();

  const searchParams = getRouteApi("/").useSearch();
  const normalizedSearchParams = {
    id: searchParams.id ?? "",
    size: searchParams.size ?? "small",
    dough: searchParams.dough ?? "thin",
    toppings: searchParams.toppings ?? [],
  };
  const catalogQuery = useSuspenseQuery(pizzaControllerGetPizzasCatalogOptions({}));
  const selectedPizza = useMemo(
    () => catalogQuery.data.catalog.find(({ id }) => id === normalizedSearchParams.id),
    [catalogQuery.data.catalog, normalizedSearchParams.id],
  );
  const { addItem } = useCart();

  return (
    <Container my="xl">
      <PizzaModal
        pizza={selectedPizza}
        orderingPizza={normalizedSearchParams}
        onPizzaChange={(pizza) => navigate({ to: "/", search: pizza })}
        onOrderSubmit={addItem}
        onClose={() => navigate({ to: "/" })}
        centered
        size="xl"
      />
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
        {catalogQuery.data.catalog.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onClick={() => navigate({ to: "/", search: { id: pizza.id } })}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

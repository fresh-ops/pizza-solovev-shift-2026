import { SimpleGrid } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import type { OrderedPizza } from "@/entities/pizza";

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
  const cart = useCart();
  const removeItem = (pizza: OrderedPizza) => {
    const cartItem = cart.getCorresponding(pizza);
    if (cartItem) {
      cart.decreaseCount(cartItem);
    }
  };

  return (
    <>
      <PizzaModal
        pizza={selectedPizza}
        orderingPizza={normalizedSearchParams}
        count={cart.getCorresponding(normalizedSearchParams)?.count ?? 0}
        onPizzaChange={(pizza) => navigate({ to: "/", search: pizza })}
        onAddItem={cart.addItem}
        onRemoveItem={removeItem}
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
    </>
  );
};

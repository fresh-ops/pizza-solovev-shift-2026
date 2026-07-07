import { createFileRoute } from "@tanstack/react-router";

import { CartPage } from "@/pages/cart";
import { pizzaControllerGetPizzasCatalogOptions, queryClient } from "@/shared/api";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  loader: () => queryClient.ensureQueryData(pizzaControllerGetPizzasCatalogOptions({})),
});

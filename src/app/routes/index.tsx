import { createFileRoute } from "@tanstack/react-router";

import { CatalogPage, zCatalogPageSearchParams } from "@/pages/catalog";
import { pizzaControllerGetPizzasCatalogOptions, queryClient } from "@/shared/api";

export const Route = createFileRoute("/")({
  component: CatalogPage,
  loader: () => queryClient.ensureQueryData(pizzaControllerGetPizzasCatalogOptions({})),
  validateSearch: zCatalogPageSearchParams,
});

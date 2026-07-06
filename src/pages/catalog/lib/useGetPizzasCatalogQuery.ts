import { useQuery } from "@tanstack/react-query";

import { pizzaControllerGetPizzasCatalogOptions } from "@/shared/api/";

export const useGetPizzasCatalogQuery = () =>
  useQuery({
    ...pizzaControllerGetPizzasCatalogOptions({}),
  });

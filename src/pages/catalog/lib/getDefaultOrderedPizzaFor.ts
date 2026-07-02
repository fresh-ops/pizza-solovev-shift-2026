import type { OrderedPizza, Pizza } from "@/shared/api";

export const getDefaultOrderedPizzaFor = (pizza: Pizza) =>
  ({
    id: pizza.id,
    toppings: [],
    size: "small",
    dough: "thin",
  }) as OrderedPizza;

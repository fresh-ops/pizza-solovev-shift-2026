import type {
  Dough,
  Ingredient,
  OrderedPizza,
  Pizza,
  PizzaDough,
  PizzaIngredient,
  PizzaSize,
  Size,
} from "@/shared/api";

export const calculateOrderedPizzaPrice = (orderedPizza: OrderedPizza, pizzaInMenu: Pizza) =>
  getDoughPrice(orderedPizza.dough, pizzaInMenu.doughs) +
  getSizePrice(orderedPizza.size, pizzaInMenu.sizes) +
  getToppingsPrice(orderedPizza.toppings, pizzaInMenu.toppings);

const getDoughPrice = (dough: Dough, availableDoughs: PizzaDough[]) =>
  availableDoughs.find((d) => d.type === dough)?.price ?? 0;

const getSizePrice = (size: Size, availableSizes: PizzaSize[]) =>
  availableSizes.find((s) => s.type === size)?.price ?? 0;

const getToppingsPrice = (toppings: Ingredient[], availableToppings: PizzaIngredient[]) =>
  availableToppings
    .filter((t) => toppings.includes(t.type))
    .map((t) => t.price)
    .reduce((sum, price) => sum + price, 0);

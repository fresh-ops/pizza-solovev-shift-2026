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
  availableDoughs.find(({ type }) => type === dough)?.price ?? 0;

const getSizePrice = (size: Size, availableSizes: PizzaSize[]) =>
  availableSizes.find(({ type }) => type === size)?.price ?? 0;

const getToppingsPrice = (toppings: Ingredient[], availableToppings: PizzaIngredient[]) =>
  availableToppings
    .filter(({ type }) => toppings.includes(type))
    .reduce((sum, { price }) => sum + price, 0);

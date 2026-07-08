import type { Dough, Ingredient, PizzaDough, PizzaIngredient, PizzaSize, Size } from "@/shared/api";

import type { Pizza, OrderedPizza } from "../model/Pizza";

export const calculateBasePizzaPrice = (pizza: Pizza) =>
  pizza.sizes
    .map((size) => size.price)
    .reduce((minPrice, price) => (minPrice > price ? price : minPrice));

export const calculatePizzaPrice = (orderedPizza: OrderedPizza, pizza: Pizza) =>
  getDoughPrice(orderedPizza.dough, pizza.doughs) +
  getSizePrice(orderedPizza.size, pizza.sizes) +
  getToppingsPrice(orderedPizza.toppings, pizza.toppings);

const getDoughPrice = (dough: Dough, doughOptions: PizzaDough[]) =>
  doughOptions.find(({ type }) => type === dough)?.price ?? 0;

const getSizePrice = (size: Size, sizeOptions: PizzaSize[]) =>
  sizeOptions.find(({ type }) => type === size)?.price ?? 0;

const getToppingsPrice = (toppings: Ingredient[], toppingOptions: PizzaIngredient[]) =>
  toppingOptions
    .filter(({ type }) => toppings.includes(type))
    .reduce((sum, { price }) => sum + price, 0);

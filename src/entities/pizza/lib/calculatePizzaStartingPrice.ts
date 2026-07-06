import type { Pizza } from "../model/Pizza";

export const calculatePizzaStartingPrice = (pizza: Pizza) =>
  pizza.sizes
    .map((size) => size.price)
    .reduce((minPrice, price) => (minPrice > price ? price : minPrice));

import type { Pizza } from "../model/Pizza";

export const calculatePizzaStartingPrice = (pizza: Pizza) =>
  pizza.ingredients.map((ingredient) => ingredient.price).reduce((sum, price) => sum + price);

export const toggleArrayItem = <T>(item: T, array: Array<T>) =>
  array.includes(item) ? array.filter((elem) => elem !== item) : [...array, item];

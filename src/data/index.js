import { categories } from "./categories.js";
import { fisher } from "./tests/fisher.js";
import { slovoPatsana } from "./tests/slovo-patsana.js";

export { categories };

/** Порядок карточек в каталоге. Новый тест: импорт и строка в этом массиве. */
export const tests = [slovoPatsana, fisher];

export function getTest(id) {
  return tests.find((test) => test.id === id) || null;
}

export function getCategory(id) {
  return categories.find((category) => category.id === id) || null;
}

import fs from "node:fs";
import { categories, tests } from "../src/data/index.js";

const art = fs.readFileSync(new URL("../src/illustrations/QuestionArt.jsx", import.meta.url), "utf8");
const scenes = new Set([...art.matchAll(/\n  (\w+)\(c\) \{/g)].map((match) => match[1]));
const errors = [];

if (scenes.size < 10) errors.push(`В QuestionArt найдено мало сцен: ${scenes.size}`);

const categoryIds = new Set();
for (const category of categories) {
  if (categoryIds.has(category.id)) errors.push(`Повтор категории ${category.id}`);
  categoryIds.add(category.id);
  if (!category.title || !category.description) errors.push(`Пустая категория ${category.id}`);
}

const testIds = new Set();
for (const test of tests) {
  if (testIds.has(test.id)) errors.push(`Повтор теста ${test.id}`);
  testIds.add(test.id);
  if (!categoryIds.has(test.categoryId)) errors.push(`${test.id}: нет категории ${test.categoryId}`);
  if (!scenes.has(test.cover)) errors.push(`${test.id}: нет обложки ${test.cover}`);
  if (!["slovo", "fisher"].includes(test.theme) && test.theme !== "slovo" && test.theme !== "fisher") {
    errors.push(`${test.id}: тема должна быть slovo или fisher, либо добавьте палитру`);
  }
  if (test.questions.length < 8) errors.push(`${test.id}: мало вопросов`);

  const characterIds = new Set(test.characters.map((character) => character.id));
  if (characterIds.size !== test.characters.length) errors.push(`${test.id}: повторяются герои`);
  const primaries = Object.fromEntries([...characterIds].map((id) => [id, 0]));

  for (const character of test.characters) {
    if (!scenes.has(character.scene)) errors.push(`${test.id}: у ${character.id} нет сцены ${character.scene}`);
    if (!character.season || !character.about?.length || !character.summary) {
      errors.push(`${test.id}: неполное досье ${character.id}`);
    }
  }

  const questionIds = new Set();
  for (const question of test.questions) {
    if (questionIds.has(question.id)) errors.push(`${test.id}: повтор вопроса ${question.id}`);
    questionIds.add(question.id);
    if (!scenes.has(question.scene)) errors.push(`${test.id}: нет картинки ${question.scene}`);
    if (question.options.length !== 4) errors.push(`${test.id}: у ${question.id} не 4 ответа`);
    for (const option of question.options) {
      const scoreIds = Object.keys(option.scores);
      const linkIds = Object.keys(option.links);
      if (scoreIds.join() !== linkIds.join()) {
        errors.push(`${test.id} ${question.id}/${option.id}: баллы и связи не совпадают`);
      }
      for (const [id, points] of Object.entries(option.scores)) {
        if (!characterIds.has(id)) errors.push(`${test.id}: неизвестный герой ${id}`);
        if (!option.links[id]) errors.push(`${test.id}: пустая связь ${id}`);
        if (points >= 3) primaries[id] += 1;
      }
    }
  }

  for (const [id, count] of Object.entries(primaries)) {
    if (count < 3) errors.push(`${test.id}: у ${id} мало сильных ответов (${count})`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Ок: ${tests.length} теста, ${categories.length} категория, ${scenes.size} иллюстраций.`);

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryTabs } from "../components/CategoryTabs.jsx";
import { NotFound } from "../components/NotFound.jsx";
import { TestCard } from "../components/TestCard.jsx";
import { categories, getCategory, tests } from "../data/index.js";

export function Catalog() {
  const { categoryId } = useParams();
  const selected = categoryId ? getCategory(categoryId) : null;

  useEffect(() => {
    document.title = selected ? `${selected.title} — Эпизод` : "Эпизод — кто ты из сериала";
  }, [selected]);

  if (categoryId && !selected) {
    return <NotFound title="Такой категории нет" text="Добавьте её в src/data/categories.js — и она появится отдельной вкладкой." />;
  }

  const groups = selected ? [selected] : categories;

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Каталог тестов</p>
        <h1>Кто вы в этой истории</h1>
        <p className="lede">
          Выберите вкладку, пройдите тест и получите героя: из какого он сезона, кто он в сюжете
          и какие ваши ответы его вызвали. У каждого вопроса своя картинка.
        </p>
      </section>
      <div className="folder">
        <CategoryTabs />
        <div className="panel" role="tabpanel">
          {groups.map((category) => {
            const items = tests.filter((test) => test.categoryId === category.id);
            return (
              <section className="group" key={category.id}>
                <h2>{category.title}</h2>
                <p className="group-lead">{category.description}</p>
                {items.length === 0 ? (
                  <p className="empty">В этой категории пока нет тестов. Новый тест добавляется карточкой сюда.</p>
                ) : (
                  <div className="grid">
                    {items.map((test) => (
                      <TestCard key={test.id} test={test} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}

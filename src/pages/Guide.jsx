import { useEffect } from "react";

export function Guide() {
  useEffect(() => {
    document.title = "Как добавить тест — Эпизод";
  }, []);

  return (
    <article className="guide">
      <p className="eyebrow">Каталог растёт вкладками</p>
      <h1>Новая категория и новый тест</h1>
      <p className="lede">
        Сайт читает данные из файлов. Вкладка появляется сама, карточка — тоже. Картинка вопроса
        берётся из набора сцен.
      </p>
      <ol>
        <li>
          Категория — объект в <code>src/data/categories.js</code>. Поле <code>id</code> станет
          адресом вкладки.
        </li>
        <li>
          Тест — файл рядом с <code>src/data/tests/slovo-patsana.js</code>. У вопроса обязательны
          текст, <code>scene</code> и четыре ответа. У ответа — баллы героям и фраза, как этот
          выбор с героем связан.
        </li>
        <li>
          Подключите тест в массив <code>tests</code> в <code>src/data/index.js</code>.
        </li>
        <li>
          Если нужна новая картинка, добавьте функцию в <code>src/illustrations/QuestionArt.jsx</code>
          {" "}и укажите её имя в <code>scene</code>. Чужие кадры и портреты актёров не используем.
        </li>
        <li>
          Проверка: <code>npm run check</code>. Она ловит битые id, пустые связи и картинки без сцены.
        </li>
      </ol>
    </article>
  );
}

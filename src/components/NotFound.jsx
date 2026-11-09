import { NavLink } from "react-router-dom";

export function NotFound({ title = "Такой страницы нет", text = "Ссылка собрана с опечаткой или тест ещё не добавлен." }) {
  return (
    <section className="sheet">
      <p className="eyebrow">Эпизод</p>
      <h1>{title}</h1>
      <p>{text}</p>
      <p>
        <NavLink className="btn" to="/">
          В каталог
        </NavLink>
      </p>
    </section>
  );
}

import { NavLink, useMatch } from "react-router-dom";
import { categories } from "../data/index.js";

function Tab({ to, end = false, children }) {
  const match = useMatch({ path: to, end });
  return (
    <NavLink to={to} end={end} role="tab" aria-selected={Boolean(match)} className="tab">
      {children}
    </NavLink>
  );
}

export function CategoryTabs() {
  return (
    <div className="tabs" role="tablist" aria-label="Категории тестов">
      <Tab to="/" end>
        Все
      </Tab>
      {categories.map((category) => (
        <Tab key={category.id} to={`/c/${category.id}`}>
          {category.title}
        </Tab>
      ))}
    </div>
  );
}

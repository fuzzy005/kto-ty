import { NavLink } from "react-router-dom";

export function SiteHeader() {
  return (
    <header className="site-head">
      <NavLink to="/" className="logo">
        <span className="logo-mark" aria-hidden="true" />
        Эпизод
      </NavLink>
      <nav className="site-nav" aria-label="Разделы">
        <NavLink to="/" end>
          Каталог
        </NavLink>
        <NavLink to="/guide">Новый тест</NavLink>
      </nav>
    </header>
  );
}

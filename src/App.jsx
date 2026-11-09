import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader.jsx";
import { Catalog } from "./pages/Catalog.jsx";
import { Guide } from "./pages/Guide.jsx";
import { Quiz } from "./pages/Quiz.jsx";
import { Result } from "./pages/Result.jsx";

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <a className="skip" href="#content">
          К содержанию
        </a>
        <SiteHeader />
        <main id="content">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/c/:categoryId" element={<Catalog />} />
            <Route path="/t/:testId" element={<Quiz />} />
            <Route path="/t/:testId/result" element={<Result />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="site-foot">
          <p>
            Фанатский проект «Эпизод». Не связан с авторами сериалов и правообладателями.
            Картинки нарисованы для теста и не являются кадрами.
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}

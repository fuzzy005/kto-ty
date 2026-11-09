import { NavLink } from "react-router-dom";
import { getCategory } from "../data/index.js";
import { QuestionArt } from "../illustrations/QuestionArt.jsx";

export function TestCard({ test }) {
  const category = getCategory(test.categoryId);
  return (
    <article className="card" data-theme={test.theme}>
      <NavLink className="card-link" to={`/t/${test.id}`}>
        <div className="card-art">
          <QuestionArt scene={test.cover} theme={test.theme} grain={false} />
        </div>
        <div className="card-body">
          <p className="card-kicker">
            {category?.title} · {test.seasons}
          </p>
          <h2>{test.title}</h2>
          <p>{test.lead}</p>
          <p className="meta">
            {test.questions.length} вопросов · около {test.minutes} минут · сериалы 18+
          </p>
        </div>
      </NavLink>
    </article>
  );
}

import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound.jsx";
import { getTest } from "../data/index.js";
import { QuestionArt } from "../illustrations/QuestionArt.jsx";
import { isComplete, scoreTest } from "../lib/score.js";
import { clearRun, loadRun } from "../lib/storage.js";

export function Result() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = getTest(testId);
  const run = test ? loadRun(test.id) : null;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!test) return;
    document.title = `Результат — ${test.title}`;
  }, [test]);

  if (!test) return <NotFound title="Такого теста нет" />;
  if (!run || run.status !== "done" || !isComplete(test, run.answers)) {
    return <Navigate to={`/t/${test.id}`} replace />;
  }

  const { winner, reasons, ranked } = scoreTest(test, run.answers);
  const character = winner.character;
  const title = character.nickname || character.name;
  const match = winner.max ? Math.round((winner.points / winner.max) * 100) : 0;
  const runners = ranked.slice(1, 3);

  async function copyResult() {
    const text = `Я в «Эпизоде»: ${title}${character.nickname ? `, ${character.name}` : ""}. ${character.season}, ${test.title}.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="result" data-theme={test.theme}>
      <figure className="result-art">
        <QuestionArt scene={character.scene} theme={test.theme} />
      </figure>
      <p className="eyebrow">Ваш эпизод · {character.season}</p>
      <h1 className="result-name">{title}</h1>
      <p className="result-sub">
        {character.nickname ? `${character.name}. ` : ""}
        {character.role}
      </p>
      <p className="actor">
        {character.seasonNote} · {character.actor}
      </p>
      <p className="match">{match}% из самого близкого этому герою пути</p>
      <div className="chips">
        {character.traits.map((trait) => (
          <span className="chip" key={trait}>
            {trait}
          </span>
        ))}
      </div>
      <div className="about">
        {character.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="hint">Дальше есть события сезона.</p>

      <h2 className="section-title">Как к этому пришли ваши ответы</h2>
      <div className="reasons">
        {reasons.map((reason) => (
          <article className="reason" key={`${reason.question}-${reason.answer}`}>
            <div className="thumb">
              <QuestionArt scene={reason.scene} theme={test.theme} grain={false} />
            </div>
            <div>
              <p className="reason-q">{reason.question}</p>
              <p className="reason-a">{reason.answer}</p>
              <p className="reason-link">{reason.link}</p>
            </div>
          </article>
        ))}
      </div>

      {runners.length > 0 ? (
        <>
          <h2 className="section-title">Рядом по баллам</h2>
          <div className="runners">
            {runners.map((item) => {
              const name = item.character.nickname || item.character.name;
              const width = winner.points ? Math.max(8, Math.round((item.points / winner.points) * 100)) : 0;
              return (
                <article className="runner" key={item.character.id}>
                  <div className="thumb">
                    <QuestionArt scene={item.character.scene} theme={test.theme} grain={false} />
                  </div>
                  <div>
                    <p className="reason-a">
                      {name} · {item.character.season}
                    </p>
                    <p className="reason-link">{item.character.summary}</p>
                    <div className="bar" aria-hidden="true">
                      <span style={{ width: `${width}%` }} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : null}

      <div className="result-actions">
        <button
          className="btn"
          type="button"
          onClick={() => {
            clearRun(test.id);
            navigate(`/t/${test.id}`);
          }}
        >
          Пройти ещё раз
        </button>
        <NavLink className="ghost" to={test.categoryId ? `/c/${test.categoryId}` : "/"}>
          Другие тесты
        </NavLink>
        <button className="ghost" type="button" onClick={copyResult}>
          {copied ? "Скопировано" : "Скопировать результат"}
        </button>
      </div>
    </article>
  );
}

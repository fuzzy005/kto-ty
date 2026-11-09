import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound.jsx";
import { getTest } from "../data/index.js";
import { QuestionArt } from "../illustrations/QuestionArt.jsx";
import { clearRun, loadRun, saveRun } from "../lib/storage.js";

const keys = ["А", "Б", "В", "Г"];

export function Quiz() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = getTest(testId);
  const [index, setIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [picked, setPicked] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    if (!test) return undefined;
    document.title = `${test.title} — Эпизод`;
    const saved = loadRun(test.id);
    if (!saved || saved.status === "done") {
      if (saved?.status === "done") clearRun(test.id);
      setIndex(-1);
      setAnswers({});
    } else {
      setAnswers(saved.answers || {});
      setIndex(Math.min(saved.index ?? 0, test.questions.length - 1));
    }
    setPicked(null);
    return () => window.clearTimeout(timer.current);
  }, [test]);

  useEffect(() => {
    if (!test || index < 0) return;
    if (loadRun(test.id)?.status === "done") return;
    if (Object.keys(answers).length === 0) return;
    saveRun(test.id, { status: "progress", answers, index });
  }, [answers, index, test]);

  const choose = useCallback(
    (optionId) => {
      if (!test || picked || index < 0) return;
      const question = test.questions[index];
      const next = { ...answers, [question.id]: optionId };
      const last = index + 1 >= test.questions.length;
      setPicked(optionId);
      setAnswers(next);
      if (last) saveRun(test.id, { status: "done", answers: next, index });
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
      timer.current = window.setTimeout(() => {
        if (last) navigate(`/t/${test.id}/result`);
        else {
          setIndex((value) => value + 1);
          setPicked(null);
        }
      }, delay);
    },
    [answers, index, navigate, picked, test],
  );

  useEffect(() => {
    if (!test) return undefined;
    function onKey(event) {
      if (index < 0 || picked) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
      const optionIndex = map[event.key.toLowerCase()];
      if (optionIndex == null) return;
      const option = test.questions[index]?.options[optionIndex];
      if (!option) return;
      event.preventDefault();
      choose(option.id);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, index, picked, test]);

  if (!test) return <NotFound title="Такого теста нет" />;

  if (index < 0) {
    return (
      <section className="quiz" data-theme={test.theme}>
        <div className="quiz-top">
          <NavLink className="ghost" to={test.categoryId ? `/c/${test.categoryId}` : "/"}>
            К каталогу
          </NavLink>
          <span className="badge">{test.seasons}</span>
        </div>
        <figure className="q-art">
          <QuestionArt scene={test.cover} theme={test.theme} />
        </figure>
        <div className="intro-copy">
          <p className="eyebrow">{test.questions.length} вопросов с картинками</p>
          <h1>{test.title}</h1>
          <p>{test.description}</p>
          <p>В результате есть события сезона. Сериалы рассчитаны на взрослых.</p>
          <button className="btn" type="button" onClick={() => setIndex(0)}>
            {Object.keys(answers).length > 0 ? "К вопросам" : "Начать"}
          </button>
        </div>
      </section>
    );
  }

  const question = test.questions[index];
  const active = picked || answers[question.id];
  const progress = ((index + 1) / test.questions.length) * 100;

  return (
    <section className="quiz" data-theme={test.theme}>
      <div className="quiz-top">
        <button className="ghost" type="button" onClick={() => setIndex((value) => (value <= 0 ? -1 : value - 1))} disabled={Boolean(picked)}>
          Назад
        </button>
        <span className="badge">{test.seasons}</span>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <figure className="q-art">
        <QuestionArt key={question.id} scene={question.scene} theme={test.theme} />
        <span className="q-count">
          {String(index + 1).padStart(2, "0")} / {String(test.questions.length).padStart(2, "0")}
        </span>
      </figure>
      <h1 className="question">{question.text}</h1>
      <div className="options" role="group" aria-label="Варианты ответа">
        {question.options.map((option, optionIndex) => (
          <button
            key={option.id}
            className={active === option.id ? "option is-on" : "option"}
            type="button"
            onClick={() => choose(option.id)}
            disabled={Boolean(picked)}
          >
            <span className="option-key">{keys[optionIndex]}</span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
      <p className="hint">Можно ответить клавишами 1–4. Картинка каждый раз своя.</p>
    </section>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { categories } from "../data/questions.js";
import { buildChoiceVariant, buildChoiceVariants } from "../data/choiceVariants.js";
import { pickUniqueDifficultyMixedQuestions } from "../data/questionSelection.js";
import { useArrowNavigation } from "../hooks/useArrowNavigation.js";
import ProgressBar from "./ProgressBar.jsx";
import QuestionCard from "./QuestionCard.jsx";

const REVIEW_SIZE = 50;

function keepSavedChoice(question, savedProgress) {
  if (!savedProgress?.selectedChoice || question.choices.includes(savedProgress.selectedChoice)) {
    return question;
  }

  const correctChoice = question.choices[question.answer];
  const replaceIndex = question.choices.findIndex((choice, index) => index !== question.answer && choice !== correctChoice);
  if (replaceIndex < 0 || savedProgress.selectedChoice === correctChoice) {
    return question;
  }

  const choices = [...question.choices];
  choices[replaceIndex] = savedProgress.selectedChoice;

  return {
    ...question,
    choices,
    answer: choices.indexOf(correctChoice),
  };
}

function getSavedSelectedIndex(question, instantProgress) {
  const saved = instantProgress[question.id];
  if (!saved) return undefined;
  const selectedIndex = question.choices.indexOf(saved.selectedChoice);
  return selectedIndex >= 0 ? selectedIndex : undefined;
}

export default function PracticeMode({
  questions,
  initialMode = "instant",
  instantProgress = {},
  onSaveInstantProgress,
  onSaveWrong,
  onClearWrong,
  onHome,
}) {
  const [category, setCategory] = useState("전체");
  const [feedbackMode, setFeedbackMode] = useState(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [instantQuestions, setInstantQuestions] = useState([]);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const numberListRef = useRef(null);
  const numberButtonRefs = useRef([]);

  const categoryQuestions = useMemo(() => {
    return category === "전체" ? questions : questions.filter((question) => question.category === category);
  }, [category, questions]);

  const buildReviewQuestions = () => {
    const picked = pickUniqueDifficultyMixedQuestions(categoryQuestions, REVIEW_SIZE).map((question) =>
      buildChoiceVariant(question, categoryQuestions),
    );
    setReviewQuestions(picked);
  };

  const buildInstantQuestions = () => {
    setInstantQuestions(
      buildChoiceVariants(categoryQuestions, categoryQuestions).map((question) =>
        keepSavedChoice(question, instantProgress[question.id]),
      ),
    );
  };

  useEffect(() => {
    if (feedbackMode === "review") {
      buildReviewQuestions();
      setCurrentIndex(0);
      setSelectedAnswers({});
    }
  }, [feedbackMode, category, categoryQuestions.length]);

  useEffect(() => {
    if (feedbackMode === "instant") {
      buildInstantQuestions();
      setCurrentIndex(0);
      setSelectedAnswers({});
    }
  }, [feedbackMode, category, categoryQuestions.length]);

  const activeQuestions = feedbackMode === "instant" ? instantQuestions : reviewQuestions;
  const isInstant = feedbackMode === "instant";
  const currentQuestion = activeQuestions[currentIndex];
  const selected = currentQuestion
    ? isInstant
      ? getSavedSelectedIndex(currentQuestion, instantProgress)
      : selectedAnswers[currentQuestion.id]
    : undefined;
  const answeredCount = activeQuestions.filter((question) =>
    isInstant ? getSavedSelectedIndex(question, instantProgress) !== undefined : selectedAnswers[question.id] !== undefined,
  ).length;
  const correctCount = activeQuestions.filter((question) => {
    const selectedIndex = isInstant ? getSavedSelectedIndex(question, instantProgress) : selectedAnswers[question.id];
    return selectedIndex === question.answer;
  }).length;
  const score = activeQuestions.length ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

  const handleSelect = (choiceIndex) => {
    if (!currentQuestion || selected !== undefined) return;
    if (isInstant) {
      onSaveInstantProgress?.(currentQuestion, choiceIndex);
    } else {
      setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: choiceIndex }));
    }

    if (choiceIndex === currentQuestion.answer) {
      onClearWrong(currentQuestion.id);
    } else {
      onSaveWrong(currentQuestion, choiceIndex);
    }
  };

  const resetPractice = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    if (isInstant) {
      buildInstantQuestions();
    } else {
      buildReviewQuestions();
    }
  };

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);
    setCurrentIndex(0);
    setSelectedAnswers({});
  };

  const changeMode = (nextMode) => {
    setFeedbackMode(nextMode);
    setSelectedAnswers({});
    setCurrentIndex(0);
  };

  useArrowNavigation({
    currentIndex,
    total: activeQuestions.length,
    onMove: setCurrentIndex,
  });

  useEffect(() => {
    const container = numberListRef.current;
    const button = numberButtonRefs.current[currentIndex];
    if (!container || !button) return;

    const padding = 12;
    const buttonLeft = button.offsetLeft;
    const buttonRight = buttonLeft + button.offsetWidth;
    const visibleLeft = container.scrollLeft;
    const visibleRight = visibleLeft + container.clientWidth;

    if (buttonLeft < visibleLeft + padding) {
      container.scrollTo({ left: Math.max(0, buttonLeft - padding), behavior: "smooth" });
    } else if (buttonRight > visibleRight - padding) {
      container.scrollTo({ left: buttonRight - container.clientWidth + padding, behavior: "smooth" });
    }
  }, [currentIndex, activeQuestions.length]);

  return (
    <main className="page-shell space-y-5">
      <section className="panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-2xl">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">문제 연습 모드</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">
              {isInstant ? "정답 즉시 확인" : `랜덤 ${activeQuestions.length}문항 즉시 해설`}
            </h1>
            <ProgressBar current={answeredCount} total={activeQuestions.length} label="풀이 현황" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={feedbackMode}
              onChange={(event) => changeMode(event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="instant">즉시 풀이</option>
              <option value="review">시험처럼 연습</option>
            </select>
            <select
              value={category}
              onChange={(event) => changeCategory(event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="전체">전체</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {!isInstant && (
              <button type="button" onClick={resetPractice} className="primary-button">
                새 50문항
              </button>
            )}
            <button type="button" onClick={onHome} className="secondary-button">
              홈으로
            </button>
          </div>
        </div>
      </section>

      {!isInstant && answeredCount > 0 && (
        <section className="panel p-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <ScoreTile label="현재 점수" value={`${score}점`} tone={score >= 60 ? "green" : "red"} />
            <ScoreTile label="정답" value={`${correctCount}개`} />
            <ScoreTile label="오답" value={`${answeredCount - correctCount}개`} tone="red" />
            <ScoreTile label="남은 문제" value={`${activeQuestions.length - answeredCount}개`} />
          </div>
        </section>
      )}

      <QuestionCard
        question={currentQuestion}
        index={currentIndex}
        total={activeQuestions.length}
        selected={selected}
        onSelect={handleSelect}
        showAnswer={selected !== undefined}
        disabled={selected !== undefined}
      />

      <section className="panel p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div ref={numberListRef} className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 pr-1">
            {activeQuestions.map((question, index) => {
              const selectedIndex = isInstant
                ? getSavedSelectedIndex(question, instantProgress)
                : selectedAnswers[question.id];
              const isAnswered = selectedIndex !== undefined;
              const isCorrect = selectedIndex === question.answer;
              const isCurrent = index === currentIndex;
              return (
                <button
                  type="button"
                  key={`${question.id}-${index}`}
                  ref={(element) => {
                    numberButtonRefs.current[index] = element;
                  }}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-10 min-w-10 rounded-md border text-sm font-bold ${
                    isCurrent
                      ? "border-blue-600 bg-blue-600 text-white"
                      : isAnswered
                        ? isCorrect
                          ? "border-green-300 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
                          : "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
                        : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="secondary-button"
            >
              이전
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex(Math.min(activeQuestions.length - 1, currentIndex + 1))}
              disabled={currentIndex === activeQuestions.length - 1}
              className="primary-button"
            >
              다음
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ScoreTile({ label, value, tone = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    green: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200",
    red: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-2 rounded-md px-3 py-2 text-2xl font-bold ${colors[tone]}`}>{value}</p>
    </div>
  );
}

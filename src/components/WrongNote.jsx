import { useEffect, useMemo, useRef, useState } from "react";
import { useArrowNavigation } from "../hooks/useArrowNavigation.js";
import WrongNoteQuestionCard from "./WrongNoteQuestionCard.jsx";

export default function WrongNote({ wrongItems, questions, onSaveWrong, onClearWrong, onHome }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const numberListRef = useRef(null);
  const numberButtonRefs = useRef([]);

  const wrongQuestions = useMemo(() => {
    return wrongItems
      .map((item) => {
        const question = questions.find((candidate) => candidate.id === item.id);
        if (!question) return null;
        return {
          ...question,
          attempts: item.attempts ?? 1,
          savedAt: item.savedAt,
          lastSelected: item.selected,
          lastSelectedChoice: item.selectedChoice ?? question.choices[item.selected],
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const attemptGap = (b.attempts ?? 1) - (a.attempts ?? 1);
        if (attemptGap !== 0) return attemptGap;
        return new Date(b.savedAt ?? 0).getTime() - new Date(a.savedAt ?? 0).getTime();
      });
  }, [questions, wrongItems]);

  const currentQuestion = wrongQuestions[currentIndex];
  const selected = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;

  const handleSelect = (choiceIndex) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: choiceIndex }));
    if (choiceIndex === currentQuestion.answer) {
      onClearWrong(currentQuestion.id);
    } else {
      onSaveWrong(currentQuestion, choiceIndex);
    }
  };

  useArrowNavigation({
    currentIndex,
    total: wrongQuestions.length,
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
  }, [currentIndex, wrongQuestions.length]);

  if (wrongQuestions.length === 0) {
    return (
      <main className="page-shell">
        <section className="panel p-8 text-center">
          <p className="text-sm font-semibold text-green-700 dark:text-green-300">오답노트</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-50">저장된 오답이 없습니다</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            시험 모드나 연습 모드에서 틀린 문제가 생기면 여기에 자동 저장됩니다.
          </p>
          <button type="button" onClick={onHome} className="primary-button mt-6">
            홈으로
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell space-y-5">
      <section className="panel p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">오답노트</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">틀린 문제 다시 풀기</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              다시 맞힌 문제는 오답노트에서 자동으로 제거됩니다.
            </p>
          </div>
          <button type="button" onClick={onHome} className="secondary-button">
            홈으로
          </button>
        </div>
      </section>

      <WrongNoteQuestionCard
        question={currentQuestion}
        index={currentIndex}
        total={wrongQuestions.length}
        selected={selected}
        onSelect={handleSelect}
        showAnswer={selected !== undefined}
      />

      {currentQuestion?.lastSelectedChoice && selected === undefined && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100">
          <p>지난번 내 선택: {currentQuestion.lastSelectedChoice}</p>
          <p>누적 오답 횟수: {currentQuestion.attempts ?? 1}회</p>
        </div>
      )}

      <section className="panel p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div ref={numberListRef} className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 pr-1">
            {wrongQuestions.map((question, index) => (
              <button
                type="button"
                key={question.id}
                ref={(element) => {
                  numberButtonRefs.current[index] = element;
                }}
                onClick={() => setCurrentIndex(index)}
                className={`h-10 min-w-10 rounded-md border text-sm font-bold ${
                  index === currentIndex
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
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
              onClick={() => setCurrentIndex(Math.min(wrongQuestions.length - 1, currentIndex + 1))}
              disabled={currentIndex === wrongQuestions.length - 1}
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

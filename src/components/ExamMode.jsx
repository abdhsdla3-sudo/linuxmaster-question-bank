import { useEffect, useRef, useState } from "react";
import { useArrowNavigation } from "../hooks/useArrowNavigation.js";
import ProgressBar from "./ProgressBar.jsx";
import QuestionCard from "./QuestionCard.jsx";

const EXAM_DURATION_SECONDS = 60 * 60;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
}

export default function ExamMode({
  examQuestions,
  answers,
  currentIndex,
  setCurrentIndex,
  onSelect,
  onSubmit,
  onHome,
  viewMode,
  setViewMode,
}) {
  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION_SECONDS);
  const submittedRef = useRef(false);
  const onSubmitRef = useRef(onSubmit);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    submittedRef.current = false;
    setRemainingSeconds(EXAM_DURATION_SECONDS);
  }, [examQuestions]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          if (!submittedRef.current) {
            submittedRef.current = true;
            onSubmitRef.current({ force: true, reason: "timeout" });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [examQuestions]);

  const answeredCount = examQuestions.filter((question) => answers[question.id] !== undefined).length;
  const currentQuestion = examQuestions[currentIndex];
  const isDangerTime = remainingSeconds <= 5 * 60;

  const submitExam = () => {
    submittedRef.current = true;
    onSubmit();
  };

  const scrollToExamTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToExamBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  const moveToQuestion = (index) => {
    setCurrentIndex(index);
    if (viewMode === "all") {
      window.requestAnimationFrame(() => {
        document.getElementById(`exam-question-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  useArrowNavigation({
    currentIndex,
    total: examQuestions.length,
    onMove: moveToQuestion,
  });

  return (
    <main className="page-shell space-y-5">
      <section className="panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-2xl">
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">시험 모드</p>
            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-slate-950 dark:text-slate-50">랜덤 50문항</h1>
              <div
                className={`w-fit rounded-md px-4 py-2 text-lg font-bold ${
                  isDangerTime
                    ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200"
                }`}
              >
                남은 시간 {formatTime(remainingSeconds)}
              </div>
            </div>
            <ProgressBar current={answeredCount} total={examQuestions.length} label="풀이 현황" />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              리눅스마스터 2급 1차 형식에 맞춰 50문항 / 60분 기준으로 연습합니다.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={viewMode}
              onChange={(event) => setViewMode(event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <option value="single">한 문제씩 보기</option>
              <option value="all">전체 문제 한 페이지</option>
            </select>
            <button type="button" onClick={submitExam} className="primary-button">
              제출 및 채점
            </button>
            <button type="button" onClick={onHome} className="secondary-button">
              홈으로
            </button>
          </div>
        </div>
      </section>

      <QuestionNavigator
        examQuestions={examQuestions}
        answers={answers}
        currentIndex={currentIndex}
        onMove={moveToQuestion}
      />

      {viewMode === "single" ? (
        <>
          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={examQuestions.length}
            selected={answers[currentQuestion?.id]}
            onSelect={(choiceIndex) => onSelect(currentQuestion.id, choiceIndex)}
          />

          <section className="panel p-4">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
              <button
                type="button"
                onClick={() => moveToQuestion(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="secondary-button"
              >
                이전
              </button>
              <button
                type="button"
                onClick={() => moveToQuestion(Math.min(examQuestions.length - 1, currentIndex + 1))}
                disabled={currentIndex === examQuestions.length - 1}
                className="primary-button"
              >
                다음
              </button>
            </div>
          </section>
        </>
      ) : (
        <section id="exam-all-top" className="space-y-4">
          <FloatingScrollButtons onTop={scrollToExamTop} onBottom={scrollToExamBottom} />

          {examQuestions.map((question, index) => (
            <div id={`exam-question-${index}`} key={question.id} className="scroll-mt-4">
              <QuestionCard
                question={question}
                index={index}
                total={examQuestions.length}
                selected={answers[question.id]}
                onSelect={(choiceIndex) => onSelect(question.id, choiceIndex)}
              />
            </div>
          ))}

          <div id="exam-all-bottom" className="panel sticky bottom-4 z-10 border-blue-100 p-4 shadow-lg dark:border-blue-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {answeredCount} / {examQuestions.length}문제 풀이 완료
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  마지막 문제까지 풀었다면 여기서 바로 제출하고 채점할 수 있습니다.
                </p>
              </div>
              <button type="button" onClick={submitExam} className="primary-button">
                제출 및 채점
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function FloatingScrollButtons({ onTop, onBottom }) {
  return (
    <div className="fixed bottom-8 right-3 z-30 flex w-11 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white/90 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 sm:right-5">
      <button
        type="button"
        onClick={onTop}
        aria-label="페이지 맨 위로 이동"
        title="맨 위로"
        className="flex h-11 items-center justify-center border-b border-slate-200 text-2xl font-bold leading-none text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-300 dark:focus:ring-blue-900"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onBottom}
        aria-label="페이지 맨 아래로 이동"
        title="맨 아래로"
        className="flex h-11 items-center justify-center text-2xl font-bold leading-none text-slate-600 transition hover:bg-slate-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-300 dark:focus:ring-blue-900"
      >
        ↓
      </button>
    </div>
  );
}

function QuestionNavigator({ examQuestions, answers, currentIndex, onMove }) {
  return (
    <section className="panel p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">문제 번호 이동</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">답을 선택한 문제는 파란색으로 표시됩니다.</p>
        </div>
        <div className="grid w-full grid-cols-5 gap-2 sm:grid-cols-10 lg:grid-cols-[repeat(25,minmax(0,1fr))]">
          {examQuestions.map((question, index) => {
            const isAnswered = answers[question.id] !== undefined;
            const isCurrent = index === currentIndex;
            return (
              <button
                type="button"
                key={question.id}
                onClick={() => onMove(index)}
                className={`h-10 w-full rounded-md border text-sm font-bold ${
                  isCurrent
                    ? "border-blue-600 bg-blue-600 text-white"
                    : isAnswered
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
                      : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

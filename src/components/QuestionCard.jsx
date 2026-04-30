import { buildChoiceExplanationLines, buildWrongChoiceReason } from "../data/explanationHelpers.js";

const labels = ["①", "②", "③", "④"];

export default function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
  showAnswer = false,
  disabled = false,
}) {
  if (!question) {
    return <div className="panel p-6 text-slate-600 dark:text-slate-300">표시할 문제가 없습니다.</div>;
  }

  const isWrong = showAnswer && selected !== question.answer;
  const choiceExplanationLines = showAnswer ? buildChoiceExplanationLines(question, selected) : [];

  return (
    <article className="panel p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">{question.category}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {index + 1} / {total}문제
          </p>
        </div>
        <span className="w-fit rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {selected === undefined ? "미응답" : "선택 완료"}
        </span>
      </div>

      <h2 className="mt-5 whitespace-pre-line text-xl font-bold leading-8 text-slate-950 dark:text-slate-50">
        {question.question}
      </h2>

      <div className="mt-5 space-y-3">
        {question.choices.map((choice, choiceIndex) => {
          const isSelected = selected === choiceIndex;
          const isCorrect = question.answer === choiceIndex;
          const resultClass = showAnswer
            ? isCorrect
              ? "border-green-500 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950 dark:text-green-100"
              : isSelected
                ? "border-red-500 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-950 dark:text-red-100"
                : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            : isSelected
              ? "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-100"
              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-800";

          return (
            <button
              type="button"
              key={`${question.id}-${choiceIndex}-${choice}`}
              disabled={disabled}
              onClick={() => onSelect(choiceIndex)}
              className={`flex min-h-12 w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-sm font-medium transition ${resultClass} ${disabled ? "cursor-default" : ""}`}
            >
              <span className="font-bold">{labels[choiceIndex]}</span>
              <span className="flex-1 leading-6">{choice}</span>
              {showAnswer && isCorrect && <span className="text-xs font-bold text-green-700 dark:text-green-300">정답</span>}
              {showAnswer && isSelected && !isCorrect && (
                <span className="text-xs font-bold text-red-700 dark:text-red-300">내 선택</span>
              )}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="mt-5 space-y-3">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {selected === question.answer ? "정답입니다." : `오답입니다. 정답은 ${labels[question.answer]}번입니다.`}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{question.explanation}</p>
          </div>

          <div className="rounded-md border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
            <p className="text-sm font-bold text-blue-900 dark:text-blue-100">선택지별 해설</p>
            <ul className="mt-2 space-y-1">
              {choiceExplanationLines.map((line) => (
                <li key={line} className="text-sm leading-6 text-blue-900 dark:text-blue-100">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {isWrong && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
              <p className="text-sm font-bold text-red-800 dark:text-red-100">내 선택이 틀린 이유</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-red-800 dark:text-red-100">
                {buildWrongChoiceReason(question, selected)}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

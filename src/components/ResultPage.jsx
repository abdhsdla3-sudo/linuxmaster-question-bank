import QuestionCard from "./QuestionCard.jsx";

export default function ResultPage({ result, onHome, onRetry, onWrongNote }) {
  if (!result) {
    return (
      <main className="page-shell">
        <div className="panel p-6">
          <p className="text-slate-600">채점 결과가 없습니다.</p>
          <button type="button" onClick={onHome} className="primary-button mt-4">
            홈으로
          </button>
        </div>
      </main>
    );
  }

  const passed = result.score >= 60;

  return (
    <main className="page-shell space-y-5">
      <section className="panel p-6">
        <p className="text-sm font-semibold text-blue-700">시험 결과</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <ScoreTile label="점수" value={`${result.score}점`} tone={passed ? "green" : "red"} />
          <ScoreTile label="정답" value={`${result.correctCount}개`} />
          <ScoreTile label="오답/미응답" value={`${result.wrongCount}개`} tone="red" />
          <ScoreTile label="판정" value={passed ? "합격" : "불합격"} tone={passed ? "green" : "red"} />
        </div>
        <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          합격 기준은 60점 이상입니다. 50문항 기준 30문항 이상 맞으면 합격권입니다.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onRetry} className="primary-button">
            새 시험 다시 풀기
          </button>
          <button type="button" onClick={onWrongNote} className="secondary-button">
            오답노트 보기
          </button>
          <button type="button" onClick={onHome} className="secondary-button">
            홈으로
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-950">문항별 해설</h2>
        {result.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            total={result.questions.length}
            selected={result.answers[question.id]}
            showAnswer
            disabled
            onSelect={() => {}}
          />
        ))}
      </section>
    </main>
  );
}

function ScoreTile({ label, value, tone = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 rounded-md px-3 py-2 text-2xl font-bold ${colors[tone]}`}>{value}</p>
    </div>
  );
}

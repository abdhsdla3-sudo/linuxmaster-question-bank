export default function Home({
  totalQuestions,
  wrongCount,
  categories,
  weakCategories,
  examHistory,
  averageScore,
  unseenExamCount,
  onStartExam,
  onPracticeInstant,
  onPracticeReview,
  onWrongNote,
  onConcepts,
  onQuestionList,
  onReset,
}) {
  return (
    <main className="page-shell">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-6 sm:p-8">
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Linux Master Level 2 Part 1</p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 dark:text-slate-50 sm:text-4xl">
            리눅스마스터 2급 1차 문제은행
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            1000문항 문제은행에서 랜덤 50문항을 풀고, 점수와 해설을 확인하세요.
            1차 학습 범위 기반 개념 정리와 오답 설명을 함께 볼 수 있습니다.
          </p>
          <div className="mx-auto mt-6 grid max-w-3xl justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <button type="button" onClick={onStartExam} className="primary-button">
              시험 시작
            </button>
            <button type="button" onClick={onPracticeInstant} className="secondary-button">
              즉시 풀이
            </button>
            <button type="button" onClick={onPracticeReview} className="secondary-button">
              시험처럼 연습
            </button>
            <button type="button" onClick={onWrongNote} className="secondary-button">
              오답노트
            </button>
            <button type="button" onClick={onConcepts} className="secondary-button">
              개념 정리
            </button>
            <button type="button" onClick={onReset} className="danger-button">
              기록 초기화
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard label="전체 문제" value={`${totalQuestions}문항`} onClick={onQuestionList} hint="눌러서 문제만 보기" />
          <StatCard label="시험 미출제" value={`${unseenExamCount}문항`} tone={unseenExamCount < 50 ? "red" : "blue"} />
          <StatCard label="응시 횟수" value={`${examHistory.length}회`} />
          <StatCard label="평균 점수" value={examHistory.length ? `${averageScore}점` : "기록 없음"} />
          <StatCard label="저장된 오답" value={`${wrongCount}개`} tone={wrongCount > 0 ? "red" : "blue"} />
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">학습 카테고리</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span key={category} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {category}
              </span>
            ))}
          </div>

          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-100">자주 틀리는 카테고리</h3>
            {weakCategories.length === 0 ? (
              <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-100">
                아직 누적된 오답 통계가 없습니다. 문제를 풀면 취약 영역이 자동으로 표시됩니다.
              </p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {weakCategories.map((item) => (
                  <span
                    key={item.category}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-amber-900 dark:bg-slate-900 dark:text-amber-100"
                  >
                    {item.category} · {item.count}회
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">최근 시험 기록</h2>
          {examHistory.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">아직 저장된 시험 기록이 없습니다.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {examHistory.slice(0, 5).map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-md border border-slate-200 p-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.score}점</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      정답 {item.correctCount}개 · 오답 {item.wrongCount}개 · {new Date(item.takenAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`w-fit rounded-md px-3 py-2 text-sm font-bold ${item.score >= 60 ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"}`}>
                    {item.score >= 60 ? "합격권" : "보강 필요"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, tone = "blue", hint, onClick }) {
  const toneClass = tone === "red"
    ? "text-red-700 bg-red-50 dark:text-red-200 dark:bg-red-950"
    : "text-blue-700 bg-blue-50 dark:text-blue-200 dark:bg-blue-950";
  const content = (
    <>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-3 inline-flex rounded-md px-3 py-2 text-2xl font-bold ${toneClass}`}>{value}</p>
      {hint && <p className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-300">{hint}</p>}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="panel p-5 text-left transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:hover:border-blue-800 dark:hover:bg-blue-950 dark:focus:ring-blue-900"
      >
        {content}
      </button>
    );
  }

  return (
    <div className="panel p-5">
      {content}
    </div>
  );
}

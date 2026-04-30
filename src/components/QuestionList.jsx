import { useMemo, useState } from "react";
import { categories } from "../data/questions.js";

const difficultyOptions = ["전체", "기초", "중간", "실전", "헷갈림", "어려움"];

export default function QuestionList({ questions, onHome }) {
  const [category, setCategory] = useState("전체");
  const [difficulty, setDifficulty] = useState("전체");
  const [keyword, setKeyword] = useState("");

  const filteredQuestions = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return questions.filter((question) => {
      const matchesCategory = category === "전체" || question.category === category;
      const matchesDifficulty = difficulty === "전체" || question.difficulty === difficulty;
      const matchesKeyword =
        !normalizedKeyword ||
        question.question.toLowerCase().includes(normalizedKeyword) ||
        question.category.toLowerCase().includes(normalizedKeyword);

      return matchesCategory && matchesDifficulty && matchesKeyword;
    });
  }, [category, difficulty, keyword, questions]);

  return (
    <main className="page-shell space-y-5">
      <section className="panel p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">문제 훑어보기</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">전체 문제 보기</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              정답과 해설 없이 문제 문장만 빠르게 확인하는 화면입니다.
            </p>
          </div>
          <button type="button" onClick={onHome} className="secondary-button">
            홈으로
          </button>
        </div>
      </section>

      <section className="panel p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="문제 키워드 검색"
            className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-blue-950"
          />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="전체">전체 카테고리</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {difficultyOptions.map((item) => (
              <option key={item} value={item}>
                {item === "전체" ? "전체 난이도" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-md bg-blue-50 px-3 py-2 font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-200">
            표시 {filteredQuestions.length}문항
          </span>
          <span className="rounded-md bg-slate-100 px-3 py-2 font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            전체 {questions.length}문항
          </span>
        </div>
      </section>

      <section className="space-y-3">
        {filteredQuestions.map((question, index) => (
          <article key={question.id} className="panel p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {index + 1}. ID {question.id} · {question.category} · {question.difficulty ?? "난이도 없음"}
                </p>
                <h2 className="mt-2 text-base font-bold leading-7 text-slate-950 dark:text-slate-50">
                  {question.question}
                </h2>
              </div>
            </div>
          </article>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="panel p-8 text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-200">검색 조건에 맞는 문제가 없습니다.</p>
          </div>
        )}
      </section>
    </main>
  );
}

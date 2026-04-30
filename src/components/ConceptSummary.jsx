import { useRef } from "react";
import { detailedConceptSections } from "../data/detailedConcepts.js";

export default function ConceptSummary({ onHome }) {
  const contentRef = useRef(null);
  const sectionRefs = useRef({});

  const moveToSection = (sectionId) => {
    const content = contentRef.current;
    const section = sectionRefs.current[sectionId];

    if (!content || !section) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const contentTop = content.getBoundingClientRect().top;
    const sectionTop = section.getBoundingClientRect().top;
    content.scrollTo({
      top: content.scrollTop + sectionTop - contentTop - 8,
      behavior: "smooth",
    });
  };

  return (
    <main className="page-shell space-y-5">
      <section className="panel p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">강의자료 기반</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">카테고리별 개념 정리</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              사용자가 제공한 리눅스 강의 PDF와 1차 시험 범위를 기준으로 자주 나오는 개념을 넓게 정리했습니다.
            </p>
          </div>
          <button type="button" onClick={onHome} className="secondary-button">
            홈으로
          </button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="panel h-fit p-4 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">개념 목차</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            원하는 카테고리를 누르면 해당 정리로 바로 이동합니다.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {detailedConceptSections.map((section) => (
              <button
                type="button"
                key={section.id}
                onClick={() => moveToSection(section.id)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-700 dark:hover:bg-blue-950"
              >
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        <div ref={contentRef} className="space-y-5 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto lg:pr-2">
          {detailedConceptSections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              ref={(element) => {
                sectionRefs.current[section.id] = element;
              }}
              className="panel scroll-mt-5 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">{section.source}</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-slate-50">{section.title}</h2>
                </div>
                <span className="w-fit rounded-md bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {section.groups.reduce((sum, group) => sum + group.items.length, 0)}개 포인트
                </span>
              </div>

              <div className="mt-5 space-y-5">
                {section.groups.map((group) => (
                  <section key={group.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{group.title}</h3>
                    <ul className="mt-3 grid gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

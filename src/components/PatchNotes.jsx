import { patchNotes, plannedPatchNotes } from "../data/patchNotes.js";

function getPatchId(version) {
  return `patch-${version.replaceAll(".", "-")}`;
}

function moveToPatch(version) {
  document.getElementById(getPatchId(version))?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PatchNotes({ onHome }) {
  return (
    <main className="page-shell space-y-5">
      <section className="panel p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Update History</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">패치노트</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              지금까지 반영한 업데이트와 앞으로 개선할 예정인 내용을 정리해두었습니다.
            </p>
          </div>
          <button type="button" onClick={onHome} className="secondary-button">
            홈으로
          </button>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">버전 바로가기</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {patchNotes.map((note) => (
            <button
              type="button"
              key={note.version}
              onClick={() => moveToPatch(note.version)}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-900"
            >
              {note.version} · {note.title}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">적용된 패치</h2>
          {patchNotes.map((note) => (
            <article id={getPatchId(note.version)} key={note.version} className="panel scroll-mt-5 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <button
                    type="button"
                    onClick={() => moveToPatch(note.version)}
                    className="text-left text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300"
                  >
                    {note.version} · {note.date}
                  </button>
                  <h3 className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-50">{note.title}</h3>
                </div>
                <span className="w-fit rounded-md bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                  {note.status}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {note.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">앞으로 패치할 내용</h2>
          {plannedPatchNotes.map((note) => (
            <article key={note.title} className="panel p-5">
              <h3 className="text-lg font-bold text-slate-950 dark:text-slate-50">{note.title}</h3>
              <ul className="mt-4 space-y-2">
                {note.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </aside>
      </section>
    </main>
  );
}

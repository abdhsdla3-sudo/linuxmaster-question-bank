import { appMeta } from "../data/appMeta.js";

export default function Header({ onHome, onPatchNotes, wrongCount, username, onLogout, theme, onToggleTheme }) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="page-shell flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-start gap-1">
          <button
            type="button"
            onClick={onHome}
            className="text-left text-xl font-bold tracking-normal text-slate-950 dark:text-slate-50"
          >
            리눅스마스터 2급 1차 문제은행
          </button>
          <button
            type="button"
            onClick={onPatchNotes}
            className="rounded-md bg-slate-100 px-2 py-1 text-left text-xs font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-950 dark:hover:text-blue-200"
          >
            {appMeta.version} · {appMeta.patchNote}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={onToggleTheme}
            className="secondary-button py-2"
            aria-label="화면 테마 전환"
          >
            {theme === "dark" ? "라이트 모드" : "다크 모드"}
          </button>
          <span className="rounded-md bg-blue-50 px-3 py-2 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-200">
            합격 기준 60점 이상
          </span>
          <span className="rounded-md bg-red-50 px-3 py-2 font-medium text-red-700 dark:bg-red-950 dark:text-red-200">
            오답 {wrongCount}개
          </span>
          <span className="rounded-md bg-slate-100 px-3 py-2 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {username}
          </span>
          <button type="button" onClick={onLogout} className="secondary-button py-2">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}

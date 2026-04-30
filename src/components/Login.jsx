import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const submit = (event) => {
    event.preventDefault();
    onLogin(username);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="page-shell flex min-h-screen items-center justify-center">
        <section className="panel w-full max-w-md p-6 sm:p-8">
          <p className="text-sm font-semibold text-blue-700">Study Login</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">문제은행 로그인</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            이름을 입력하면 사용자별 오답노트와 시험 기록이 이 브라우저에 저장됩니다.
            백엔드 없는 학습용 로그인이라 비밀번호는 사용하지 않습니다.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">사용자 이름</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="예: mingyu"
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <button type="submit" disabled={!username.trim()} className="primary-button w-full">
              시작하기
            </button>
          </form>

          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            다른 기기와 기록을 자동 동기화하려면 Supabase, Firebase 같은 실제 백엔드 로그인이 필요합니다.
          </div>
        </section>
      </div>
    </main>
  );
}

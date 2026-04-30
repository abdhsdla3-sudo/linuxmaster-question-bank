export default function ProgressBar({ current, total, label }) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{label ?? "진행률"}</span>
        <span className="font-semibold text-slate-800">
          {current} / {total}문제 · {percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

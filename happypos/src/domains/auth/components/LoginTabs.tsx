export default function LoginTabs() {
  return (
    <div className="flex bg-slate-800 rounded-lg p-1 mb-4">
      <button
        className="flex-1 py-2 rounded-md
        bg-slate-700 text-sm font-medium flex items-center justify-center gap-2">
        👤 Usuario
      </button>

      <button
        className="flex-1 py-2 rounded-md
        text-sm text-slate-400 flex items-center justify-center gap-2">
        # PIN
      </button>
    </div>
  );
}

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* BARRAS ANIMADAS */}
        <div className="flex gap-2 items-end h-16">
          <span className="w-3 bg-purple-500 rounded-md animate-loader1" />
          <span className="w-3 bg-indigo-500 rounded-md animate-loader2" />
          <span className="w-3 bg-purple-400 rounded-md animate-loader3" />
        </div>

        {/* TEXTO */}
        <span className="text-white/70 text-sm tracking-wide">
          Cargando...
        </span>
      </div>
    </div>
  );
}

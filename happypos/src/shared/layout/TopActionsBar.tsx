type Props = {
  onConsultaSolicitud: () => void;
  cotizar: boolean;
  onToggleCotizar: (value: boolean) => void;
  onNuevaFactura: () => void;
};

export default function TopActionsBar({
  onConsultaSolicitud,
  cotizar,
  onToggleCotizar,
  onNuevaFactura,
}: Props) {
  return (
    <div
      className="
        w-full
        flex items-center justify-between
        px-6 py-3
        rounded-xl
        bg-slate-100 dark:bg-slate-800/80
        border border-slate-300 dark:border-white/10
      "
    >
      {/* ⬅️ LADO IZQUIERDO */}
      <div className="flex items-center gap-3">
        {/* Botón + */}
        <button
          onClick={onNuevaFactura}
          title="Nueva factura"
          className="
    w-9 h-9
    flex items-center justify-center
    rounded-lg
    bg-slate-200 dark:bg-slate-700
    hover:bg-slate-300 dark:hover:bg-slate-600
    transition
  "
        >
          ➕
        </button>

        {/* Botón basura */}
        <button
          title="Limpiar"
          className="
            w-9 h-9
            flex items-center justify-center
            rounded-lg
            bg-slate-200 dark:bg-slate-700
            hover:bg-red-500/20 hover:text-red-500
            transition
          "
        >
          🗑️
        </button>
      </div>

      {/* ➡️ LADO DERECHO */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={cotizar}
            onChange={(e) => onToggleCotizar(e.target.checked)}
            className="w-4 h-4 accent-indigo-600"
          />
          Cotizar
        </label>

        <button
          onClick={onConsultaSolicitud}
          className="
            px-4 py-2
            rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white font-medium
            transition
          "
        >
          🧾 Consulta Solicitud
        </button>
      </div>
    </div>
  );
}

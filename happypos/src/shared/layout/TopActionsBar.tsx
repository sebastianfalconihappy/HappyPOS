import type { Factura } from "../context/FacturasContext";

type Props = {
  facturas: Factura[];
  facturaActivaId: string | null;
  onSelectFactura: (id: string) => void;

  onNuevaFactura: () => void;
  onEliminarFactura: () => void;

  onConsultaCliente: () => void;
  cotizar: boolean;
  onToggleCotizar: (value: boolean) => void;
};

export default function TopActionsBar({
  facturas,
  facturaActivaId,
  onSelectFactura,
  onNuevaFactura,
  onEliminarFactura,
  onConsultaCliente,
  cotizar,
  onToggleCotizar,
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
      {/* ⬅️ LADO IZQUIERDO: selector de facturas */}
      <div className="flex items-center gap-2">
        {facturas.map((factura, index) => {
          const activa = factura.id === facturaActivaId;

          return (
            <button
              key={factura.id}
              onClick={() => onSelectFactura(factura.id)}
              className={`
                px-3 py-1 rounded-lg text-sm transition
                ${
                  activa
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
                }
              `}
            >
              Factura {index + 1}
            </button>
          );
        })}
      </div>

      {/* ➡️ LADO DERECHO: acciones */}
      <div className="flex items-center gap-4">
        {/* 🗑️ Cancelar factura */}
        <button
          onClick={onEliminarFactura}
          title="Cancelar factura"
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

        {/* ☑️ Cotizar */}
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
          onClick={onConsultaCliente}
          className="
            px-4 py-2
            rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white font-medium
            transition
          "
        >
          🧾 Consulta Cliente
        </button>

        {/* ➕ Nueva factura */}
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
      </div>
    </div>
  );
}

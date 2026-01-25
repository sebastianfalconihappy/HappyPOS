import { useFacturaCart } from "../../../shared/context/useFacturaCart";
import { useState } from "react";

type PrePaymentModalProps = {
  vendedor: string;
  setVendedor: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export default function PrePaymentModal({
  onClose,
  onConfirm,
  setVendedor,
  vendedor,
}: PrePaymentModalProps) {
  const { cart } = useFacturaCart();
  const [addGarantia, setAddGarantia] = useState(false);
  const [addPlan, setAddPlan] = useState(false);
  const [vendedorError, setVendedorError] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadeIn">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-[#0F172A] p-6 shadow-xl animate-offerPop">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
            Antes de continuar
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="space-y-4 text-sm text-slate-600 dark:text-white/70">
          <p>Estás a punto de continuar con el proceso de pago.</p>

          <div className="rounded-lg border border-slate-200 dark:border-white/10 p-3 space-y-2">
            <p className="font-medium text-slate-800 dark:text-white">
              Productos seleccionados
            </p>

            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-xs"
              >
                <span className="truncate">{item.name}</span>

                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              🎁 Selecciona estos beneficios 
            </span>
            <span className="text-xs text-slate-500 dark:text-white/60">
              (opcional)
            </span>
          </div>

          {/* GARANTÍA */}
          <label className="relative flex items-start gap-3 p-4 rounded-xl border-2 border-blue-500/60 bg-blue-50 dark:bg-blue-900/20 cursor-pointer transition hover:scale-[1.01] animate-pulseSoft">
            <input
              type="checkbox"
              checked={addGarantia}
              onChange={(e) => setAddGarantia(e.target.checked)}
              className="mt-1"
            />
            <div>
              <p className="text-sm font-medium">Garantía Happy</p>
              <p className="text-xs text-slate-500 dark:text-white/60">
                Protección adicional y asistencia técnica extendida.
              </p>
            </div>
          </label>

          {/* PLAN */}
          <label className="relative flex items-start gap-3 p-4 rounded-xl border border-slate-300 dark:border-white/10 cursor-pointer transition hover:scale-[1.01] hover:border-blue-400">
            <input
              type="checkbox"
              checked={addPlan}
              onChange={(e) => setAddPlan(e.target.checked)}
              className="mt-1"
            />
            <div>
              <p className="text-sm font-medium">Plan Happy</p>
              <p className="text-xs text-slate-500 dark:text-white/60">
                Accede a beneficios exclusivos y planes de pago especiales.
              </p>
            </div>
          </label>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-slate-800 dark:text-white">
            Vendedor
          </p>

          <select
            value={vendedor}
            onChange={(e) => {
              setVendedor(e.target.value);
              setVendedorError("");
            }}
            className="
      w-full
      h-9
      text-sm
      px-2
      rounded-md
      border border-slate-300
      bg-white
      text-slate-700
      dark:bg-[#0B1220]
      dark:text-white/80
      dark:border-white/10
      focus:outline-none
      focus:ring-1
      focus:ring-blue-500
    "
          >
            <option value="">👤 Seleccionar vendedor</option>
            <option value="CHIQUIN LARA ANDY FERNANDO">
              CHIQUIN LARA ANDY FERNANDO
            </option>
            <option value="LEMA TENELMA JESSICA ESTEFANIA">
              LEMA TENELMA JESSICA ESTEFANIA
            </option>
            <option value="ASIMBAYA CAGUANO MONICA SARAHI">
              ASIMBAYA CAGUANO MONICA SARAHI
            </option>
            <option value="GUALOTUÑA OCHOA DANNY SEBASTIAN">
              GUALOTUÑA OCHOA DANNY SEBASTIAN
            </option>
            <option value="RIVERA VELA ALEXIS DARIO">
              RIVERA VELA ALEXIS DARIO
            </option>
            <option value="PALOMO AULIS MARIA VERONICA">
              PALOMO AULIS MARIA VERONICA
            </option>
            <option value="ATENCIA CABRERA CARLOS ANDRES">
              ATENCIA CABRERA CARLOS ANDRES
            </option>
          </select>

          {vendedorError && (
            <p className="text-xs text-red-500 mt-1">{vendedorError}</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => {
              if (!vendedor) {
                setVendedorError(
                  "Debes seleccionar un vendedor para continuar",
                );
                return;
              }

              setVendedorError("");
              onConfirm();
            }}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  );
}

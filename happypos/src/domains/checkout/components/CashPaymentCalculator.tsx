import { useState, useEffect } from "react";
import { useFacturaCart } from "../../../shared/context/useFacturaCart";
import { useCashPayment } from "../hooks/useCashPayment";

type Props = {
  visible: boolean;
};

export default function CashPaymentCalculator({ visible }: Props) {
  const { subtotal, setCashPayment } = useFacturaCart();
  const [recibido, setRecibido] = useState<number | "">("");
  const recibidoNumber = recibido === "" ? 0 : recibido;

  const { vuelto, faltante, isValido } = useCashPayment(
    subtotal,
    recibidoNumber
  );
  // Guardar en la factura activa
  useEffect(() => {
    if (!visible) return;

    setCashPayment({
      recibido: recibidoNumber,
      vuelto,
      valido: isValido,
    });
  }, [recibidoNumber, vuelto, isValido, visible, setCashPayment]);

  if (!visible) return null;

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10">
      <h2 className="text-sm font-semibold mb-2">Monto recibido</h2>

      <input
        type="number"
        min={0}
        max={10000}
        value={recibido}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "") {
            setRecibido("");
            return;
          }

          const numeric = Number(value);

          if (numeric > 10000) return;

          setRecibido(numeric);
        }}
        className="
    w-full
    p-2
    rounded-md
    border
    border-slate-300
    dark:border-white/10
    bg-slate-50
    dark:bg-white/10
    text-sm
  "
        placeholder="Ingrese el efectivo recibido"
      />

      {/* RESULTADO */}
      {faltante > 0 && (
        <div className="mt-2 p-2 rounded-md bg-red-50 text-red-600 text-sm">
          Faltante: ${faltante.toFixed(2)}
        </div>
      )}

      {isValido && (
        <div className="mt-2 p-2 rounded-md bg-green-50 text-green-600 text-sm">
          Vuelto: ${vuelto.toFixed(2)}
        </div>
      )}
    </div>
  );
}

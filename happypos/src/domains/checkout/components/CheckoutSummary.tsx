import { useFacturaCart } from "../../../shared/context/useFacturaCart";

type Props = {
  paymentMethod: string | null;
};

export default function CheckoutSummary({ paymentMethod }: Props) {
  const { subtotal, cart } = useFacturaCart();

  const totalItems = cart.length;

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 sticky top-20">
      <h2 className="text-sm font-semibold mb-3">Resumen</h2>

      {/* ITEMS */}
      <div className="flex justify-between text-xs mb-2">
        <span className="text-slate-600 dark:text-white/60">Productos</span>
        <span>{totalItems}</span>
      </div>

      {/* SUBTOTAL */}
      <div className="flex justify-between text-xs mb-2">
        <span className="text-slate-600 dark:text-white/60">Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* TOTAL */}
      <div className="flex justify-between font-semibold text-sm border-t pt-2 border-slate-300 dark:border-white/10">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* CONTINUAR */}
      <button
        disabled={cart.length === 0 || !paymentMethod}
        className={`
    w-full mt-3 py-2 rounded-lg text-sm font-semibold transition
    ${
      cart.length === 0 || !paymentMethod
        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
        : "bg-indigo-600 text-white hover:bg-indigo-700"
    }
  `}
      >
        Continuar
      </button>
      {!paymentMethod && cart.length > 0 && (
        <p className="mt-2 text-s text-red-500">
          Selecciona un método de pago para continuar
        </p>
      )}
    </div>
  );
}

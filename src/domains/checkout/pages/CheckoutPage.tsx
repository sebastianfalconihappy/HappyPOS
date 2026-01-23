import Header from "../../../shared/layout/Header";
import PaymentMethods from "../components/PaymentMethods";
import ExtraOptions from "../components/ExtraOptions";
import CheckoutProducts from "../components/CheckoutProducts";
import CheckoutSummary from "../components/CheckoutSummary";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFacturaCart } from "../../../shared/context/useFacturaCart";
import CashPaymentCalculator from "../components/CashPaymentCalculator";
import SummaryCalculator from "../components/SummaryCalculator";

export default function CheckoutPage() {
  const { cart } = useFacturaCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showSummaryCalculator, setShowSummaryCalculator] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/dashboard", { replace: true });
    }
  }, [cart.length, navigate]);
  return (
    <>
      {/* HEADER GLOBAL */}
      <Header />

      {/* CONTENIDO */}
      <main className="min-h-[calc(100vh-4rem)] p-4 bg-slate-100 dark:bg-[#0B1220] text-slate-900 dark:text-white">
        {/* TÍTULO */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold">Método de Pago</h1>
            <p className="text-xs text-slate-600 dark:text-white/60">
              Selecciona cómo deseas cobrar esta venta
            </p>
          </div>

          {/* BOTÓN REGRESAR */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="
      text-xs font-medium
      px-3 py-1.5
      rounded-md
      border border-red-300
      text-red-600
      bg-red-50
      hover:bg-red-100
      dark:border-red-500/30
      dark:text-red-400
      dark:bg-red-500/10
      dark:hover:bg-red-500/20
      transition
    "
            >
              ← Regresar
            </button>

            {paymentMethod !== null && paymentMethod !== "EFECTIVO" && (
              <button
                onClick={() => setShowSummaryCalculator((prev) => !prev)}
                className="
        text-xs
        px-2 py-1.5
        rounded-md
        border border-slate-300
        dark:border-white/10
        hover:bg-slate-100
        dark:hover:bg-white/10
        transition
      "
                title="Calculadora"
              >
                🧮
              </button>
            )}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-12 gap-4">
          {/* IZQUIERDA */}
          <div className="col-span-7 space-y-4">
            <PaymentMethods
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
            <ExtraOptions />
            <CashPaymentCalculator visible={paymentMethod === "EFECTIVO"} />
            <CheckoutProducts />
          </div>

          {/* DERECHA */}
          <div className="col-span-5 space-y-3">
            <CheckoutSummary paymentMethod={paymentMethod} />

            {showSummaryCalculator && paymentMethod !== "EFECTIVO" && (
              <SummaryCalculator />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

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
  const [vendedor, setVendedor] = useState<string>("");

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/dashboard", { replace: true });
    }
  }, [cart.length, navigate]);

  const VENDEDORES = [
    "CHIQUIN LARA ANDY FERNANDO",
    "LEMA TENELMA JESSICA ESTEFANIA",
    "ASIMBAYA CAGUANO MONICA SARAHI",
    "GUALOTUÑA OCHOA DANNY SEBASTIAN",
    "RIVERA VELA ALEXIS DARIO",
    "PALOMO AULIS MARIA VERONICA",
    "ATENCIA CABRERA CARLOS ANDRES",
  ];

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

          {/* SELECT VENDEDOR + BOTONES */}
          <div className="flex items-center gap-2">
            {/* VENDEDOR */}
            <select
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
              className="
      h-8
      text-xs
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
              {VENDEDORES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* REGRESAR */}
            <button
              onClick={() => navigate(-1)}
              className="
      h-8
      text-xs font-medium
      px-3
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

            {/* CALCULADORA */}
            {paymentMethod !== null && paymentMethod !== "EFECTIVO" && (
              <button
                onClick={() => setShowSummaryCalculator((prev) => !prev)}
                className="
        h-8
        px-2
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

import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
};

// ✅ Validación de cédula ecuatoriana (Módulo 10)
function validarCedulaEcuatoriana(cedula: string): boolean {
  if (!/^\d{10}$/.test(cedula)) return false;

  const provincia = parseInt(cedula.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) return false;

  const digitos = cedula.split("").map(Number);
  const verificador = digitos[9];

  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = digitos[i];

    if (i % 2 === 0) {
      valor *= 2;
      if (valor > 9) valor -= 9;
    }

    suma += valor;
  }

  const modulo = suma % 10;
  const resultado = modulo === 0 ? 0 : 10 - modulo;

  return resultado === verificador;
}

export default function ConsultaClienteModal({ open, onClose }: Props) {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  const resetModal = () => {
    setCedula("");
    setData(null); // o [] si ya normalizaste
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const handleConsultar = async () => {
    if (!validarCedulaEcuatoriana(cedula)) {
      setError("La cédula ingresada no es válida");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      setData(null);

      const response = await axios.get("/creditos/Operaciones", {
        params: {
          Filtro: cedula,
          estado: "%",
        },
        headers: {
          API_KEY: import.meta.env.VITE_API_KEY,
        },
      });

      console.log("📦 RESPONSE DATA COMPLETO:", response.data);
      setData(response.data.operacion ?? []);
    } catch (err) {
      console.error("❌ Error consulta cliente", err);
      setError("No se pudo consultar la información del cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        onClick={() => {
          resetModal();
          onClose();
        }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 shadow-2xl p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">🧾 Consulta de Cliente</h2>
          <button
            onClick={() => {
              resetModal();
              onClose();
            }}
            className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {data && (
            <div className="mt-4 flex justify-center">
              <p
                className="
    px-4 py-2
    rounded-lg
    bg-indigo-100 dark:bg-indigo-900/30
    text-indigo-700 dark:text-indigo-300
    font-semibold
    text-center
  "
              >
                Operaciones encontradas: {data.length}
              </p>
            </div>
          )}

          {data && data.length === 0 && (
            <div className="mt-4 rounded-xl border border-green-300 bg-green-50 dark:bg-green-900/20 p-4 text-center">
              <p className="text-green-700 dark:text-green-300 font-semibold">
                🟢 Cliente nuevo
              </p>
              <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                No registra compras ni créditos previos. Puede continuar con una
                venta normal.
              </p>
            </div>
          )}

          {data && data.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {data.map((op, index) => (
                <div
                  key={index}
                  className={`
    rounded-xl border p-4
    ${
      op.estadoOperacion === "AL DIA"
        ? "border-green-300 bg-green-50 dark:bg-green-900/20"
        : op.estadoOperacion === "ANULADO"
          ? "border-red-300 bg-red-50 dark:bg-red-900/20"
          : "border-slate-300 bg-slate-100 dark:bg-slate-800"
    }
  `}
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">
                      {op.producto}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Operación: {op.operacion}
                    </p>

                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Cuotas: {op.ctas_pagadas} / {op.numeroCuotas}
                    </p>

                    <p className="text-sm font-medium">
                      Estado: {op.estadoOperacion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Cédula
            </label>
            <input
              type="text"
              maxLength={10}
              value={cedula}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConsultar();
                }
              }}
              onChange={(e) => {
                setCedula(e.target.value.replace(/\D/g, ""));
                setError(null);
              }}
              className="w-full mt-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <button
            onClick={handleConsultar}
            disabled={loading}
            className={`
    w-full py-2 rounded-lg font-medium transition
    ${
      loading
        ? "bg-slate-400 cursor-not-allowed text-white"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }
  `}
          >
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </div>
      </div>
    </div>
  );
}
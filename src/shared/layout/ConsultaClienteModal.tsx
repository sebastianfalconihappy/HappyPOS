import { useEffect, useState } from "react";
import axios from "axios";
import { useFacturaCart } from "../context/useFacturaCart";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../domains/products/types/Product";
import { getProductosMasVendidos } from "../../domains/products/api/products.services";

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

  const { addToCart } = useFacturaCart();
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [loadingRecom, setLoadingRecom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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

  const clienteAlDia =
    data?.some(
      (op) =>
        op.estadoOperacion === "AL DIA" || op.estadoOperacion === "VIGENTE",
    ) ?? false;

  useEffect(() => {
    if (!clienteAlDia) return;

    const loadRecommendations = async () => {
      try {
        setLoadingRecom(true);

        const productos = await getProductosMasVendidos("ADMIN");

        setRecommended(productos.slice(0, 2)); // solo 2 para prueba
      } catch (error) {
        console.error("Error cargando recomendaciones", error);
      } finally {
        setLoadingRecom(false);
      }
    };

    loadRecommendations();
  }, [clienteAlDia]);

  if (!open) {
    return null;
  }

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

          {clienteAlDia && (
            <div className="mt-4 rounded-2xl border border-indigo-500/40 bg-indigo-50 dark:bg-indigo-900/20 p-4 animate-offerPop">
              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                ⭐ Recomendado para ti
              </p>

              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                Como estás <b>al día</b> y ya cuentas con un dispositivo, te
                recomendamos complementar tu compra con:
              </p>

              {/* LOADING */}
              {loadingRecom && (
                <p className="mt-3 text-sm text-slate-500">
                  Cargando recomendaciones...
                </p>
              )}

              {/* PRODUCTOS */}
              {!loadingRecom && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {recommended.map((product) => (
                    <div
                      key={product.id}
                      className="
              rounded-2xl
              border border-indigo-500/30
              bg-white/95 dark:bg-[#0B1220]
              p-3
              flex flex-col
            "
                    >
                      {/* IMAGEN */}
                      <div className="flex justify-center mb-2">
                        <div className="w-24 h-24 rounded-xl bg-black/10 dark:bg-white/5 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* TEXTO */}
                      <p className="text-sm font-semibold leading-snug text-center line-clamp-3">
                        {product.name}
                      </p>

                      <p className="text-xs text-slate-500 text-center mt-1">
                        Código: {product.code}
                      </p>

                      <p className="text-base font-bold text-indigo-600 text-center mt-2">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* BOTÓN */}
                      <button
                        onClick={() => {
                          addToCart(product);
                          onClose();
                          navigate("/dashboard");
                        }}
                        className="
                mt-3
                w-full
                rounded-lg
                bg-indigo-600
                text-white
                py-2
                text-sm font-medium
                hover:bg-indigo-500
                transition
              "
                      >
                        ➕ Añadir al carrito
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

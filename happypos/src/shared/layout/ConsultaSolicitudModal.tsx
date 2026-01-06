import { useEffect, useState } from "react";

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

export default function ConsultaSolicitudModal({ open, onClose }: Props) {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const handleConsultar = () => {
    if (!validarCedulaEcuatoriana(cedula)) {
      setError("La cédula ingresada no es válida");
      return;
    }

    setError(null);
    alert("✅ Cédula válida");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/10 shadow-2xl p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">🧾 Consulta de Solicitud</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Cédula
            </label>
            <input
              type="text"
              maxLength={10}
              value={cedula}
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
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
}

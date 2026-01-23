import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../shared/context/SessionContext";

export default function CheckInPage() {
  const navigate = useNavigate();
  const { setSession } = useSession();

  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");

  // 👉 Permite escribir con teclado físico
  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // solo números
    if (value.length <= 10) {
      setCedula(value);
    }
  };

  // 👉 Teclado en pantalla
  const handleNumberClick = (num: string) => {
    if (cedula.length < 10) {
      setCedula((prev) => prev + num);
    }
  };

  const handleClear = () => {
    setCedula("");
  };

  const handleSubmit = () => {
    if (!nombre || cedula.length < 10) {
      alert("Ingrese nombre y cédula válida");
      return;
    }

    setSession({
      nombre,
      cedula,
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-sm bg-white/5 rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-3">
            🧾
          </div>
          <h1 className="text-lg font-semibold">
            Registro de Ingreso
          </h1>
          <p className="text-sm text-white/60">
            Ingrese sus datos para continuar
          </p>
        </div>

        {/* Nombre (centrado visualmente) */}
        <div className="mb-4">
          <label className="text-sm text-white/60 block text-center">
            Nombre del cajero
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan Pérez"
            className="mt-1 w-full bg-white/10 rounded-lg px-4 py-3 outline-none
                       focus:ring-2 focus:ring-purple-600 text-center"
          />
        </div>

        {/* Cédula - display */}
        <div className="mb-3">
          <label className="text-sm text-white/60 block text-center">
            Cédula
          </label>

          {/* Input REAL (invisible, para teclado físico) */}
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            value={cedula}
            onChange={handleCedulaChange}
            className="absolute opacity-0 pointer-events-none"
          />

          {/* Display visual */}
          <div className="mt-1 bg-white/10 rounded-lg px-4 py-3 text-center tracking-widest text-lg">
            {cedula.padEnd(10, "•")}
          </div>
        </div>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(String(n))}
              className="py-4 rounded-xl bg-white/10 hover:bg-white/20 text-lg"
            >
              {n}
            </button>
          ))}

          <button
            onClick={handleClear}
            className="py-4 rounded-xl bg-red-500/20 text-red-400"
          >
            Borrar
          </button>

          <button
            onClick={() => handleNumberClick("0")}
            className="py-4 rounded-xl bg-white/10 hover:bg-white/20 text-lg"
          >
            0
          </button>

          <button
            onClick={handleSubmit}
            className="py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}

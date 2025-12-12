import LoginTabs from "./LoginTabs";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

export default function LoginCard() {
  return (
    <div className="w-full max-w-md rounded-2xl
      bg-slate-900/70 backdrop-blur-xl
      border border-white/10 shadow-2xl p-8">

      {/* LOGO + TITULO */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-2xl
          bg-gradient-to-br from-indigo-500 to-purple-600
          flex items-center justify-center mb-3">
          <span className="text-xl font-bold">HP</span>
        </div>

        <h1 className="text-xl font-semibold">HappyPOS</h1>
        <p className="text-sm text-slate-400">
          Sistema de Punto de Venta
        </p>
      </div>

      {/* TABS */}
      <LoginTabs />

      {/* FORM */}
      <div className="space-y-4 mt-4">
        <Input
          label="Usuario"
          placeholder="Ingresa tu usuario"
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
        />

        <Button>
          → Iniciar Sesión
        </Button>
      </div>

      {/* FOOTER */}
      
    </div>
  );
}

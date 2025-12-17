import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../../../app/providers/AuthProvider";

import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import logo from "../../../assets/images/logo5.png";

export default function LoginCard() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { login } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      await signIn(username, password);

      login({
        user: {
          name: username,
          role: "Cajero",
        },
        branch: {
          name: "Sucursal Centro",
        },
        cashRegister: {
          name: "Caja 1",
        },
      });

      // 3️⃣ Redirigir al dashboard
      navigate("/check-in");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl
      bg-white text-slate-900
      shadow-2xl p-8"
    >
      {/* LOGO */}
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="HappyPOS" className="w-16 h-16 mb-3 rounded-xl" />

        <h1 className="text-2xl font-semibold text-slate-900">HappyPOS</h1>
        <p className="text-sm text-slate-500">Sistema POS HappyCell</p>
      </div>

      <div
        className="flex items-center justify-center gap-2
        bg-slate-100 rounded-lg py-2 mb-4"
      >
        <span className="text-slate-600">👤</span>
        <span className="text-sm font-medium text-slate-700">Usuario</span>
      </div>

      {/* FORM */}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Input
          label="Usuario"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <Button type="submit">
          {loading ? "Validando..." : "→ Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
}

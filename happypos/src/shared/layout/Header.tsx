import { useAuthContext } from "../../app/providers/AuthProvider";
import logo5 from "../../assets/images/logo5.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, branch, cashRegister, logout } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header
      className="h-16 px-6 flex items-center justify-between
      bg-gradient-to-r from-slate-900 to-slate-800
      text-white shadow-md"
    >
      {/* IZQUIERDA: LOGO */}
      <div className="flex items-center gap-3">
        <img
          src={logo5}
          alt="HappyPOS"
          className="w-9 h-9 rounded-md"
        />
        <div className="leading-tight">
          <p className="font-semibold">HappyPOS</p>
          <span className="text-xs text-slate-300">
            Sistema de Punto de Venta
          </span>
        </div>
      </div>

      {/* DERECHA: INFO */}
      <div className="flex items-center gap-4 text-sm">

        {/* SUCURSAL / CAJA */}
        <div
          className="flex items-center gap-3
          bg-slate-800/80 border border-white/10
          rounded-xl px-4 py-2"
        >
          <div className="text-indigo-400 text-lg">🖥️</div>
          <div className="leading-tight">
            <p className="font-medium">{branch?.name}</p>
            <span className="text-xs text-slate-300">
              {cashRegister?.name}
            </span>
          </div>
        </div>

        {/* USUARIO / ROL */}
        <div
          className="flex items-center gap-3
          bg-slate-800/80 border border-white/10
          rounded-xl px-4 py-2"
        >
          <div className="text-emerald-400 text-lg">👤</div>
          <div className="leading-tight">
            <p className="font-medium">{user?.name}</p>
            <span className="text-xs text-slate-300">
              {user?.role}
            </span>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="flex items-center justify-center
          w-10 h-10 rounded-xl
          bg-slate-800/80 border border-white/10
          hover:bg-red-500/20 hover:text-red-400
          transition"
        >
          ⎋
        </button>
      </div>
    </header>
  );
}

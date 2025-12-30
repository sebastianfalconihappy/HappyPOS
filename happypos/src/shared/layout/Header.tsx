import { useAuthContext } from "../../app/providers/AuthProvider";
import logo5 from "../../assets/images/logo5.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const { user, branch, cashRegister, logout } = useAuthContext();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
   <header
  className="
    sticky top-0 z-50
    h-16 px-6 flex items-center justify-between
    shadow-md
    bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800
    text-slate-900 dark:text-white
  "
>
      {/* IZQUIERDA: LOGO */}
      <div className="flex items-center gap-3">
        <img src={logo5} alt="HappyPOS" className="w-9 h-9 rounded-md" />
        <div className="leading-tight">
          <p className="font-semibold">HappyPOS</p>
          <span className="text-xs text-slate-600 dark:text-slate-300
">
            Sistema de Punto de Venta
          </span>
        </div>
      </div>

      {/* DERECHA: INFO */}
      <div className="flex items-center gap-4 text-sm">
        {/* SUCURSAL / CAJA */}
        <div
          className="flex items-center gap-3
          bg-slate-100 dark:bg-slate-800/80
border border-slate-300 dark:border-white/10
text-slate-900 dark:text-white
          rounded-xl px-4 py-2"
        >
          <div className="text-indigo-400 text-lg">🖥️</div>
          <div className="leading-tight">
            <p className="font-medium">{branch?.name}</p>
            <span className="text-xs text-slate-600 dark:text-slate-300
">{cashRegister?.name}</span>
          </div>
        </div>

        {/* USUARIO / ROL */}
        <div
          className="flex items-center gap-3
          bg-slate-100 dark:bg-slate-800/80
border border-slate-300 dark:border-white/10
text-slate-900 dark:text-white
          rounded-xl px-4 py-2"
        >
          <div className="text-emerald-400 text-lg">👤</div>
          <div className="leading-tight">
            <p className="font-medium">{user?.name}</p>
            <span className="text-xs text-slate-600 dark:text-slate-300
">{user?.role}</span>
          </div>
        </div>

        {/* TEMA */}
        <button
          onClick={toggleTheme}
          title="Cambiar tema"
          className="flex items-center justify-center
  w-10 h-10 rounded-xl
  bg-slate-100 dark:bg-slate-800/80
border border-slate-300 dark:border-white/10
text-slate-900 dark:text-white

  hover:bg-white/10
  transition"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          title="Cerrar sesión"
          className="flex items-center justify-center
  w-10 h-10 rounded-xl
  bg-slate-100 dark:bg-slate-800/80
border border-slate-300 dark:border-white/10
text-slate-900 dark:text-white

  hover:bg-red-500/20 hover:text-red-400
  transition"
        >
          ⎋
        </button>
      </div>
    </header>
  );
}

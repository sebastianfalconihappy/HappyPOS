import { useState } from "react";
import { Smartphone, Headphones, Layers, Plug } from "lucide-react";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

const categories = [
  { id: "all", label: "Todos", icon: Layers },
  { id: "TOP Recomendado", label: "TOP Recomendado", icon: Layers },
  { id: "celularesmasv", label: "Celulares más vendidos", icon: Smartphone },
  { id: "combos", label: "Combos", icon: Headphones },
  { id: "celulares", label: "Celulares", icon: Smartphone },
  { id: "tablets", label: "Tablets", icon: Smartphone },
  { id: "accesorios", label: "Accesorios", icon: Plug },
];

const services = [
  "Protección",
  "Empaquetado",
  "Ergonomia",
  "Comunicaciones",
  "Tecnología",
  "Obsequios",
  "Audio",
  "Hogar",
  "Almacenamiento",
];

export default function CategoriesSidebar({ active, onChange }: Props) {
  const [openServices, setOpenServices] = useState(false);

  return (
    <aside
      className="
        sticky top-16
        h-[calc(100vh-4rem)]
        w-64 p-4
        overflow-y-auto
        bg-white dark:bg-[#0B1220]
        border-r border-slate-300 dark:border-white/10
        text-slate-900 dark:text-white
      "
    >
      <h3 className="text-sm text-slate-600 dark:text-white/70 mb-4">
        Categorías
      </h3>

      {/* CATEGORÍAS */}
      <div className="space-y-2">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : `
                        bg-slate-100 dark:bg-white/5
                        text-slate-900 dark:text-white/70
                        hover:bg-slate-200 dark:hover:bg-white/10
                      `
                }
              `}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
      </div>

      {/* SERVICIOS */}
      <div className="mt-6">
        <button
          onClick={() => setOpenServices(!openServices)}
          className="
            w-full flex items-center justify-between
            px-4 py-3 rounded-xl
            bg-slate-100 dark:bg-white/5
            hover:bg-slate-200 dark:hover:bg-white/10
            transition
          "
        >
          <div className="flex items-center gap-3">
            <Layers size={18} />
            <span className="text-sm font-medium">Más Categorias</span>
          </div>

          <span className="text-xs text-slate-500 dark:text-white/60">
            {openServices ? "▲" : "▼"}
          </span>
        </button>

        {openServices && (
          <div className="mt-2 space-y-1 pl-4">
            {services.map((service) => (
              <button
                key={service}
                className="
                  w-full text-left text-xs
                  px-3 py-2 rounded-lg
                  text-slate-700 dark:text-white/70
                  hover:bg-slate-200 dark:hover:bg-white/10
                "
              >
                {service}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

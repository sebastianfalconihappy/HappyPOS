import {
  Smartphone,
  Headphones,
  // Package,
  Layers,
} from "lucide-react";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

const categories = [
  { id: "all", label: "Todos", icon: Layers },
  { id: "celularesmasv", label: "Celulares más vendidos", icon: Smartphone },
  { id: "productosmasv", label: "Productos más vendidos", icon: Headphones },
  { id: "celulares", label: "Celulares", icon: Smartphone },
  { id: "tablets", label: "Tablets", icon: Smartphone },
];

export default function CategoriesSidebar({ active, onChange }: Props) {
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
    </aside>
  );
}

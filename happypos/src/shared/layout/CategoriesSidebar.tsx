// src/shared/layout/CategoriesSidebar.tsx
import {
  Smartphone,
  Headphones,
  Package,
  Layers,
} from "lucide-react";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

const categories = [
  { id: "all", label: "Todos", icon: Layers },
  { id: "phones", label: "Teléfonos más vendidos", icon: Smartphone },
  { id: "accessories", label: "Accesorios más vendidos", icon: Headphones },
  { id: "combos", label: "Combos", icon: Package },
  { id: "kit", label: "Kits", icon: Package },
  { id: "phones2", label: "Teléfonos", icon: Smartphone },
  { id: "accessories2", label: "Accesorios", icon: Headphones },
];

export default function CategoriesSidebar({
  active,
  onChange,
}: Props) {
  return (
    <aside className="w-64 p-4 bg-[#0B1220] border-r border-white/10">
      <h3 className="text-sm text-white/70 mb-4">
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
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }
              `}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

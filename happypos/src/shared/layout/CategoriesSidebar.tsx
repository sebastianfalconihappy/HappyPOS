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
  { id: "celulares", label: "Celulares más vendidos", icon: Smartphone },
  { id: "productos", label: "Productos más vendidos", icon: Headphones },
  // { id: "combos", label: "Combos", icon: Package },
  { id: "celulares2", label: "Celulares", icon: Smartphone },
  { id: "tablets", label: "Tablets", icon: Smartphone },
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

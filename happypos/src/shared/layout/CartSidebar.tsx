// src/shared/layout/CartSidebar.tsx
import { Trash2 } from "lucide-react";

export default function CartSidebar() {
  return (
    <aside className="w-80 p-4 bg-[#0B1220] border-l border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-600 p-2 rounded-lg">
          🛒
        </div>
        <div>
          <h3 className="font-semibold">Carrito</h3>
          <p className="text-sm text-white/60">
            1 producto
          </p>
        </div>
      </div>

      {/* Producto */}
      <div className="bg-white/5 rounded-xl p-3 mb-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-black/30 rounded-lg" />

          <div className="flex-1">
            <p className="text-sm font-medium">
              Google Pixel 8 Pro
            </p>
            <p className="text-sm text-white/60">
              $999.99
            </p>
          </div>

          <button className="text-red-400 hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button className="w-7 h-7 rounded bg-white/10">
            -
          </button>
          <span>1</span>
          <button className="w-7 h-7 rounded bg-white/10">
            +
          </button>
        </div>
      </div>

      {/* Totales */}
      <div className="border-t border-white/10 pt-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-white/60">
            Subtotal
          </span>
          <span>$999.99</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$999.99</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-white/10 hover:bg-white/20 py-3 rounded-xl">
        📄 Cotizar
      </button>
    </aside>
  );
}

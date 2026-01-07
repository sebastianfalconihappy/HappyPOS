import { Trash2 } from "lucide-react";
import { useFacturaCart } from "../../../shared/context/useFacturaCart";

export default function CheckoutProducts() {
  const { cart, removeFromCart } = useFacturaCart();

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10">
      <h2 className="text-sm font-semibold mb-2">
        Productos
      </h2>

      {cart.length === 0 && (
        <p className="text-xs text-slate-600 dark:text-white/60">
          No hay productos en el carrito
        </p>
      )}

      <div className="space-y-2">
        {cart.map((product) => (
          <div
            key={product.id}
            className="
              flex items-center justify-between
              p-2 rounded-md
              bg-slate-100 dark:bg-white/10
            "
          >
            {/* INFO */}
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-contain rounded bg-black/20"
              />

              <div>
                <p className="text-sm font-medium leading-tight">
                  {product.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-white/60">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* ACCIONES */}
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-red-500 hover:text-red-600"
              title="Eliminar producto"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

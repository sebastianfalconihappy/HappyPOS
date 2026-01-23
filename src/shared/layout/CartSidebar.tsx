// src/shared/layout/CartSidebar.tsx
import { Trash2, X } from "lucide-react";
import { useFacturaCart } from "../context/useFacturaCart";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const { cart, removeFromCart, subtotal } = useFacturaCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const prevCartLength = useRef(cart.length);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    setRemovingId(id);

    toast("Producto eliminado del carrito", {
      icon: "🗑️",
    });

    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 200);
  };

  useEffect(() => {
    if (cart.length > prevCartLength.current) {
      setIsOpen(true);
      requestAnimationFrame(() => {
        setHighlight(true);

        const t = setTimeout(() => {
          setHighlight(false);
        }, 200);

        return () => clearTimeout(t);
      });
    }

    prevCartLength.current = cart.length;
  }, [cart.length]);

  if (!isOpen || cart.length === 0) {
    return null;
  }

  return (
    <aside
      className={`
    sticky top-16
    h-[calc(100vh-4rem)]
    w-80 p-4
    overflow-y-auto

    bg-white dark:bg-[#0B1220]
    border-l border-slate-300 dark:border-white/10
    text-slate-900 dark:text-white

    animate-slide-in
    transition-all duration-200
    ${highlight ? "ring-2 ring-purple-500" : ""}
  `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg">🛒</div>
          <div>
            <h3 className="font-semibold">Carrito</h3>
            <p className="text-sm text-slate-600 dark:text-white/60">
              {cart.length} producto{cart.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* ❌ Cerrar carrito */}
        <button
          onClick={() => setIsOpen(false)}
          className="
      p-1 rounded-md
      text-slate-500 hover:text-slate-700
      dark:text-white/60 dark:hover:text-white
      hover:bg-slate-200 dark:hover:bg-white/10
      transition
    "
          title="Cerrar carrito"
        >
          <X size={18} />
        </button>
      </div>

      {cart.map((product) => (
        <div
          key={product.id}
          className={`
  rounded-xl p-3 mb-4
  bg-slate-100 dark:bg-white/5
  border border-slate-300 dark:border-white/10
  transition-all duration-200
  ${
    removingId === product.id
      ? "opacity-0 translate-x-6"
      : "opacity-100 translate-x-0"
  }
`}
        >
          <div className="flex gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-contain rounded-lg bg-black/30"
            />

            <div className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm text-slate-600 dark:text-white/60">
                ${product.price}
              </p>
            </div>

            <button
              onClick={() => handleRemove(product.id)}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Totales */}
      <div
        className="
  border-t pt-4 text-sm space-y-2
  border-slate-300 dark:border-white/10
"
      >
        <div className="flex justify-between">
          <span className="text-white/60">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="
    w-full mt-4 py-3 rounded-xl font-semibold
    bg-indigo-600 text-white
    hover:bg-indigo-700
    dark:bg-white/10 dark:hover:bg-white/20
  "
      >
        📄 Pagar
      </button>
    </aside>
  );
}

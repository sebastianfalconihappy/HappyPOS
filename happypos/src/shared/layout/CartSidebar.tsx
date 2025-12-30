// src/shared/layout/CartSidebar.tsx
import { Trash2 } from "lucide-react";
import { useCart } from "../../shared/context/useCart";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";


export default function CartSidebar() {
  const { cart, removeFromCart, subtotal } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(false);
  const prevCartLength = useRef(cart.length);


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
    requestAnimationFrame(() => {
      setHighlight(true)

      const t = setTimeout(() => {
        setHighlight(false)
      }, 200)

      return () => clearTimeout(t)
    })
  }

  prevCartLength.current = cart.length
}, [cart.length])


  if (cart.length === 0) {
    return null;
  }

  return (
    <aside
      className={`
    w-80 p-4 bg-[#0B1220] border-l border-white/10
    animate-slide-in
    transition-all duration-200
    ${highlight ? "ring-2 ring-purple-500" : ""}
  `}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-purple-600 p-2 rounded-lg">🛒</div>
        <div>
          <h3 className="font-semibold">Carrito</h3>
          <p className="text-sm text-white/60">
            {cart.length} producto{cart.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {cart.map((product) => (
        <div
          key={product.id}
          className={`
    bg-white/5 rounded-xl p-3 mb-4
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
              <p className="text-sm text-white/60">${product.price}</p>
            </div>

            <button
              onClick={() => handleRemove(product.id)}
              className="text-red-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Totales */}
      <div className="border-t border-white/10 pt-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-white/60">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-white/10 hover:bg-white/20 py-3 rounded-xl">
        📄 Pagar
      </button>
    </aside>
  );
}

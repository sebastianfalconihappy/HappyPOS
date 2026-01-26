import { X, Sparkles, Flame } from "lucide-react";
import type { Product } from "../../domains/products/types/Product";
import { useFacturaCart } from "../context/useFacturaCart";

type OfferSplashModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function OfferSplashModal({
  open,
  onClose,
}: OfferSplashModalProps) {
  const { addToCart } = useFacturaCart();

  if (!open) return null;

  const productoOferta: Product = {
    id: "OFERTA-001",
    name: "Samsung Galaxy A15",
    code: "A15-2024",
    imei: "",
    price: 189,
    stock: 999,
    image: "https://i.imgur.com/VhY3C7R.png",
    category: "phones",
    description: "Equipo más vendido del mes. Alta rotación.",
  };

  const handleAddToCart = () => {
    addToCart(productoOferta);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* 🎉 CONFETI REAL */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 h-2 w-2 rounded-sm animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: [
                "#22c55e",
                "#eab308",
                "#ec4899",
                "#3b82f6",
                "#f97316",
              ][i % 5],
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>

      {/* 🟣 MODAL */}
      <div className="relative w-[92%] max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 text-white shadow-2xl animate-offerPop">
        {/* ❌ CERRAR */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        {/* 🔥 HEADER */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
          <span className="rounded-full bg-orange-500/20 px-4 py-1 text-sm font-bold text-orange-400">
            OFERTA DEL MES
          </span>
          <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
        </div>

        {/* 📦 CONTENIDO */}
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={productoOferta.image}
            alt={productoOferta.name}
            className="h-40 object-contain drop-shadow-xl"
          />

          <h2 className="text-2xl font-extrabold tracking-tight">
            {productoOferta.name}
          </h2>

          <p className="text-sm text-slate-300">
            📈 El teléfono más vendido
            <br />
            💰 Margen alto · Rotación rápida
          </p>

          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-green-400">
              ${productoOferta.price}
            </span>
            <span className="text-xs text-slate-400 line-through">$219</span>
          </div>

          {/* 🟢 CTA */}
          <button
            onClick={handleAddToCart}
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-lg font-bold text-white shadow-lg hover:scale-[1.03] transition-transform animate-pulseSoft"
          >
            ➕ AÑADIR AL CARRITO
          </button>

          <span className="text-xs text-slate-400">
            Sugerido para cerrar la venta 🚀
          </span>
        </div>
      </div>
    </div>
  );
}

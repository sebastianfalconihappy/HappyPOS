import { useEffect, useState } from "react";
import {
  getCellPhones,
  getTablets,
  getProductosMasVendidos,
} from "../api/products.services";
import type { Product } from "../types/Product";

type Props = {
  category: string;
};

import GlobalLoader from "../../../shared/layout/GlobalLoader";
import { useCart } from "../../../shared/context/useCart";
import toast from "react-hot-toast";


const PLACEHOLDER_IMAGE = "/src/assets/images/placeholder.jpg";
const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function ProductsGrid({ category }: Props) {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | "">("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [cache, setCache] = useState<Record<string, Product[]>>({});
  const { addToCart, cart } = useCart();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      // 🔹 1. Revisar cache primero
      const cached = cache[category];
      if (cached) {
        setAllProducts(cached);
        return;
      }

      // 🔹 2. No hay cache → cargar API
      setLoading(true);
      let data: Product[] = [];

      if (category === "celulares") {
        data = await getCellPhones("HJLEMA");
      }

      if (category === "tablets") {
        data = await getTablets("HJLEMA");
      }

      if (category === "celularesmasv") {
        data = await getProductosMasVendidos("HJLEMA");
      }

      if (category === "all") {
        const [phones, tablets] = await Promise.all([
          getCellPhones("HJLEMA"),
          getTablets("HJLEMA"),
        ]);
        data = [...phones, ...tablets];
      }

      if (!isMounted) return;

      // 🔹 3. Guardar resultado
      setAllProducts(data);
      setCache((prev) => ({ ...prev, [category]: data }));
      setLoading(false);
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [category]);

  if (loading) {
    return <GlobalLoader />;
  }

  const filteredProducts = (() => {
    let result = [...allProducts];

    const term = normalizeText(search.trim());
    if (term) {
      result = result.filter(
        (p) =>
          normalizeText(p.name).includes(term) ||
          normalizeText(p.code).includes(term) ||
          normalizeText(p.imei).includes(term)
      );
    }

    if (onlyInStock) {
      result = result.filter((p) => p.stock > 0);
    }

    if (priceOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (priceOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  })();

  return (
    <>
      {/* BÚSQUEDA */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* FILTROS */}
      <div className="flex gap-4 mb-4 items-center">
        <select
          value={priceOrder}
          onChange={(e) => setPriceOrder(e.target.value as "asc" | "desc" | "")}
          className="px-3 py-2 rounded-lg bg-[#1B2333] text-white border border-white/10 outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" className="bg-[#1B2333] text-white">
            Ordenar por precio
          </option>
          <option value="asc" className="bg-[#1B2333] text-white">
            Más baratos
          </option>
          <option value="desc" className="bg-[#1B2333] text-white">
            Más caros
          </option>
        </select>

        <label className="flex items-center gap-2 text-white/80">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          Solo con stock
        </label>

        <button
          onClick={() => {
            setSearch("");
            setPriceOrder("");
            setOnlyInStock(false);
          }}
          className="px-4 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/20"
        >
          Limpiar filtros
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isInCart = cart.some((p) => p.id === product.id);

          return (
            <div key={product.id} className="bg-white/5 rounded-xl p-4">
              <div className="h-36 mb-4 flex items-center justify-center">
                <img
                  src={product.image || PLACEHOLDER_IMAGE}
                  alt={product.name}
                  className="h-full object-contain opacity-90"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>

              <h3 className="font-semibold">{product.name}</h3>

              <div className="flex justify-between mt-3">
                <span className="font-bold">${product.price}</span>
                <button
                  onClick={() => {
  addToCart(product);
  toast.success("Producto agregado al carrito");
}}
                  disabled={isInCart}
                  className={`
    px-3 py-1 rounded-lg font-bold
    ${
      isInCart
        ? "bg-gray-500 cursor-not-allowed opacity-60"
        : "bg-purple-600 hover:bg-purple-700"
    }
  `}
                >
                  +
                </button>
              </div>

              <div className="text-xs text-white/50 mt-2">
                <p>IMEI: {product.imei}</p>
                <p>Código: {product.code}</p>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <p className="col-span-4 text-center text-white/60">
            No se encontraron productos
          </p>
        )}
      </div>
    </>
  );
}

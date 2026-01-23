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
import { useFacturaCart } from "../../../shared/context/useFacturaCart";
import toast from "react-hot-toast";

const PLACEHOLDER_IMAGE = "/src/assets/images/placeholder.jpg";
const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const extractStorageGB = (text: string): number | null => {
  const matches = [...text.matchAll(/(\d+)\s*gb/gi)];
  if (matches.length === 0) return null;

  const values = matches.map((m) => Number(m[1]));
  return Math.max(...values);
};

const getDiscountPercentage = (name: string): number => {
  const upper = name.toUpperCase();

  if (upper.includes("HOT")) return 15;
  if (upper.includes("PRO")) return 10;

  return 0;
};

const getDiscountedPrice = (price: number, discount: number): number => {
  if (discount <= 0) return price;
  return Math.round(price - (price * discount) / 100);
};

export default function ProductsGrid({ category }: Props) {
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | "gb" | "">("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [cache, setCache] = useState<Record<string, Product[]>>({});
  const { addToCart, cart } = useFacturaCart();

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
        data = await getCellPhones("HPMOLINA");
      }

      if (category === "tablets") {
        data = await getTablets("HJLEMA");
      }

      if (category === "celularesmasv") {
        data = await getProductosMasVendidos("HJLEMA");
      }

      if (category === "all") {
        const [phones, tablets] = await Promise.all([
          getCellPhones("HPMOLINA"),
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

    if (priceOrder === "gb") {
      result = result
        .map((p) => ({
          ...p,
          _storageGB: extractStorageGB(p.name),
        }))
        .filter((p) => p._storageGB !== null)
        .sort((a, b) => (a._storageGB as number) - (b._storageGB as number));
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
          className="
  w-full px-4 py-2 rounded-xl
  bg-slate-100 dark:bg-white/10
  text-slate-900 dark:text-white
  placeholder-slate-500 dark:placeholder-white/50
  outline-none focus:ring-2 focus:ring-purple-500
"
        />
      </div>

      {/* FILTROS */}
      <div className="flex gap-4 mb-4 items-center">
        <select
          value={priceOrder}
          onChange={(e) => setPriceOrder(e.target.value as "asc" | "desc" | "")}
          className="
  px-3 py-2 rounded-lg
  bg-slate-100 dark:bg-[#1B2333]
  text-slate-900 dark:text-white
  border border-slate-300 dark:border-white/10
  outline-none focus:ring-2 focus:ring-purple-500
"
        >
          <option
            value=""
            className="bg-white text-slate-900 dark:bg-[#1B2333] dark:text-white"
          >
            Ordenar por precio
          </option>
          <option value="asc" className="bg-[#1B2333] text-white">
            Más baratos
          </option>
          <option value="desc" className="bg-[#1B2333] text-white">
            Más caros
          </option>
          <option value="gb" className="bg-[#1B2333] text-white">
            Por GB
          </option>
        </select>

        <label className="flex items-center gap-2 text-slate-700 dark:text-white/80">
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
          className="
  px-4 py-2 rounded-lg
  bg-slate-200 dark:bg-white/10
  text-slate-800 dark:text-white/80
  hover:bg-slate-300 dark:hover:bg-white/20
"
        >
          Limpiar filtros
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isInCart = cart.some((p) => p.id === product.id);

          const discount = getDiscountPercentage(product.name);
          const finalPrice = getDiscountedPrice(product.price, discount);

          return (
            <div
              key={product.id}
              className="
    rounded-xl p-4 relative
    bg-white dark:bg-white/5
    border border-slate-300 dark:border-white/10
    text-slate-900 dark:text-white
  "
            >
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

              {discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                  -{discount}%
                </span>
              )}

              <h3 className="font-semibold text-slate-900 dark:text-white">
                {product.name}
              </h3>

              <div className="flex justify-between mt-3">
                {discount > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-red-400 line-through">
                      ${product.price}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      ${finalPrice}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price}
                  </span>
                )}

                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      price: finalPrice,
                    });
                    toast.success("Producto agregado al carrito");
                  }}
                  disabled={isInCart}
                  className={`
  px-3 py-1 rounded-lg font-bold
  ${
    isInCart
      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
      : "bg-indigo-600 text-white hover:bg-indigo-700"
  }
`}
                >
                  +
                </button>
              </div>

              <div className="text-xs text-slate-600 dark:text-white/50 mt-2">
                <p>IMEI: {product.imei}</p>
                <p>Código: {product.code}</p>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <p className="col-span-4 text-center text-slate-600 dark:text-white/60">
            No se encontraron productos
          </p>
        )}
      </div>
    </>
  );
}

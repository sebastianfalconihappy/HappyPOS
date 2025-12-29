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

export default function ProductsGrid({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      let data: Product[] = [];

      // SOLO CELULARES
      if (category === "celulares") {
        data = await getCellPhones("HJLEMA");
      }

      // SOLO TABLETS
      if (category === "tablets") {
        data = await getTablets("HJLEMA");
      }

        // 🔹 MÁS VENDIDOS (API DIFERENTE)
  if (category === "celularesmasv") {
    data = await getProductosMasVendidos("HJLEMA");
  }
    
      // TODOS
      if (category === "all") {
        const [phones, tablets, celularesmasv] = await Promise.all([
          getCellPhones("HJLEMA"),
          getTablets("HJLEMA"),
          getProductosMasVendidos("HJLEMA"),
        ]);

        data = [...phones, ...tablets, ...celularesmasv];
      }

      setProducts(data);
      setLoading(false);
    }

    load();
  }, [category]);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white/5 rounded-xl p-4">
          <div className="h-36 mb-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-contain"
            />
          </div>

          <h3 className="font-semibold">{product.name}</h3>

          <div className="flex justify-between mt-3">
            <span className="font-bold">${product.price}</span>
            <button className="bg-purple-600 px-3 py-1 rounded-lg">+</button>
          </div>

          <div className="text-xs text-white/50 mt-2">
            <p>IMEI: {product.imei}</p>
            <p>Código: {product.code}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

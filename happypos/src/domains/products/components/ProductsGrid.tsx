import { useEffect, useState } from "react";
import { getCellPhones } from "../api/products.services";
import type { Product } from "../types/Product";

type Props = {
  category: string;
};

export default function ProductsGrid({ category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category !== "all" && category !== "phones") return;

    async function load() {
      setLoading(true);
      const data = await getCellPhones("HJLEMA");
      setProducts(data);
      setLoading(false);
    }

    load();
  }, [category]);

  if (loading) {
    return <p className="text-center">Cargando celulares...</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white/5 rounded-xl p-4"
        >
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
            <button className="bg-purple-600 px-3 py-1 rounded-lg">
              +
            </button>
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

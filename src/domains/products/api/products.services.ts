import { apiClient } from "./axios.config";
import type { ApiProductsResponse } from "./product.api.types";
import { mapApiProductToProduct } from "./product.mapper";
import type { Product } from "../types/Product";
import type { ApiCombosResponse } from "./product.api.types";


export async function getCellPhones(
  usuario: string
): Promise<Product[]> {
  const response = await apiClient.get<ApiProductsResponse>(
    "/Productos",
    {
      params: {
        producto: "Celular",
        usuario,
      },
    }
  );

  return response.data.data.productos.map(mapApiProductToProduct);
}

export async function getTablets(
  usuario: string
): Promise<Product[]> {
  const response = await apiClient.get<ApiProductsResponse>(
    "/Productos",
    {
      params: {
        producto: "Tablet",
        usuario,
      },
    }
  );

  return response.data.data.productos.map(mapApiProductToProduct);
}


// 👉 NUEVO: productos más vendidos (API DIFERENTE)
export async function getProductosMasVendidos(
  usuario: string
): Promise<Product[]> {
  const response = await apiClient.get<ApiProductsResponse>(
    "/MasVendidos",
    {
      params: {
        promocion: "Productos",
        usuario,
      },
    }
  );

  return response.data.data.productos.map(mapApiProductToProduct);
}

export async function getCombos(
  usuario: string
): Promise<Product[]> {
  const response = await apiClient.get<ApiCombosResponse>(
    "/MasVendidos",
    {
      params: {
        promocion: "Combos",
        usuario,
      },
    }
  );

  return response.data.data.map((combo, index) => ({
    id: `combo-${index}`,
    name: combo.nombrePromocion.trim(),
    code: "COMBO",
    imei: combo.productos
      .map((p) => p.Descripcion)
      .join(" + "),
    price: combo.totalPrecio,
    stock: 1,
    image: combo.url ?? "/src/assets/images/placeholder.jpg",
    category: "combos",
  }));
}

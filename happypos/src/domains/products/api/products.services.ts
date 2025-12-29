import { apiClient } from "./axios.config";
import type { ApiProductsResponse } from "./product.api.types";
import { mapApiProductToProduct } from "./product.mapper";
import type { Product } from "../types/Product";

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

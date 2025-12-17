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

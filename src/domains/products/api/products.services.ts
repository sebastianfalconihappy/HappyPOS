import { apiClient } from "./axios.config";
import type { ApiProductsResponse } from "./product.api.types";
import { mapApiProductToProduct } from "./product.mapper";
import type { Product } from "../types/Product";
import type { ApiCombosResponse } from "./product.api.types";

export async function getCellPhones(usuario: string): Promise<Product[]> {
  const response = await apiClient.get<ApiProductsResponse>("/Productos", {
    params: {
      producto: "Celular",
      usuario,
    },
  });

  return response.data.data.productos.map(mapApiProductToProduct);
}

export async function getTablets(usuario: string): Promise<Product[]> {
  const response = await apiClient.get<ApiProductsResponse>("/Productos", {
    params: {
      producto: "Tablet",
      usuario,
    },
  });

  return response.data.data.productos.map(mapApiProductToProduct);
}

// 👉 NUEVO: productos más vendidos (API DIFERENTE)
export async function getProductosMasVendidos(
  usuario: string,
): Promise<Product[]> {
  const response = await apiClient.get<ApiProductsResponse>("/MasVendidos", {
    params: {
      promocion: "Productos",
      usuario,
    },
  });

  return response.data.data.productos.map(mapApiProductToProduct);
}

export async function getCombos(usuario: string): Promise<Product[]> {
  const response = await apiClient.get<ApiCombosResponse>("/MasVendidos", {
    params: {
      promocion: "Combos",
      usuario,
    },
  });

  return response.data.data.map((combo, index) => {
    const stockReal = Math.min(...combo.productos.map((p) => p.stock));

    const codigos = combo.productos.map((p) => p.codigo).join(" + ");

    const imeis = combo.productos
      .flatMap((p) => p.imei)
      .map((i) => i.imei)
      .join(" + ");

    const nombres = combo.productos.map((p) => p.descripcion).join(" + ");

    return {
      id: `combo-${index}`,
      name: combo.nombrePromocion.trim(),
      code: codigos || "COMBO",
      imei: imeis || "SIN IMEI",
      description: nombres, // 👈 AQUÍ VAN LOS NOMBRES
      price: combo.totalPrecio,
      stock: stockReal,
      image: combo.url ?? "/src/assets/images/placeholder.jpg",
      category: "combos",
    };
  });
}

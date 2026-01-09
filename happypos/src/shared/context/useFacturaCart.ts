import { useFacturas } from "./useFacturas";
import type { Product } from "../../domains/products/types/Product";


export function useFacturaCart() {
  const {
    facturaActiva,
    agregarProducto,
    quitarProducto,
    subtotal,
    setCashPayment,
  } = useFacturas();

  return {
    cart: facturaActiva?.items ?? [],
    addToCart: (product: Product) => agregarProducto(product),
    removeFromCart: (id: string) => quitarProducto(id),
    subtotal,
    setCashPayment,
    facturaActiva,
  };
}

import type { ApiProduct } from "./product.api.types";
import type { Product } from "../types/Product";

const PLACEHOLDER_IMAGE = "/src/assets/images/placeholder.png";

export function mapApiProductToProduct(api: ApiProduct): Product {
  return {
    id: `${api.codigo}-${api.imei}`,
    name: api.descripcion,
    code: api.codigo,
    imei: api.imei,
    price: api.precio,
    stock: api.stock,
    image: api.url ?? PLACEHOLDER_IMAGE,
    category: "phones",
  };
}

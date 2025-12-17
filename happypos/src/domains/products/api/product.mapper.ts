import type { ApiProduct } from "./product.api.types";
import type { Product } from "../types/Product";

const PLACEHOLDER_IMAGE = "/src/assets/images/placeholder.png";

export function mapApiProductToProduct(api: ApiProduct): Product {
  return {
    id: `${api.Codigo}-${api.imei}`,
    name: api.Descripcion,
    code: api.Codigo,
    imei: api.imei,
    price: api.precio,
    stock: api.stock,
    image: api.url ?? PLACEHOLDER_IMAGE,
    category: "phones",
  };
}

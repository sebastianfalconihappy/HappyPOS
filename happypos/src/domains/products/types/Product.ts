export type ProductCategory = "phones" | "accessories" | "combos" | "unknown";

export interface Product {
  id: string;            
  name: string;
  brand?: string;
  category: ProductCategory;
  codigoBarra: string;
  imei: string | null;
  price: number;
  stock: number;
  image: string;
}

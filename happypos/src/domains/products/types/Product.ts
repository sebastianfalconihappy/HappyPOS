export type ProductCategory = "phones" | "accessories" | "combos";

export interface Product {
  id: string;              
  name: string;
  code: string;
  imei: string;
  price: number;
  stock: number;
  image: string;
  category: ProductCategory;
}

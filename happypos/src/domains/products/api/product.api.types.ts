export interface ApiProduct {
  Codigo: string;
  Descripcion: string;
  imei: string;
  stock: number;
  precio: number;
  url: string | null;
}

export interface ApiProductsResponse {
  status: number;
  data: {
    productos: ApiProduct[];
  };
}

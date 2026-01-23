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


// 👉 Producto dentro de un combo
export interface ApiComboProducto {
  Codigo: string;
  Descripcion: string;
  imei: { imei: string }[] | [];
  stock: number;
  precio: number;
}

// 👉 Combo
export interface ApiCombo {
  nombrePromocion: string;
  url: string | null;
  totalPrecio: number;
  productos: ApiComboProducto[];
}

// 👉 Respuesta API combos
export interface ApiCombosResponse {
  status: number;
  data: ApiCombo[];
}

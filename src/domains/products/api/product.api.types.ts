export interface ApiProduct {
  codigo: string;
  descripcion: string;
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
  codigo: string;
  descripcion: string;
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

import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../../domains/products/types/Product";

/* ============================= */
/* TIPOS */
/* ============================= */

export type Factura = {
  id: string;
  items: Product[];
  creadaEn: Date;
};

type FacturasContextType = {
  facturas: Factura[];
  facturaActiva: Factura | null;

  crearFactura: () => void;
  eliminarFactura: (id: string) => void;
  setFacturaActiva: (id: string) => void;

  // helpers (los usaremos después)
  agregarProducto: (product: Product) => void;
  quitarProducto: (productId: string) => void;
  subtotal: number;
};

/* ============================= */
/* CONTEXT */
/* ============================= */

export const FacturasContext = createContext<FacturasContextType | undefined>(
  undefined
);

/* ============================= */
/* PROVIDER */
/* ============================= */

export function FacturasProvider({ children }: { children: ReactNode }) {
  const [facturas, setFacturas] = useState<Factura[]>(() => [
    {
      id: crypto.randomUUID(),
      items: [],
      creadaEn: new Date(),
    },
  ]);

  const [facturaActivaId, setFacturaActivaId] = useState<string>(
    facturas[0].id
  );

  /* ============================= */
  /* DERIVADOS */
  /* ============================= */

  const facturaActiva = useMemo(
    () => facturas.find((f) => f.id === facturaActivaId) || null,
    [facturas, facturaActivaId]
  );

  const subtotal = useMemo(() => {
    if (!facturaActiva) return 0;
    return facturaActiva.items.reduce((acc, p) => acc + p.price, 0);
  }, [facturaActiva]);

  /* ============================= */
  /* ACCIONES */
  /* ============================= */

  const crearFactura = () => {
    const nuevaFactura: Factura = {
      id: crypto.randomUUID(),
      items: [],
      creadaEn: new Date(),
    };

    setFacturas((prev) => [...prev, nuevaFactura]);
    setFacturaActivaId(nuevaFactura.id);
  };

  const eliminarFactura = (id: string) => {
  setFacturas((prev) => {
    if (prev.length <= 1) {
      return prev;
    }

    const nuevasFacturas = prev.filter((f) => f.id !== id);
    if (id === facturaActivaId) {
      setFacturaActivaId(nuevasFacturas[0].id);
    }

    return nuevasFacturas;
  });
};


  const setFacturaActiva = (id: string) => {
    setFacturaActivaId(id);
  };

  const agregarProducto = (product: Product) => {
    setFacturas((prev) =>
      prev.map((f) =>
        f.id === facturaActivaId
          ? { ...f, items: [...f.items, product] }
          : f
      )
    );
  };

  const quitarProducto = (productId: string) => {
    setFacturas((prev) =>
      prev.map((f) =>
        f.id === facturaActivaId
          ? {
              ...f,
              items: f.items.filter((p) => p.id !== productId),
            }
          : f
      )
    );
  };

  return (
    <FacturasContext.Provider
      value={{
        facturas,
        facturaActiva,
        crearFactura,
        eliminarFactura,
        setFacturaActiva,
        agregarProducto,
        quitarProducto,
        subtotal,
      }}
    >
      {children}
    </FacturasContext.Provider>
  );
}

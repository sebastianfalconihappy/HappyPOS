import { useContext } from "react";
import { FacturasContext } from "./FacturasContext";

export function useFacturas() {
  const context = useContext(FacturasContext);
  if (!context) {
    throw new Error("useFacturas debe usarse dentro de FacturasProvider");
  }
  return context;
}

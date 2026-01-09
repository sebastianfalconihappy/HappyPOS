import { useMemo } from "react";

type Result = {
  vuelto: number;
  faltante: number;
  isValido: boolean;
};

export function useCashPayment(
  total: number,
  recibido: number
): Result {
  return useMemo(() => {
    const diferencia = recibido - total;

    if (recibido <= 0) {
      return {
        vuelto: 0,
        faltante: total,
        isValido: false,
      };
    }

    if (diferencia >= 0) {
      return {
        vuelto: Number(diferencia.toFixed(2)),
        faltante: 0,
        isValido: true,
      };
    }

    return {
      vuelto: 0,
      faltante: Number(Math.abs(diferencia).toFixed(2)),
      isValido: false,
    };
  }, [total, recibido]);
}

import DashboardLayout from "../../../shared/layout/DashboardLayout";
import ProductsGrid from "../components/ProductsGrid";
import TopActionsBar from "../../../shared/layout/TopActionsBar";
import { useState, useEffect } from "react";
import ConsultaClienteModal from "../../../shared/layout/ConsultaClienteModal";
import { useFacturas } from "../../../shared/context/useFacturas";
import OfferSplashModal from "../../../shared/layout/OfferSplashModal";

export default function DashboardPage() {
  const [openConsulta, setOpenConsulta] = useState(false);
  const [cotizar, setCotizar] = useState(false);
  const {
    facturas,
    facturaActiva,
    setFacturaActiva,
    crearFactura,
    eliminarFactura,
  } = useFacturas();
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("offer_shown");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShowOffer(true);
        sessionStorage.setItem("offer_shown", "true");
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <DashboardLayout>
      {(category) => (
        <div className="flex flex-col gap-6">
          {/* 🟣 NUEVA BARRA */}
          <TopActionsBar
            facturas={facturas}
            facturaActivaId={facturaActiva?.id ?? null}
            onSelectFactura={setFacturaActiva}
            onNuevaFactura={crearFactura}
            onEliminarFactura={() => {
              if (!facturaActiva) return;
              eliminarFactura(facturaActiva.id);
            }}
            onConsultaCliente={() => setOpenConsulta(true)}
            cotizar={cotizar}
            onToggleCotizar={setCotizar}
          />

          <h1 className="text-2xl font-semibold text-center">
            Bienvenido a HappyPOS
          </h1>

          <ProductsGrid category={category} />

          {/* 🪟 MODAL */}
          <ConsultaClienteModal
            open={openConsulta}
            onClose={() => setOpenConsulta(false)}
          />

          <OfferSplashModal
            open={showOffer}
            onClose={() => setShowOffer(false)}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

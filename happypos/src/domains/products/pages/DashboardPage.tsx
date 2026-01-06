import DashboardLayout from "../../../shared/layout/DashboardLayout";
import ProductsGrid from "../components/ProductsGrid";
import TopActionsBar from "../../../shared/layout/TopActionsBar";
import { useState } from "react";
import ConsultaSolicitudModal from "../../../shared/layout/ConsultaSolicitudModal";

export default function DashboardPage() {
  const [openConsulta, setOpenConsulta] = useState(false);
  const [cotizar, setCotizar] = useState(false);

  return (
    <DashboardLayout>
      {(category) => (
        <div className="flex flex-col gap-6">
          {/* 🟣 NUEVA BARRA */}
          <TopActionsBar
            onConsultaSolicitud={() => setOpenConsulta(true)}
            cotizar={cotizar}
            onToggleCotizar={setCotizar}
          />

          <h1 className="text-2xl font-semibold text-center">
            Bienvenido a HappyPOS
          </h1>

          <ProductsGrid category={category} />

          {/* 🪟 MODAL */}
          <ConsultaSolicitudModal
            open={openConsulta}
            onClose={() => setOpenConsulta(false)}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

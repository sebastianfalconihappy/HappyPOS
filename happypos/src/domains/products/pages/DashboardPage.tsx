import DashboardLayout from "../../../shared/layout/DashboardLayout";
import ProductsGrid from "../components/ProductsGrid";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {(category) => (
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-center">
            Bienvenido a HappyPOS 
          </h1>

          <ProductsGrid category={category} />
        </div>
      )}
    </DashboardLayout>
  );
}

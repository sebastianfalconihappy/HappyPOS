import { useState } from "react";
import Header from "./Header";
import CategoriesSidebar from "./CategoriesSidebar";
import CartSidebar from "./CartSidebar";


type Props = {
  children: (category: string) => React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [category, setCategory] = useState("all");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <div className="flex">
        {/* Sidebar izquierdo */}
        <CategoriesSidebar
          active={category}
          onChange={setCategory}
        />

        {/* Contenido central */}
        <main className="flex-1 p-6">
          {children(category)}
        </main>

        {/* Carrito derecho */}
        <CartSidebar />
      </div>
    </div>
  );
}

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
    <div
      className="
    h-screen
    overflow-hidden
    bg-white dark:bg-slate-900
    text-black dark:text-white
  "
    >
      <Header />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar izquierdo */}
        <CategoriesSidebar active={category} onChange={setCategory} />

        {/* Contenido central */}
        <main className="flex-1 p-6 overflow-y-auto">{children(category)}</main>

        {/* Carrito derecho */}
        <CartSidebar />
      </div>
    </div>
  );
}

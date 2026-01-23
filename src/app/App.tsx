import AppRoutes from "../routes";
import { AuthProvider } from "./providers/AuthProvider";
// import { CartProvider } from "../shared/context/CartProvider";
import { Toaster } from "react-hot-toast";
import { FacturasProvider } from "../shared/context/FacturasContext";



function App() {
  return (
    <AuthProvider>
      <FacturasProvider>
      {/* <CartProvider> */}
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1800,
            style: {
              background: "#0B1220",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      {/* </CartProvider> */}
      </FacturasProvider>
    </AuthProvider>
  );
}

export default App;

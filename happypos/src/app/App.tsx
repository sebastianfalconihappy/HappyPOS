import AppRoutes from "../routes";
import { AuthProvider } from "./providers/AuthProvider";
import { CartProvider } from "../shared/context/CartProvider";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

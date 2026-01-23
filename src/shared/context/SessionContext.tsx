import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type SessionData = {
  nombre: string;
  cedula: string;
};

type SessionContextType = {
  session: SessionData | null;
  setSession: (data: SessionData) => void;
  clearSession: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<SessionData | null>(null);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) {
      setSessionState(JSON.parse(stored));
    }
  }, []);

  const setSession = (data: SessionData) => {
    setSessionState(data);
    localStorage.setItem("session", JSON.stringify(data));
  };

  const clearSession = () => {
    setSessionState(null);
    localStorage.removeItem("session");
  };

  return (
    <SessionContext.Provider value={{ session, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe usarse dentro de SessionProvider");
  }
  return context;
}

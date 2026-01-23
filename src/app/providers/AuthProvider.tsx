import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  name: string;
  role: string;
}

interface Branch {
  name: string;
}

interface CashRegister {
  name: string;
}

interface AuthContextValue {
  user: User | null;
  branch: Branch | null;
  cashRegister: CashRegister | null;
  login: (data: {
    user: User;
    branch: Branch;
    cashRegister: CashRegister;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [cashRegister, setCashRegister] = useState<CashRegister | null>(null);

  function login(data: {
    user: User;
    branch: Branch;
    cashRegister: CashRegister;
  }) {
    setUser(data.user);
    setBranch(data.branch);
    setCashRegister(data.cashRegister);
  }

  function logout() {
    setUser(null);
    setBranch(null);
    setCashRegister(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ user, branch, cashRegister, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return ctx;
}

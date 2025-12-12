import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button
      className="w-full py-3 rounded-lg
        bg-gradient-to-r from-indigo-500 to-purple-600
        font-semibold text-sm
        hover:opacity-90 transition">
      {children}
    </button>
  );
}

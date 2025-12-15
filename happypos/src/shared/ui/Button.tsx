import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-3 rounded-lg
        bg-gradient-to-r from-indigo-500 to-purple-600
        font-semibold text-sm
        hover:opacity-90 transition"
    >
      {children}
    </button>
  );
}

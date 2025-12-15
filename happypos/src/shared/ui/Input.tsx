import type { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm mb-1 text-slate-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg
          bg-slate-100 border border-slate-300
          px-4 py-2 text-sm
          focus:outline-none focus:ring-2
          focus:ring-indigo-500"
      />
    </div>
  );
}

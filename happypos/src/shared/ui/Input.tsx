interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm mb-1 text-slate-300">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg
          bg-slate-800 border border-slate-700
          px-4 py-2 text-sm
          focus:outline-none focus:ring-2
          focus:ring-indigo-500"
      />
    </div>
  );
}

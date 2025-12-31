type Props = {
  selected: string | null;
  onSelect: (method: string) => void;
};

export default function PaymentMethods({ selected, onSelect }: Props) {
  const methods = [
    { id: "PLAN", label: "📅 Plan de pagos" },
    { id: "DEBITO", label: "💳 Tarjeta débito" },
    { id: "EFECTIVO", label: "💵 Efectivo" },
    { id: "CREDITO", label: "📊 Tarjeta con intereses" },
  ];

  return (
    <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10">
      <h2 className="text-sm font-semibold mb-2">
        Método de pago
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {methods.map((method) => {
          const isSelected = selected === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`
                p-3 rounded-lg text-left text-sm transition
                border
                ${
                  isSelected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                    : "border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10"
                }
              `}
            >
              {method.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

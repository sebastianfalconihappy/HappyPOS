import { useState } from "react";

export default function SummaryCalculator() {
  const [display, setDisplay] = useState("");
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/" | null>(null);
  const [waitingSecond, setWaitingSecond] = useState(false);

  const handleNumber = (value: string) => {
    if (waitingSecond) {
      setDisplay(value === "." ? "0." : value);
      setWaitingSecond(false);
      return;
    }

    if (value === "." && display.includes(".")) return;

    setDisplay((prev) => (prev === "" ? value : prev + value));
  };

  const handleOperator = (op: "+" | "-" | "*" | "/") => {
    if (display === "") return;

    const current = Number(display);

    if (firstValue === null) {
      setFirstValue(current);
    } else if (!waitingSecond) {
      const result = calculate(firstValue, current, operator);
      setFirstValue(result);
      setDisplay(String(result));
    }

    setOperator(op);
    setWaitingSecond(true);
  };

  const calculate = (
    a: number,
    b: number,
    op: "+" | "-" | "*" | "/" | null
  ): number => {
    if (!op) return b;

    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) {
          alert("No se puede dividir para 0");
          return a;
        }
        return Number((a / b).toFixed(6));
      default:
        return b;
    }
  };

  const handleEqual = () => {
    if (firstValue === null || operator === null || display === "") return;

    const second = Number(display);
    const result = calculate(firstValue, second, operator);

    setDisplay(String(result));
    setFirstValue(null);
    setOperator(null);
    setWaitingSecond(false);
  };

  const handleClear = () => {
    setDisplay("");
    setFirstValue(null);
    setOperator(null);
    setWaitingSecond(false);
  };

  return (
    <div className="mt-3">
      {/* PANEL */}
      <div
        className="
    mt-3
    p-6
    rounded-xl
    bg-slate-100 dark:bg-white/5
    border border-slate-300 dark:border-white/10
    shadow-lg
    w-full
    min-h-[380px]
    animate-slide-fade
    flex
    flex-col
  "
      >
        {/* DISPLAY */}
        <div
          className="
    mb-6
    p-5
    rounded-lg
    bg-white dark:bg-black/40
    text-right
    text-3xl
    font-mono
    tracking-wider
    min-h-[64px]
    flex
    items-center
    justify-end
  "
        >
          {display}
        </div>

        {/* TECLAS */}
        <div className="grid grid-cols-4 gap-4 flex-1">
          {["7", "8", "9"].map((k) => (
            <button
              key={k}
              onClick={() => handleNumber(k)}
              className="btn-calc"
            >
              {k}
            </button>
          ))}
          <button onClick={() => handleOperator("+")} className="btn-calc">
            +
          </button>

          {["4", "5", "6"].map((k) => (
            <button
              key={k}
              onClick={() => handleNumber(k)}
              className="btn-calc"
            >
              {k}
            </button>
          ))}
          <button onClick={() => handleOperator("-")} className="btn-calc">
            -
          </button>

          {["1", "2", "3"].map((k) => (
            <button
              key={k}
              onClick={() => handleNumber(k)}
              className="btn-calc"
            >
              {k}
            </button>
          ))}
          <button onClick={() => handleOperator("*")} className="btn-calc">
            *
          </button>

          <button onClick={() => handleNumber("0")} className="btn-calc">
            0
          </button>

          <button onClick={() => handleNumber(".")} className="btn-calc">
            .
          </button>

          <button onClick={handleEqual} className="btn-calc">
            =
          </button>

          <button onClick={handleClear} className="btn-calc">
            C
          </button>
        </div>
      </div>
    </div>
  );
}

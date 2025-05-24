import { useState, useEffect } from "react";
type QuantitySelectorProps = {
  stock: number;
  onChange?: (value: number) => void;
};

export default function QuantitySelector({
  stock,
  onChange,
}: QuantitySelectorProps) {
  const [count, setCount] = useState(1);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);

  const increase = () => {
    if (count < stock) {
      setCount((prev) => prev + 1);
      setWarning("");
    } else {
      setWarning("You reached max available stock.");
    }
  };

  const decrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
      setWarning("");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={decrease}
          className="px-3 py-2 bg-gray-200 hover:bg-[#F65D4E] text-lg cursor-pointer"
        >
          –
        </button>
        <div className="px-4 py-2 w-12 text-center bg-white">{count}</div>
        <button
          onClick={increase}
          className={`cursor-pointer px-3 py-2 bg-gray-200 hover:bg-[#F65D4E] text-lg ${
            count >= stock ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          +
        </button>
      </div>
      {warning && (
        <p className="text-red-500 text-sm absolute top-0 w-[300px] right-10">
          {warning}
        </p>
      )}
      <p className="text-xs text-gray-500">In stock: {stock}</p>
    </div>
  );
}

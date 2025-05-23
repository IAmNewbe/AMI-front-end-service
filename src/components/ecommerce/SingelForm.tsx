import { useState, useEffect } from "react";

interface NumWidgetProps {
  title: string;
  value: number;
  units: string;
  storageKey: string;
}

export default function SingleForm({ title, value, units, storageKey }: NumWidgetProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  // Load saved value from localStorage on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue) {
      setCurrentValue(Number(savedValue));
      setInputValue(savedValue);
    }
  }, [storageKey]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = Number(inputValue);
    if (!isNaN(numValue)) {
      setCurrentValue(numValue);
      localStorage.setItem(storageKey, numValue.toString());
    }
    setIsEditing(false);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between pt-1 md:pt-0">
        <span className="text-base font-bold text-gray-700 dark:text-gray-400">
          {title}
        </span>
        <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
          click down below to edit
        </span>
      </div>
      <div className="flex items-end justify-between mt-1">
        <div>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-2">
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full font-medium md:font-semibold text-gray-800 text-lg md:text-xl dark:text-white/90 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </form>
          ) : (
            <p 
              className="mt-2 font-medium md:font-semibold text-gray-800 text-lg md:text-xl dark:text-white/90 cursor-pointer"
              onClick={handleEditClick}
            >
              {currentValue}
            </p>
          )}
        </div>
        <button
          onClick={isEditing ? handleSubmit : handleEditClick}
          className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
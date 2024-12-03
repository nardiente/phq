import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DimensionInputProps {
  value: number;
  onChange: (value: number) => void;
  error: string | null;
  label: string;
  min?: number;
  max?: number;
}

export function DimensionInput({ 
  value, 
  onChange, 
  error, 
  label,
  min,
  max 
}: DimensionInputProps) {
  const [inputValue, setInputValue] = React.useState(value.toString());

  React.useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(newValue);
    
    if (newValue === '') {
      onChange(0);
    } else {
      const numericValue = parseInt(newValue, 10);
      onChange(numericValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-700 font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 pr-12 border ${
            error ? 'border-red-300' : 'border-gray-200'
          } rounded-lg bg-white focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-100' : 'focus:ring-purple-100'
          } transition-colors`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <span className="text-gray-400 text-sm">px</span>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-1.5 text-red-500 text-sm">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
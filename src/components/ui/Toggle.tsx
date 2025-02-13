import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
}

export function Toggle({ checked, onChange, disabled = false, activeColor = '#5a00cd' }: ToggleProps) {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={`w-[43px] h-[23px] rounded-full transition-colors duration-200 ${
          checked ? `bg-[${activeColor}]` : 'bg-gray-200'
        } ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } inline-block relative`}
      >
        <span
          className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-[19px] w-[19px] transition-transform duration-200 ${
            checked ? 'translate-x-[20px]' : ''
          }`}
        />
      </span>
    </label>
  );
}

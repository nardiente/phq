import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Switch = ({ checked, onChange, className }: SwitchProps) => {
  const onToggle = () => {
    onChange(!checked);
  };

  const backgroundColor = checked ? '#5a00cd' : 'bg-gray-200';

  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${backgroundColor} ${className}`}
      onClick={onToggle}
      aria-checked={checked}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
      />
    </button>
  );
}; 
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../../../icons/chevron-down.icon';
import { SelectDropdownProps } from '../../../../types/dropdown';

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  containerClass = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Safely handle undefined/null values
  const safeValue = value ?? { value: '', label: 'Select an option' };

  // Type guard to ensure we always have valid options
  const safeOptions = options?.length ? options : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${containerClass}`} ref={dropdownRef}>
      <button
        id={id}
        type="button"
        className="relative w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none text-sm bg-white flex items-center justify-between font-satoshi"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-900">{safeValue.label}</span>
        <span className="text-gray-500">
          <ChevronDownIcon className="w-4 h-4" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {safeOptions.map((option) => (
            <button
              key={option.value}
              className="w-full px-3 py-2 text-left text-sm font-satoshi hover:bg-blue-50 focus:outline-none text-gray-900"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

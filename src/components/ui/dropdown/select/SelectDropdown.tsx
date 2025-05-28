import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../../../icons/chevron-down.icon';

interface SelectDropdownProps {
  options: {
    value:
      | 'Top left'
      | 'Top right'
      | 'Bottom left'
      | 'Bottom right'
      | 'Tab'
      | 'Floating'
      | 'Right'
      | 'Left'
      | 'Bolt'
      | 'Roadmap'
      | 'WhatsNew'
      | 'Idea'
      | 'Light'
      | 'Dark'
      | 'Modal'
      | 'Popover'
      | 'Sidebar'
      | 'Embed'
      | 'Count'
      | 'Dot'
      | 'None';
    label: string;
  }[];
  value: { value: string; label: string } | null;
  onChange: (option: {
    value:
      | 'Top left'
      | 'Top right'
      | 'Bottom left'
      | 'Bottom right'
      | 'Tab'
      | 'Floating'
      | 'Right'
      | 'Left'
      | 'Bolt'
      | 'Roadmap'
      | 'WhatsNew'
      | 'Idea'
      | 'Light'
      | 'Dark'
      | 'Modal'
      | 'Popover'
      | 'Sidebar'
      | 'Embed'
      | 'Count'
      | 'Dot'
      | 'None';
    label: string;
  }) => void;
  containerClass?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  containerClass = '',
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

  useEffect(() => {}, [value, options]);

  return (
    <div className={`relative ${containerClass}`} ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-satoshi text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md"
      >
        <span>{safeValue.label}</span>
        <span className="ml-2">
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

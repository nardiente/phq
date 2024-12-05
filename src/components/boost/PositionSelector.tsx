import React from 'react';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useDropdown } from '../../contexts/DropdownContext';

interface PositionSelectorProps {
  position: string;
  onChange: (position: string) => void;
}

export function PositionSelector({
  position,
  onChange,
}: PositionSelectorProps) {
  const { openDropdown, setOpenDropdown } = useDropdown();
  const dropdownId = 'position-selector-dropdown';
  const isOpen = openDropdown === dropdownId;

  const positions = [
    { id: 'Left', icon: ArrowLeft },
    { id: 'Right', icon: ArrowRight },
  ];

  const selectedOption = positions.find((pos) => pos.id === position);
  const Icon = selectedOption?.icon || ArrowRight;

  const handleToggle = () => {
    setOpenDropdown(isOpen ? null : dropdownId);
  };

  const handleSelect = (newPosition: string) => {
    onChange(newPosition);
    setOpenDropdown(null);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-2.5 text-left border border-gray-200 rounded-lg bg-white flex items-center justify-between hover:border-gray-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-gray-500" />
          <span className="text-gray-900">{position}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {positions.map(({ id, icon: PosIcon }) => (
            <button
              key={id}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 flex items-center gap-2"
              onClick={() => handleSelect(id)}
            >
              <PosIcon size={18} className="text-gray-500" />
              {id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import {
  ChevronDown,
  Sidebar,
  Maximize2,
  Square,
  ExternalLink,
} from 'lucide-react';
import { useDropdown } from '../../contexts/DropdownContext';

interface BoostTypeDropdownProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const boostTypes = [
  { id: 'Sidebar', icon: Sidebar, label: 'Sidebar' },
  { id: 'Modal', icon: Maximize2, label: 'Modal' },
  { id: 'Popover', icon: Square, label: 'Popover' },
  { id: 'Embed', icon: ExternalLink, label: 'Embed' },
];

export function BoostTypeDropdown({
  selectedType,
  onSelect,
}: BoostTypeDropdownProps) {
  const { openDropdown, setOpenDropdown } = useDropdown();
  const dropdownId = 'boost-type-dropdown';
  const isOpen = openDropdown === dropdownId;

  const selectedOption = boostTypes.find((type) => type.id === selectedType);
  const Icon = selectedOption?.icon || Sidebar;

  const handleToggle = () => {
    setOpenDropdown(isOpen ? null : dropdownId);
  };

  const handleSelect = (type: string) => {
    onSelect(type);
    setOpenDropdown(null);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-2.5 text-left border border-purple-300 rounded-lg bg-white flex items-center justify-between hover:border-purple-400 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-gray-500" />
          <span className="text-gray-900">{selectedType}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {boostTypes.map(({ id, icon: TypeIcon, label }) => (
            <button
              key={id}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 flex items-center gap-2"
              onClick={() => handleSelect(id)}
            >
              <TypeIcon size={18} className="text-gray-500" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

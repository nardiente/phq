import { useState } from 'react';
import { ChevronUp, Check } from 'lucide-react';

interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const STATUS_OPTIONS = [
  { label: 'Planned', color: '#3b82f6' },
  { label: 'Under Review', color: '#ff6334' },
  { label: 'In Progress', color: '#9333ea' },
  { label: 'Completed', color: '#10b981' },
];

const StatusDropdown = ({ value, onChange }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 border rounded-lg flex items-center justify-between"
      >
        <span>{value}</span>
        <ChevronUp className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border">
          <div className="p-2 text-gray-400">Statuses</div>
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                onChange(option.label);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: option.color }}
                />
                <span style={{ color: option.color }}>{option.label}</span>
              </div>
              {value === option.label && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;

import { useState } from 'react';

interface EffortIndicatorProps {
  level: number;
  maxLevel?: number;
  onChange?: (level: number) => void;
  className?: string;
}

const EFFORT_VALUES = [
  { dots: 1, value: 1, label: 'XS' },
  { dots: 2, value: 3, label: 'S' },
  { dots: 3, value: 5, label: 'M' },
  { dots: 4, value: 8, label: 'L' },
  { dots: 5, value: 13, label: 'XL' },
];

const EffortIndicator = ({
  level,
  maxLevel = 5,
  onChange,
  className,
}: EffortIndicatorProps) => {
  const [hoverLevel, setHoverLevel] = useState<number | null>(null);

  return (
    <div className={`flex gap-1 ${className || ''}`}>
      {Array.from({ length: maxLevel }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index + 1)}
          onMouseEnter={() => setHoverLevel(index + 1)}
          onMouseLeave={() => setHoverLevel(null)}
          className={`w-4 h-4 rounded-full transition-colors ${
            (hoverLevel !== null ? index < hoverLevel : index < level)
              ? 'bg-[#ff6334]'
              : 'bg-gray-200'
          }`}
          title={`${EFFORT_VALUES[index].value} (${EFFORT_VALUES[index].label})`}
          aria-label={`Set effort to ${EFFORT_VALUES[index].label}`}
          aria-pressed={index < level}
        />
      ))}
    </div>
  );
};

export default EffortIndicator;

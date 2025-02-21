import React from 'react';

interface ColorDisplayProps {
  name: string;
  className: string;
}

const ColorDisplay: React.FC<ColorDisplayProps> = ({ name, className }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-16 h-16 rounded ${className}`}></div>
      <p className="mt-2 text-sm">{name}</p>
    </div>
  );
};

export default ColorDisplay; 
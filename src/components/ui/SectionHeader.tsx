import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div>
      <h2 className="text-[16px] font-semibold text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-[14px] text-gray-600">{description}</p>
      )}
    </div>
  );
}

import React, { ReactNode } from 'react';
import SectionDescription from './SectionDescription';

interface SectionHeaderProps {
  title: string;
  description?: ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
        {title}
      </h2>
      <SectionDescription text={description} />
    </div>
  );
};

export default SectionHeader;

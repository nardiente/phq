import React, { ReactNode } from 'react';
import { useApp } from '../contexts/AppContext';

interface SettingsHeaderProps {
  title: string;
  description?: string;
  filter?: ReactNode;
  secondaryButton?: ReactNode;
  primaryButton?: ReactNode;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description,
  filter,
  secondaryButton,
  primaryButton,
}) => {
  const { is_public } = useApp();

  return (
    <div className="flex items-center justify-between mb-8 px-8">
      <div>
        <h1
          className={`text-[28px] font-semibold ${is_public ? 'default-text-color' : 'text-gray-900'} leading-none`}
        >
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {filter}
      <div className="flex gap-3">
        {secondaryButton}
        {primaryButton}
      </div>
    </div>
  );
};

export default SettingsHeader;

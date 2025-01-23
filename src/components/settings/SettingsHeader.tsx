import React, { ReactNode } from 'react';

interface SettingsHeaderProps {
  title: string;
  secondaryButton?: ReactNode;
  primaryButton?: ReactNode;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  secondaryButton,
  primaryButton,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[28px] font-semibold text-gray-900">{title}</h1>
      <div className="flex gap-3">
        {secondaryButton}
        {primaryButton}
      </div>
    </div>
  );
};

export default SettingsHeader;

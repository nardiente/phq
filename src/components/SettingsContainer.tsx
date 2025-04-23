import React from 'react';

interface SettingsContainerProps {
  id?: string;
  children: React.ReactNode; // Allow any React nodes as children
}

const SettingsContainer: React.FC<SettingsContainerProps> = ({
  id = '',
  children,
}) => {
  return (
    <div
      id={id}
      className="bg-white rounded-lg border border-gray-200 p-6 mt-5 mx-8 mb-8"
    >
      <div className="flex flex-col gap-8 text-gray-700">
        {children} {/* Render the children passed to this component */}
      </div>
    </div>
  );
};

export default SettingsContainer;

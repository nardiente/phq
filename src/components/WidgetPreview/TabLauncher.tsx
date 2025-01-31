import React from 'react';
import { WidgetConfig } from '../../types/widget';

interface TabLauncherProps {
  config: WidgetConfig;
  onClick: () => void;
}

export const TabLauncher: React.FC<TabLauncherProps> = ({ config, onClick }) => {
  const getTabStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      top: '50%',
      marginTop: '-80px',
    };

    const leftStyles = {
      ...baseStyles,
      transform: 'rotate(90deg)',
      transformOrigin: 'bottom left',
      left: '0',
    };

    const rightStyles = {
      ...baseStyles,
      transform: 'rotate(-90deg)',
      transformOrigin: 'bottom right',
      right: '0',
    };

    return config.launcherPosition === 'Left' ? leftStyles : rightStyles;
  };

  return (
    <div 
      className="absolute"
      style={getTabStyles()}
    >
      <button
        onClick={onClick}
        className="min-w-[120px] h-9 rounded-t-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center relative"
        style={{ 
          backgroundColor: config.backgroundColor || '#5a00cd',
          color: config.iconColor === 'Light' ? '#ffffff' : '#111827'
        }}
      >
        <span className="px-1">{config.launcherText || "What's new"}</span>
      </button>
    </div>
  );
}; 
import React from 'react';
import { WidgetConfig } from '../../types/widget';

interface FloatingLauncherProps {
  config: WidgetConfig;
  onClick?: () => void;
}

export const FloatingLauncher: React.FC<FloatingLauncherProps> = ({ config, onClick }) => {
  const position = config.launcherPosition === 'Bottom left' ? 'left-4' : 'right-4';
  const iconColor = config.iconColor === 'Dark' ? '#1F2937' : '#FFFFFF';
  
  const getIcon = () => {
    switch (config.launcherIcon) {
      case 'Roadmap':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
            <path d="M2 20h20M2 12h20M2 4h20" />
          </svg>
        );
      case 'WhatsNew':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 2v4M7 8h8M7 12h3" />
            <path d="M15 12h4a2 2 0 012 2v6a2 2 0 01-2 2h-4" />
          </svg>
        );
      case 'Idea':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
            <path d="M12 2v1M12 15v2M4.93 4.93l.7.7M19.07 4.93l-.7.7M22 12h-1M3 12H2M19.07 19.07l-.7-.7M4.93 19.07l.7-.7" />
            <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        );
      default: // Bolt
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        );
    }
  };

  const getNotificationBadge = () => {
    if (!config.notificationType || config.notificationType === 'None') return null;

    return (
      <div className={`absolute -top-1 -right-1 ${config.notificationType === 'Dot' ? 'w-3 h-3' : 'min-w-[20px] h-5 px-1'} bg-red-500 rounded-full flex items-center justify-center`}>
        {config.notificationType === 'Count' && (
          <span className="text-xs text-white font-medium">3</span>
        )}
      </div>
    );
  };

  return (
    <div className={`absolute bottom-4 ${position} flex items-center justify-center`}>
      <div className="relative">
        <button
          onClick={onClick}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: config.backgroundColor || '#ef567c' }}
        >
          {getIcon()}
        </button>
        {getNotificationBadge()}
      </div>
    </div>
  );
}; 
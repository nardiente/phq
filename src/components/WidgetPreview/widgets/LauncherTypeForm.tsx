import React, { useState, useEffect } from 'react';
import { WidgetConfig } from '../../../types/widget';

interface LauncherTypeFormProps {
  config: WidgetConfig;
  onConfigUpdate: (config: Partial<WidgetConfig>) => void;
}

export const LauncherTypeForm: React.FC<LauncherTypeFormProps> = ({ config, onConfigUpdate }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowTooltip(false);
    if (showTooltip) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showTooltip]);

  const handleOffsetChange = (value: string) => {
    const offset = parseInt(value);
    if (!isNaN(offset) && offset >= 5 && offset <= 64) {
      onConfigUpdate({
        appearance: {
          ...config.appearance,
          offset: `${offset}px`
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <div className="flex items-center gap-2">
          <span>Icon</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
          {showTooltip && (
            <div className="absolute z-10 bg-gray-900 text-white text-sm px-2 py-1 rounded">
              This is aesthetic only
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <label>Offset</label>
        <input
          type="number"
          value={parseInt(config.appearance?.offset || '24')}
          onChange={(e) => handleOffsetChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          min={5}
          max={64}
        />
        <div className="text-sm text-gray-500">Min: 5px, Max: 64px</div>
        {parseInt(config.appearance?.offset || '24') > 64 && (
          <div className="text-sm text-red-500">Warning: Values above 64px may cause display issues</div>
        )}
      </div>
    </div>
  );
}; 
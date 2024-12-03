import React from 'react';
import { TabLauncher } from './launchers/TabLauncher';
import { FloatingLauncher } from './launchers/FloatingLauncher';
import { useBoost } from '../../contexts/BoostContext';

interface LauncherTypeFormProps {
  config: any;
  onSave: (config: any) => void;
}

export function LauncherTypeForm({ config, onSave }: LauncherTypeFormProps) {
  const { updateCurrentBoostConfig } = useBoost();

  const handleConfigChange = (updates: any) => {
    const newConfig = {
      ...config,
      ...updates
    };
    onSave(newConfig);
    updateCurrentBoostConfig(newConfig);
  };

  const handleTypeChange = (type: string) => {
    const position = type === 'Tab' ? 'right' : 'bottom-right';
    handleConfigChange({ 
      launcherType: type,
      launcherPosition: position 
    });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm text-gray-700 font-medium">
            Trigger
          </label>
          <select
            value={config.launcherType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
          >
            <option value="Tab">Tab</option>
            <option value="Floating">Floating</option>
          </select>
        </div>

        {config.launcherType === 'Tab' ? (
          <TabLauncher 
            settings={{
              ...config,
              launcherPosition: config.launcherPosition,
              text: config.text || "What's new",
              icon: config.icon || 'Bell',
              backgroundColor: config.backgroundColor || '#5a00cd',
              badgeType: config.badgeType || 'Count',
              notificationCount: config.notificationCount || 3
            }}
            onChange={handleConfigChange}
          />
        ) : (
          <FloatingLauncher 
            settings={{
              ...config,
              launcherPosition: config.launcherPosition,
              icon: config.icon || 'Bell',
              backgroundColor: config.backgroundColor || '#5a00cd',
              badgeType: config.badgeType || 'Count',
              notificationCount: config.notificationCount || 3
            }}
            onChange={handleConfigChange}
          />
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">
          Preview
        </label>
        <div className="relative bg-[#f8fafc] rounded-lg overflow-hidden" style={{ height: '280px' }}>
          <div className="absolute inset-4">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="relative h-[calc(100%-2.5rem)]">
                {config.launcherType === 'Tab' ? (
                  <TabLauncher 
                    settings={{
                      ...config,
                      launcherPosition: config.launcherPosition,
                      text: config.text || "What's new",
                      icon: config.icon || 'Bell',
                      backgroundColor: config.backgroundColor || '#5a00cd',
                      badgeType: config.badgeType || 'Count',
                      notificationCount: config.notificationCount || 3
                    }}
                    preview 
                  />
                ) : (
                  <FloatingLauncher 
                    settings={{
                      ...config,
                      launcherPosition: config.launcherPosition,
                      icon: config.icon || 'Bell',
                      backgroundColor: config.backgroundColor || '#5a00cd',
                      badgeType: config.badgeType || 'Count',
                      notificationCount: config.notificationCount || 3
                    }}
                    preview 
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
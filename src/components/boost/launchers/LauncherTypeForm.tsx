import React, { useState, useEffect } from 'react';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';

type LauncherType = 'Tab' | 'Floating';

interface LauncherSettings {
  type: LauncherType;
  location: string;
  icon: 'Bell' | 'Megaphone';
  text?: string;
  backgroundColor: string;
  badgeType: 'Count' | 'Dot';
  notificationCount: number;
}

interface LauncherTypeFormProps {
  onSave: (settings: LauncherSettings) => void;
}

export function LauncherTypeForm({ onSave }: LauncherTypeFormProps) {
  const [settings, setSettings] = useState<LauncherSettings>({
    type: 'Tab',
    location: 'right',
    icon: 'Bell',
    text: "What's new",
    backgroundColor: '#5a00cd',
    badgeType: 'Count',
    notificationCount: 3
  });

  // Auto-save whenever settings change
  useEffect(() => {
    onSave(settings);
  }, [settings, onSave]);

  const handleSettingsChange = (newSettings: Partial<LauncherSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleTypeChange = (type: LauncherType) => {
    const location = type === 'Tab' ? 'right' : 'bottom-right';
    setSettings(prev => ({ ...prev, type, location }));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="block text-sm text-gray-700 font-medium">
            Trigger
          </label>
          <select
            value={settings.type}
            onChange={(e) => handleTypeChange(e.target.value as LauncherType)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
          >
            <option value="Tab">Tab</option>
            <option value="Floating">Floating</option>
          </select>
        </div>

        {settings.type === 'Tab' ? (
          <TabLauncher 
            settings={settings}
            onChange={handleSettingsChange}
          />
        ) : (
          <FloatingLauncher 
            settings={settings}
            onChange={handleSettingsChange}
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
                {settings.type === 'Tab' ? (
                  <TabLauncher 
                    settings={settings}
                    preview 
                  />
                ) : (
                  <FloatingLauncher 
                    settings={settings}
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
import React from 'react';
import { Bell, Megaphone } from 'lucide-react';
import { NotificationBadge } from '../NotificationBadge';

interface FloatingLauncherProps {
  preview?: boolean;
  settings?: any;
  onChange?: (settings: any) => void;
}

export function FloatingLauncher({ preview = false, settings, onChange }: FloatingLauncherProps) {
  if (preview) {
    return (
      <div className="absolute inset-0">
        <div className={`absolute ${settings.launcherPosition === 'bottom-right' ? 'right-4' : 'left-4'} bottom-4`}>
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center relative shadow-lg"
            style={{ backgroundColor: settings.backgroundColor }}
          >
            {settings.icon === 'Bell' ? (
              <Bell className="w-5 h-5 text-white" />
            ) : (
              <Megaphone className="w-5 h-5 text-white" />
            )}
            <NotificationBadge 
              type={settings.badgeType} 
              count={settings.notificationCount}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">
          Icon
        </label>
        <select
          value={settings.icon}
          onChange={(e) => onChange?.({ icon: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
        >
          <option value="Bell">Bell</option>
          <option value="Megaphone">Megaphone</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">
          Location
        </label>
        <select
          value={settings.launcherPosition}
          onChange={(e) => onChange?.({ launcherPosition: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
        >
          <option value="bottom-right">Bottom right</option>
          <option value="bottom-left">Bottom left</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">
          Background color
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: settings.backgroundColor }}
            />
          </div>
          <input
            type="text"
            value={settings.backgroundColor}
            onChange={(e) => onChange?.({ backgroundColor: e.target.value })}
            className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">
          Notification Badge
        </label>
        <select
          value={settings.badgeType}
          onChange={(e) => onChange?.({ badgeType: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
        >
          <option value="Count">Count</option>
          <option value="Dot">Dot</option>
        </select>
      </div>
    </div>
  );
}
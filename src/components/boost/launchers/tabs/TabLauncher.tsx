import { Bell, Megaphone } from 'lucide-react';
import { NotificationBadge } from '../NotificationBadge';

interface TabLauncherProps {
  preview?: boolean;
  settings?: any;
  onChange?: (settings: any) => void;
}

export function TabLauncher({
  preview = false,
  settings,
  onChange,
}: TabLauncherProps) {
  if (preview) {
    return (
      <div className="absolute inset-0">
        {settings.location === 'right' ? (
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <div
              className="relative flex flex-col items-center gap-2 px-4 py-2.5 shadow-lg"
              style={{
                backgroundColor: settings.backgroundColor,
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                borderTopLeftRadius: '0.5rem',
                borderBottomLeftRadius: '0.5rem',
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
                borderLeft: '1px solid rgba(229, 231, 235, 1)',
              }}
            >
              <NotificationBadge
                type={settings.badgeType}
                count={settings.notificationCount}
                className="!top-2 !left-2 !-right-auto transform -rotate-180"
              />
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {settings.text || "What's new"}
              </span>
              {settings.icon === 'Bell' ? (
                <Bell className="w-4 h-4 text-white" />
              ) : (
                <Megaphone className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <div
              className="relative flex items-center gap-2 px-4 py-2.5 shadow-lg"
              style={{
                backgroundColor: settings.backgroundColor,
                writingMode: 'vertical-lr',
                borderTopRightRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                borderTopLeftRadius: '0',
                borderBottomLeftRadius: '0',
                borderRight: '1px solid rgba(229, 231, 235, 1)',
              }}
            >
              <NotificationBadge
                type={settings.badgeType}
                count={settings.notificationCount}
                className="!-top-2 !-right-2"
              />
              {settings.icon === 'Bell' ? (
                <Bell className="w-4 h-4 text-white" />
              ) : (
                <Megaphone className="w-4 h-4 text-white" />
              )}
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {settings.text || "What's new"}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">Text</label>
        <input
          type="text"
          value={settings.text}
          onChange={(e) => onChange?.({ text: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
          placeholder="Enter tab text"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">Icon</label>
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
          value={settings.location}
          onChange={(e) => onChange?.({ location: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
        >
          <option value="right">Right</option>
          <option value="left">Left</option>
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

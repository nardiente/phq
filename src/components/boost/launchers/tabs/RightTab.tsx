import React from 'react';
import { Bell, Megaphone } from 'lucide-react';
import { NotificationBadge } from '../NotificationBadge';

interface RightTabProps {
  settings: any;
}

export function RightTab({ settings }: RightTabProps) {
  const Icon = settings.icon === 'Bell' ? Bell : Megaphone;

  return (
    <div className="absolute top-1/2 right-0 -translate-y-1/2">
      <div
        className="flex flex-col items-center gap-2 px-4 py-2.5 shadow-lg"
        style={{
          backgroundColor: settings.backgroundColor,
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          borderTopLeftRadius: '0.5rem',
          borderBottomLeftRadius: '0.5rem',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          borderLeft: '1px solid rgba(229, 231, 235, 1)',
        }}
      >
        <Icon className="w-4 h-4 text-white transform -rotate-180" />
        <span className="text-white text-sm font-medium whitespace-nowrap transform -rotate-180">
          {settings.text || "What's new"}
        </span>
        <NotificationBadge
          type={settings.badgeType}
          count={settings.notificationCount}
          className="transform -rotate-180"
        />
      </div>
    </div>
  );
}

import React from 'react';
import { Bell, Megaphone } from 'lucide-react';
import { NotificationBadge } from '../NotificationBadge';

interface LeftTabProps {
  settings: any;
}

export function LeftTab({ settings }: LeftTabProps) {
  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2">
      <div 
        className="flex items-center gap-2 px-4 py-2.5 shadow-lg"
        style={{ 
          backgroundColor: settings.backgroundColor,
          writingMode: 'vertical-lr',
          borderTopRightRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          borderRight: '1px solid rgba(229, 231, 235, 1)'
        }}
      >
        {settings.icon === 'Bell' ? (
          <Bell className="w-4 h-4 text-white" />
        ) : (
          <Megaphone className="w-4 h-4 text-white" />
        )}
        <span className="text-white text-sm font-medium whitespace-nowrap">
          {settings.text || "What's new"}
        </span>
        <NotificationBadge 
          type={settings.badgeType} 
          count={settings.notificationCount} 
        />
      </div>
    </div>
  );
}
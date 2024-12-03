import React from 'react';

interface NotificationBadgeProps {
  type: 'Count' | 'Dot';
  count: number;
  className?: string;
}

export function NotificationBadge({ type, count, className = '' }: NotificationBadgeProps) {
  if (type === 'Count' && count > 0) {
    return (
      <div className={`min-w-[16px] h-4 px-1 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] ${className}`}>
        {count}
      </div>
    );
  }

  if (type === 'Dot') {
    return <div className={`w-2.5 h-2.5 bg-red-500 rounded-full ${className}`} />;
  }

  return null;
}
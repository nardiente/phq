import React from 'react';

interface LauncherTypeSettingsProps {
  type: string;
  location: string;
  text?: string;
  backgroundColor: string;
}

export function LauncherTypeSettings({ type, location, text, backgroundColor }: LauncherTypeSettingsProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
      <span>{type}</span>
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>{location}</span>
      {text && (
        <>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{text}</span>
        </>
      )}
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>{backgroundColor}</span>
    </div>
  );
}
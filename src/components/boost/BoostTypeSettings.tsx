import React from 'react';
import { Sidebar, Maximize2, Square, ExternalLink } from 'lucide-react';

interface BoostTypeSettingsProps {
  type: string;
  position?: string;
  width: number;
  height: number;
  offset?: number;
}

export function BoostTypeSettings({ type, position, width, height, offset }: BoostTypeSettingsProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
      <span>{type}</span>
      {position && (
        <>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{position}</span>
        </>
      )}
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>Width:{width}px</span>
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <span>Height:{height}px</span>
      {offset !== undefined && (
        <>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>Offset:{offset}px</span>
        </>
      )}
    </div>
  );
}
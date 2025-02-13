import React from 'react';
import { WidgetConfig } from '../../../types/widget';
import { WidgetContent } from '../WidgetContent';  // Fix import path
import { mockIdeas } from '../WidgetContent';  // Import shared mock data

interface ModalWidgetProps {
  config: WidgetConfig;
  overflowClass: string;
}

interface WidgetDimensions {
  width: string;
  height?: string;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

const modalDimensions: WidgetDimensions = {
  minWidth: 300,
  maxWidth: 800,
  minHeight: 400,
  maxHeight: 800,
  // etc
};

export const ModalWidget = ({ config }: { config: WidgetConfig }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="relative bg-white rounded-lg shadow-xl">
      <WidgetContent config={config} />
      {!config.appearance?.hideCloseButton && (
        <button className="absolute top-4 right-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  </div>
); 
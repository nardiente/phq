import React from 'react';
import { WidgetConfig } from '../../../types/widget';
import { WidgetContent } from '../WidgetContent';

interface PopoverWidgetProps {
  config: WidgetConfig;
  overflowClass: string;
}

export const PopoverWidget: React.FC<PopoverWidgetProps> = ({
  config,
  overflowClass,
}) => {
  const { appearance } = config;

  const getValidWidth = (width: string) => {
    const num = parseInt(width?.replace(/[^\d]/g, '') || '450');
    if (num >= 300 && num <= 800) {
      return `${num}px`;
    }
    const currentNum = parseInt(
      appearance.width?.replace(/[^\d]/g, '') || '450'
    );
    if (currentNum >= 300 && currentNum <= 800) {
      return `${currentNum}px`;
    }
    return '450px';
  };

  const getValidHeight = (height: string | undefined) => {
    const num = parseInt(height?.replace(/[^\d]/g, '') || '600');
    if (num >= 400 && num <= 800) {
      return `${num}px`;
    }
    const currentNum = parseInt(
      appearance.height?.replace(/[^\d]/g, '') || '600'
    );
    if (currentNum >= 400 && currentNum <= 800) {
      return `${currentNum}px`;
    }
    return '600px';
  };

  // const getValidOffset = (offset: string | undefined) => {
  //   const num = parseInt(offset?.replace(/[^\d]/g, '') || '20');
  //   if (num >= 10 && num <= 100) {
  //     return `${num}px`;
  //   }
  //   const currentNum = parseInt(
  //     appearance.offset?.replace(/[^\d]/g, '') || '20'
  //   );
  //   if (currentNum >= 10 && currentNum <= 100) {
  //     return `${currentNum}px`;
  //   }
  //   return '20px';
  // };

  // Remove offset from getPlacementClasses
  const getPlacementClasses = () => {
    switch (appearance.placement) {
      case 'Top left':
        return 'items-start justify-start p-8';
      case 'Top right':
        return 'items-start justify-end p-8';
      case 'Bottom left':
        return 'items-end justify-start p-8';
      case 'Bottom right':
        return 'items-end justify-end p-8';
      default:
        return 'items-center justify-center';
    }
  };

  return (
    <div
      className={`absolute inset-0 flex bg-gray-100 ${getPlacementClasses()}`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl ${overflowClass}`}
        style={{
          width: getValidWidth(appearance.width || '450px'),
          height: getValidHeight(appearance.height),
          margin: getOffsetStyle(appearance.placement, appearance.offset),
        }}
      >
        <WidgetContent config={config} />
      </div>
    </div>
  );
};

// Update getOffsetStyle to handle the offset correctly
const getOffsetStyle = (
  placement: string | undefined,
  offset: string | undefined
) => {
  const validOffset = parseInt(offset?.replace(/[^\d]/g, '') || '16');
  const offsetValue = Math.min(Math.max(validOffset, 5), 32);

  switch (placement) {
    case 'Top left':
      return `${offsetValue}px 0 0 ${offsetValue}px`;
    case 'Top right':
      return `${offsetValue}px ${offsetValue}px 0 0`;
    case 'Bottom left':
      return `0 0 ${offsetValue}px ${offsetValue}px`;
    case 'Bottom right':
      return `0 ${offsetValue}px ${offsetValue}px 0`;
    default:
      return '0';
  }
};

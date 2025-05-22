import { useState } from 'react';
import { PopoverWidget } from './widgets/PopoverWidget';
import { ModalWidget } from './widgets/ModalWidget';
import { SidebarWidget } from './widgets/SidebarWidget';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';
import { WidgetContent } from './WidgetContent';
import { WidgetConfig } from '../../contexts/WidgetContext/type';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export const WidgetPreview = ({ config }: WidgetPreviewProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Simple toggle in the launcher
  const renderLauncher = () => {
    switch (config.launcherType) {
      case 'Tab':
        return <TabLauncher onClick={() => setIsVisible(!isVisible)} />;
      case 'Floating':
        return <FloatingLauncher onClick={() => setIsVisible(!isVisible)} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 h-full">
      <div className="h-full">
        {renderLauncher()}

        {isVisible && (
          <div className={getWidgetClassName(config)}>
            {config.widgetType === 'Modal' && <ModalWidget config={config} />}
            {config.widgetType === 'Popover' && (
              <PopoverWidget config={config} />
            )}
            {config.widgetType === 'Sidebar' && (
              <SidebarWidget config={config} />
            )}
            {config.widgetType === 'Embed' && <WidgetContent />}
          </div>
        )}
      </div>
    </div>
  );
};

const getWidgetClassName = (config: WidgetConfig) => {
  switch (config.widgetType) {
    case 'Sidebar':
      return `absolute top-0 bottom-0 ${config.appearance?.position === 'Left' ? 'left-0' : 'right-0'} bg-white shadow-xl`;
    case 'Modal':
      return 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    case 'Popover': {
      const placement = config.appearance?.placement || 'Bottom right';
      switch (placement) {
        case 'Top left':
          return 'absolute top-24 left-24';
        case 'Top right':
          return 'absolute top-24 right-24';
        case 'Bottom left':
          return 'absolute bottom-24 left-24';
        case 'Bottom right':
          return 'absolute bottom-24 right-24';
        default:
          return '';
      }
    }
    default:
      return '';
  }
};

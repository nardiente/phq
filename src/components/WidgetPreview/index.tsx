import { useState, useEffect } from 'react';
import { WidgetConfig } from '../../types/widget';
import { PopoverWidget } from './widgets/PopoverWidget';
import { ModalWidget } from './widgets/ModalWidget';
import { SidebarWidget } from './widgets/SidebarWidget';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';
import { WidgetContent } from './WidgetContent';
import { WidgetSectionsForm } from './widgets/WidgetSectionsForm';
import { WidgetTargetingForm } from './widgets/WidgetTargetingForm';
import { GetCodeModal } from './widgets/GetCodeModal';
import { WidgetDeleteModal } from './widgets/WidgetDeleteModal';

interface WidgetPreviewProps {
  config: WidgetConfig;
}

export const WidgetPreview = ({ config }: WidgetPreviewProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (config.widgetType === 'Popover') {
      console.group('=== WidgetPreview Render ===');
      console.log('Is Visible:', isVisible);
      console.log('Config:', config);
      console.log('Widget Type:', config.widgetType);
      console.log('Placement:', config.appearance?.placement);
      console.log('Generated Class:', getWidgetClassName(config));
      console.groupEnd();
    }
  }, [config, isVisible]);

  // Simple toggle in the launcher
  const renderLauncher = () => {
    switch (config.launcherType) {
      case 'Tab':
        return <TabLauncher config={config} onClick={() => setIsVisible(!isVisible)} />;
      case 'Floating':
        return <FloatingLauncher config={config} onClick={() => setIsVisible(!isVisible)} />;
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
            {config.widgetType === 'Popover' && <PopoverWidget config={config} />}
            {config.widgetType === 'Sidebar' && <SidebarWidget config={config} />}
            {config.widgetType === 'Embed' && <WidgetContent config={config} />}
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
    case 'Popover':
      const placement = config.appearance?.placement || 'Bottom right';
      switch (placement) {
        case 'Top left': return 'absolute top-24 left-24';
        case 'Top right': return 'absolute top-24 right-24';
        case 'Bottom left': return 'absolute bottom-24 left-24';
        case 'Bottom right': return 'absolute bottom-24 right-24';
      }
    default:
      return '';
  }
};

const getWidgetStyles = (config: WidgetConfig) => {
  const baseStyles = {
    backgroundColor: config.backgroundColor
  };

  switch (config.widgetType) {
    case 'Sidebar':
      return {
        ...baseStyles,
        [config.appearance?.position?.toLowerCase() || 'right']: 0,
        width: config.appearance?.width || '450px',
        maxWidth: 'calc(100vw - 64px)',
      };
    case 'Modal':
      return baseStyles;
    case 'Popover':
      return baseStyles;
    default:
      return baseStyles;
  }
};

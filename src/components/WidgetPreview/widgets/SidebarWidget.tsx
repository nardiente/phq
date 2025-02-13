import { WidgetConfig } from '../../../types/widget';
import { WidgetContent } from '../WidgetContent';

interface SidebarWidgetProps {
  config: WidgetConfig;
}

export const SidebarWidget = ({ config }: { config: WidgetConfig }) => {
  return (
    <div 
      className={`absolute top-0 bottom-0 ${
        config.appearance?.position === 'Left' ? 'left-0' : 'right-0'
      } bg-white shadow-xl`}
      style={{
        width: config.appearance?.width || '450px',
        maxWidth: 'calc(100vw - 64px)',
      }}
    >
      <WidgetContent config={config} />
    </div>
  );
}; 
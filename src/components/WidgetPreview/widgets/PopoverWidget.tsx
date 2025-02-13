import { WidgetConfig } from '../../../types/widget';
import { WidgetContent } from '../WidgetContent';

export const PopoverWidget = ({ config }: { config: WidgetConfig }) => {
  if (!config?.appearance) {
    return null;
  }

  const placementClasses = {
    'Bottom right': 'fixed bottom-0 right-0 mb-24 mr-24',
    'Bottom left': 'fixed bottom-0 left-0 mb-24 ml-24',
    'Top right': 'fixed top-0 right-0 mt-24 mr-24',
    'Top left': 'fixed top-0 left-0 mt-24 ml-24'
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg"
      style={{
        width: config.appearance.width || '450px',
        height: config.appearance.height || '600px',
      }}
    >
      <WidgetContent config={config} />
      {!config.appearance.hideCloseButton && (
        <button className="absolute top-4 right-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

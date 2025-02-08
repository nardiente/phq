import { useState } from 'react';
import { WidgetConfig } from '../../types/widget';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';
import { WidgetContent } from './WidgetContent';
import { mockIdeas } from '../../data/mockData';

// Type guard to ensure config is complete
const validateConfig = (config: WidgetConfig): boolean => {
  console.group('=== Config Validation ===');
  console.log('LauncherPosition:', config.launcherPosition);
  console.log('Appearance:', config.appearance);
  console.groupEnd();
  return true;
};

export const NewWidgetPreview = ({ config }: { config: WidgetConfig }) => {
  // Validate config early
  validateConfig(config);

  const [isVisible, setIsVisible] = useState(false);

  // Single config with defaults
  const configWithDefaults = {
    ...config,
    sections: config.sections ?? {  // Use nullish coalescing
      ideas: true,
      roadmap: true,
      announcements: true
    },
    appearance: {
      width: '450px',
      height: '600px',
      ...config.appearance,
      position: config.launcherPosition || 'Right',
      placement: config.appearance?.placement
    }
  };

  // Add more specific debug logging
  console.group('=== Sections Debug ===');
  console.log('Config received:', config);
  console.log('Section toggles:', config.sections);
  console.log('Final sections:', configWithDefaults.sections);
  console.groupEnd();

  // Simple widget content wrapper with close button
  const WidgetContainer = ({ children }: { children: React.ReactNode }) => (
    <div 
      className={`relative bg-white rounded-lg shadow-xl ${
        config.appearance?.preventScroll ? 'overflow-hidden' : 'overflow-auto'
      }`}
      style={{ 
        height: config.widgetType === 'Sidebar' ? '100%' : configWithDefaults.appearance.height,
        width: configWithDefaults.appearance.width,
        maxWidth: config.widgetType === 'Sidebar' ? 'calc(100vw - 64px)' : undefined
      }}
    >
      {children}
      {!config.appearance?.hideCloseButton && (
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 hover:opacity-75"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 relative border-4 border-blue-500 rounded-lg p-4 overflow-hidden">
      <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br">
        New Preview
      </div>

      {/* Launcher */}
      {config.launcherType === 'Tab' && (
        <TabLauncher config={configWithDefaults} onClick={() => setIsVisible(!isVisible)} />
      )}
      {config.launcherType === 'Floating' && (
        <FloatingLauncher 
          config={configWithDefaults}
          onClick={() => setIsVisible(!isVisible)}
        />
      )}

      {/* Widget */}
      {isVisible && (
        config.widgetType === 'Modal' ? (
          // Modal: Centered
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <WidgetContainer>
                <WidgetContent config={configWithDefaults} />
              </WidgetContainer>
            </div>
          </div>
        ) : config.widgetType === 'Sidebar' ? (
          // Sidebar: Full height, left/right edge
          <div 
            className={`absolute top-0 bottom-0 ${
              config.appearance?.position === 'Left' ? 'left-0' : 'right-0'
            } pointer-events-auto h-full`}
          >
            <WidgetContainer>
              <WidgetContent config={configWithDefaults} />
            </WidgetContainer>
          </div>
        ) : (
          // Popover: Positioned
          <div className={`absolute ${config.appearance?.placement === 'Top' ? 'top-4' : 'bottom-4'} ${
            config.appearance?.placement?.includes('left') ? 'left-4' : 'right-4'
          }`}>
            <WidgetContainer>
              <WidgetContent config={configWithDefaults} />
            </WidgetContainer>
          </div>
        )
      )}
    </div>
  );
}; 
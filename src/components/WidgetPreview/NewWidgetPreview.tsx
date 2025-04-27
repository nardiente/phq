import { useState } from 'react';
import { WidgetConfig } from '../../types/widget';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';
import { WidgetContent } from './WidgetContent';

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
    sections: config.sections ?? {
      ideas: true,
      roadmap: true,
      announcements: true,
    },
    appearance: {
      // Start with user's appearance settings
      ...config.appearance,
      // Only set defaults if values are missing
      backgroundColor: config.appearance.backgroundColor || '#ff6334',
      width: config.appearance?.width || '450px',
      height: config.appearance?.height || '600px',
      position:
        config.appearance?.position || config.launcherPosition || 'Right',
      placement: config.appearance?.placement || 'Bottom right',
    },
  };

  // Add debug log
  console.group('=== Config Update Debug ===');
  console.log('Original config:', config);
  console.log('Original placement:', config.appearance?.placement);
  console.log('Config with defaults:', configWithDefaults);
  console.log('Final placement:', configWithDefaults.appearance.placement);
  console.groupEnd();

  // Add more specific debug logging
  console.group('=== Sections Debug ===');
  console.log('Config received:', config);
  console.log('Section toggles:', config.sections);
  console.log('Final sections:', configWithDefaults.sections);
  console.groupEnd();

  // Simple widget content wrapper with close button
  const WidgetContainer = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`relative rounded-lg shadow-xl ${configWithDefaults.appearance.preventScroll ? 'overflow-hidden' : 'overflow-y-auto'}`}
      style={{
        height:
          config.widgetType === 'Sidebar'
            ? '100%'
            : configWithDefaults.appearance.height,
        width: configWithDefaults.appearance.width,
        maxWidth:
          config.widgetType === 'Sidebar' ? 'calc(100vw - 64px)' : undefined,
      }}
    >
      {/* Main content */}
      <div className="bg-white">{children}</div>

      {!config.appearance?.hideCloseButton && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 hover:opacity-75"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className="flex-1 relative">
      {/* Launcher */}
      {config.launcherType === 'Tab' && (
        <TabLauncher
          config={configWithDefaults}
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
      {config.launcherType === 'Floating' && (
        <FloatingLauncher
          config={configWithDefaults}
          onClick={() => setIsVisible(!isVisible)}
        />
      )}

      {/* Widget */}
      {isVisible &&
        (config.widgetType === 'Modal' ? (
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
        ) : config.widgetType === 'Popover' ? (
          <div
            className={`
            absolute
            ${config.appearance?.placement === 'Top left' ? 'top-0 left-0' : ''}
            ${config.appearance?.placement === 'Top right' ? 'top-0 right-0' : ''}
            ${config.appearance?.placement === 'Bottom left' ? 'bottom-0 left-0' : ''}
            ${config.appearance?.placement === 'Bottom right' ? 'bottom-0 right-0' : 'bottom-0 right-0'}
          `}
            style={{
              margin: config.appearance?.offset || '64px',
              width: config.appearance?.width,
              height: config.appearance?.height,
            }}
          >
            <WidgetContainer>
              <WidgetContent config={configWithDefaults} />
            </WidgetContainer>
          </div>
        ) : (
          // Popover: Positioned
          <div
            className={`
            absolute 
            ${config.appearance?.placement?.includes('Top') ? 'top-0' : 'bottom-0'}
            ${config.appearance?.placement?.includes('left') ? 'left-0' : 'right-0'}
            pointer-events-auto
          `}
            style={{
              margin: config.appearance?.offset || '64px',
            }}
          >
            <WidgetContainer>
              <WidgetContent config={configWithDefaults} />
            </WidgetContainer>
          </div>
        ))}
    </div>
  );
};

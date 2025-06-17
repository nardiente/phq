import { useEffect, useState } from 'react';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';
import { WidgetContent } from './WidgetContent';
import { useWidget } from '../../contexts/WidgetContext/WidgetProvider';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useUser } from '../../contexts/UserContext';
import { useApp } from '../../contexts/AppContext';

// Type guard to ensure config is complete
const validateConfig = (/*config: WidgetConfig*/): boolean => {
  return true;
};

export const NewWidgetPreview = ({
  className = '',
}: {
  className?: string;
}) => {
  const { is_public } = useApp();
  const {
    state: { config },
    getNotificationCount,
  } = useWidget();
  const {
    state: {
      filter: { sort, tags },
    },
    handleListFeedback,
  } = useFeedback();
  const { user: userContext } = useUser();
  const { project } = userContext ?? {};

  // Validate config early
  validateConfig(/*config*/);

  const [isVisible, setIsVisible] = useState(false);

  // Single config with defaults
  const configWithDefaults = {
    ...config,
    sections: config.sections,
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

  useEffect(() => {
    if (config.widgetType === 'Embed') {
      setIsVisible(true);
    }
  }, [config.widgetType]);

  useEffect(() => {
    if (is_public && project?.id) {
      getNotificationCount();
    }
  }, [project]);

  useEffect(() => {
    handleListFeedback();
  }, [sort, tags.length]);

  // Simple widget content wrapper with close button
  const WidgetContainer = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`bg-white relative rounded-lg shadow-xl z-[50] ${configWithDefaults.appearance.preventScroll ? 'overflow-hidden' : 'overflow-y-auto'}`}
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
      <div>{children}</div>

      {!config.appearance?.hideCloseButton && config.widgetType !== 'Embed' && (
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
    <div className={className}>
      {/* Launcher */}
      {config.widgetType !== 'Embed' && (
        <>
          {config.launcherType === 'Tab' && (
            <TabLauncher onClick={() => setIsVisible(!isVisible)} />
          )}
          {config.launcherType === 'Floating' && (
            <FloatingLauncher onClick={() => setIsVisible(!isVisible)} />
          )}
        </>
      )}

      {/* Widget */}
      {isVisible &&
        (config.widgetType === 'Modal' ? (
          // Modal: Centered
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <WidgetContainer>
                <WidgetContent />
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
              <WidgetContent />
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
              <WidgetContent />
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
              <WidgetContent />
            </WidgetContainer>
          </div>
        ))}
    </div>
  );
};

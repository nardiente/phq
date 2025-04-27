import { WidgetConfig } from '../../types/widget';

interface TabLauncherProps {
  config: WidgetConfig;
  onClick: () => void;
}

export const TabLauncher = ({ config, onClick }: TabLauncherProps) => {
  const isLeft = config.launcherPosition === 'Left';

  // Validate required props
  if (!config || !onClick) {
    console.warn('TabLauncher: Missing required props');
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    console.group('=== TabLauncher Click ===');
    console.log('Click event triggered');
    e.stopPropagation();
    onClick();
    console.log('onClick callback called');
    console.groupEnd();
  };

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2"
      style={{ [isLeft ? 'left' : 'right']: 0 }}
    >
      <div className="relative">
        <button
          onClick={handleClick}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium shadow-lg ${
            isLeft
              ? 'rounded-r-lg -translate-x-1'
              : 'rounded-l-lg translate-x-1'
          }`}
          style={{
            backgroundColor: config.backgroundColor || '#ff6334',
            color: config.iconColor === 'Dark' ? '#1F2937' : '#FFFFFF',
          }}
        >
          <span
            style={{
              writingMode: 'vertical-lr',
              textOrientation: 'mixed',
              transform: isLeft ? 'none' : 'rotate(180deg)',
            }}
          >
            {config.launcherText || "What's new"}
          </span>
        </button>
        {(config.notificationCount ?? 0) > 0 && (
          <>
            {config.notificationType === 'Count' && (
              <span
                className={`absolute -top-2 ${isLeft ? '-right-2' : '-left-2'} px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full`}
              >
                {config.notificationCount}
              </span>
            )}
            {config.notificationType === 'Dot' && (
              <span
                className={`absolute -top-2 ${isLeft ? '-right-2' : '-left-2'} min-w-[20px] min-h-[20px] bg-red-500 rounded-full`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

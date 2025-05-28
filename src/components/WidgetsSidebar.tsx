import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import { ChevronDownIcon } from './icons/chevron-down.icon';
import { HexColorPicker } from 'react-colorful';
import type { SelectOption } from '../types/dropdown';
import { SelectDropdown } from './ui/dropdown/select/SelectDropdown';
import { WidgetTargetingForm } from './WidgetPreview/widgets/WidgetTargetingForm';
import { ArrowLeft } from 'lucide-react';
import { FormField } from './ui/FormField';
import { Toggle } from './ui/Toggle';
import {
  defaultWidgetConfig,
  Targeting,
  WidgetAppearance,
  WidgetConfig,
} from '../contexts/WidgetContext/type';
import { useWidget } from '../contexts/WidgetContext/WidgetProvider';

// Constants with proper type definitions
const WIDGET_TYPE_OPTIONS: SelectOption[] = [
  { value: 'Modal', label: 'Modal' },
  { value: 'Popover', label: 'Popover' },
  { value: 'Sidebar', label: 'Sidebar' },
  { value: 'Embed', label: 'Embed' },
] as const;

const LAUNCHER_POSITION_OPTIONS: SelectOption[] = [
  { value: 'Right', label: 'Right' },
  { value: 'Left', label: 'Left' },
] as const;

const FLOATING_POSITION_OPTIONS: SelectOption[] = [
  { value: 'Right', label: 'Bottom right' },
  { value: 'Left', label: 'Bottom left' },
] as const;

const ICON_OPTIONS: SelectOption[] = [
  { value: 'Bolt', label: 'Bolt' },
  { value: 'Roadmap', label: 'Roadmap' },
  { value: 'WhatsNew', label: "What's new" },
  { value: 'Idea', label: 'Idea' },
];

const TEXT_COLOR_OPTIONS: SelectOption[] = [
  { value: 'Light', label: 'Light' },
  { value: 'Dark', label: 'Dark' },
];

const COUNT_OPTIONS: SelectOption[] = [
  { value: 'Count', label: 'Count' },
  { value: 'Dot', label: 'Dot' },
  { value: 'None', label: 'None' },
];

const LAUNCHER_TYPE_OPTIONS: { value: 'Tab' | 'Floating'; label: string }[] = [
  { value: 'Tab', label: 'Tab' },
  { value: 'Floating', label: 'Floating' },
];

const PLACEMENT_OPTIONS: {
  value: 'Top left' | 'Top right' | 'Bottom left' | 'Bottom right';
  label: string;
}[] = [
  { value: 'Bottom right', label: 'Bottom right' },
  { value: 'Bottom left', label: 'Bottom left' },
  { value: 'Top right', label: 'Top right' },
  { value: 'Top left', label: 'Top left' },
];

const POSITION_OPTIONS: { value: 'Right' | 'Left'; label: string }[] = [
  { value: 'Right', label: 'Right' },
  { value: 'Left', label: 'Left' },
];

// ===============================
// Types & Interfaces
// ===============================
interface WidgetsSidebarProps {
  onSave: (shouldClose?: boolean) => void;
  onClose: () => void;
  onSectionChange: (section: string | null) => void;
}

type ColorScheme = 'Light' | 'Dark';

// ===============================
// Utility Components
// ===============================
const ColorPicker: React.FC<{
  color: string;
  onChange: (color: string) => void;
}> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLDivElement>(null);

  useClickOutside(popover, () => setIsOpen(false));

  return (
    <div className="relative">
      <div className="flex items-center gap-2 p-2 border rounded-md">
        <div
          className="w-5 h-5 rounded-full cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md"
        />
      </div>

      {isOpen && (
        <div ref={popover} className="absolute z-10 mt-2">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const getEmbedCode = (config: WidgetConfig) => {
  return `<!-- ProductHQ Widget -->
<div data-producthq-widget="${config.id || 'YOUR_WIDGET_ID'}"></div>
<!-- End ProductHQ Widget -->`;
};

// ===============================
// Main Component
// ===============================
export const WidgetsSidebar = ({
  onSave,
  onClose,
  onSectionChange,
}: WidgetsSidebarProps) => {
  const {
    state: { config, editingWidgetId },
    setWidgetConfig: onConfigUpdate,
  } = useWidget();

  // ===============================
  // State & Refs
  // ===============================
  const [activeSection, setActiveSection] = useState<string | null>('launcher');
  const [isCanceled, setIsCanceled] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!isCanceled && editingWidgetId) {
      timerRef.current = setTimeout(() => {
        onSave();
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [config, isCanceled]);

  // ===============================
  // Handlers
  // ===============================
  const handleConfigUpdate = (field: keyof WidgetConfig, value: any) => {
    let newConfig = { ...config, [field]: value };
    if (field === 'backgroundColor') {
      newConfig = {
        ...newConfig,
        appearance: { ...newConfig.appearance, [field]: value },
      };
    }
    onConfigUpdate(newConfig);
  };

  const handleAppearanceUpdate = (updates: Partial<WidgetAppearance>) => {
    onConfigUpdate({
      ...config,
      appearance: {
        ...config.appearance,
        ...updates,
        placement: updates.placement,
      },
    });
  };

  const handleTargetingUpdate = (
    field: keyof Targeting,
    value: string | number
  ) => {
    onConfigUpdate({
      ...config,
      targeting: {
        ...config.targeting,
        [field]: field === 'delay' ? Number(value) : value,
      },
    });
  };

  const handleSectionChange = (sectionId: string | null) => {
    setActiveSection(sectionId);
    if (typeof onSectionChange === 'function') {
      onSectionChange(sectionId);
    }
  };

  const handleCancel = () => {
    setIsCanceled(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (typeof onConfigUpdate === 'function') {
      onConfigUpdate({
        ...defaultWidgetConfig,
        launcherType: config.launcherType,
        notificationCount: config.notificationCount,
        widgetType: config.widgetType,
      });
    }
    setActiveSection('launcher');
    onClose();
  };

  const handleSectionToggle = (section: string, enabled: boolean) => {
    const sections = config.sections;
    onConfigUpdate({
      ...config,
      sections: {
        active: sections?.active ?? 'ideas',
        ideas: sections?.ideas ?? true,
        roadmap: sections?.roadmap ?? true,
        announcements: sections?.announcements ?? true,
        [section]: enabled,
      },
    });
  };

  // ===============================
  // Section Definitions
  // ===============================
  const sections: {
    id: string;
    label: string;
    content: ReactNode;
    visible?: boolean;
  }[] = [
    {
      id: 'launcher',
      label: 'Launcher type',
      visible: true,
      content: (
        <>
          {config.widgetType !== 'Embed' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Launcher type
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Choose how users will open your widget
              </p>
              <SelectDropdown
                options={LAUNCHER_TYPE_OPTIONS}
                value={
                  config.launcherType
                    ? { value: config.launcherType, label: config.launcherType }
                    : null
                }
                onChange={(option) => {
                  handleConfigUpdate('launcherType', option.value);
                }}
                containerClass="w-full bg-white border border-gray-300 rounded-md"
              />
            </div>
          )}

          {config.launcherType === 'Floating' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Position
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Where the launcher appears on the page
                </p>
                <SelectDropdown
                  options={FLOATING_POSITION_OPTIONS}
                  value={
                    config.launcherPosition
                      ? {
                          value: config.launcherPosition,
                          label:
                            config.launcherPosition === 'Right'
                              ? 'Bottom right'
                              : 'Bottom left',
                        }
                      : null
                  }
                  onChange={(option) => {
                    handleConfigUpdate('launcherPosition', option.value);
                  }}
                  containerClass="w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Icon
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Choose an icon for your launcher
                </p>
                <SelectDropdown
                  options={ICON_OPTIONS}
                  value={
                    ICON_OPTIONS.find(
                      (opt) => opt.value === (config.launcherIcon || 'Bolt')
                    ) || ICON_OPTIONS[0]
                  }
                  onChange={(option) =>
                    handleConfigUpdate('launcherIcon', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Icon color
                </label>
                <SelectDropdown
                  options={[
                    { value: 'Light', label: 'Light' },
                    { value: 'Dark', label: 'Dark' },
                  ]}
                  value={
                    TEXT_COLOR_OPTIONS.find(
                      (opt) => opt.value === (config.iconColor || 'Light')
                    ) || TEXT_COLOR_OPTIONS[0]
                  }
                  onChange={(option) =>
                    handleConfigUpdate('iconColor', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Count
                </label>
                <SelectDropdown
                  options={COUNT_OPTIONS}
                  value={
                    config.notificationType
                      ? {
                          value: config.notificationType,
                          label: config.notificationType,
                        }
                      : null
                  }
                  onChange={(option) =>
                    handleConfigUpdate('notificationType', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          {config.launcherType === 'Tab' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Text
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The text that appears on the tab
                </p>
                <input
                  type="text"
                  value={config.launcherText || ''}
                  onChange={(e) =>
                    handleConfigUpdate('launcherText', e.target.value)
                  }
                  placeholder="What's new"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Position
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Where the tab appears on the page
                </p>
                <SelectDropdown
                  options={LAUNCHER_POSITION_OPTIONS}
                  value={
                    config.launcherPosition
                      ? {
                          value: config.launcherPosition,
                          label: config.launcherPosition,
                        }
                      : null
                  }
                  onChange={(option) =>
                    handleConfigUpdate('launcherPosition', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Background color
                </label>
                <ColorPicker
                  color={config.backgroundColor || '#ff6334'}
                  onChange={(color) =>
                    handleConfigUpdate('backgroundColor', color)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Text color
                </label>
                <SelectDropdown
                  options={TEXT_COLOR_OPTIONS}
                  value={
                    config.iconColor
                      ? { value: config.iconColor, label: config.iconColor }
                      : null
                  }
                  onChange={(option) =>
                    handleConfigUpdate('iconColor', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Count
                </label>
                <SelectDropdown
                  options={COUNT_OPTIONS}
                  value={
                    config.notificationType
                      ? {
                          value: config.notificationType,
                          label: config.notificationType,
                        }
                      : null
                  }
                  onChange={(option) =>
                    handleConfigUpdate('notificationType', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      id: 'widget-type',
      label: 'Widget type',
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Widget type
            </label>
            <SelectDropdown
              options={WIDGET_TYPE_OPTIONS}
              value={
                WIDGET_TYPE_OPTIONS.find(
                  (opt) => opt.value === config.widgetType
                ) || null
              }
              onChange={(option) =>
                handleConfigUpdate('widgetType', option.value)
              }
              containerClass="w-full bg-white border border-gray-300 rounded-md"
            />
          </div>

          {config.widgetType === 'Embed' && (
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Embed code:
                </h3>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap break-all">
                    {getEmbedCode(config)}
                  </pre>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(getEmbedCode(config))
                    }
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded-md text-gray-400 hover:text-gray-200"
                    title="Copy to clipboard"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Note:</span> You cannot use
                  launcher types with this widget type. You need to copy and
                  paste the code above on to the page where you'd like this
                  widget type to appear on your site.
                </p>
              </div>
            </>
          )}

          {config.widgetType === 'Popover' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Placement
                </label>
                <SelectDropdown
                  options={PLACEMENT_OPTIONS}
                  value={
                    config.appearance?.placement
                      ? {
                          value: config.appearance.placement,
                          label: config.appearance.placement,
                        }
                      : { value: 'Bottom right', label: 'Bottom right' }
                  }
                  onChange={(option) => {
                    handleAppearanceUpdate({
                      placement: option.value as
                        | 'Top left'
                        | 'Top right'
                        | 'Bottom left'
                        | 'Bottom right',
                    });
                  }}
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Offset
                </label>
                <input
                  type="text"
                  value={config.appearance?.offset?.replace('px', '')}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        offset: `${inputValue}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 16"
                  className={`w-full px-4 py-2 border ${
                    parseInt(
                      config.appearance?.offset?.replace('px', '') || '16'
                    ) < 5 ||
                    parseInt(
                      config.appearance?.offset?.replace('px', '') || '16'
                    ) > 64
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                />
                <p
                  className={`text-xs ${
                    parseInt(
                      config.appearance?.offset?.replace('px', '') || '16'
                    ) < 5 ||
                    parseInt(
                      config.appearance?.offset?.replace('px', '') || '16'
                    ) > 64
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  Min: 5px, Max: 64px
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Width
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The width of the popover
                </p>
                <input
                  type="text"
                  value={config.appearance?.width?.replace(/[^\d]/g, '') || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        width: inputValue ? `${inputValue}px` : undefined,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '450');
                    if (value >= 300 && value <= 800) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        width: `${value}px`,
                      });
                    }
                  }}
                  placeholder="450"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm font-satoshi ${config.appearance?.width ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance?.width || '0') < 300 || parseInt(config.appearance?.width || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 300px, Max: 800px
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Height
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The height of the popover
                </p>
                <input
                  type="text"
                  value={config.appearance.height?.replace(/[^\d]/g, '') || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        height: inputValue ? `${inputValue}px` : undefined,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '600');
                    if (value >= 400 && value <= 800) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        height: `${value}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 500"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm font-satoshi
                    ${config.appearance.height ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.height?.replace(/[^\d]/g, '') || '0') < 400 || parseInt(config.appearance.height?.replace(/[^\d]/g, '') || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 400px, Max: 800px
                </p>
              </div>

              <div className="space-y-4">
                <Checkbox
                  checked={config.appearance?.hideCloseButton || false}
                  onChange={(checked) => {
                    handleAppearanceUpdate({
                      ...config.appearance,
                      hideCloseButton: checked,
                    });
                  }}
                  label="Hide close button"
                />

                <Checkbox
                  checked={config.appearance?.preventScroll || false}
                  onChange={(checked) => {
                    handleAppearanceUpdate({
                      ...config.appearance,
                      preventScroll: checked,
                    });
                  }}
                  label="Prevent window scroll"
                />
              </div>
            </>
          )}

          {config.widgetType === 'Sidebar' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Position
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The position of the sidebar
                </p>
                <SelectDropdown
                  options={POSITION_OPTIONS}
                  value={
                    config.appearance?.position
                      ? {
                          value: config.appearance.position,
                          label: config.appearance.position,
                        }
                      : null
                  }
                  onChange={(option) =>
                    handleAppearanceUpdate({
                      position: option.value as 'Left' | 'Right',
                    })
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Width
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The width of the sidebar
                </p>
                <input
                  type="text"
                  value={config.appearance?.width?.replace(/[^\d]/g, '') || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        width: inputValue ? `${inputValue}px` : undefined,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '450');
                    if (value >= 300 && value <= 800) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        width: `${value}px`,
                      });
                    }
                  }}
                  placeholder="450"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm font-satoshi ${config.appearance?.width ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.width || '0') < 300 || parseInt(config.appearance.width || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 300px, Max: 800px
                </p>
              </div>

              <div className="space-y-4">
                <Checkbox
                  checked={config.appearance?.hideCloseButton || false}
                  onChange={(checked) => {
                    handleAppearanceUpdate({
                      ...config.appearance,
                      hideCloseButton: checked,
                    });
                  }}
                  label="Hide close button"
                />
                <Checkbox
                  checked={config.appearance?.preventScroll || false}
                  onChange={(checked) => {
                    handleAppearanceUpdate({
                      ...config.appearance,
                      preventScroll: checked,
                    });
                  }}
                  label="Prevent window scroll"
                />
              </div>
            </>
          )}

          {config.widgetType === 'Modal' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Width
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The width of the modal
                </p>
                <input
                  type="text"
                  value={config.appearance?.width?.replace(/[^\d]/g, '') || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        width: inputValue ? `${inputValue}px` : undefined,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '450');
                    if (value >= 300 && value <= 800) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        width: `${value}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 450"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm font-satoshi
                    ${config.appearance?.width ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance?.width || '0') < 300 || parseInt(config.appearance?.width || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 300px, Max: 800px
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Height
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The height of the modal
                </p>
                <input
                  type="text"
                  value={config.appearance.height?.replace(/[^\d]/g, '') || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        height: inputValue ? `${inputValue}px` : undefined,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '600');
                    if (value >= 400 && value <= 800) {
                      handleAppearanceUpdate({
                        ...config.appearance,
                        height: `${value}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 500"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm font-satoshi
                    ${config.appearance.height ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.height || '0') < 400 || parseInt(config.appearance.height || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 400px, Max: 800px
                </p>
              </div>

              <div className="space-y-4">
                <Checkbox
                  checked={config.appearance?.hideCloseButton || false}
                  onChange={(checked) => {
                    handleAppearanceUpdate({
                      ...config.appearance,
                      hideCloseButton: checked,
                    });
                  }}
                  label="Hide close button"
                />
                <Checkbox
                  checked={config.appearance?.preventScroll || false}
                  onChange={(checked) => {
                    handleAppearanceUpdate({
                      ...config.appearance,
                      preventScroll: checked,
                    });
                  }}
                  label="Prevent window scroll"
                />
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      id: 'appearance',
      label: 'Appearance',
      content: (
        <div className="space-y-6">
          <h3 className="text-base font-medium text-gray-900">
            Fine tune your Widgets look and feel
          </h3>

          {config.widgetType !== 'Embed' && (
            <>
              <FormField
                label="Widget Title"
                description="The title shown at the top of your widget"
              >
                <input
                  type="text"
                  value={config.appearance.title || ''}
                  onChange={(e) =>
                    handleAppearanceUpdate({
                      title: e.target.value || undefined,
                    })
                  }
                  placeholder="Widget Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </FormField>

              <FormField
                label="Description"
                description="A brief description of your widget"
              >
                <input
                  type="text"
                  value={config.appearance.description || ''}
                  onChange={(e) =>
                    handleAppearanceUpdate({
                      description: e.target.value || undefined,
                    })
                  }
                  placeholder="Suggest a feature, read through our Roadmap and check out our latest feature releases."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </FormField>
            </>
          )}

          <FormField label="Background color">
            <ColorPicker
              color={config.appearance.backgroundColor || '#ff6334'}
              onChange={(color) =>
                handleAppearanceUpdate({ backgroundColor: color })
              }
            />
          </FormField>

          <FormField label="Text color">
            <SelectDropdown
              options={TEXT_COLOR_OPTIONS}
              value={
                config.appearance?.textColor
                  ? {
                      value: config.appearance.textColor as ColorScheme,
                      label: config.appearance.textColor,
                    }
                  : null
              }
              onChange={(option) =>
                handleAppearanceUpdate({
                  textColor: option.value as ColorScheme,
                })
              }
              containerClass="w-full bg-white border border-gray-300 rounded-md"
            />
          </FormField>
        </div>
      ),
    },
    {
      id: 'sections',
      label: 'Sections',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Ideas</span>
            <Toggle
              checked={config.sections?.ideas ?? true}
              onChange={(enabled) => handleSectionToggle('ideas', enabled)}
              activeColor="#5a00cd"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Roadmap</span>
            <Toggle
              checked={config.sections?.roadmap ?? true}
              onChange={(enabled) => handleSectionToggle('roadmap', enabled)}
              activeColor="#5a00cd"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>What's New</span>
            <Toggle
              checked={config.sections?.announcements ?? true}
              onChange={(enabled) =>
                handleSectionToggle('announcements', enabled)
              }
              activeColor="#5a00cd"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'targeting',
      label: 'Targeting',
      content: (
        <WidgetTargetingForm
          formState={config}
          onChange={(field, value) =>
            handleTargetingUpdate(field as keyof Targeting, value)
          }
        />
      ),
    },
  ];

  // ===============================
  // Render
  // ===============================
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <input
              type="text"
              value={config.name ?? ''}
              onChange={(e) => {
                handleConfigUpdate('name', e.target.value);
              }}
              onFocus={() => {
                handleConfigUpdate('name', config.name ?? '');
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  handleConfigUpdate('name', 'My first widget');
                }
                setIsEditing(false);
              }}
              autoFocus
              className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 font-satoshi"
            />
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-md text-gray-600"
              >
                <ArrowLeft size={18} />
              </button>
              <span className="text-lg font-medium text-gray-900">
                {config.name ?? 'My first widget'}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md"
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
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections
          .filter((section) => section.visible === undefined || section.visible)
          .map((section) => (
            <div key={section.id}>
              <button
                onClick={() =>
                  handleSectionChange(
                    activeSection === section.id ? null : section.id
                  )
                }
                className={`w-full flex justify-between items-center p-4 border-0 border-b border-gray-200 cursor-pointer text-lg font-medium text-gray-900 ${
                  activeSection === section.id
                    ? 'bg-purple-50'
                    : 'bg-white hover:bg-purple-50'
                }`}
              >
                {section.label}
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform text-gray-500 ${
                    activeSection === section.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeSection === section.id && (
                <div className="p-4 bg-white border-b border-gray-200 space-y-6">
                  {section.content}
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(true)}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#FF6334] rounded-md hover:bg-[#e5592f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6334]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

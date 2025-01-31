import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Checkbox } from './Checkbox';
import { ChevronDownIcon } from './icons/chevron-down.icon';
import { HexColorPicker } from 'react-colorful';
import { WidgetConfig } from '../types/widget';
import { SelectOption } from '../types/dropdown';
import { SelectDropdown } from './ui/dropdown/select/SelectDropdown';
import { WidgetSectionsForm } from './widgets/WidgetSectionsForm';
import { WidgetTargetingForm } from './widgets/WidgetTargetingForm';

interface WidgetsSidebarProps {
  config: WidgetConfig;
  onConfigUpdate: (
    section: keyof WidgetConfig,
    updates: Partial<WidgetConfig[keyof WidgetConfig]>
  ) => void;
  onClose: () => void;
  onSectionChange: (section: string | null) => void;
}

const getEmbedCode = (config: WidgetConfig) => {
  return `<!-- ProductHQ Widget -->
<div 
  data-producthq-widget="${config.widgetId || 'YOUR_WIDGET_ID'}"
></div>
<!-- End ProductHQ Widget -->`;
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

const ColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(popover, () => setIsOpen(false));

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md w-full">
        <div
          className="w-5 h-5 rounded-full cursor-pointer"
          style={{ backgroundColor: color || '#ef567c' }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <input
          type="text"
          value={color || ''}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 focus:outline-none text-sm"
          placeholder="#ef567c"
        />
      </div>

      {isOpen && (
        <div ref={popover} className="absolute z-10 mt-2">
          <div className="shadow-lg rounded-lg p-3 bg-white border border-gray-200">
            <HexColorPicker color={color || '#ef567c'} onChange={onChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default function WidgetsSidebar({
  config,
  onConfigUpdate,
  onClose,
  onSectionChange,
}: WidgetsSidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(
    'widget-type'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [widgetName, setWidgetName] = useState('My first widget');
  // const [showColorPicker, setShowColorPicker] = useState(false);

  // Define all options at the top
  const widgetTypeOptions: SelectOption[] = [
    { value: 'Popover', label: 'Popover' },
    { value: 'Modal', label: 'Modal' },
    { value: 'Sidebar', label: 'Sidebar' },
    { value: 'Embed', label: 'Embed' },
  ];

  const positionOptions: SelectOption[] = [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
  ];

  // const textColorOptions = [
  //   { value: 'Light', label: 'Light' },
  //   { value: 'Dark', label: 'Dark' },
  // ];

  // const notificationOptions = [
  //   { value: 'Count', label: 'Count' },
  //   { value: 'Dot', label: 'Dot' },
  //   { value: 'None', label: 'None' },
  // ];

  // const launcherTypeOptions = [
  //   { value: 'Floating', label: 'Floating' },
  //   { value: 'Tab', label: 'Tab' },
  // ];

  const iconOptions = [
    { value: 'Bolt', label: 'Bolt' },
    { value: 'Roadmap', label: 'Roadmap' },
    { value: 'WhatsNew', label: "What's new" },
    { value: 'Idea', label: 'Idea' },
  ];

  const handleInputChange = (field: keyof WidgetConfig, value: any) => {
    console.log('Updating field:', field, 'with value:', value);

    if (field === 'launcherType') {
      // Update the launcher type first
      onConfigUpdate('launcherType', value);

      // Then update the related fields separately
      if (value === 'Tab') {
        onConfigUpdate('launcherIcon', undefined);
        onConfigUpdate('iconColor', 'Light');
        onConfigUpdate('launcherText', "What's new");
        onConfigUpdate('appearance', {
          ...config.appearance,
          textColor: 'Light',
        });
      } else {
        onConfigUpdate('launcherText', undefined);
        onConfigUpdate('launcherIcon', 'Bolt');
        onConfigUpdate('iconColor', 'Light');
      }
    } else {
      // For other property updates
      onConfigUpdate(field, value);
    }
  };

  const handleNestedChange = (
    parentKey: keyof WidgetConfig,
    updates: Partial<WidgetConfig[keyof WidgetConfig]>
  ) => {
    const parentConfig = config[parentKey];

    // Check if parentConfig is an object before spreading
    if (typeof parentConfig === 'object' && parentConfig !== null) {
      onConfigUpdate(parentKey, {
        ...parentConfig,
        ...(updates as object),
      });
    } else {
      // Handle the case where parentConfig is not an object
      onConfigUpdate(parentKey, updates);
    }
  };

  const handleSectionChange = (sectionId: string | null) => {
    setActiveSection(sectionId);
    onSectionChange(sectionId);
  };

  const sections: {
    id: string;
    label: string;
    content: ReactNode;
    visible?: boolean;
  }[] = [
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
              options={widgetTypeOptions}
              value={
                widgetTypeOptions.find(
                  (opt) => opt.value === config.widgetType
                ) || null
              }
              onChange={(option) =>
                handleInputChange('widgetType', option.value)
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
                  <span className="font-medium">Note:</span> Launchers are not
                  available with this Widget type. You will need to place the
                  embed code in the location you want your Widget to appear.
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
                <p className="text-sm text-gray-500 mb-2">
                  The position of the popover relative to the launcher
                </p>
                <SelectDropdown
                  options={[
                    { value: 'Top left', label: 'Top left' },
                    { value: 'Top right', label: 'Top right' },
                    { value: 'Bottom left', label: 'Bottom left' },
                    { value: 'Bottom right', label: 'Bottom right' },
                  ]}
                  value={
                    config.appearance.placement
                      ? {
                          value: config.appearance.placement,
                          label: config.appearance.placement,
                        }
                      : null
                  }
                  onChange={(option) => {
                    handleInputChange('appearance', {
                      placement: option.value,
                    });
                  }}
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Offset
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The distance between the widget popover and launcher (in
                  pixels)
                </p>
                <input
                  type="text"
                  value={config.appearance.offset?.replace('px', '')}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleInputChange('appearance', {
                        offset: `${inputValue}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 16"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi
                    ${config.appearance.offset ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.offset || '0') < 5 || parseInt(config.appearance.offset || '0') > 32 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 5px, Max: 32px
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
                  value={config.appearance.width.replace(/[^\d]/g, '') || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Allow any number input
                    if (/^\d*$/.test(inputValue)) {
                      handleInputChange('appearance', {
                        ...config.appearance,
                        width: `${inputValue}px`,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '450');
                    // On blur, if the value is valid, update it
                    if (value >= 300 && value <= 800) {
                      handleInputChange('appearance', {
                        ...config.appearance,
                        width: `${value}px`,
                      });
                    }
                  }}
                  placeholder="450"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi"
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.width.replace(/[^\d]/g, '') || '0') < 300 || parseInt(config.appearance.width.replace(/[^\d]/g, '') || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
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
                    // Allow any number input
                    if (/^\d*$/.test(inputValue)) {
                      handleInputChange('appearance', {
                        ...config.appearance,
                        height: `${inputValue}px`,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '600');
                    // On blur, if the value is valid, update it
                    if (value >= 400 && value <= 800) {
                      handleInputChange('appearance', {
                        ...config.appearance,
                        height: `${value}px`,
                      });
                    }
                  }}
                  placeholder="600"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi"
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.height?.replace(/[^\d]/g, '') || '0') < 400 || parseInt(config.appearance.height?.replace(/[^\d]/g, '') || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 400px, Max: 800px
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Checkbox
                  checked={config.hideCloseButton ?? false}
                  label={
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-satoshi">
                        Hide close button
                      </span>
                      <span className="text-xs text-gray-500">ⓘ</span>
                    </div>
                  }
                  setChecked={(value) =>
                    handleInputChange('hideCloseButton', value)
                  }
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
                  id="position-dropdown"
                  options={positionOptions}
                  value={
                    positionOptions.find(
                      (opt) => opt.value === config.appearance.position
                    ) || null
                  }
                  onChange={(option) =>
                    handleInputChange('appearance', { position: option.value })
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
                  value={config.appearance.width.replace(/[^\d]/g, '')}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Allow any number input
                    if (/^\d*$/.test(inputValue)) {
                      handleInputChange('appearance', {
                        ...config.appearance,
                        width: `${inputValue}px`,
                      });
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value || '450');
                    // On blur, if the value is valid, update it
                    if (value >= 300 && value <= 800) {
                      handleInputChange('appearance', {
                        ...config.appearance,
                        width: `${value}px`,
                      });
                    }
                  }}
                  placeholder="450"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi"
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.width.replace(/[^\d]/g, '') || '0') < 300 || parseInt(config.appearance.width.replace(/[^\d]/g, '') || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 300px, Max: 800px
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Checkbox
                  checked={config.preventScroll ?? false}
                  label={
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-satoshi">
                        Prevent window scroll
                      </span>
                      <span className="text-xs text-gray-500">ⓘ</span>
                    </div>
                  }
                  setChecked={(value) =>
                    handleInputChange('preventScroll', value)
                  }
                />

                <Checkbox
                  checked={config.hideCloseButton ?? false}
                  label={
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-satoshi">
                        Hide close button
                      </span>
                      <span className="text-xs text-gray-500">ⓘ</span>
                    </div>
                  }
                  setChecked={(value) =>
                    handleInputChange('hideCloseButton', value)
                  }
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
                  value={config.appearance.width.replace('px', '')}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleInputChange('appearance', {
                        width: `${inputValue}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 640"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi
                    ${config.appearance.width ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.width) < 300 || parseInt(config.appearance.width) > 800 ? 'text-red-500' : 'text-gray-500'}`}
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
                  value={config.appearance.height?.replace('px', '')}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === '' || inputValue.match(/^\d+$/)) {
                      handleInputChange('appearance', {
                        height: `${inputValue}px`,
                      });
                    }
                  }}
                  placeholder="e.g., 500"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi
                    ${config.appearance.height ? 'text-gray-900' : 'text-gray-400'}`}
                />
                <p
                  className={`text-xs ${parseInt(config.appearance.height || '0') < 400 || parseInt(config.appearance.height || '0') > 800 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  Min: 400px, Max: 800px
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Checkbox
                  checked={config.preventScroll ?? false}
                  label={
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-satoshi">
                        Prevent window scroll
                      </span>
                      <span className="text-xs text-gray-500">ⓘ</span>
                    </div>
                  }
                  setChecked={(value) =>
                    handleInputChange('preventScroll', value)
                  }
                />

                <Checkbox
                  checked={config.hideCloseButton ?? false}
                  label={
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 font-satoshi">
                        Hide close button
                      </span>
                      <span className="text-xs text-gray-500">ⓘ</span>
                    </div>
                  }
                  setChecked={(value) =>
                    handleInputChange('hideCloseButton', value)
                  }
                />
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      id: 'launcher',
      label: 'Launcher type',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Launcher type
            </label>
            <SelectDropdown
              options={[
                { value: 'Floating', label: 'Floating' },
                { value: 'Tab', label: 'Tab' },
              ]}
              value={
                config.launcherType
                  ? { value: config.launcherType, label: config.launcherType }
                  : null
              }
              onChange={(option) =>
                handleInputChange('launcherType', option.value)
              }
              containerClass="w-full bg-white border border-gray-300 rounded-md"
            />
          </div>

          {config.launcherType === 'Floating' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  Icon
                </label>
                <SelectDropdown
                  options={iconOptions}
                  value={
                    config.launcherIcon
                      ? {
                          value: config.launcherIcon,
                          label: config.launcherIcon,
                        }
                      : { value: 'Bolt', label: 'Bolt' }
                  }
                  onChange={(option) =>
                    handleInputChange('launcherIcon', option.value)
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
                    config.iconColor
                      ? { value: config.iconColor, label: config.iconColor }
                      : null
                  }
                  onChange={(option) =>
                    handleInputChange('iconColor', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          {config.launcherType === 'Tab' && (
            <>
              <div className="space-y-2 p-4 bg-gray-50 rounded-lg mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                  Text
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The text that appears on the tab
                </p>
                <input
                  type="text"
                  value={config.launcherText || ''}
                  onChange={(e) =>
                    handleInputChange('launcherText', e.target.value)
                  }
                  placeholder="What's new"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm"
                />
              </div>

              <div className="space-y-2 p-4 bg-gray-50 rounded-lg mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                  Text color
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Choose how the tab text appears
                </p>
                <SelectDropdown
                  options={[
                    { value: 'Light', label: 'Light' },
                    { value: 'Dark', label: 'Dark' },
                  ]}
                  value={
                    config.iconColor
                      ? { value: config.iconColor, label: config.iconColor }
                      : null
                  }
                  onChange={(option) =>
                    handleInputChange('iconColor', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2 p-4 bg-gray-50 rounded-lg mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                  Position
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Where the tab appears on the page
                </p>
                <SelectDropdown
                  options={positionOptions}
                  value={
                    config.launcherPosition
                      ? {
                          value: config.launcherPosition,
                          label: config.launcherPosition,
                        }
                      : null
                  }
                  onChange={(option) =>
                    handleInputChange('launcherPosition', option.value)
                  }
                  containerClass="w-full bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div className="space-y-2 p-4 bg-gray-50 rounded-lg mb-4">
                <label className="block text-sm font-semibold text-gray-900">
                  Background color
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  The color of the tab
                </p>
                <ColorPicker
                  color={config.backgroundColor || '#5a00cd'}
                  onChange={(color) =>
                    handleInputChange('backgroundColor', color)
                  }
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
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-medium text-gray-900">
              Fine tune your Widgets look and feel
            </h3>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Title
            </label>
            <p className="text-sm text-gray-500">
              The title that appears at the top of your widget
            </p>
            <input
              type="text"
              value={config.appearance.title || ''}
              onChange={(e) =>
                handleInputChange('appearance', { title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
              placeholder="Widget Title"
            />
          </div>

          <div className="space-y-2">
            <label className="block space-y-1">
              <span className="block text-sm font-semibold text-gray-900">
                Description
              </span>
              <span className="block text-sm text-gray-500">
                A brief description of your widget's purpose
              </span>
            </label>
            <input
              type="text"
              value={config.appearance.description || ''}
              onChange={(e) =>
                handleInputChange('appearance', { description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
              placeholder="Widget Description"
            />
          </div>

          {/* Theme option will be added in a future update
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <SelectDropdown
              options={[
                { value: 'Inherit from company', label: 'Inherit from company' },
                { value: 'Custom', label: 'Custom' }
              ]}
              value={config.appearance.theme ? { value: config.appearance.theme, label: config.appearance.theme } : null}
              onChange={(option) => handleInputChange('appearance', { theme: option.value })}
              containerClass="w-full"
            />
          </div>
          */}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Header background color
            </label>
            <ColorPicker
              color={config.appearance.backgroundColor}
              onChange={(color) =>
                handleInputChange('appearance', { backgroundColor: color })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Header text color
            </label>
            <SelectDropdown
              options={[
                { value: 'Light', label: 'Light' },
                { value: 'Dark', label: 'Dark' },
              ]}
              value={
                config.appearance.textColor
                  ? {
                      value: config.appearance.textColor,
                      label: config.appearance.textColor,
                    }
                  : null
              }
              onChange={(option) =>
                handleInputChange('appearance', { textColor: option.value })
              }
              containerClass="w-full bg-white border border-gray-300 rounded-md"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'sections',
      label: 'Sections',
      content: (
        <WidgetSectionsForm formState={config} onChange={handleNestedChange} />
      ),
    },
    {
      id: 'targeting',
      label: 'Targeting',
      content: (
        <WidgetTargetingForm formState={config} onChange={handleNestedChange} />
      ),
    },
    /* Advanced section will be added in a future update
    {
      id: 'advanced',
      label: 'Advanced',
      content: <WidgetAdvancedForm formState={config} onChange={handleNestedChange} />
    }
    */
  ];

  return (
    <div className="h-screen overflow-y-auto w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-satoshi"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-gray-900">
                {widgetName}
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

      {/* Rest of the sidebar content */}
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
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-purple-50 border-0 border-b border-gray-200 cursor-pointer text-lg font-medium text-gray-900 font-satoshi"
            >
              {section.label}
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform text-gray-500 ${activeSection === section.id ? 'rotate-180' : ''}`}
              />
            </button>

            {activeSection === section.id && (
              <div className="p-4 bg-white border-b border-gray-200">
                {section.content}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

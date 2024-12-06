import { useState } from 'react';
import { Lock } from 'lucide-react';
import { BoostTypeDropdown } from './BoostTypeDropdown';
import { BoostTypePreview } from './BoostTypePreview';
import { DimensionInput } from './DimensionInput';
import { validateBoostForm } from '../../utils/validation';
import { useBoost } from '../../contexts/BoostContext';

interface BoostTypeFormProps {
  config: any;
  onSave: (config: any) => void;
}

export function BoostTypeForm({ config, onSave }: BoostTypeFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { updateCurrentBoostConfig } = useBoost();

  const handleConfigChange = (field: string, value: any) => {
    const newConfig = {
      ...config,
      [field]: value,
    };

    const { errors } = validateBoostForm(newConfig);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave(newConfig);
      updateCurrentBoostConfig(newConfig);
    }
  };

  const renderTypeSpecificFields = () => {
    if (config.type === 'Embed') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-700">
              Note: Launchers are not available with this widget type. You will
              need to place the embed code in the location you want the widget
              to appear.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-gray-100 text-sm font-mono">
              {`<!-- Frill Widget (https://frill.co) -->
<div data-frill-widget="9e7fd7f2-684b"></div>
<!-- End Frill Widget -->`}
            </pre>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {['Sidebar', 'Popover'].includes(config.type) && (
          <div className="space-y-3">
            <label className="block text-sm text-gray-700 font-medium">
              Position
            </label>
            <select
              value={config.position}
              onChange={(e) => handleConfigChange('position', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white"
            >
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>
        )}

        <DimensionInput
          value={config.width}
          onChange={(val) => handleConfigChange('width', val)}
          error={errors.width || null}
          label="Width"
          min={300}
          max={800}
        />

        <DimensionInput
          value={config.height}
          onChange={(val) => handleConfigChange('height', val)}
          error={errors.height || null}
          label="Height"
          min={200}
          max={800}
        />

        {config.type === 'Popover' && (
          <DimensionInput
            value={config.offset || 20}
            onChange={(val) => handleConfigChange('offset', val)}
            error={errors.offset || null}
            label="Offset"
            min={0}
            max={100}
          />
        )}

        {config.type !== 'Embed' && (
          <div className="flex items-center">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                config.preventScroll ? 'bg-purple-50' : 'bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                id="prevent-scroll"
                checked={config.preventScroll}
                onChange={(e) =>
                  handleConfigChange('preventScroll', e.target.checked)
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="prevent-scroll"
                className="text-sm text-gray-700 flex items-center gap-2"
              >
                <Lock
                  size={14}
                  className={
                    config.preventScroll ? 'text-purple-500' : 'text-gray-400'
                  }
                />
                Prevent window scroll
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm text-gray-700 font-medium">
              Widget type
            </label>
            <BoostTypeDropdown
              selectedType={config.type}
              onSelect={(type) => handleConfigChange('type', type)}
            />
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>

          {renderTypeSpecificFields()}
        </div>

        {config.type !== 'Embed' && <BoostTypePreview {...config} />}
      </div>
    </div>
  );
}

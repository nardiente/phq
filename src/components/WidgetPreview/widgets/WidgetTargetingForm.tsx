import React from 'react';
import { Targeting, WidgetConfig } from '../../../contexts/WidgetContext/type';

interface WidgetTargetingFormProps {
  formState: WidgetConfig;
  onChange: (field: keyof Targeting, value: string | number) => void;
}

export const WidgetTargetingForm: React.FC<WidgetTargetingFormProps> = ({
  formState,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Control when and where your Widget appears.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            When would you like to show the Widget
          </h3>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-[#5a00cd] border-gray-300 focus:ring-[#5a00cd]"
                checked={formState.targeting?.timing === 'on-load'}
                onChange={() => onChange('timing', 'on-load')}
              />
              <span
                className={`ml-2 ${formState.targeting?.timing === 'on-load' ? 'text-gray-900' : 'text-gray-700'}`}
              >
                When the user lands on the page
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-[#5a00cd] border-gray-300 focus:ring-[#5a00cd]"
                checked={formState.targeting?.timing === 'on-exit'}
                onChange={() => onChange('timing', 'on-exit')}
              />
              <span
                className={`ml-2 ${formState.targeting?.timing === 'on-exit' ? 'text-gray-900' : 'text-gray-700'}`}
              >
                When a user leaves the page
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-[#5a00cd] border-gray-300 focus:ring-[#5a00cd]"
                checked={formState.targeting?.timing === 'on-scroll'}
                onChange={() => onChange('timing', 'on-scroll')}
              />
              <span
                className={`ml-2 ${formState.targeting?.timing === 'on-scroll' ? 'text-gray-900' : 'text-gray-700'}`}
              >
                When the user has scrolled the page (soon)
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show after</span>
          <input
            type="number"
            min={0}
            value={
              Number(formState.targeting?.delay) > 0
                ? String(Number(formState.targeting?.delay)).replace(/^0+/, '')
                : '0'
            }
            onChange={(e) =>
              onChange('delay', e.target.value ? parseInt(e.target.value) : 0)
            }
            className={`w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm ${Number(formState.targeting?.delay) > 0 ? 'text-gray-900' : ''}`}
          />
          <span className="text-sm text-gray-700">seconds</span>
        </div>
      </div>

      {/* URL targeting will be added in a future update */}
      {/* Segments section will be added in a future update */}
    </div>
  );
};

import React from 'react';
import { WidgetConfig } from '../../types/widget';

interface WidgetTargetingFormProps {
  formState: WidgetConfig;
  onChange: (field: keyof WidgetConfig, value: any) => void;
}

export const WidgetTargetingForm: React.FC<WidgetTargetingFormProps> = ({ formState, onChange }) => {
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
                onChange={() =>
                  onChange('targeting', {
                    ...formState.targeting,
                    timing: 'on-load',
                  })
                }
              />
              <span className="ml-2 text-gray-700">When the user lands on the page</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-[#5a00cd] border-gray-300 focus:ring-[#5a00cd]"
                checked={formState.targeting?.timing === 'on-exit'}
                onChange={() =>
                  onChange('targeting', {
                    ...formState.targeting,
                    timing: 'on-exit',
                  })
                }
              />
              <span className="ml-2 text-gray-700">When a user leaves the page</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 text-[#5a00cd] border-gray-300 focus:ring-[#5a00cd]"
                checked={formState.targeting?.timing === 'on-scroll'}
                onChange={() =>
                  onChange('targeting', {
                    ...formState.targeting,
                    timing: 'on-scroll',
                  })
                }
              />
              <span className="ml-2 text-gray-700">When the user has scrolled the page (soon)</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show after</span>
          <input
            type="number"
            min="0"
            value={formState.targeting?.delay || 0}
            onChange={(e) =>
              onChange('targeting', {
                ...formState.targeting,
                delay: parseInt(e.target.value),
              })
            }
            className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-sm"
          />
          <span className="text-sm text-gray-700">seconds</span>
        </div>
      </div>

      {/* URL targeting will be added in a future update */}
      {/* Segments section will be added in a future update */}
    </div>
  );
};

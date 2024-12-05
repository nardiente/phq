import React from 'react';
import { Upload, Info } from 'lucide-react';
import { useBoost } from '../../contexts/BoostContext';

interface AppearanceFormProps {
  config: any;
  onSave: (config: any) => void;
}

export function AppearanceForm({ config, onSave }: AppearanceFormProps) {
  const { updateCurrentBoostConfig } = useBoost();

  const handleChange = (field: string, value: any) => {
    const newConfig = {
      ...config,
      appearance: {
        ...config.appearance,
        [field]: value,
      },
    };
    onSave(newConfig);
    updateCurrentBoostConfig(newConfig);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm text-gray-700 font-medium">
            Company Name
          </label>
          <input
            type="text"
            value={config.appearance.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100"
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-700 font-medium">
            Description
          </label>
          <textarea
            value={config.appearance.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 min-h-[100px]"
            placeholder="Enter description"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show-company-logo"
            checked={config.appearance.showCompanyLogo}
            onChange={(e) => handleChange('showCompanyLogo', e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="show-company-logo" className="text-sm text-gray-700">
            Show company logo
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-700 font-medium">
            Header background color
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: config.appearance.headerBackgroundColor,
                }}
              />
            </div>
            <input
              type="text"
              value={config.appearance.headerBackgroundColor}
              onChange={(e) =>
                handleChange('headerBackgroundColor', e.target.value)
              }
              className="w-full pl-12 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-700 font-medium">
            Header text color
          </label>
          <select
            value={config.appearance.headerTextColor}
            onChange={(e) => handleChange('headerTextColor', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm text-gray-700 font-medium">
          Preview
        </label>
        <div
          className="relative bg-[#f8fafc] rounded-lg overflow-hidden"
          style={{ height: '480px' }}
        >
          <div className="absolute inset-4">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Browser Chrome */}
              <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              {/* Content Area */}
              <div
                className="p-4 overflow-auto"
                style={{ height: 'calc(100% - 2.5rem)' }}
              >
                <div className="w-full rounded-lg border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div
                    className="p-4"
                    style={{
                      backgroundColor: config.appearance.headerBackgroundColor,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {config.appearance.showCompanyLogo && (
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Upload size={20} className="text-purple-400" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h2
                          className={`text-lg font-semibold ${
                            config.appearance.headerTextColor === 'dark'
                              ? 'text-gray-900'
                              : 'text-white'
                          }`}
                        >
                          {config.appearance.title}
                        </h2>
                        <p
                          className={`text-sm mt-1 ${
                            config.appearance.headerTextColor === 'dark'
                              ? 'text-gray-600'
                              : 'text-white/80'
                          }`}
                        >
                          {config.appearance.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    {/* Example Content Item */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-100 rounded w-full"></div>
                      <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    </div>

                    {/* Example Image Placeholder */}
                    <div className="h-32 bg-gray-100 rounded-lg w-full"></div>

                    {/* Example Feature List */}
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <div className="h-4 bg-purple-100 rounded w-1/4 mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-purple-100 rounded w-5/6"></div>
                        <div className="h-3 bg-purple-100 rounded w-4/6"></div>
                        <div className="h-3 bg-purple-100 rounded w-3/6"></div>
                      </div>
                    </div>

                    {/* Example Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="h-8 w-24 bg-purple-100 rounded"></div>
                      <div className="h-8 w-20 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

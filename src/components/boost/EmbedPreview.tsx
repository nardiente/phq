import React from 'react';
import { Upload } from 'lucide-react';

interface EmbedPreviewProps {
  width: number;
  height: number;
}

export function EmbedPreview({ width, height }: EmbedPreviewProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm text-gray-700 font-medium">Preview</label>
      <div className="relative">
        <div
          className="bg-[#f8fafc] rounded-lg overflow-hidden"
          style={{ height: '280px' }}
        >
          <div className="absolute inset-4">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              <div className="p-4">
                <div
                  className="mx-auto bg-white rounded-lg border border-gray-200"
                  style={{
                    width: Math.min(width * 0.4, 300),
                    height: Math.min(height * 0.4, 200),
                  }}
                >
                  <div className="p-6 space-y-6">
                    {/* Company Section */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                          <Upload size={20} className="text-purple-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="space-y-1">
                          <div className="h-5 bg-gray-100 rounded w-32"></div>
                          <div className="h-4 bg-gray-100 rounded w-48"></div>
                        </div>
                        <button className="mt-3 px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded">
                          Upload Logo
                        </button>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="h-4 bg-gray-100 rounded w-24"></div>
                        <div className="h-9 bg-gray-50 rounded border border-gray-200"></div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-4 bg-gray-100 rounded w-32"></div>
                        <div className="h-9 bg-gray-50 rounded border border-gray-200"></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-8 w-20 bg-gray-100 rounded"></div>
                      <div className="h-8 w-20 bg-purple-100 rounded"></div>
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

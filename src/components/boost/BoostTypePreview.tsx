import React from 'react';
import { Sidebar, Maximize2, Square, ExternalLink } from 'lucide-react';

interface BoostTypePreviewProps {
  type: string;
  position?: string;
  width: number;
  height: number;
  offset?: number;
}

export function BoostTypePreview({
  type,
  position = 'Right',
  width,
  height,
  offset = 20,
}: BoostTypePreviewProps) {
  const previewWidth = Math.min(180, Math.max(120, width * 0.4));
  const previewHeight = Math.min(180, Math.max(120, height * 0.4));

  const browserFrame = (content: React.ReactNode) => (
    <div className="absolute inset-4">
      <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>
        <div className="p-4 relative h-[calc(100%-2.5rem)]">{content}</div>
      </div>
    </div>
  );

  const previewContent = (
    <div className="p-4 space-y-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-4 bg-gray-100 rounded w-24"></div>
          <div className="h-3 bg-gray-100 rounded w-32"></div>
        </div>
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-purple-100 border-2 border-white"></div>
          <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-gray-100 rounded w-full"></div>
        <div className="h-2 bg-gray-100 rounded w-5/6"></div>
        <div className="h-2 bg-gray-100 rounded w-4/6"></div>
      </div>
      <div className="pt-2 flex items-center gap-2">
        <div className="h-6 w-16 bg-purple-100 rounded"></div>
        <div className="h-6 w-16 bg-blue-100 rounded"></div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (type) {
      case 'Sidebar':
        return browserFrame(
          <div className="flex items-center h-full">
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${position === 'Left' ? 'left-0' : 'right-0'} bg-white border-${position === 'Left' ? 'r' : 'l'} border-gray-200 shadow-lg h-4/5`}
              style={{ width: `${previewWidth}px` }}
            >
              {previewContent}
            </div>
          </div>
        );
      case 'Modal':
        return browserFrame(
          <div className="flex items-center justify-center h-full">
            <div
              className="bg-white rounded-lg shadow-lg"
              style={{
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
              }}
            >
              {previewContent}
            </div>
          </div>
        );
      case 'Popover':
        const offsetStyle =
          position === 'Left'
            ? { left: `${offset}px` }
            : { right: `${offset}px` };
        return browserFrame(
          <div className="flex items-center h-full">
            <div
              className={`absolute top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg`}
              style={{
                ...offsetStyle,
                width: `${previewWidth}px`,
                height: `${previewHeight}px`,
              }}
            >
              <div
                className={`absolute top-1/2 ${position === 'Left' ? 'right-full' : 'left-full'} -translate-y-1/2`}
              >
                <div
                  className={`border-8 border-transparent ${position === 'Left' ? 'border-r-white' : 'border-l-white'}`}
                />
              </div>
              {previewContent}
            </div>
          </div>
        );
      case 'Embed':
        return browserFrame(
          <div className="h-full bg-gray-50 p-4">
            <div className="grid grid-cols-12 gap-4 h-full">
              <div className="col-span-3">
                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                </div>
              </div>
              <div className="col-span-9 space-y-4">
                <div
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  style={{
                    width: `${previewWidth}px`,
                    height: `${previewHeight}px`,
                  }}
                >
                  {previewContent}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return browserFrame(
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a boost type
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm text-gray-700 font-medium">Preview</label>
      <div className="relative">
        <div className="bg-[#f8fafc] rounded-lg h-[280px] overflow-hidden">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}

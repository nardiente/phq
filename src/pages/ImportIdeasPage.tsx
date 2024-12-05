import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { ComingSoonLayout } from '../components/ComingSoonLayout';

export default function ImportIdeasPage() {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop here
  };

  return (
    <ComingSoonLayout>
      <div className="flex-1 px-8 py-6 flex justify-center">
        <div className="max-w-[800px]">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-6">
            Import Ideas
          </h1>
          <p className="text-[14px] text-gray-600 mb-8">
            Kick-start your board by importing your ideas
          </p>

          <div
            className={`border-2 border-dashed rounded-lg p-8 mb-8 flex flex-col items-center justify-center transition-colors ${
              isDragging ? 'border-[#FF5C35] bg-orange-50' : 'border-gray-200'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload size={24} className="text-gray-400 mb-4" />
            <p className="text-gray-600 text-center">
              Drag & drop or{' '}
              <button className="text-[#FF5C35] hover:underline">
                Choose a file
              </button>{' '}
              to import
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-[16px] font-semibold text-gray-900">
              Or send us the export CSV and we'll do it for you. (Easiest)
            </h2>
            <p className="text-[14px] text-gray-600">
              You can export your data as a CSV file and send it to{' '}
              <a
                href="mailto:support@producthq.io"
                className="text-[#FF5C35] hover:underline"
              >
                support@producthq.io
              </a>{' '}
              and we'll do the rest. Just make sure you have signed up for a
              free account first.
            </p>
          </div>
        </div>
      </div>
    </ComingSoonLayout>
  );
}

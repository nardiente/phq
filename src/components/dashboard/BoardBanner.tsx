import React from 'react';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { Toast } from '../Toast';

export function BoardBanner() {
  const [showCopyToast, setShowCopyToast] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText('testadmin01.producthq.io');
    setShowCopyToast(true);
  };

  return (
    <div className="bg-white rounded-lg border-2 border-purple-200 p-6 mb-6">
      <div className="max-w-[600px] mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Add your board to your website.
        </h2>

        <div className="space-y-2">
          <a
            href="https://support.producthq.io/articles/how-to-add-a-board-to-your-site-145e70-32dd7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[14px] text-purple-600 hover:text-purple-700 hover:underline"
          >
            Doc: How To Add A Board To Your Site
          </a>

          <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="text-[14px] text-gray-600">
              testadmin01.producthq.io
            </span>
            <button
              onClick={copyUrl}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Copy URL to clipboard"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>

      {showCopyToast && (
        <Toast
          message="URL copied to clipboard"
          onClose={() => setShowCopyToast(false)}
        />
      )}
    </div>
  );
}

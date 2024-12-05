import React, { useState } from 'react';
import { X, Copy, AlertTriangle } from 'lucide-react';
import { Toast } from '../Toast';

interface GetCodeModalProps {
  onClose: () => void;
}

export function GetCodeModal({ onClose }: GetCodeModalProps) {
  const [copied, setCopied] = useState(false);

  const scriptCode = `<!-- ProductHQ (https://producthq.io) -->
<script>
  (function(t,r){function s(){var a=r.getElementsByTagName("script")[0],e=r.createElement("script");
  window.ProductHQ=t;e.async=!0;e.src="https://cdn.producthq.io/widget.js";
  a.parentNode.insertBefore(e,a)}
  window.ProductHQ={container: {
    key: '2d11a8c5-b5db-4963-81bb-547cb5cac4b2',
    // Identify your users (optional)
    // user: { email: 'email@domain.com', name: 'my user'}
  }};s();})(window,document);
</script>
<!-- End ProductHQ -->`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Install ProductHQ script
            </h2>
            <div className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-lg">
              ProductHQ script not installed
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-medium">
                  1
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  Copy the code below
                </h3>
              </div>
              <div className="relative">
                <pre className="bg-gray-900 p-4 rounded-lg text-gray-100 text-sm font-mono overflow-x-auto">
                  {scriptCode}
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white rounded"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-medium">
                  2
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  Paste the code into your website or app
                </h3>
              </div>
              <p className="text-gray-600">
                The code needs to be placed before the{' '}
                <code className="bg-gray-100 px-1.5 py-0.5 rounded">
                  &lt;/body&gt;
                </code>{' '}
                tag.
              </p>
              <div className="flex items-start gap-2">
                <p className="text-gray-600">
                  <a href="#" className="text-blue-600 hover:underline">
                    Click here for instructions on how to set up a default
                    domain name.
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-medium">
                  3
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  Test the script
                </h3>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <AlertTriangle size={16} className="text-gray-400" />
                Check status
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg"
          >
            Done
          </button>
        </div>
      </div>

      {copied && (
        <Toast
          message="Copied to clipboard!"
          onClose={() => setCopied(false)}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Copy, Check, Code2, AlertCircle } from 'lucide-react';

interface EmbedCodeGeneratorProps {
  widgetId: string;
}

export function EmbedCodeGenerator({ widgetId }: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  
  const embedCode = `<!-- ProductHQ Widget -->
<div data-producthq-widget="${widgetId}"></div>
<script async src="https://cdn.producthq.io/widget.js"></script>
<!-- End ProductHQ Widget -->`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm text-gray-700 font-medium">
          Embed code
        </label>
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-1.5 text-sm ${
            copied ? 'text-green-600' : 'text-purple-600 hover:text-purple-700'
          }`}
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <div className="absolute top-3 right-3">
          <Code2 size={16} className="text-gray-400" />
        </div>
        <pre className="w-full p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono overflow-x-auto">
          {embedCode}
        </pre>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
        <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-sm text-blue-700">
            Add this code to your website where you want the widget to appear.
          </p>
          <p className="text-sm text-blue-600">
            The widget will automatically adapt to its container's width and maintain the configured aspect ratio.
          </p>
        </div>
      </div>
    </div>
  );
}
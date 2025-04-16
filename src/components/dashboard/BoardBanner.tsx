import { Copy } from 'lucide-react';
import { useBoardBanner } from '../../hooks/useBoardBanner';
import { useState } from 'react';
import { Toast } from '../Toast';
import { useUser } from '../../contexts/UserContext';

export function BoardBanner() {
  const { isVisible, loading, hideTemporarily, hidePermanently } =
    useBoardBanner();
  const { user } = useUser();
  const { project } = user ?? {};

  const [showCopyToast, setShowCopyToast] = useState(false);

  if (!isVisible) return null;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(
      `${project?.portal_subdomain ?? 'feedback'}.producthq.io`
    );
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
              {`${project?.portal_subdomain ?? 'feedback'}.producthq.io`}
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

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={hideTemporarily}
            className="text-[13px] text-gray-600 hover:text-gray-700"
            disabled={loading}
          >
            Remind me in 3 days
          </button>
          <button
            onClick={hidePermanently}
            className="text-[13px] text-gray-600 hover:text-gray-700"
            disabled={loading}
          >
            Close and don't show again
          </button>
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

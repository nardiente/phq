import { useState } from 'react';
import { getApi } from '../../../utils/api/api';
import { Tracking } from '../../../types/tracking';
import { Toast } from '../../Toast';
import { TypeOptions } from 'react-toastify';

interface GetCodeModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
  widgetKey: string;
}

export const GetCodeModal = ({
  code,
  isOpen,
  onClose,
  widgetKey,
}: GetCodeModalProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState<TypeOptions>('default');

  if (!isOpen) return null;

  code =
    code ??
    `<!-- Start of ProductHQ code snippet -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  var phq_config = {
    client_id: '${widgetKey}', // This is your assigned client ID. Please do not change this value.
    environment: ${import.meta.env.VITE_ENVIRONMENT ?? 'integration'}, // This is the environment. Please do not change this value.
    full_name: 'dummy_full_name_id' // Please replace with the HTML Tag/Element ID containing the full name.
  }
</script>
<!-- End ProductHQ -->`;

  const checkCode = () => {
    setLoading(true);
    getApi<Tracking>({
      url: 'trackings/latest',
      params: { host: window.location.host },
    })
      .then((res) => {
        const { results } = res;
        const { data } = results;
        if (data) {
          setMessage('The code snippet is working.');
          setType('success');
        } else {
          setMessage('The code snippet is not working.');
          setType('warning');
        }
        setShowToast(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[100]" />
      <div className="bg-white rounded-lg w-[600px] p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-200 z-[101] max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Install Widget</h2>
          <button
            onClick={onClose}
            className="text-gray-400 text-3xl font-light"
          >
            ×
          </button>
        </div>

        <p className="flex justify-between items-center mb-3">
          <span>STEP 1: Copy the code</span>
          <button
            onClick={handleCopy}
            className="bg-[#FF6334] text-white px-6 py-2 rounded-md relative"
          >
            {showCopied ? 'Copied!' : 'Copy code'}
          </button>
        </p>

        <pre className="bg-gray-800 text-white p-4 font-mono text-sm mb-2 w-full whitespace-pre-wrap break-all">
          {code}
        </pre>

        <p className="mb-3">
          STEP 2: The code needs to be placed before the &lt;/body&gt; tag.
        </p>

        <p className="flex justify-between items-center mb-3">
          <span>STEP 3: Test the script</span>
          <button
            className="bg-[#22C55E] text-white px-6 py-2 rounded-md relative"
            disabled={loading}
            onClick={checkCode}
          >
            {loading ? 'Checking status...' : 'Check status'}
          </button>
        </p>

        <p className="text-gray-600">
          Read the{' '}
          <a
            href="https://support.producthq.io/en/article/17-how-to-configure-a-widget-and-install-the-script"
            className="text-[#5a00cd]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Setup Guide
          </a>{' '}
          for more information or download the HTML example.
        </p>
      </div>
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          message={message}
          type={type}
        />
      )}
    </>
  );
};

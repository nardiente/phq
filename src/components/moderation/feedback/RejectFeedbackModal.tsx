import React, { useState } from 'react';
import { X, AlertTriangle, HelpCircle } from 'lucide-react';
import { Toast } from '../../Toast';
import { Feedback } from '../../../types/feedback';
import { IdeaWasRejected } from '../../../pages/Emails/components/email-templates/customers/ideas/IdeaWasRejected';

interface RejectFeedbackModalProps {
  type: 'idea' | 'comment';
  item: Partial<Feedback>;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export function RejectFeedbackModal({
  type,
  item,
  onConfirm,
  onCancel,
}: RejectFeedbackModalProps) {
  const [reason, setReason] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onConfirm(reason);
      setShowToast(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col max-h-screen overflow-auto bg-white rounded-lg shadow-lg max-w-xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Reject {type.charAt(0).toUpperCase() + type.slice(1)}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Rejection reason
              </label>
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50"
              >
                <HelpCircle size={16} />
              </button>
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100 min-h-[120px] text-[14px]"
              placeholder="Add a reason for rejecting this idea..."
            />
            {showHelp && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg text-[13px] text-blue-700">
                This message will be sent to {item.author?.full_name} explaining
                why their {type} was rejected. Be clear and constructive in your
                feedback.
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Email Preview</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-[13px] text-gray-600">
              {<IdeaWasRejected idea={item} reason={reason} />}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
            disabled={!reason.trim()}
            onClick={handleSubmit}
          >
            Reject {type}
          </button>
        </div>
      </div>

      {showToast && (
        <Toast
          message={`${type.charAt(0).toUpperCase() + type.slice(1)} rejected successfully`}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

import { memo } from 'react';
import { Feedback } from '../../../types/feedback';

interface FeedbackListItemProps {
  item: Partial<Feedback>;
  onReject: (item: Partial<Feedback>) => void;
  onApprove: (item: Partial<Feedback>) => void;
}

export const FeedbackListItem = memo(function FeedbackListItem({
  item,
  onReject,
  onApprove,
}: FeedbackListItemProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[15px] font-medium text-gray-900">{item.title}</h3>
        <span className="text-[13px] text-gray-500">
          {new Date(item.created_at ?? new Date()).toLocaleDateString()}
        </span>
      </div>
      <p className="text-[14px] text-gray-600 mb-4">{item.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-[12px] font-medium">
                {item.author?.full_name.charAt(0)}
              </span>
            </div>
            <span className="text-[13px] text-gray-600">
              {item.author?.full_name}
            </span>
          </div>
          {item.tags && item.tags.length > 0 && (
            <span className="text-[13px] text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              {item.tags.join(', ')}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onReject(item)}
            className="px-3 py-1.5 text-[13px] text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(item)}
            className="px-3 py-1.5 text-[13px] text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
});

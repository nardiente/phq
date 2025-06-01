import { memo } from 'react';
import { FeedbackComment } from '../../../types/feedback';
import { removeHtmlTags } from '../../../utils/string';

interface CommentListItemProps {
  item: Partial<FeedbackComment>;
  onReject: (item: Partial<FeedbackComment>) => void;
  onApprove: (item: Partial<FeedbackComment>) => void;
}

export const CommentListItem = memo(function CommentListItem({
  item,
  onReject,
  onApprove,
}: CommentListItemProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[15px] font-medium text-gray-900">
          {removeHtmlTags(item.comment ?? '')}
        </h3>
        <span className="text-[13px] text-gray-500">
          {new Date(item.created_at ?? new Date()).toLocaleDateString()}
        </span>
      </div>
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

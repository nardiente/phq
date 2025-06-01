import { memo } from 'react';
import { FeedbackComment } from '../../../types/feedback';
import { CommentListItem } from './CommentListItem';

interface CommentListProps {
  items: Partial<FeedbackComment>[];
  onReject: (item: Partial<FeedbackComment>) => void;
  onApprove: (item: Partial<FeedbackComment>) => void;
}

export const CommentList = memo(function CommentList({
  items,
  onReject,
  onApprove,
}: CommentListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CommentListItem
          key={item.id}
          item={item}
          onReject={onReject}
          onApprove={onApprove}
        />
      ))}
    </div>
  );
});

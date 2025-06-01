import { memo } from 'react';
import { Feedback } from '../../../types/feedback';
import { FeedbackListItem } from './FeedbackListItem';

interface FeedbackListProps {
  items: Partial<Feedback>[];
  onReject: (item: Partial<Feedback>) => void;
  onApprove: (item: Partial<Feedback>) => void;
}

export const FeedbackList = memo(function FeedbackList({
  items,
  onReject,
  onApprove,
}: FeedbackListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FeedbackListItem
          key={item.id}
          item={item}
          onReject={onReject}
          onApprove={onApprove}
        />
      ))}
    </div>
  );
});

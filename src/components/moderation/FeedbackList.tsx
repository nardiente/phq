import { memo } from 'react';
import { Feedback } from '../../types/feedback';
import { FeedbackListItem } from './FeedbackListItem';

interface FeedbackListProps {
  items: (Partial<Feedback> & {
    content?: string;
    date?: string;
  })[];
  onReject: (
    item: Partial<Feedback> & {
      content?: string;
      date?: string;
    }
  ) => void;
  onApprove: (
    item: Partial<Feedback> & {
      content?: string;
      date?: string;
    }
  ) => void;
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

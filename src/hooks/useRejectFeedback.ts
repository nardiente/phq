import { useState, useCallback } from 'react';
import { Feedback } from '../types/feedback';
import { useFeedback } from '../contexts/FeedbackContext';

export function useRejectFeedback() {
  const { updateItemStatus } = useFeedback();

  const [itemToReject, setItemToReject] = useState<Partial<Feedback> | null>(
    null
  );

  const handleReject = useCallback((item: Partial<Feedback>) => {
    setItemToReject(item);
  }, []);

  const handleConfirmReject = useCallback(
    (rejected_reason: string) => {
      if (!itemToReject) return;

      // Here you would typically make an API call to reject the feedback
      console.log('Rejecting feedback:', {
        item: itemToReject,
        rejected_reason,
      });

      updateItemStatus({
        ...itemToReject,
        admin_approval_status: 'rejected',
        rejected_reason,
      });

      setItemToReject(null);
    },
    [itemToReject]
  );

  const cancelReject = useCallback(() => {
    setItemToReject(null);
  }, []);

  return {
    itemToReject,
    handleReject,
    handleConfirmReject,
    cancelReject,
  };
}

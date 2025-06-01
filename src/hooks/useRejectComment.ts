import { useState, useCallback } from 'react';
import { FeedbackComment } from '../types/feedback';
import { useFeedback } from '../contexts/FeedbackContext';

export function useRejectComment() {
  const { updateCommentStatus } = useFeedback();

  const [itemToReject, setItemToReject] =
    useState<Partial<FeedbackComment> | null>(null);

  const handleReject = useCallback((item: Partial<FeedbackComment>) => {
    setItemToReject(item);
  }, []);

  const handleConfirmReject = useCallback(
    (rejected_reason: string) => {
      if (!itemToReject) return;

      // Here you would typically make an API call to reject the feedback
      console.log('Rejecting comment:', {
        item: itemToReject,
        rejected_reason,
      });

      updateCommentStatus({
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

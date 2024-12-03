import { useState, useCallback } from 'react';
import { FeedbackItem } from '../types/feedback';

export function useRejectFeedback() {
  const [itemToReject, setItemToReject] = useState<FeedbackItem | null>(null);

  const handleReject = useCallback((item: FeedbackItem) => {
    setItemToReject(item);
  }, []);

  const handleConfirmReject = useCallback((reason: string) => {
    if (!itemToReject) return;

    // Here you would typically make an API call to reject the feedback
    console.log('Rejecting feedback:', {
      item: itemToReject,
      reason
    });

    setItemToReject(null);
  }, [itemToReject]);

  const cancelReject = useCallback(() => {
    setItemToReject(null);
  }, []);

  return {
    itemToReject,
    handleReject,
    handleConfirmReject,
    cancelReject
  };
}
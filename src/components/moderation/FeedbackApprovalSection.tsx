import { FeedbackHeader } from './feedback/FeedbackHeader';
import { FeedbackTabs } from './feedback/FeedbackTabs';
import { FeedbackContent } from './feedback/FeedbackContent';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useEffect } from 'react';

export function FeedbackApprovalSection() {
  const { state, setActiveTab } = useFeedback();

  useEffect(() => {
    setActiveTab('ideas');
  }, []);

  return (
    <>
      <FeedbackHeader />
      <FeedbackTabs activeTab={state.activeTab} onTabChange={setActiveTab} />
      <FeedbackContent />
    </>
  );
}

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
    <div className="space-y-6 pt-4">
      <FeedbackHeader />
      <FeedbackTabs activeTab={state.activeTab} onTabChange={setActiveTab} />
      <FeedbackContent />
    </div>
  );
}

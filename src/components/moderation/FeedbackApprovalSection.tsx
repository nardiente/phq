import { FeedbackHeader } from './feedback/FeedbackHeader';
import { FeedbackTabs } from './feedback/FeedbackTabs';
import { FeedbackContent } from './feedback/FeedbackContent';
import { useFeedback } from '../../contexts/FeedbackContext';
import { useEffect } from 'react';
import { CommentContent } from './comment/CommentContent';

export function FeedbackApprovalSection() {
  const {
    state: { activeTab },
    setActiveTab,
  } = useFeedback();

  useEffect(() => {
    setActiveTab('ideas');
  }, []);

  return (
    <>
      <FeedbackHeader />
      <FeedbackTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'ideas' ? <FeedbackContent /> : <CommentContent />}
    </>
  );
}

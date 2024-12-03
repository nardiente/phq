import React from 'react';
import { FeedbackHeader } from './feedback/FeedbackHeader';
import { FeedbackTabs } from './feedback/FeedbackTabs';
import { FeedbackContent } from './feedback/FeedbackContent';
import { useFeedback } from '../../contexts/FeedbackContext';

export function FeedbackApprovalSection() {
  const { state, setActiveTab } = useFeedback();

  return (
    <div className="space-y-6 pt-4">
      <FeedbackHeader />
      <FeedbackTabs 
        activeTab={state.activeTab} 
        onTabChange={setActiveTab} 
      />
      <FeedbackContent />
    </div>
  );
}
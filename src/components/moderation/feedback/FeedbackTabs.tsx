import React from 'react';
import { TabButton } from '../../ui/TabButton';

interface FeedbackTabsProps {
  activeTab: 'ideas' | 'comments';
  onTabChange: (tab: 'ideas' | 'comments') => void;
}

export function FeedbackTabs({ activeTab, onTabChange }: FeedbackTabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <TabButton
        active={activeTab === 'ideas'}
        onClick={() => onTabChange('ideas')}
      >
        Ideas
      </TabButton>
      <TabButton
        active={activeTab === 'comments'}
        onClick={() => onTabChange('comments')}
      >
        Comments
      </TabButton>
    </div>
  );
}
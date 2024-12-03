import React, { useState } from 'react';
import { TurnoffUserLogin } from '../components/moderation/TurnoffUserLogin';
import { UserFeedbackSettings } from '../components/moderation/UserFeedbackSettings';
import { FeedbackApprovalSection } from '../components/moderation/FeedbackApprovalSection';
import { RejectFeedbackModal } from '../components/moderation/RejectFeedbackModal';
import { FeedbackProvider } from '../contexts/FeedbackContext';

export default function ModerationPage() {
  const [settings, setSettings] = useState({
    turnoffUserLogin: false,
    disableIdeas: false,
    disableVotes: false,
    disableComments: false
  });

  return (
    <FeedbackProvider>
      <div className="flex-1 px-8 py-6">
        <div className="max-w-[800px]">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Moderation</h1>
          <div className="space-y-8">
            <TurnoffUserLogin
              enabled={settings.turnoffUserLogin}
              onChange={(enabled) => setSettings(prev => ({ ...prev, turnoffUserLogin: enabled }))}
            />

            <UserFeedbackSettings
              settings={{
                disableIdeas: settings.disableIdeas,
                disableVotes: settings.disableVotes,
                disableComments: settings.disableComments
              }}
              onChange={(key, value) => setSettings(prev => ({ ...prev, [key]: value }))}
            />

            <FeedbackApprovalSection />
          </div>
        </div>
      </div>
    </FeedbackProvider>
  );
}
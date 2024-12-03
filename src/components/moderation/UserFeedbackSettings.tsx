import React from 'react';
import { Toggle } from '../ui/Toggle';
import { SectionHeader } from '../ui/SectionHeader';

interface UserFeedbackSettingsProps {
  settings: {
    disableIdeas: boolean;
    disableVotes: boolean;
    disableComments: boolean;
  };
  onChange: (key: string, value: boolean) => void;
}

export function UserFeedbackSettings({ settings, onChange }: UserFeedbackSettingsProps) {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Do not allow user feedback"
        description="If the toggle is turned on, users will not be able to provide the respective feedback e.g. ideas, votes, or comments. Only your team will be able to do so."
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div>
            <h3 className="text-[14px] font-medium text-gray-900">Ideas</h3>
            <p className="text-[13px] text-gray-500">
              Users will not be able to submit new ideas
            </p>
          </div>
          <Toggle 
            checked={settings.disableIdeas}
            onChange={(checked) => onChange('disableIdeas', checked)}
          />
        </div>

        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div>
            <h3 className="text-[14px] font-medium text-gray-900">Votes</h3>
            <p className="text-[13px] text-gray-500">
              Users will not be able to vote on ideas
            </p>
          </div>
          <Toggle 
            checked={settings.disableVotes}
            onChange={(checked) => onChange('disableVotes', checked)}
          />
        </div>

        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div>
            <h3 className="text-[14px] font-medium text-gray-900">Comments</h3>
            <p className="text-[13px] text-gray-500">
              Users will not be able to comment on ideas
            </p>
          </div>
          <Toggle 
            checked={settings.disableComments}
            onChange={(checked) => onChange('disableComments', checked)}
          />
        </div>
      </div>
    </div>
  );
}
import { Toggle } from '../ui/Toggle';
import SectionHeader from '../SectionHeader';
import { ModerateSettings } from '../../types/moderation';

interface UserFeedbackSettingsProps {
  settings?: ModerateSettings;
  onChange: (key: string, value: boolean) => void;
}

export function UserFeedbackSettings({
  settings,
  onChange,
}: UserFeedbackSettingsProps) {
  return (
    <>
      <SectionHeader
        title="Do not allow user feedback"
        description="If the toggle is turned on, users will not be able to provide the respective feedback e.g. ideas, votes, or comments. Only your team will be able to do so."
      />

      <div className="ml-4">
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div>
            <h3 className="text-[14px] font-medium text-gray-900">Ideas</h3>
            <p className="text-[13px] text-gray-500">
              Users will not be able to submit new ideas
            </p>
          </div>
          <Toggle
            checked={settings?.feedback ?? false}
            onChange={(checked) => onChange('feedback', checked)}
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
            checked={settings?.votes ?? false}
            onChange={(checked) => onChange('votes', checked)}
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
            checked={settings?.comments ?? false}
            onChange={(checked) => onChange('comments', checked)}
          />
        </div>
      </div>
    </>
  );
}

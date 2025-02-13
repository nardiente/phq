import { Toggle } from '../ui/Toggle';
import SectionHeader from '../SectionHeader';

interface TurnoffUserLoginProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function TurnoffUserLogin({ enabled, onChange }: TurnoffUserLoginProps) {
  return (
    <div className="flex items-center justify-between">
      <SectionHeader
        title="Turn off user login"
        description="If enabled, users will not be required to log in to submit ideas, vote, or comment. This means you won't be able to track individual users."
      />
      <Toggle checked={enabled} onChange={onChange} />
    </div>
  );
}

import { Toggle } from '../ui/Toggle';
import { SectionHeader } from '../ui/SectionHeader';

interface ModeratePublicIdeasProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ModeratePublicIdeas({
  enabled,
  onChange,
}: ModeratePublicIdeasProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between py-4">
        <SectionHeader
          title="Moderate public ideas"
          description="If enabled, all ideas submitted by users will require admin approval before being displayed on your public board."
        />
        <Toggle checked={enabled} onChange={onChange} />
      </div>
    </div>
  );
}

import { BoostActions } from './BoostActions';

interface GetCodeButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function GetCodeButton({ onEdit, onDelete }: GetCodeButtonProps) {
  return (
    <div className="relative">
      <BoostActions onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

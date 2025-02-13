interface TagProps {
  label: string;
  onRemove?: () => void;
  active?: boolean;
  className?: string;
}

const Tag = ({ label, onRemove, active = false, className }: TagProps) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
        active ? 'bg-purple-100' : 'bg-gray-100'
      } ${className || ''}`}
    >
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-2" aria-label={`Remove tag ${label}`}>
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;

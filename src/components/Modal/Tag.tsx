interface TagProps {
  label: string;
  onRemove?: () => void;
  active?: boolean;
}

const Tag = ({ label, onRemove, active = false }: TagProps) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
        active ? 'bg-purple-100' : 'bg-gray-100'
      }`}
    >
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-2">
          ×
        </button>
      )}
    </span>
  );
};

export default Tag;

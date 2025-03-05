interface StatusBadgeProps {
  status: 'Under Review' | 'Planned' | 'Completed' | 'In Progress' | string;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Under Review':
        return 'text-red-600 bg-red-50';
      case 'Planned':
        return 'text-blue-600 bg-blue-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'In Progress':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor()} ${className || ''}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5"
        style={{ backgroundColor: 'currentColor' }}
      ></span>
      {status}
    </span>
  );
};

export default StatusBadge;

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TableHeaderProps {
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  currentSortColumn: string;
  currentSortOrder: 'asc' | 'desc';
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onSort,
  currentSortColumn,
  currentSortOrder,
}) => {
  const renderSortIcon = (columnName: string) => {
    if (currentSortColumn !== columnName) return null;
    return currentSortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-gray-500" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-500" />
    );
  };

  return (
    <thead>
      <tr className="border-b ">
        <th className="py-2 px-3 text-left text-md text-gray-700 text-sm align-middle">
          Idea Name
        </th>
        <th className="py-2 px-3 text-left text-md text-gray-700 w-32 text-sm align-middle">
          Status
        </th>
        <th className="py-2 px-3 text-left text-md text-gray-700 w-24 text-sm align-middle">
          Reach
        </th>
        <th className="py-2 px-3 text-left text-md text-gray-700 w-32 text-sm align-middle">
          Impact
        </th>
        <th className="py-2 px-3 text-left text-md text-gray-700 w-32 text-sm align-middle">
          Confidence
        </th>
        <th className="py-2 px-3 text-left text-md text-gray-700 w-24 text-sm align-middle">
          Effort
        </th>
        <th className="py-2 px-3 text-left text-md text-gray-700 w-16 text-sm align-middle">
          Score
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;

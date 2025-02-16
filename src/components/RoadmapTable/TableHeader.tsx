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
      <tr>
        <th
          className="border p-4 text-gray-900 text-base cursor-pointer hover:bg-gray-50"
          style={{ verticalAlign: 'middle' }}
          onClick={() =>
            onSort(
              'name',
              currentSortColumn === 'name'
                ? currentSortOrder === 'asc'
                  ? 'desc'
                  : 'asc'
                : 'asc'
            )
          }
        >
          <div className="flex items-center justify-between">
            <span>Idea Name</span>
            {renderSortIcon('name')}
          </div>
        </th>
        <th
          className="border p-4 text-gray-900 text-base"
          style={{ verticalAlign: 'middle' }}
        >
          Status
        </th>
        <th
          className="border p-4 text-gray-900 text-base"
          style={{ verticalAlign: 'middle' }}
        >
          Reach
        </th>
        <th
          className="border p-4 text-gray-900 text-base"
          style={{ verticalAlign: 'middle', width: '130px' }}
        >
          Impact
        </th>
        <th
          className="border p-4 text-gray-900 text-base"
          style={{ verticalAlign: 'middle', width: '160px' }}
        >
          Confidence
        </th>
        <th
          className="border p-4 text-gray-900 text-base"
          style={{ verticalAlign: 'middle' }}
        >
          Effort
        </th>
        <th
          className="border p-4 text-gray-900 text-base cursor-pointer hover:bg-gray-50"
          style={{ verticalAlign: 'middle' }}
          onClick={() =>
            onSort(
              'score',
              currentSortColumn === 'score'
                ? currentSortOrder === 'asc'
                  ? 'desc'
                  : 'asc'
                : 'asc'
            )
          }
        >
          <div className="flex items-center justify-between">
            <span>Score</span>
            {renderSortIcon('score')}
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;

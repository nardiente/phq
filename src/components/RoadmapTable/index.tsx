import { useState, useEffect } from 'react';
import { Feedback } from '../../types/feedback';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface RoadmapTableProps {
  items: Feedback[];
  onItemsChange: (item: Feedback) => void;
}

const RoadmapTable = ({ items, onItemsChange }: RoadmapTableProps) => {
  const [sortedItems, setSortedItems] = useState(items);
  const [sortColumn, setSortColumn] = useState<string>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: string, order: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortOrder(order);

    const sorted = [...items].sort((a, b) => {
      if (column === 'score') {
        return order === 'asc'
          ? (a.score || 0) - (b.score || 0)
          : (b.score || 0) - (a.score || 0);
      } else if (column === 'name') {
        return order === 'asc'
          ? (a.title ?? '').localeCompare(b.title ?? '')
          : (b.title ?? '').localeCompare(a.title ?? '');
      }
      return 0;
    });

    setSortedItems(sorted);
  };

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <TableHeader
          onSort={handleSort}
          currentSortColumn={sortColumn}
          currentSortOrder={sortOrder}
        />
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedItems.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              onItemChange={(updatedItem) => {
                onItemsChange(updatedItem);
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoadmapTable;

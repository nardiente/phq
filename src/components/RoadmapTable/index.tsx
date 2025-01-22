import { RoadmapItem } from '../../types/roadmap';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

interface RoadmapTableProps {
  items: RoadmapItem[];
  onItemsChange: (items: RoadmapItem[]) => void;
}

const RoadmapTable = ({ items, onItemsChange }: RoadmapTableProps) => {
  const handleItemChange = (updatedItem: RoadmapItem) => {
    onItemsChange(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-auto">
      <table className="min-w-full">
        <TableHeader />
        <tbody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              onItemChange={handleItemChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoadmapTable;

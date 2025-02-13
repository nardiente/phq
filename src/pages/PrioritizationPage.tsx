import { Feedback } from '../types/feedback';
import { Plus } from 'lucide-react';
import RoadmapTable from '../components/RoadmapTable';
import { usePanel } from '../contexts/PanelContext';
import { useFeedback } from '../contexts/FeedbackContext';

const PrioritizationPage = () => {
  const {
    state: { ideas },
    updateIdea,
  } = useFeedback();

  const { setIsOpen, setActivePage } = usePanel();

  const handleItemsChange = async (item: Feedback) => {
    updateIdea(item);
  };

  return (
    <div className="flex-1 px-8 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[28px] font-semibold text-gray-900">
          Prioritization
        </h1>
        <button
          onClick={() => {
            setActivePage('add_idea');
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90"
          style={{ backgroundColor: '#ff6334' }}
        >
          <Plus size={16} />
          Add New Idea
        </button>
      </div>

      <RoadmapTable items={ideas} onItemsChange={handleItemsChange} />
    </div>
  );
};

export default PrioritizationPage;

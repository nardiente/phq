import { Feedback } from '../types/feedback';
import { Plus } from 'lucide-react';
import RoadmapTable from '../components/RoadmapTable';
import { usePanel } from '../contexts/PanelContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { useEffect } from 'react';
import Button from '../components/Button';

const PrioritizationPage = () => {
  const {
    state: { ideas },
    handleListFeedback,
    updateIdea,
  } = useFeedback();

  const { setIsOpen, setActivePage } = usePanel();

  useEffect(() => {
    handleListFeedback();
  }, []);

  const handleItemsChange = async (item: Feedback) => {
    updateIdea(item);
  };

  return (
    <div className="flex-1 px-8 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[28px] font-semibold text-gray-900">
          Prioritization
        </h1>

        <Button
          onClick={() => {
            setActivePage('add_idea');
            setIsOpen(true);
          }}
        >
          <div className="flex gap-3 text-white">
            <Plus size={16} />
            Add New Idea
          </div>
        </Button>
      </div>

      <RoadmapTable items={ideas} onItemsChange={handleItemsChange} />
    </div>
  );
};

export default PrioritizationPage;

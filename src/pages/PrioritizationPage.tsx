import { Feedback } from '../types/feedback';
import { Plus } from 'lucide-react';
import RoadmapTable from '../components/RoadmapTable';
import { usePanel } from '../contexts/PanelContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { useEffect } from 'react';
import { Settings } from '../components/Settings';
import SettingsHeader from '../components/SettingsHeader';
import Button from '../components/Button';

const PrioritizationPage = () => {
  const {
    state: { ideas },
    handleListFeedback,
    updateIdea,
  } = useFeedback();

  const { setIsOpen, setActivePage } = usePanel();

  useEffect(() => {
    handleListFeedback(false);
  }, []);

  const handleItemsChange = async (item: Feedback) => {
    updateIdea(item);
  };

  return (
    <Settings>
      <SettingsHeader
        title="Prioritization"
        primaryButton={
          <Button
            text={
              <>
                <Plus size={16} />
                Add New Idea
              </>
            }
            onClick={() => {
              setActivePage('add_idea');
              setIsOpen(true);
            }}
          />
        }
      />
      <RoadmapTable items={ideas} onItemsChange={handleItemsChange} />
    </Settings>
  );
};

export default PrioritizationPage;

import { useState } from 'react';
import { IdeaFormData, RoadmapItem } from '../types/roadmap';
import { Plus } from 'lucide-react';
import RoadmapTable from '../components/RoadmapTable';
import { INITIAL_ITEMS } from '../utils/constants';
import IdeaForm from '../components/Modal/IdeaForm';
import Modal from '../components/Modal/Modal';

export default function PrioritizationPage() {
  const [items, setItems] = useState<RoadmapItem[]>([...INITIAL_ITEMS]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveIdea = (formData: IdeaFormData) => {
    const newItem: RoadmapItem = {
      id: items.length + 1,
      name: formData.name,
      status: formData.status,
      estimatedDate: formData.estimatedDate,
      reach: 0,
      impact: 3,
      confidence: '50% - Low',
      effort: 1,
      score: 0,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setIsModalOpen(false);
  };

  return (
    <>
      <main className="mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Prioritization
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:opacity-90"
            style={{ backgroundColor: '#ff6334' }}
          >
            <Plus className="w-5 h-5" />
            New Idea
          </button>
        </div>

        <RoadmapTable items={items} onItemsChange={setItems} />
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IdeaForm
          onSave={handleSaveIdea}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

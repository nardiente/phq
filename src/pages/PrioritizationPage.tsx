import React, { useState, useEffect } from 'react';
import { IdeaFormData, RoadmapItem } from '../types/roadmap';
import { Plus } from 'lucide-react';
import RoadmapTable from '../components/RoadmapTable';
import { INITIAL_ITEMS } from '../utils/constants';
import IdeaForm from '../components/Modal/IdeaForm';
import Modal from '../components/Modal/Modal';
import { usePanel } from '../contexts/PanelContext';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

const PrioritizationPage = () => {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsOpen, setActivePage } = usePanel();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/feedback');
        const ideasData = await response.json();

        // Transform ideasData into RoadmapItem[]
        const roadmapItems = ideasData.map((idea: any) => ({
          id: idea.id,
          name: idea.title || idea.name, // Handle both title and name
          status: idea.status,
          reach: idea.reach || 0,
          impact: idea.impact || 1,
          confidence: idea.confidence || '50% - Low',
          effort: idea.effort || 1,
          score: idea.score || 0,
        }));

        setItems(roadmapItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveIdea = (formData: IdeaFormData) => {
    const newItem: RoadmapItem = {
      id: Date.now().toString(),
      ...formData,
      score: 0,
    };
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  const handleItemsChange = async (newItems: RoadmapItem[]) => {
    setItems(newItems);

    // Save the updated item to the server
    try {
      const updatedItem = newItems[newItems.length - 1]; // Get the most recently updated item
      await fetch(`http://localhost:3001/feedback/${updatedItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
    } catch (error) {
      console.error('Error saving update:', error);
    }
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

      <RoadmapTable items={items} onItemsChange={handleItemsChange} />
    </div>
  );
};

export default PrioritizationPage;

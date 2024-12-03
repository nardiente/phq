import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Heading from '../components/Heading';
import Sections from '../components/Sections';
import { useBoost } from '../contexts/BoostContext';

interface CreateBoostPageProps {
  onBack: () => void;
}

export default function CreateBoostPage({ onBack }: CreateBoostPageProps) {
  const { currentBoost } = useBoost();

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24">
      <div className="max-w-[800px] mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span>Back to Widgets</span>
        </button>
        <Heading />
        <Sections 
          initialConfig={currentBoost?.config}
          onCreateBoost={onBack}
        />
      </div>
    </div>
  );
}
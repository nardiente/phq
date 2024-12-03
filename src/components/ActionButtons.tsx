import React from 'react';

interface ActionButtonsProps {
  onCancel?: () => void;
  onSave?: () => void;
}

function ActionButtons({ onCancel, onSave }: ActionButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-[800px] mx-auto px-6 py-4 flex justify-end gap-3">
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 text-[15px]"
        >
          Cancel
        </button>
        <button 
          onClick={onSave}
          className="px-4 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg text-[15px] font-medium"
        >
          Create Boost
        </button>
      </div>
    </div>
  );
}

export default ActionButtons;
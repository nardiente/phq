import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SaveSegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (name: string) => void;
  title?: string;
}

const SaveSegmentModal: React.FC<SaveSegmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title = 'Save Segment',
}) => {
  const [segmentName, setSegmentName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (segmentName.trim()) {
      if (onSave) {
        onSave(segmentName);
      }
      setSegmentName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <input
          type="text"
          placeholder="Segment Name"
          className="w-full p-2 border rounded focus:outline-none focus:border-purple-500 text-gray-700"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#ff6334] hover:bg-[#d14a23] text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveSegmentModal;

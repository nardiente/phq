import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SaveSegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (segmentName: string) => void;
  title: string;
}

const SaveSegmentModal: React.FC<SaveSegmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
}) => {
  const [segmentName, setSegmentName] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(segmentName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg p-6 w-96"
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <label htmlFor="segmentName" className="block text-sm font-medium text-gray-700">
          Segment Name
        </label>
        <input
          type="text"
          id="segmentName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 text-gray-700"
          placeholder="Enter segment name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveSegmentModal; 
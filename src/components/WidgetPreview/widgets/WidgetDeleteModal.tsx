import React from 'react';
import { X } from 'lucide-react';

interface WidgetDeleteModalProps {
  isOpen: boolean;
  widgetName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const WidgetDeleteModal: React.FC<WidgetDeleteModalProps> = ({
  isOpen,
  widgetName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="pt-2">
          <h2 className="text-xl font-semibold">Delete Widget</h2>

          <p className="text-gray-600 mt-4 mb-4">
            Are you sure you want to delete "{widgetName}"? This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetDeleteModal; 
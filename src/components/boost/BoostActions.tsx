import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DeleteBoostModal } from './DeleteBoostModal';

interface BoostActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function BoostActions({ onEdit, onDelete }: BoostActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDropdown(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete();
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
      >
        <MoreHorizontal size={20} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={() => {
              setShowDropdown(false);
              onEdit();
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
          >
            Delete
          </button>
        </div>
      )}

      {showDeleteModal && (
        <DeleteBoostModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
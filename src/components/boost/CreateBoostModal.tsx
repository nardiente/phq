import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateBoostModalProps {
  onClose: () => void;
  onSave: (name: string) => void;
}

export function CreateBoostModal({ onClose, onSave }: CreateBoostModalProps) {
  const [boostName, setBoostName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (boostName.trim()) {
      onSave(boostName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Create new What's New widget
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <input
              type="text"
              value={boostName}
              onChange={(e) => setBoostName(e.target.value)}
              placeholder="New widget name, e.g. Product Updates"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-100"
              autoFocus
            />
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg disabled:opacity-50"
              disabled={!boostName.trim()}
            >
              Create Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

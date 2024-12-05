import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DeleteBoostModal } from '../components/boost/DeleteBoostModal';
import { GetCodeModal } from '../components/boost/GetCodeModal';
import { GetCodeButton } from '../components/boost/GetCodeButton';
import { useBoost } from '../contexts/BoostContext';

interface BoostPageProps {
  onNavigate?: () => void;
}

function BoostPage({ onNavigate }: BoostPageProps) {
  const { boosts, deleteBoost, setCurrentBoost, updateBoost } = useBoost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGetCodeModal, setShowGetCodeModal] = useState(false);
  const [boostToDelete, setBoostToDelete] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const handleEdit = (boostId: string) => {
    const boostToEdit = boosts.find((b) => b.id === boostId);
    if (boostToEdit) {
      setCurrentBoost(boostToEdit);
      onNavigate?.();
    }
  };

  const handleDelete = (boostId: string) => {
    setBoostToDelete(boostId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (boostToDelete) {
      deleteBoost(boostToDelete);
      setShowDeleteModal(false);
      setBoostToDelete(null);
    }
  };

  const handleCreateNew = () => {
    setCurrentBoost(null);
    onNavigate?.();
  };

  const startEditing = (boostId: string, currentName: string) => {
    setEditingName(boostId);
    setEditingValue(currentName);
  };

  const handleNameChange = (boostId: string) => {
    if (editingValue.trim()) {
      updateBoost(boostId, { name: editingValue });
    }
    setEditingName(null);
    setEditingValue('');
  };

  return (
    <div className="flex-1 px-8 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-semibold text-gray-900 mb-1">
            What's New Widgets
          </h1>
          <p className="text-[14px] text-gray-600">
            Create a What's New widget to get more eyeballs on your posts.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 h-[35px] w-[122px] justify-center bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg"
        >
          <Plus size={16} />
          <span className="text-[14px]">Create New</span>
        </button>
      </div>

      {boosts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ marginTop: '200px' }}
        >
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <span className="text-gray-400 text-2xl">😕</span>
          </div>
          <h2 className="text-[16px] font-medium text-gray-700 mb-2">
            You don't have any What's New widgets created yet.
          </h2>
          <p className="text-[14px] text-gray-500">
            Now is a great time to add your first widget!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-3 px-4 text-[14px] font-medium text-gray-500">
              <div>Name</div>
              <div>Last Updated</div>
            </div>
            {boosts.map((boost) => (
              <div
                key={boost.id}
                className="grid grid-cols-2 gap-4 py-3 px-4 bg-white rounded-lg border border-gray-200 items-center"
              >
                <div className="text-[14px] text-gray-900">
                  {editingName === boost.id ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={() => handleNameChange(boost.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleNameChange(boost.id);
                        }
                      }}
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-100"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => startEditing(boost.id, boost.name)}
                      className="cursor-pointer hover:text-gray-600"
                    >
                      {boost.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-gray-600">
                    {boost.lastUpdated}
                  </span>
                  <GetCodeButton
                    onEdit={() => handleEdit(boost.id)}
                    onDelete={() => handleDelete(boost.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowGetCodeModal(true)}
              className="h-[35px] px-4 bg-[#6D28D9] text-white text-[14px] rounded-lg hover:bg-[#5B21B6]"
            >
              Get Code
            </button>
          </div>
        </>
      )}

      {showDeleteModal && (
        <DeleteBoostModal
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showGetCodeModal && (
        <GetCodeModal onClose={() => setShowGetCodeModal(false)} />
      )}
    </div>
  );
}

export default BoostPage;

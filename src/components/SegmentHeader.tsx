import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Trash2, ChevronUp } from 'lucide-react';
import SaveSegmentModal from './SaveSegmentModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Segment } from '../types/segment';

interface SegmentHeaderProps {
  onSaveSegment: (name: string) => void;
  onUpdateSegment?: (id: number, name: string) => void;
  onSaveAsNewSegment?: (name: string) => void;
  savedSegments?: Segment[];
  onSelectSegment?: (segment: Segment) => void;
  onDeleteSegment?: (id: number) => void;
  onSearch: (term: string) => void;
  currentSegment?: Partial<Segment> | null;
  hasUnsavedFilters?: boolean;
}

const SegmentHeader = ({
  onSaveSegment,
  onUpdateSegment,
  onSaveAsNewSegment,
  savedSegments = [],
  onSelectSegment,
  onDeleteSegment,
  onSearch,
  currentSegment,
  hasUnsavedFilters,
}: SegmentHeaderProps) => {
  const segmentDropdownRef = useRef<HTMLDivElement>(null);
  const saveOptionsDropdownRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [saveOptionsVisible, setSaveOptionsVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: number;
    segmentName: string;
  }>({
    isOpen: false,
    id: 0,
    segmentName: '',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        segmentDropdownRef.current &&
        !segmentDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        saveOptionsDropdownRef.current &&
        !saveOptionsDropdownRef.current.contains(event.target as Node)
      ) {
        setSaveOptionsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteClick = (segment: Segment, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModal({
      isOpen: true,
      id: segment.id,
      segmentName: segment.name,
    });
  };

  const renderSaveButton = () => {
    // Show save options only when we have a current segment AND unsaved changes
    if (currentSegment && hasUnsavedFilters) {
      return (
        <>
          <button
            type="button"
            onClick={() => setSaveOptionsVisible(!saveOptionsVisible)}
            className="bg-[#ff6334] hover:bg-[#d14a23] text-white font-bold py-2 px-4 rounded whitespace-nowrap flex items-center"
          >
            Save Changes
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          {saveOptionsVisible && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-50">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => {
                  if (
                    onUpdateSegment &&
                    currentSegment.id &&
                    currentSegment.name
                  ) {
                    onUpdateSegment(currentSegment.id, currentSegment.name);
                  }
                  setSaveOptionsVisible(false);
                }}
              >
                Save Changes
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => {
                  setIsModalOpen(true);
                  setSaveOptionsVisible(false);
                }}
              >
                Save as New Segment
              </button>
            </div>
          )}
        </>
      );
    }

    // Default save button for new segments or unmodified saved segments
    return (
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="bg-[#ff6334] hover:bg-[#d14a23] text-white font-bold py-2 px-4 rounded whitespace-nowrap"
      >
        Save Segment
      </button>
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-between items-center p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Segments</h1>

        <div
          className="relative border border-gray-300 rounded"
          ref={segmentDropdownRef}
        >
          <button
            className="px-4 py-2 bg-white border rounded flex items-center justify-between min-w-[300px]"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-gray-700">
              {currentSegment ? currentSegment.name : 'Saved Segments'}
            </span>
            {isDropdownOpen ? (
              <ChevronUp className="h-4 w-4 ml-2 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-[300px] mt-1 bg-white border rounded-md shadow-lg overflow-hidden z-50">
              {savedSegments.map((segment) => (
                <div
                  key={segment.id}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    onSelectSegment?.(segment);
                    setIsDropdownOpen(false);
                  }}
                >
                  <div className="flex-grow text-left text-gray-700">
                    {segment.name}
                  </div>
                  <button
                    onClick={(e) => handleDeleteClick(segment, e)}
                    className="text-gray-400 hover:text-red-500 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {savedSegments.length === 0 && (
                <div className="px-4 py-2 text-gray-500">No saved segments</div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={saveOptionsDropdownRef}>
          {renderSaveButton()}
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="pl-3 pr-10 py-2 border rounded w-[300px] focus:outline-none focus:border-purple-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      <SaveSegmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={
          currentSegment && !hasUnsavedFilters
            ? onSaveAsNewSegment
            : onSaveSegment
        }
        title={
          currentSegment && !hasUnsavedFilters
            ? 'Save as New Segment'
            : 'Save Segment'
        }
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        itemName={deleteModal.segmentName}
        onClose={() => setDeleteModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={() => {
          onDeleteSegment?.(deleteModal.id);
          setDeleteModal((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </div>
  );
};

export default SegmentHeader;

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { UnsavedChangesModal } from './UnsavedChangesModal';
import { useUnsavedChanges } from '../contexts/UnsavedChangesContext';

interface SectionProps {
  number: number;
  title: string;
  subtitle?: string;
  details?: React.ReactNode;
  settings?: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  hasInternalButtons?: boolean;
  cursor?: string;
}

function Section({
  number,
  title,
  subtitle,
  details,
  settings,
  isExpanded,
  onToggle,
  onSave,
  onCancel,
  hasInternalButtons = false,
  cursor = 'cursor-pointer',
}: SectionProps) {
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const { hasUnsavedChanges, setHasUnsavedChanges } = useUnsavedChanges();

  const handleToggle = () => {
    if (isExpanded && hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      onToggle();
    }
  };

  const handleConfirmClose = () => {
    setHasUnsavedChanges(false);
    setShowUnsavedModal(false);
    onToggle();
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${cursor}`}>
      <div className="px-6 py-4" onClick={handleToggle}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-[#00C266] flex items-center justify-center text-white text-sm font-medium">
                {number}
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-medium text-[#1A1942]">
                  {title}
                </h2>
                {subtitle && (
                  <>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <p className="text-sm text-gray-500">{subtitle}</p>
                  </>
                )}
              </div>
            </div>
            {settings && <div className="mt-2 ml-10">{settings}</div>}
          </div>
          <ChevronDown
            className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ${
              isExpanded ? 'transform rotate-180' : ''
            }`}
            size={20}
          />
        </div>
      </div>
      {isExpanded && details && (
        <>
          <div className="px-6 pb-4 pt-2 border-t border-gray-100">
            {details}
          </div>
          {!hasInternalButtons && (onSave || onCancel) && (
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              {onCancel && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
                >
                  Cancel
                </button>
              )}
              {onSave && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave();
                  }}
                  className="px-4 py-2 bg-[#FF5C35] hover:bg-[#ff4a1a] text-white rounded-lg"
                >
                  Save
                </button>
              )}
            </div>
          )}
        </>
      )}

      {showUnsavedModal && (
        <UnsavedChangesModal
          onConfirm={handleConfirmClose}
          onCancel={() => setShowUnsavedModal(false)}
        />
      )}
    </div>
  );
}

export default Section;

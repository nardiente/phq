import React from 'react';
import { WidgetConfig } from '../../types/widget';

interface WidgetContentProps {
  config: WidgetConfig;
}

// Shared mock data
export const mockIdeas = [
  {
    votes: 5,
    title: '[Start here] Welcome to ProductHQ 🚀',
    description:
      'Welcome to ProductHQ, your new Feedback, Roadmap and Announcements tool. Read through a few of these...',
    author: 'Tres@P',
    date: '14 Mar, 2024',
    status: 'In Review',
  },
  // ... rest of the ideas array
];

export const WidgetContent: React.FC<WidgetContentProps> = ({ config }) => {
  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div
        className="p-4 border-b border-gray-200"
        style={{
          backgroundColor: config.appearance.backgroundColor || '#f9fafb',
          color:
            config.appearance.textColor === 'Light' ? '#ffffff' : '#111827',
        }}
      >
        {/* Header content */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {config.appearance.showCompanyLogo && (
              <div className="w-8 h-8 bg-[#FF6334] rounded-md flex items-center justify-center text-white font-medium">
                M
              </div>
            )}
            <span
              className={
                config.appearance.textColor === 'Light'
                  ? 'text-white'
                  : 'text-gray-900'
              }
            >
              {config.appearance.title || 'Widget Title'}
            </span>
          </div>
        </div>
        <p
          className={
            config.appearance.textColor === 'Light'
              ? 'text-white'
              : 'text-gray-900'
          }
        >
          {config.appearance.description || 'Widget Description'}
        </p>
      </div>

      {/* Widget Interface */}
      <WidgetInterface config={config} />
    </div>
  );
};

// Separate component for the main interface
const WidgetInterface: React.FC<WidgetContentProps> = ({ config }) => {
  return (
    <>
      {/* Tabs */}
      <WidgetTabs config={config} />

      {/* Content */}
      {config.sections?.ideas !== false && <IdeasContent />}
    </>
  );
};

// Separate components for each section
const WidgetTabs = ({ config }: WidgetContentProps) => (
  <div className="border-b border-gray-200">
    <div className="flex">
      {config.sections?.ideas !== false && (
        <button className="px-4 py-2 text-[#FF6334] border-b-2 border-[#FF6334] font-medium">
          Ideas
        </button>
      )}
      {config.sections?.roadmap !== false && (
        <button className="px-4 py-2 text-gray-600">Roadmap</button>
      )}
      {config.sections?.announcements !== false && (
        <button className="px-4 py-2 text-gray-600">What's New</button>
      )}
    </div>
  </div>
);

const IdeasContent = () => (
  <div className="flex-1 overflow-auto">
    <div className="p-4">
      <IdeasHeader />
      <IdeasList />
    </div>
  </div>
);

// Add these new components
const IdeasHeader = () => (
  <div className="flex justify-between items-center mb-4">
    <div className="relative">
      <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />
        </svg>
        Trending
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
    <button className="px-4 py-2 bg-[#FF6334] text-white rounded-md font-medium">
      + Add an Idea
    </button>
  </div>
);

const IdeasList = () => (
  <div className="space-y-4">
    {mockIdeas.map((idea, index) => (
      <div key={index} className="flex gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xl">
          {idea.votes}
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{idea.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{idea.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{idea.author}</span>
            <span>{idea.date}</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
              {idea.status}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ... other component definitions

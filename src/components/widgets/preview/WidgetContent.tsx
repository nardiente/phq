import React from 'react';
import { WidgetConfig } from '../../types/widget';
import { UI_TEXT } from '../../constants/uiText';
import { getSectionVisibility, getBackgroundColor, getTextColor } from '../../utils/configHelpers';
import { mockIdeas } from '../../data/mockData';

interface WidgetContentProps {
  config: WidgetConfig;
}

// Shared mock data
export const WidgetContent = ({ config }: WidgetContentProps) => {
  // Validate required props
  if (!config) {
    console.warn('WidgetContent: Missing required config');
    return null;
  }

  // Validate required config properties
  if (!config.sections) {
    console.warn('WidgetContent: Missing sections configuration');
    return null;
  }

  const handleError = (error: Error) => {
    console.error('Error in WidgetContent:', error);
    // Could add error boundary or fallback UI here
  };

  try {
    return (
      <div className="widget-content">
        <header 
          className="p-4"
          style={{ backgroundColor: getBackgroundColor(config) }}
        >
          <h1 className={getTextColor(config)}>
            {config.appearance.title || UI_TEXT.WIDGET_HEADERS.DEFAULT_TITLE}
          </h1>
          <p className={getTextColor(config)}>
            {config.appearance.description || UI_TEXT.WIDGET_HEADERS.DEFAULT_DESCRIPTION}
          </p>
        </header>
        <WidgetInterface config={config} />
      </div>
    );
  } catch (error) {
    handleError(error as Error);
    return null;
  }
};

// Separate component for the main interface
const WidgetInterface: React.FC<WidgetContentProps> = ({ config }) => {
  return (
    <>
      {/* Tabs */}
      <WidgetTabs config={config} />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Only show Ideas section for now since it's fully implemented */}
          {config.sections?.ideas && (
            <div className="ideas-section">
              <IdeasHeader />
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Separate components for each section
const WidgetTabs = ({ config }: WidgetContentProps) => (
  <div className="border-b border-gray-200">
    <div className="flex">
      {getSectionVisibility(config, 'ideas') && (
        <button className="px-4 py-2 text-[#FF6334] border-b-2 border-[#FF6334] font-medium">
          {UI_TEXT.WIDGET_SECTIONS.IDEAS}
        </button>
      )}
      {getSectionVisibility(config, 'roadmap') && (
        <button className="px-4 py-2 text-gray-600">
          {UI_TEXT.WIDGET_SECTIONS.ROADMAP}
        </button>
      )}
      {getSectionVisibility(config, 'announcements') && (
        <button className="px-4 py-2 text-gray-600">
          {UI_TEXT.WIDGET_SECTIONS.WHATS_NEW}
        </button>
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

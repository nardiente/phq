import React, { useState } from 'react';
import { WidgetConfig } from '../../types/widget';
import { PopoverWidget } from './widgets/PopoverWidget';
import { ModalWidget } from './widgets/ModalWidget';
import { SidebarWidget } from './widgets/SidebarWidget';
import { TabLauncher } from './TabLauncher';
import { FloatingLauncher } from './FloatingLauncher';
import { ErrorBoundary } from '../ErrorBoundary';

interface WidgetPreviewProps {
  config: WidgetConfig;
  isConfiguring: boolean;
  activeSection?: string;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  config,
  isConfiguring,
  activeSection,
}) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  // Add the complete ideas data from PopoverWidget
  const ideas = [
    {
      votes: 5,
      title: '[Start here] Welcome to ProductHQ 🚀',
      description:
        'Welcome to ProductHQ, your new Feedback, Roadmap and Announcements tool. Read through a few of these...',
      author: 'Tres@P',
      date: '14 Mar, 2024',
      status: 'In Review',
    },
    {
      votes: 12,
      title: 'Custom voting system for feature requests',
      description:
        'Allow admins to customize the voting mechanism - weighted votes, vote limits, or karma-based voting.',
      author: 'Sarah@P',
      date: '13 Mar, 2024',
      status: 'Planned',
    },
    {
      votes: 8,
      title: 'AI-powered feature prioritization',
      description:
        'Use machine learning to analyze user votes, comments, and engagement to suggest which features to build next.',
      author: 'Alex@P',
      date: '12 Mar, 2024',
      status: 'Under Review',
    },
    {
      votes: 15,
      title: 'Integration with project management tools',
      description:
        'Add native integration with Jira, Linear, and other PM tools to sync feature status automatically.',
      author: 'Kim@P',
      date: '11 Mar, 2024',
      status: 'In Progress',
    },
    {
      votes: 6,
      title: 'Custom branded feedback widgets',
      description:
        'Allow companies to fully customize the widget appearance to match their brand identity.',
      author: 'Jordan@P',
      date: '10 Mar, 2024',
      status: 'Planned',
    },
    {
      votes: 9,
      title: 'Advanced user segmentation',
      description:
        'Target feedback widgets to specific user segments based on behavior, demographics, or custom attributes.',
      author: 'Pat@P',
      date: '9 Mar, 2024',
      status: 'In Review',
    },
    {
      votes: 7,
      title: 'Feedback analytics dashboard',
      description:
        'Provide detailed analytics on user engagement, popular feature requests, and feedback trends over time.',
      author: 'Chris@P',
      date: '8 Mar, 2024',
      status: 'Under Review',
    },
    {
      votes: 11,
      title: 'Public roadmap embedding',
      description:
        'Allow companies to embed their public roadmap directly on their website or documentation.',
      author: 'Morgan@P',
      date: '7 Mar, 2024',
      status: 'Planned',
    },
  ];

  const renderWidget = () => {
    const overflowClass = config.preventScroll
      ? 'overflow-hidden'
      : 'overflow-y-auto';

    switch (config.widgetType) {
      case 'Popover':
        return <PopoverWidget config={config} overflowClass={overflowClass} />;
      case 'Modal':
        return <ModalWidget config={config} overflowClass={overflowClass} />;
      case 'Sidebar':
        return <SidebarWidget config={config} overflowClass={overflowClass} />;
      case 'Embed':
        return (
          <div className="w-full h-full bg-white">
            <div className={`bg-white ${overflowClass}`}>
              {/* Header */}
              <div
                className="p-4 border-b border-gray-200"
                style={{
                  backgroundColor:
                    config.appearance.backgroundColor || '#f9fafb',
                  color:
                    config.appearance.textColor === 'Light'
                      ? '#ffffff'
                      : '#111827',
                }}
              >
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

              {/* Tabs */}
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
                    <button className="px-4 py-2 text-gray-600">
                      What's New
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              {config.sections?.ideas !== false && (
                <div className="flex-1 overflow-auto">
                  <div className="p-4">
                    {/* Filter and Add Idea buttons */}
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

                    {/* Ideas List */}
                    <div className="space-y-4">
                      {ideas.map((idea, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xl">
                            {idea.votes}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{idea.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {idea.description}
                            </p>
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
                </div>
              )}
            </div>
          </div>
        );
      default:
        console.warn(`Unknown widget type: ${config.widgetType}`);
        return null;
    }
  };

  const renderLauncher = () => {
    if (config.widgetType === 'Embed') return null;

    return config.launcherType === 'Tab' ? (
      <TabLauncher
        config={config}
        onClick={() => setIsWidgetOpen(!isWidgetOpen)}
      />
    ) : (
      <FloatingLauncher
        config={config}
        onClick={() => setIsWidgetOpen(!isWidgetOpen)}
      />
    );
  };

  // When in launcher section, show launcher and widget when clicked
  if (activeSection === 'launcher') {
    return (
      <div className="relative h-full bg-gray-100">
        {/* Widget rendered first so launcher stays on top */}
        {isWidgetOpen && (
          <div className="absolute inset-0">{renderWidget()}</div>
        )}
        {/* Launcher always visible */}
        {renderLauncher()}
      </div>
    );
  }

  // When configuring and not in launcher section, show the widget directly
  if (isConfiguring) {
    return renderWidget();
  }

  // When not configuring, show launcher with optional widget
  return (
    <ErrorBoundary>
      <div className="relative h-full bg-gray-100">
        {isWidgetOpen && (
          <div className="absolute inset-0">{renderWidget()}</div>
        )}
        {renderLauncher()}
      </div>
    </ErrorBoundary>
  );
};

export { WidgetPreview };

import React from 'react';
import { WidgetConfig } from '../../../types/widget';

interface SidebarWidgetProps {
  config: WidgetConfig;
  overflowClass: string;
}

export const SidebarWidget: React.FC<SidebarWidgetProps> = ({ config, overflowClass }) => {
  const { appearance } = config;
  const positionClass = appearance.position === 'Left' ? 'left-0 border-r' : 'right-0 border-l';

  // Add width validation helper
  const getValidWidth = (width: string) => {
    const num = parseInt(width?.replace(/[^\d]/g, '') || '450');
    if (num >= 300 && num <= 800) {
      return `${num}px`;
    }
    const currentNum = parseInt(appearance.width?.replace(/[^\d]/g, '') || '450');
    if (currentNum >= 300 && currentNum <= 800) {
      return `${currentNum}px`;
    }
    return '450px';
  };

  const ideas = [
    {
      votes: 5,
      title: '[Start here] Welcome to ProductHQ 🚀',
      description: 'Welcome to ProductHQ, your new Feedback, Roadmap and Announcements tool. Read through a few of these...',
      author: 'Tres@P',
      date: '14 Mar, 2024',
      status: 'In Review'
    },
    {
      votes: 12,
      title: 'Custom voting system for feature requests',
      description: 'Allow admins to customize the voting mechanism - weighted votes, vote limits, or karma-based voting.',
      author: 'Sarah@P',
      date: '13 Mar, 2024',
      status: 'Planned'
    },
    {
      votes: 8,
      title: 'AI-powered feature prioritization',
      description: 'Use machine learning to analyze user votes, comments, and engagement to suggest which features to build next.',
      author: 'Alex@P',
      date: '12 Mar, 2024',
      status: 'Under Review'
    },
    {
      votes: 15,
      title: 'Integration with project management tools',
      description: 'Add native integration with Jira, Linear, and other PM tools to sync feature status automatically.',
      author: 'Kim@P',
      date: '11 Mar, 2024',
      status: 'In Progress'
    },
    {
      votes: 6,
      title: 'Custom branded feedback widgets',
      description: 'Allow companies to fully customize the widget appearance to match their brand identity.',
      author: 'Jordan@P',
      date: '10 Mar, 2024',
      status: 'Planned'
    },
    {
      votes: 9,
      title: 'Advanced user segmentation',
      description: 'Target feedback widgets to specific user segments based on behavior, demographics, or custom attributes.',
      author: 'Pat@P',
      date: '9 Mar, 2024',
      status: 'In Review'
    },
    {
      votes: 7,
      title: 'Feedback analytics dashboard',
      description: 'Provide detailed analytics on user engagement, popular feature requests, and feedback trends over time.',
      author: 'Chris@P',
      date: '8 Mar, 2024',
      status: 'Under Review'
    },
    {
      votes: 11,
      title: 'Public roadmap embedding',
      description: 'Allow companies to embed their public roadmap directly on their website or documentation.',
      author: 'Morgan@P',
      date: '7 Mar, 2024',
      status: 'Planned'
    }
  ];

  return (
    <div className="absolute inset-0">
      <div 
        className={`absolute top-0 bottom-0 bg-white border-gray-200 ${positionClass} ${overflowClass}`}
        style={{ width: getValidWidth(appearance.width || '450px') }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF6334] rounded-md flex items-center justify-center text-white font-medium">
                M
              </div>
              <span className="text-gray-900 font-medium">{appearance.title || 'Widget Title'}</span>
            </div>
            {!config.hideCloseButton && (
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-gray-600 text-sm">{appearance.description || 'Widget Description'}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button className="px-4 py-2 text-[#FF6334] border-b-2 border-[#FF6334] font-medium">Ideas</button>
            <button className="px-4 py-2 text-gray-600">Roadmap</button>
            <button className="px-4 py-2 text-gray-600">Announcements</button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18" />
                  </svg>
                  Trending
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <p className="text-gray-600 text-sm mb-2">{idea.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{idea.author}</span>
                      <span>{idea.date}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{idea.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
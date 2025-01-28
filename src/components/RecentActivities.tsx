import React, { useState } from 'react';
import {
  DollarSign,
  ThumbsUp,
  MessageSquare,
  ArrowUp,
  Trash2,
  Share2,
} from 'lucide-react';

interface Activity {
  type: 'subscription' | 'vote' | 'interaction' | 'create' | 'delete' | 'share';
  title: string;
  date: string;
}

const RecentActivities: React.FC = () => {
  const [filterType, setFilterType] = useState('All');

  const activities: Activity[] = [
    {
      type: 'subscription',
      title: 'Subscribed to Growth $199',
      date: 'May 28, 2023',
    },
    {
      type: 'vote',
      title: 'Voted on an Idea',
      date: 'May 28, 2023',
    },
    {
      type: 'interaction',
      title: 'Interaction - clicked smiley emoji on post.',
      date: 'May 28, 2023',
    },
    {
      type: 'create',
      title: 'Created an Idea',
      date: 'May 28, 2023',
    },
    {
      type: 'delete',
      title: 'Deleted an Idea',
      date: 'May 28, 2023',
    },
    {
      type: 'interaction',
      title: 'Interaction - shared a post.',
      date: 'May 28, 2023',
    },
    {
      type: 'delete',
      title: 'Deleted an Idea',
      date: 'May 28, 2023',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return <DollarSign className="w-5 h-5" />;
      case 'vote':
        return <ThumbsUp className="w-5 h-5" />;
      case 'interaction':
        return <MessageSquare className="w-5 h-5" />;
      case 'create':
        return <ArrowUp className="w-5 h-5" />;
      case 'delete':
        return <Trash2 className="w-5 h-5" />;
      case 'share':
        return <Share2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-8 mb-12">
        <div>
          <p className="text-sm text-gray-600 mb-1">Signup Date</p>
          <p className="text-lg font-medium">May 28, 2023</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">MRR Value</p>
          <p className="text-lg font-medium">$105.55</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Total Lifetime Value</p>
          <p className="text-lg font-medium">$328.85</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">Last Seen</p>
          <p className="text-lg font-medium">6 days ago</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent activities</h2>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>All</option>
              <option>Ideas created</option>
              <option>Ideas voted on</option>
              <option>Deleted ideas</option>
              <option>Interactions</option>
              <option>Charges</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getIcon(activity.type)}
              </div>
              <div>
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;

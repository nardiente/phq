import {
  LineChart,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Calendar,
} from 'lucide-react';
import { BoardBanner } from '../components/dashboard/BoardBanner';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [segments, setSegments] = useState([]);
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [whatsNewFilter, setWhatsNewFilter] = useState('all'); // Default filter
  const [ideasFilter, setIdeasFilter] = useState('all'); // Default filter for Ideas
  const [usersFilter, setUsersFilter] = useState('all'); // Default filter for Users
  const [timeRange, setTimeRange] = useState('1 week');

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const segmentsResponse = await fetch('http://localhost:3001/segments');
        const segmentsData = await segmentsResponse.json();
        setSegments(segmentsData);

        const usersResponse = await fetch('http://localhost:3001/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // Fetch ideas from the same endpoint as UpvotesPage
        const ideasResponse = await fetch('http://localhost:3001/feedback');
        const ideasData = await ideasResponse.json();
        setIdeas(ideasData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterUsersBySegment = (segment) => {
    return users.filter((user) => {
      if (!segment.filters || typeof segment.filters !== 'object') {
        return false; // Skip this segment if filters is not an object
      }
      return Object.keys(segment.filters).every((attribute) => {
        const filter = segment.filters[attribute];
        const value = user[attribute];

        switch (filter.operator) {
          case 'equals':
            return String(value) === String(filter.filterValue);
          case 'contains':
            return String(value)
              .toLowerCase()
              .includes(String(filter.filterValue).toLowerCase());
          case 'starts with':
            return String(value)
              .toLowerCase()
              .startsWith(String(filter.filterValue).toLowerCase());
          case 'ends with':
            return String(value)
              .toLowerCase()
              .endsWith(String(filter.filterValue).toLowerCase());
          case 'is greater than':
            return Number(value) > Number(filter.filterValue);
          case 'is less than':
            return String(value) < String(filter.filterValue);
          case 'is empty':
            return !value;
          case 'is not empty':
            return !!value;
          default:
            return true;
        }
      });
    });
  };

  const stats = [
    { label: 'Total Users', value: '1,200', change: '12%', trend: 'up' },
    { label: 'Active Users (MAU)', value: '800', change: '-5%', trend: 'down' },
    { label: 'New Users', value: '120', change: '10%', trend: 'up' },
    { label: 'Churn Rate', value: '5%', change: '2%', trend: 'down' },
    {
      label: 'Customer Lifetime Value (CLTV)',
      value: '$500',
      change: '3%',
      trend: 'up',
    },
    { label: 'Total Revenue', value: '$5,000', change: '-8%', trend: 'down' },
    { label: 'Conversion Rate', value: '8%', change: '10%', trend: 'up' },
  ];

  const recentIdeas = [
    { title: '[Example Idea] More colour options', votes: 1, date: '9 Oct' },
    {
      title: '[Example Idea] Pabbly Connect Integration',
      votes: 0,
      date: '9 Oct',
    },
    { title: '[Read Me] Change your Topics', votes: 0, date: '9 Oct' },
    { title: '[Example Idea] Custom Domains', votes: 0, date: '9 Oct' },
    {
      title: "[Read Me] We've created a few example ideas for you",
      votes: 1,
      date: '9 Oct',
    },
  ];

  const ideaStatusCounts = ideas.reduce((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {});

  const sortedIdeas = [...ideas]
    .sort((a, b) => {
      switch (whatsNewFilter) {
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'ctr':
          return (b.ctr || 0) - (a.ctr || 0);
        case 'comments':
          return (b.commentCount || 0) - (a.commentCount || 0);
        case 'reactions':
          return (b.reactions || 0) - (a.reactions || 0);
        default:
          return (b.votes || 0) - (a.votes || 0); // Default to votes
      }
    })
    .slice(0, 3);

  // Sort ideas by votes
  const mostVotedIdeas = [...ideas]
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 3);

  const filteredIdeas = ideas.filter((idea) => {
    switch (ideasFilter) {
      case 'active':
        return idea.status === 'Active'; // Assuming you have a status property
      case 'shipped':
        return idea.status === 'Shipped'; // Assuming you have a status property
      case 'votes':
        return [...ideas].sort((a, b) => (b.votes || 0) - (a.votes || 0));
      default:
        return true; // All
    }
  });

  const filteredCommentedIdeas = ideas.filter((idea) => {
    switch (usersFilter) {
      case 'recentComments':
        return idea.commentCount > 0;
      default:
        return true;
    }
  });

  return (
    <div className="flex-1 px-8 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[28px] font-semibold text-gray-900">Dashboard</h1>
      </div>

      <BoardBanner />

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
        User Segmentation
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {segments.map((segment, index) => {
          const usersInSegment = filterUsersBySegment(segment);

          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="text-sm font-medium text-gray-500 mb-1">
                {segment.name}
              </div>
              <div className="text-2xl font-semibold text-gray-800">
                {usersInSegment.length} Users
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm text-gray-600 border border-gray-200 rounded-lg px-2 py-1 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="1 week">1 week</option>
            <option value="4 week">4 week</option>
            <option value="MTD">MTD</option>
            <option value="QTD">QTD</option>
            <option value="YTD">YTD</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="text-sm font-medium text-gray-500 mb-1">
              {stat.label}
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </div>
              <div
                className={`ml-2 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
              >
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Ideas</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Upvotes
          </div>
          {mostVotedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Comments
          </div>
          {sortedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Ideas Shipped
          </div>
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Oldest Ideas
          </div>
          {filteredCommentedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        What's New
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Viewed
          </div>
          {mostVotedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Clicks
          </div>
          {sortedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Reactions
          </div>
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Shared
          </div>
          {filteredCommentedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Users</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Upvotes
          </div>
          {mostVotedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Comments
          </div>
          {sortedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Ideas
          </div>
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Team Member Activity
          </div>
          {filteredCommentedIdeas.map((idea) => (
            <div key={idea.id} className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-500">
                {idea.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

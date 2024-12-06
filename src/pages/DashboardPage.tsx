import { LineChart, RefreshCw } from 'lucide-react';
import { BoardBanner } from '../components/dashboard/BoardBanner';
import { ComingSoonLayout } from '../components/ComingSoonLayout';

export default function DashboardPage() {
  const stats = [
    { label: 'Ideas', value: '0', change: '0%' },
    { label: 'Votes', value: '0', change: '0%' },
    { label: 'Tracked users', value: '0', change: '0%' },
    { label: 'Ideas shipped', value: '0', change: '0%' },
    { label: 'Ideas added to Roadmap', value: '0', change: '0%' },
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

  return (
    <ComingSoonLayout>
      <div className="flex-1 px-8 py-6">
        <div className="max-w-[1200px]">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[28px] font-semibold text-gray-900">
              Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                <option>MTD</option>
              </select>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <BoardBanner />

          <div className="grid grid-cols-5 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Total Active Ideas
                </h2>
                <div className="text-2xl font-semibold text-gray-900">8</div>
              </div>
              <div className="h-[200px] flex items-center justify-center border-b border-gray-100 mb-4">
                <LineChart size={24} className="text-gray-300" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className="text-sm text-gray-400">{stat.change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Ideas
                </h2>
                <div className="space-y-4">
                  {recentIdeas.map((idea, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="text-sm text-gray-900">{idea.title}</div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          {idea.votes}
                        </span>
                        <span className="text-sm text-gray-400">
                          {idea.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Comments
                </h2>
                <div className="text-sm text-gray-500 text-center py-8">
                  Your team hasn't had any comments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComingSoonLayout>
  );
}

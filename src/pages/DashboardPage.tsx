import { BoardBanner } from '../components/dashboard/BoardBanner';
import { useEffect, useState } from 'react';
import { useFeedback } from '../contexts/FeedbackContext';
import { KeyMetrics } from '../components/dashboard/KeyMetrics';
import { IdeasSection } from '../components/dashboard/IdeasSection';
import { WhatsNewSection } from '../components/dashboard/WhatsNewSection';

export default function DashboardPage() {
  const {
    state: { ideas },
    handleListFeedback,
  } = useFeedback();

  const [whatsNewFilter, setWhatsNewFilter] = useState('all'); // Default filter
  const [ideasFilter, setIdeasFilter] = useState('all'); // Default filter for Ideas
  const [usersFilter, setUsersFilter] = useState('all'); // Default filter for Users

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        // Fetch ideas from the same endpoint as UpvotesPage
        await handleListFeedback(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    setWhatsNewFilter('all');
    setIdeasFilter('all');
    setUsersFilter('all');
  }, []);

  // const filterUsersBySegment = (segment: Segment) => {
  //   return users.filter((user) => {
  //     if (!segment.filters || typeof segment.filters !== 'object') {
  //       return false; // Skip this segment if filters is not an object
  //     }
  //     return Object.keys(segment.filters).every((attribute) => {
  //       const filter = segment.filters[attribute as Attributes];
  //       const userAttribute =
  //         CustomerAttributes.find(
  //           (customerAttribute) => customerAttribute.label === attribute
  //         )?.key ?? '';
  //       const value = user[userAttribute as keyof User];

  //       if (filter) {
  //         switch (filter.operator) {
  //           case 'equals':
  //             return String(value) === String(filter.filterValue);
  //           case 'contains':
  //             return String(value)
  //               .toLowerCase()
  //               .includes(String(filter.filterValue).toLowerCase());
  //           case 'starts with':
  //             return String(value)
  //               .toLowerCase()
  //               .startsWith(String(filter.filterValue).toLowerCase());
  //           case 'ends with':
  //             return String(value)
  //               .toLowerCase()
  //               .endsWith(String(filter.filterValue).toLowerCase());
  //           case 'is greater than':
  //             return Number(value) > Number(filter.filterValue);
  //           case 'is less than':
  //             return String(value) < String(filter.filterValue);
  //           case 'is empty':
  //             return !value;
  //           case 'is not empty':
  //             return !!value;
  //           default:
  //             return true;
  //         }
  //       }
  //     });
  //   });
  // };

  // const recentIdeas = [
  //   { title: '[Example Idea] More colour options', votes: 1, date: '9 Oct' },
  //   {
  //     title: '[Example Idea] Pabbly Connect Integration',
  //     votes: 0,
  //     date: '9 Oct',
  //   },
  //   { title: '[Read Me] Change your Topics', votes: 0, date: '9 Oct' },
  //   { title: '[Example Idea] Custom Domains', votes: 0, date: '9 Oct' },
  //   {
  //     title: "[Read Me] We've created a few example ideas for you",
  //     votes: 1,
  //     date: '9 Oct',
  //   },
  // ];

  // const ideaStatusCounts = ideas.reduce((counts, item) => {
  //   counts[item.status] = (counts[item.status] || 0) + 1;
  //   return counts;
  // }, {});

  const sortedIdeas = ideas
    .sort((a, b) => {
      switch (whatsNewFilter) {
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'ctr':
          return (b.ctr || 0) - (a.ctr || 0);
        case 'comments':
          return (b.comment_count || 0) - (a.comment_count || 0);
        case 'reactions':
          return (b.reactions || 0) - (a.reactions || 0);
        default:
          return (b.vote || 0) - (a.vote || 0); // Default to votes
      }
    })
    .slice(0, 5);

  const filteredIdeas = ideas.filter((idea) => {
    switch (ideasFilter) {
      case 'active':
        return idea.status?.name === 'Active'; // Assuming you have a status property
      case 'shipped':
        return idea.status?.name === 'Shipped'; // Assuming you have a status property
      case 'votes':
        return [...ideas].sort((a, b) => (b.vote || 0) - (a.vote || 0));
      default:
        return true; // All
    }
  });

  const filteredCommentedIdeas = ideas.filter((idea) => {
    switch (usersFilter) {
      case 'recentComments':
        return idea.comment_count && idea.comment_count > 0;
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

      {/* <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
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
      </div> */}

      <KeyMetrics />
      <IdeasSection />
      <WhatsNewSection />

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Users</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-base font-medium text-gray-700 mb-1">
            Most Upvotes
          </div>
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

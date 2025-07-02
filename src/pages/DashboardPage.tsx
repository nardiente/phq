import { BoardBanner } from '../components/dashboard/BoardBanner';
import { KeyMetrics } from '../components/dashboard/KeyMetrics';
import { IdeasSection } from '../components/dashboard/IdeasSection';
import { WhatsNewSection } from '../components/dashboard/WhatsNewSection';
import { UsersSection } from '../components/dashboard/UsersSection';
import { useApp } from '../contexts/AppContext';
import { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { useWhatsNew } from '../contexts/WhatsNewContext';

export default function DashboardPage() {
  const { is_public } = useApp();
  const { listUsers } = useUser();
  const { handleListFeedback, listComments, listUpvotes } = useFeedback();
  const { listWhatsNew } = useWhatsNew();

  useEffect(() => {
    Promise.all([
      listUsers(),
      handleListFeedback(),
      listWhatsNew(),
      listComments(),
      listUpvotes(),
    ]);
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

  return (
    <div
      className={`flex-1 px-8 py-6 ${is_public ? 'background-color' : 'bg-[#fafafa]'}`}
    >
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
      <UsersSection />
    </div>
  );
}

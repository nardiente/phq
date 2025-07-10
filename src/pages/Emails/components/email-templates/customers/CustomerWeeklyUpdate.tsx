import { useFeedback } from '../../../../../contexts/FeedbackContext';
import { useUser } from '../../../../../contexts/UserContext';
import moment from 'moment';
import { listIdeas, listUpvoteLogs } from '../../../../../utils/emails';
import { memo } from 'react';

export const CustomerWeeklyUpdate = memo(function CustomerWeeklyUpdate() {
  const { user: userContext } = useUser();
  const { emails, project, user } = userContext ?? {};
  const { customer } = emails ?? {};
  const {
    state: { filteredIdeas, upvotes },
  } = useFeedback();

  const start = moment().subtract(7, 'days').startOf('day');

  return (
    <div>
      <div className="mb-3">
        <div className="text-sm text-gray-500">
          {`From: ProductHQ Updates ${customer?.sender_settings ?? 'noreply@producthq.io'}`}
        </div>
        <div className="text-sm text-gray-500">To: customer@company.com</div>
        <div className="text-sm text-gray-500">
          Subject: Your Weekly Product Updates
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-[18px] font-medium text-gray-900 mb-2">
          Hey <span className="text-gray-500">[First Name]</span>!
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          Here's what has happened this week on{' '}
          <span className="text-gray-500">{user?.company_name}</span>
          's feedback board:
        </p>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            My ideas
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            <p className="text-[13px] mb-1">
              • new votes this week:{' '}
              <span className="text-gray-500">
                {listUpvoteLogs({ upvotes, start }).length}
              </span>
            </p>
            <p className="text-[13px]">
              • total votes:{' '}
              <span className="text-gray-500">
                {listUpvoteLogs({ upvotes }).length}
              </span>
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            New ideas this week
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            {listIdeas({ filteredIdeas, start }).map((idea) => (
              <p className="text-[13px] mb-1">• {idea.title}</p>
            ))}
          </div>
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          See anything you like? Why not vote it up!
        </p>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            Trending ideas this week
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            {listIdeas({ filteredIdeas, sort: 'Trending', start }).map(
              (idea) => (
                <p className="text-[13px] mb-1">• {idea.title}</p>
              )
            )}
          </div>
        </div>

        <button
          className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4"
          onClick={() => {
            const portal =
              'http://' +
              (project?.custom_domain && project.custom_domain.length > 0
                ? project.custom_domain
                : project?.portal_subdomain && project.portal_subdomain.length
                  ? project.portal_subdomain + '.producthq.io'
                  : '');
            window.open(portal, '_blank', 'noopener, noreferrer');
          }}
        >
          View latest
        </button>

        <p className="text-[14px] text-gray-700 mb-2">
          The <span className="text-gray-500">{user?.company_name}</span> Team
        </p>

        <p className="text-[13px] text-gray-500">
          Can we make this email better?{' '}
          <a
            href="https://feedback.producthq.io"
            className="text-[#5a00cd]"
            rel="noopener, noreferrer"
            target="_blank"
          >
            Let us know here
          </a>
        </p>
      </div>
    </div>
  );
});

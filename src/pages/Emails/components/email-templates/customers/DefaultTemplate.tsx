import moment from 'moment';
import { useFeedback } from '../../../../../contexts/FeedbackContext';
import {
  listComments,
  listIdeas,
  listUpvotes,
} from '../../../../../utils/emails';
import { removeHtmlTags } from '../../../../../utils/string';
import { useUser } from '../../../../../contexts/UserContext';

export const DefaultTemplate = () => {
  const {
    state: { comments, filteredIdeas, upvotes },
  } = useFeedback();
  const { user: userContext } = useUser();
  const { emails, project } = userContext ?? {};
  const { customer } = emails ?? {};

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
          Hi Admin! 👋
        </div>
        <p className="text-[14px] text-gray-700 mb-3">
          Here's your weekly activity update from ProductHQ:
        </p>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            New Ideas
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            {listIdeas({ filteredIdeas, start }).map((idea, idx) => (
              <p key={idx} className="text-[13px] mb-1">
                • {idea.title}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            New Comments
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            <p className="text-[13px] mb-1">
              • New comment on "Dark mode support"
            </p>

            {listComments({ feedbackComments: comments, start }).map(
              (comment, idx) => (
                <p key={idx} className="text-[13px]">
                  • {removeHtmlTags(comment.comment)}
                </p>
              )
            )}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            New Feedback
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            {listUpvotes({ filteredIdeas, upvoteLogs: upvotes, start }).map(
              (upvote, idx) => (
                <p key={idx} className="text-[13px]">
                  • {upvote.title}
                </p>
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
            window.open(portal, '_blanck', 'noopener noreferrer');
          }}
        >
          Open Dashboard
        </button>

        <p className="text-[14px] text-gray-700 mb-2">
          Best regards,
          <br />
          The ProductHQ Team
        </p>

        <p className="text-[13px] text-gray-500">
          Need help?{' '}
          <a
            href="https://support.producthq.io"
            className="text-[#5a00cd]"
            rel="noopen, noreferrer"
            target="_blank"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

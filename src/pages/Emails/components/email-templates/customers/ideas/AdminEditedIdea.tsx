import { useUser } from '../../../../../../contexts/UserContext';

export const AdminEditedIdea = () => {
  const { user: userContext } = useUser();
  const { emails, user } = userContext ?? {};
  const { customer } = emails ?? {};

  return (
    <div>
      <div className="mb-3">
        <div className="text-sm text-gray-500">
          {`From: ProductHQ Updates ${customer?.sender_settings ?? 'noreply@producthq.io'}`}
        </div>
        <div className="text-sm text-gray-500">To: customer@company.com</div>
        <div className="text-sm text-gray-500">
          Subject: Your idea has been updated
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-[18px] font-medium text-gray-900 mb-2">
          Hey <span className="text-gray-500">[First Name]</span>! 👋
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          An admin at{' '}
          <span className="text-gray-500">{user?.company_name}</span> has
          amended your idea.
        </p>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">
            Here are some reasons an idea might be updated:
          </h4>
          <div className="text-[14px] text-gray-700 pl-2">
            <p className="text-[13px] mb-1">1. To amend a typo (most common)</p>
            <p className="text-[13px] mb-1">
              2. More context has been added to better describe the idea
            </p>
            <p className="text-[13px] mb-1">
              3. The title was updated to better describe the idea
            </p>
            <p className="text-[13px]">4. Multiple ideas in one entry</p>
          </div>
        </div>

        <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
          View Updated Idea
        </button>

        <p className="text-[14px] text-gray-700 mb-2">
          Thanks!
          <br />
          The <span className="text-gray-500">{user?.company_name}</span> Team
        </p>

        <p className="text-[13px] text-gray-500">
          Help us improve -{' '}
          <a
            href="https://feedback.producthq.io"
            className="text-[#5a00cd]"
            rel="noopener, noreferrer"
            target="_blank"
          >
            share your thoughts
          </a>
        </p>
      </div>
    </div>
  );
};

import { useUser } from '../../../../../../contexts/UserContext';

export const IdeaStatusChange = () => {
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
          Subject: Status update on your idea
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-[18px] font-medium text-gray-900 mb-2">
          Hey <span className="text-gray-500">[First Name]</span>! 👋
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          The status of your idea has changed to{' '}
          <span className="text-gray-500">[New Status]</span>.
        </p>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-[14px] text-gray-700">
            <span className="text-gray-500">[Idea Name]</span>
          </p>
        </div>

        <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
          See your idea
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

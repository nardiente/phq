import { useUser } from '../../../../../contexts/UserContext';

export const IdeaWasRejected = () => {
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
          Subject: Your idea was not approved
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="text-[18px] font-medium text-gray-900 mb-2">
          Uh oh! 😕
        </div>

        <p className="text-[14px] text-gray-700 mb-3">
          Your idea has been rejected.
        </p>

        <div className="mb-4">
          <h4 className="text-[15px] font-medium text-gray-900 mb-2">Reason</h4>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-[14px] text-gray-700">
              <span className="text-gray-500">
                [Rejection reason will appear here]
              </span>
            </p>
          </div>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-[14px] text-gray-700">
            <span className="text-gray-500">[Idea Name]</span>
          </p>
        </div>

        <p className="text-[14px] text-gray-700 mb-4">
          Please contact the board administrator if you would like to appeal
          this decision.
        </p>

        <button className="px-5 py-2 bg-[#5a00cd] text-white rounded-lg text-[14px] font-medium mb-4">
          Contact Admin
        </button>

        <p className="text-[14px] text-gray-700 mb-2">
          The <span className="text-gray-500">{user?.company_name}</span> Team
        </p>

        <p className="text-[13px] text-gray-500">
          Help us improve -{' '}
          <a href="#" className="text-[#5a00cd]">
            share your thoughts
          </a>
        </p>
      </div>
    </div>
  );
};

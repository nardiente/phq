import React from 'react';

const Feedback: React.FC = () => {
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

      {/* Feedback Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Feedback</h2>
        <div className="space-y-6">
          {/* Feedback Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">Product Feedback</h3>
                <p className="text-gray-600 text-sm">May 28, 2023</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Positive
              </span>
            </div>
            <p className="text-gray-700">
              "The new dashboard layout is much more intuitive. I can find
              everything I need quickly now."
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">Feature Request</h3>
                <p className="text-gray-600 text-sm">May 25, 2023</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Suggestion
              </span>
            </div>
            <p className="text-gray-700">
              "Would love to see more customization options for the reports
              section."
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">UI Feedback</h3>
                <p className="text-gray-600 text-sm">May 22, 2023</p>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                Issue
              </span>
            </div>
            <p className="text-gray-700">
              "The contrast in the dark mode could be improved for better
              readability."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

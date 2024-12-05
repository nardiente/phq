import React from 'react';

export default function NotificationsPage() {
  return (
    <div className="flex-1 px-8 py-6">
      <div className="max-w-[800px]">
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">
          Notifications
        </h1>
        <p className="text-[14px] text-gray-600 mb-8">
          Manage your email preferences for this project
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="block text-[14px] font-medium text-gray-700">
              Reply-to-address
            </label>
            <input
              type="email"
              placeholder="noreply@producthq.io"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
            <p className="text-[13px] text-gray-500">
              By default all outgoing emails to your users will be sent from
              noreply@producthq.io, if you want replies to go elsewhere, set
              reply-to address here.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between py-4">
              <div>
                <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                  Daily activity email
                </h3>
                <p className="text-[13px] text-gray-500">
                  Get an email at the end of the day with details of new post
                  and comments made by your customers.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div>
                <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                  End of week project summary
                </h3>
                <p className="text-[13px] text-gray-500">
                  Get an email at the end of the week with stats about your
                  project
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div>
                <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                  Feedback review reminder
                </h3>
                <p className="text-[13px] text-gray-500">
                  Get an email when there are posts that require review
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div>
                <h3 className="text-[14px] font-medium text-gray-900 mb-1">
                  New activity email for your customers
                </h3>
                <p className="text-[13px] text-gray-500">
                  Send email to customers who have commented, voted, or added a
                  post encouraging them to leave feedback on your portal.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

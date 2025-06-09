import { useState } from 'react';
import TabNavigation from '../components/TabNavigation';

export default function EmailsPage() {
  const [activeTab, setActiveTab] = useState<string>('Admin Emails');

  return (
    <div className="flex-1 px-8 py-6 flex justify-center">
      <div className="max-w-[800px]">
        <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Emails</h1>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          tabs={['Admin Emails', 'Customer Emails']}
        />
        <p className="text-[14px] text-gray-600 mb-8 mt-4">
          Manage your email preferences for this project
        </p>

        <div className="space-y-8">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <label
                className="text-[14px] font-medium text-gray-700"
                htmlFor="email"
              >
                Email address
              </label>
              <p className="text-[14px] text-gray-600">Send emails to:</p>
            </div>
            <input
              id="email"
              autoComplete="email"
              name="email"
              type="email"
              placeholder="admin@company.com"
              className="w-[40%] px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-[14px] focus:outline-none focus:border-primary"
            />
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

import React from 'react';
import { X } from 'lucide-react';

const PersonalInfo: React.FC = () => {
  return (
    <div className="flex-1 p-8">
      <h2 className="text-xl font-semibold mb-6">Customer Details</h2>

      {/* Segment Section */}
      <div className="mb-8">
        <label className="block text-sm text-gray-600 mb-2">Segment</label>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter segment, then press return."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
          />
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              Highest Lifetime Value
              <button className="ml-2">
                <X className="h-4 w-4" />
              </button>
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              Active Users Last 7 Days
              <button className="ml-2">
                <X className="h-4 w-4" />
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* Contact Details Grid */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Job title</label>
          <p className="text-lg">Neurosurgeon</p>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Phone number
          </label>
          <p className="text-lg">(505) 555-0125</p>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">Location</label>
          <p className="text-lg">Manhattan, New York</p>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">Website</label>
          <p className="text-lg">www.website.com</p>
        </div>
      </div>

      {/* Subscriptions Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Subscriptions</h3>
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600 border-b">
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">MRR</th>
                <th className="px-6 py-4">Started</th>
                <th className="px-6 py-4">Started</th>
                <th className="px-6 py-4">Cancelled</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">Pro</td>
                <td className="px-6 py-4">1 month</td>
                <td className="px-6 py-4">$351.02</td>
                <td className="px-6 py-4">7/18/17</td>
                <td className="px-6 py-4">7/11/19</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">1 month</td>
                <td className="px-6 py-4">$767.50</td>
                <td className="px-6 py-4">6/21/19</td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

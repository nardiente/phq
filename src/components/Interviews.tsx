import React from 'react';

const Interviews: React.FC = () => {
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

      {/* Interviews Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Interviews</h2>
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-lg text-gray-600">
            Interview content coming soon...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This section is under development
          </p>
        </div>
      </div>
    </div>
  );
};

export default Interviews;

import React from 'react';

interface Survey {
  title: string;
  description: string;
}

const Surveys: React.FC = () => {
  const surveys: Survey[] = [
    {
      title: 'Design satisfaction survey',
      description:
        'Understand user satisfaction of new designs to keep iterating and improving',
    },
    {
      title: 'Net Promoter Score® (NPS®) survey',
      description:
        'Measure long-term loyalty and happiness the tried-and-tested way',
    },
    {
      title: 'Feedback categorization survey',
      description:
        'Get categorized responses by prompting users to report issues, share their ideas, and more',
    },
    {
      title: 'Product discovery survey',
      description:
        'Dig deep into how customers use your product and find innovative ways to improve it',
    },
    {
      title: 'Beta feedback survey',
      description:
        'Gather feedback before you launch your product with this survey for beta users',
    },
  ];

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

      {/* Surveys Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Surveys</h2>
        <div className="space-y-8">
          {surveys.map((survey, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium mb-1">{survey.title}</h3>
                <p className="text-gray-600">{survey.description}</p>
              </div>
              <button className="text-purple-600 font-medium hover:text-purple-700">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Surveys;

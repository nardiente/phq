import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: 'Admin Emails' | 'Customer Emails') => void;
  tabs: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="flex gap-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-4 text-base font-medium ${
            activeTab === tab
              ? 'border-b-2 border-[#5a00cd] text-[#5a00cd]'
              : 'text-[#4d4566]'
          } focus:outline-none`}
          onClick={() => onTabChange(tab as 'Admin Emails' | 'Customer Emails')}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;

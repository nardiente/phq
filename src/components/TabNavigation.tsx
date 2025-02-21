import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['accordion', 'alerts', 'avatar', 'badges', 'colors', 'buttons', 'fonts'];

  return (
    <div className="flex gap-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`pb-4 text-base font-medium ${
            activeTab === tab ? 'border-b-2 border-[#5a00cd] text-[#5a00cd]' : 'text-[#4d4566]'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation; 
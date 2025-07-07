import React from 'react';

interface TabNavigationProps {
  activeTab: { id: string; text: string };
  onTabChange: (tab: { id: string; text: string }) => void;
  tabs: { id: string; text: string }[];
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
          key={tab.id}
          className={`pb-4 text-base font-medium ${
            activeTab.id === tab.id
              ? 'border-b-2 border-[#5a00cd] text-[#5a00cd]'
              : 'text-[#4d4566]'
          } focus:outline-none`}
          onClick={() => onTabChange(tab)}
        >
          {tab.text}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;

import React from 'react';
import {
  User,
  Settings2,
  Zap,
  MessageSquare,
  Mail,
  Tag,
  Users2,
  CreditCard,
} from 'lucide-react';

interface SettingsMenuProps {
  activeItem: string;
  onSelect: (page: string) => void;
}

export function SettingsMenu({ activeItem, onSelect }: SettingsMenuProps) {
  const menuItems = [
    {
      icon: User,
      label: 'Account Details',
      isActive: activeItem === 'account',
    },
    {
      icon: Settings2,
      label: 'Project Details',
      isActive: activeItem === 'project',
    },
    {
      icon: Zap,
      label: 'Widgets',
      isActive: activeItem === 'widgets',
      onClick: () => onSelect('widgets'),
    },
    { icon: MessageSquare, label: 'Moderation', badge: 'COMING SOON' },
    { icon: Mail, label: 'Emails', badge: 'COMING SOON' },
    { icon: Tag, label: 'Tags' },
    { icon: Users2, label: 'Team Members' },
    { icon: CreditCard, label: 'Billing and Invoicing' },
  ];

  return (
    <nav className="w-64 pr-8">
      <button className="w-full mb-6 px-4 py-2 text-sm font-medium text-[#22C55E] border border-[#22C55E] rounded-lg hover:bg-green-50">
        CHOOSE PLAN
      </button>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() =>
              item.onClick ? item.onClick() : onSelect(item.label.toLowerCase())
            }
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
              item.isActive
                ? 'bg-purple-50 text-purple-700'
                : item.badge
                  ? 'opacity-50 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-50'
            }`}
            disabled={!!item.badge}
          >
            <item.icon size={18} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

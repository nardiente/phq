import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface UserMenuProps {
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
  onNavigate: (page: 'home' | 'settings') => void;
}

export function UserMenu({ user, onNavigate }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (page: 'home' | 'settings') => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 text-lg">
              {user.firstName.charAt(0)}
            </span>
          </div>
          <span className="text-[14px] text-gray-900">
            {user.firstName} {user.lastName}
          </span>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-lg">
                  {user.firstName.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </span>
                <span className="px-2 py-0.5 text-[12px] font-medium bg-blue-50 text-blue-600 rounded w-fit">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <button 
              onClick={() => handleNavigation('settings')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Account Settings
            </button>
            <a 
              href="https://app.producthq.io/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[calc(100%-16px)] mx-2 px-4 py-2 text-sm text-[#22C55E] hover:bg-gray-50 border border-[#22C55E] rounded-lg text-center"
            >
              CHOOSE PLAN
            </a>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
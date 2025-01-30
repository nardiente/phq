import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { eraseKaslKey } from '../utils/localStorage';
import { User, UserTypes } from '../types/user';

interface UserMenuProps {
  user: User | undefined;
  onNavigate: (page: 'home' | 'account') => void;
}

export function UserMenu({ user, onNavigate }: UserMenuProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (page: 'home' | 'account') => {
    onNavigate(page);
    setIsOpen(false);
  };

  const handleLogout = () => {
    eraseKaslKey();
    navigate(is_public ? '/upvotes' : '/sign-in');
  };

  return (
    <div className="relative" ref={menuRef}>
      {user?.full_name && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-max">
            <>
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-lg w-9">
                  <figure
                    className={`image${
                      user?.profile_photo &&
                      user?.profile_photo.length > 0 &&
                      user?.profile_photo !=
                        '../../../static/assets/profile-placeholder.svg'
                        ? ''
                        : ' avatar'
                    }`}
                  >
                    {user?.profile_photo &&
                    user?.profile_photo.length > 0 &&
                    user?.profile_photo !=
                      '../../../static/assets/profile-placeholder.svg' ? (
                      <img className="rounded-full" src={user?.profile_photo} />
                    ) : (
                      user?.full_name?.toUpperCase().charAt(0)
                    )}
                  </figure>
                </span>
              </div>
              <span className="text-[14px] text-gray-900">
                {user?.full_name}
              </span>
            </>
          </div>
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-lg">
                  {user?.first_name?.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {user?.full_name?.substring(0, 20).trim()}
                  {(user?.full_name?.length ?? 0) > 20 ? '...' : ''}
                </span>
                {user?.type === UserTypes.CUSTOMER && (
                  <span className="px-2 py-0.5 text-[12px] font-medium bg-blue-50 text-blue-600 rounded w-fit">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavigation('account')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Account Settings
            </button>
            <a
              href={`${window.location.origin}/pricing`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[calc(100%-16px)] mx-2 px-4 py-2 text-sm text-[#22C55E] hover:bg-gray-50 border border-[#22C55E] rounded-lg text-center cursor-pointer mb-0"
            >
              CHOOSE PLAN
            </a>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

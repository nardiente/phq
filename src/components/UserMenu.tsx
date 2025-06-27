import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  eraseImpersonator,
  eraseKaslKey,
  eraseSessionToken,
  getImpersonator,
  setKaslKey,
} from '../utils/localStorage';
import { User, UserTypes } from '../types/user';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { RbacPermissions } from '../types/common';
import { useApp } from '../contexts/AppContext';
import {
  bottomMenuItems,
  designSystemItem,
  mainMenuItems,
  publicViewMenuItems,
  settingsMenuItems,
  superDuperAdminItems,
} from '../constants/menuItems';
import { isSuperDuperAdmin } from '../utils/user';

interface UserMenuProps {
  user: User | undefined;
  onNavigate: (page: 'home' | 'account') => void;
}

export function UserMenu({ onNavigate }: UserMenuProps) {
  const navigate = useNavigate();

  const { is_public, setMenuItems } = useApp();
  const { user: userDetails, removeUser } = useUser();
  const { moderation, user } = userDetails ?? {};

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const currentUser = !is_public
    ? user
    : moderation?.allow_anonymous_access === true &&
        user?.kasl_key === undefined
      ? user
      : !moderation?.allow_anonymous_access &&
          (user?.isAnonymous === false || !!user?.kasl_key)
        ? user
        : undefined;

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
    removeUser();
    if (is_public) {
      if (!moderation?.allow_anonymous_access) {
        eraseSessionToken();
      }
    } else {
      const impersonator = getImpersonator();
      if (impersonator) {
        setKaslKey(impersonator.kasl_key ?? '');
        setMenuItems(
          is_public
            ? publicViewMenuItems
            : isSuperDuperAdmin(impersonator)
              ? superDuperAdminItems
              : [
                  ...mainMenuItems,
                  ...settingsMenuItems,
                  ...bottomMenuItems,
                  designSystemItem,
                ]
        );
        eraseImpersonator();
        navigate('/super-duper-admin');
        window.location.reload();
        return;
      }
      setMenuItems([]);
      navigate('/sign-in');
    }
  };

  return (
    <div className="relative" data-testid="user-menu" ref={menuRef}>
      {currentUser?.full_name && (
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
                      currentUser?.profile_photo &&
                      currentUser?.profile_photo.length > 0 &&
                      currentUser?.profile_photo !=
                        '../../../static/assets/profile-placeholder.svg'
                        ? ''
                        : ' avatar'
                    }`}
                  >
                    {currentUser?.profile_photo &&
                    currentUser?.profile_photo.length > 0 &&
                    currentUser?.profile_photo !=
                      '../../../static/assets/profile-placeholder.svg' ? (
                      <img
                        className="rounded-full"
                        src={currentUser?.profile_photo}
                      />
                    ) : (
                      currentUser?.full_name?.toUpperCase().charAt(0)
                    )}
                  </figure>
                </span>
              </div>
              <span
                id={is_public ? 'user-full-name' : ''}
                className="text-[14px] text-gray-900"
              >
                {currentUser?.full_name}
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
          <div
            className={`px-4 py-3 ${user?.rbac_permissions?.includes(RbacPermissions.MANAGE_ACCOUNT_DETAILS_PAGE) ? 'border-b' : ''} border-gray-100`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-lg">
                  {currentUser?.first_name?.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {currentUser?.full_name?.substring(0, 20).trim()}
                  {(currentUser?.full_name?.length ?? 0) > 20 ? '...' : ''}
                </span>
                {!is_public && currentUser?.type === UserTypes.CUSTOMER && (
                  <span className="px-2 py-0.5 text-[12px] font-medium bg-blue-50 text-blue-600 rounded w-fit">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {!is_public && currentUser?.type === UserTypes.CUSTOMER && (
              <>
                {user?.rbac_permissions?.includes(
                  RbacPermissions.MANAGE_ACCOUNT_DETAILS_PAGE
                ) && (
                  <button
                    onClick={() => handleNavigation('account')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Account Settings
                  </button>
                )}
                <a
                  href={`${window.location.origin}/pricing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-[calc(100%-16px)] mx-2 px-4 py-2 text-sm text-[#22C55E] hover:bg-gray-50 border border-[#22C55E] rounded-lg text-center cursor-pointer mb-0"
                >
                  CHOOSE PLAN
                </a>
              </>
            )}
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

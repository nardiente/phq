import { UserMenu } from './UserMenu';
import { useUser } from '../contexts/UserContext';
import { Notifications } from './Notifications';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { PageType } from '../types/app';
import { useApp } from '../contexts/AppContext';
import { publicViewMenuItems } from '../constants/menuItems';

interface BannerProps {
  activeItem?: string;
  onNavigate: (page: PageType) => void;
}

function Banner({ activeItem, onNavigate }: BannerProps) {
  const navigate = useNavigate();

  const { isAuthenticated, user: userContext } = useUser();
  const { admin_profile, user } = userContext ?? {};
  const { is_public } = useApp();

  const company_info = is_public ? admin_profile : user;

  return (
    <div
      className={`w-full h-[60px] border-b border-gray-200 flex items-center ${is_public ? 'justify-between pl-5' : 'justify-end bg-white'} sticky top-0 z-50 pr-5`}
    >
      {is_public && (
        <>
          <div className="flex items-center">
            {company_info?.company_name && (
              <>
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <>
                    {company_info?.company_logo &&
                    company_info?.company_logo.length > 0 ? (
                      <figure
                        className={`is-clickable ${
                          company_info?.company_logo?.length &&
                          company_info?.company_logo?.length > 0
                            ? ' '
                            : ' '
                        }`}
                        onClick={() => {
                          if (is_public) {
                            if (
                              !company_info.website_url ||
                              company_info.website_url.length === 0
                            ) {
                              return;
                            }
                            window.location.href =
                              company_info.website_url.startsWith('http')
                                ? company_info.website_url
                                : 'http://' + company_info.website_url;
                            return;
                          }
                          onNavigate('dashboard');
                        }}
                      >
                        <img
                          className="w-9 h-9 rounded-full"
                          src={company_info?.company_logo}
                        />
                      </figure>
                    ) : (
                      <span className="text-purple-600 font-medium text-lg">
                        {company_info?.company_name?.toUpperCase().charAt(0)}
                      </span>
                    )}
                  </>
                </div>
              </>
            )}
          </div>
          <div className="w-max flex items-center gap-8">
            {publicViewMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as PageType)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  activeItem === item.id
                    ? `bg-purple-50 text-purple-700 ${is_public ? 'active-link-color' : ''}`
                    : item.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : `${is_public ? 'default-text-color' : 'text-[#4b5563]'} hover:bg-gray-50`
                }`}
                disabled={item.disabled && item.id !== 'widgets'}
              >
                <item.icon size={18} />
                <span className="w-max flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-xs font-medium text-[#5A00CD] bg-purple-50/50 px-2 py-0.5 rounded whitespace-pre-line leading-tight">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="flex items-center gap-3">
        {isAuthenticated() ? (
          <>
            {user && (
              <>
                <Notifications />
                <UserMenu user={user} onNavigate={onNavigate} />
              </>
            )}
          </>
        ) : (
          <>
            <Button
              className={`${is_public ? 'sign-in-button-color' : ''}`}
              onClick={() => navigate('/sign-in')}
              state="outline"
              variant="blue"
            >
              Sign in
            </Button>
            <Button
              className={`${is_public ? 'sign-up-button-color' : ''}`}
              onClick={() => navigate('/sign-up')}
              variant="blue"
            >
              Sign up
            </Button>
          </>
        )}
        {!is_public && user && (
          <div className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-[12px] font-medium rounded">
            Admin
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;

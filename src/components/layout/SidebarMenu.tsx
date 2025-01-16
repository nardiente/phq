import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Map,
  Upload,
  Settings,
  ArrowLeft,
  User,
  Settings2,
  Tag,
  Users2,
  CreditCard,
  Mail,
  BookOpen,
  Zap,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Heart,
  LayoutTemplate,
} from 'lucide-react';
import { PageType } from '../../routes/ProtectedRoute';
import { useUser } from '../../contexts/UserContext';

interface SidebarMenuProps {
  activeItem: string;
  onNavigate: (page: PageType) => void;
}

export function SidebarMenu({ activeItem, onNavigate }: SidebarMenuProps) {
  const { user } = useUser();

  const [isExpanded, setIsExpanded] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const company_info = is_public ? user?.admin_profile : user?.user;

  const mainMenuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      id: 'dashboard',
      badge: 'COMING\nSOON',
      disabled: false,
    },
    { icon: ThumbsUp, label: 'Upvotes', id: 'upvotes' },
    { icon: Map, label: 'Roadmap', id: 'roadmap' },
    { icon: Zap, label: 'Posts', id: 'posts' },
    { icon: Zap, label: "What's New", id: 'boost' },
    {
      icon: LayoutTemplate,
      label: 'Widgets',
      id: 'widgets',
      badge: 'COMING\nSOON',
      disabled: false,
    },
  ];

  const settingsMenuItems = [
    { icon: User, label: 'Account Details', id: 'account' },
    { icon: Settings2, label: 'Project Details', id: 'project' },
    { icon: Paintbrush, label: 'Appearance', id: 'appearance' },
    { icon: MessageSquare, label: 'Moderation', id: 'moderation' },
    { icon: Users2, label: 'Team Members', id: 'team' },
    { icon: CreditCard, label: 'Billing and Invoicing', id: 'billing' },
    { icon: Tag, label: 'Tags', id: 'tags' },
    {
      icon: Mail,
      label: 'Emails',
      id: 'emails',
      badge: 'COMING\nSOON',
      disabled: false,
    },
    {
      icon: Upload,
      label: 'Import Ideas',
      id: 'import',
      badge: 'COMING\nSOON',
      disabled: false,
    },
  ];

  const bottomMenuItems = [
    {
      icon: BookOpen,
      label: 'Documentation',
      id: 'docs',
      externalLink: 'https://support.producthq.io/',
    },
    { icon: Heart, label: 'Leave Testimonial', id: 'testimonials' },
    { icon: ThumbsUp, label: 'Submit Feature Request', id: 'submit-feature' },
    { icon: Map, label: 'Our Roadmap', id: 'our-roadmap' },
  ];

  useEffect(() => {
    setShowSettings(
      settingsMenuItems
        .map((settingsMenuItem) => settingsMenuItem.id)
        .includes(activeItem)
    );
  }, [activeItem]);

  const handleNavigation = (item: any) => {
    if (item.id === 'submit-feature') {
      window.open('https://feedback.producthq.io/upvotes', '_blank');
      return;
    }
    if (item.id === 'our-roadmap') {
      window.open('https://feedback.producthq.io/roadmap', '_blank');
      return;
    }
    if (item.externalLink) {
      window.open(item.externalLink, '_blank');
      return;
    }
    onNavigate(item.id);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (!showSettings) {
      onNavigate('account');
    } else {
      onNavigate('dashboard');
    }
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 mr-[5px] ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <div className="sticky top-0 flex flex-col h-screen">
        <div className="flex items-center justify-between h-[60px] px-4 border-b border-gray-200 min-h-[60px]">
          <div className="flex items-center">
            {company_info?.company_name && (
              <>
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-lg">
                    <>
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
                        {company_info?.company_logo &&
                        company_info?.company_logo.length > 0 ? (
                          <img
                            className="rounded-full"
                            src={company_info?.company_logo}
                          />
                        ) : (
                          company_info?.company_name?.toUpperCase().charAt(0)
                        )}
                      </figure>
                    </>
                  </span>
                </div>
                {isExpanded && (
                  <span className="ml-3 font-medium text-gray-900">
                    {company_info?.company_name?.substring(0, 30)}
                    {company_info?.company_name &&
                      company_info?.company_name?.length > 30 &&
                      '...'}
                  </span>
                )}
              </>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-50 rounded-lg"
          >
            {isExpanded ? (
              <ChevronLeft size={20} className="text-gray-400" />
            ) : (
              <ChevronRight size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        <div className="flex-1 px-3 py-4">
          {showSettings && (
            <button
              onClick={toggleSettings}
              className="w-full flex items-center gap-3 px-3 py-2 mb-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              {isExpanded && (
                <span className="flex-1 text-left">Back to main menu</span>
              )}
            </button>
          )}
          <div className="space-y-1">
            {(showSettings ? settingsMenuItems : mainMenuItems).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  activeItem === item.id
                    ? 'bg-purple-50 text-purple-700'
                    : item.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
                disabled={item.disabled && item.id !== 'widgets'}
              >
                <item.icon size={18} />
                {isExpanded && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs font-medium text-[#5A00CD] bg-purple-50/50 px-2 py-0.5 rounded whitespace-pre-line leading-tight">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>

          {isExpanded && (
            <a
              href="https://app.producthq.io/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full mt-4 px-4 py-2 text-sm font-medium text-[#22C55E] border border-[#22C55E] rounded-lg hover:bg-green-50 text-center"
            >
              CHOOSE PLAN
            </a>
          )}
        </div>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="space-y-1">
            {!showSettings && (
              <>
                <button
                  onClick={toggleSettings}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  <Settings size={18} />
                  {isExpanded && (
                    <span className="flex-1 text-left">Settings</span>
                  )}
                </button>
                {bottomMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      activeItem === item.id
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={18} />
                    {isExpanded && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

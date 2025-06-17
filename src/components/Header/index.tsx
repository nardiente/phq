import './styles.css';
import './wp-styles.css';
import {
  check_box_active_color,
  default_active_link_color,
  default_background_color,
  default_button_text_color,
  default_primary_button_border,
  default_primary_button_color,
  default_text_color,
  sign_in_button_border_color,
  sign_in_button_color,
  sign_in_button_hover_color,
  sign_in_button_text_color,
  sign_in_button_text_hover_color,
  sign_up_button_border_color,
  sign_up_button_color,
  sign_up_button_hover_color,
  sign_up_button_text_color,
  sign_up_button_text_hover_color,
  tags_active_background_color,
  tags_active_text_color,
  tags_default_background_color,
  tags_default_text_color,
} from './types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useUser } from '../../contexts/UserContext';
import { usePanel } from '../../contexts/PanelContext';
import { useEffect } from 'react';
import { FC } from 'react';
import { getKaslKey, getSessionToken } from '../../utils/localStorage';
import { ProjectAppearance } from '../../types/appearance';
import { ChevronDownIcon } from '../icons/chevron-down.icon';
import { useFeedback } from '../../contexts/FeedbackContext';
import { Notifications } from '../Notifications';
import { UserMenu } from '../UserMenu';
import { PageType } from '../../types/app';
import { clearQueryString } from '../../utils/uri';
import { useApp } from '../../contexts/AppContext';

export const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ post_id?: string }>();

  const { is_public } = useApp();
  const { user, isAuthenticated } = useUser();
  const { moderation } = user ?? {};
  const {
    state: { active_tab },
    setActiveTab,
  } = usePanel();
  const { setDefaultFilter } = useFeedback();

  const header_exceptions = [
    '/sign-in',
    '/sign-in/google',
    '/forgot-password',
    '/reset-password',
    '/sign-up',
    '/ob-board',
    '/ob-idea',
    '/ob-tags',
    '/ob-survey',
    '/ob-success',
  ];
  const is_logged_in =
    getKaslKey() !== undefined ||
    (is_public &&
      moderation?.allow_anonymous_access === true &&
      getSessionToken() !== undefined &&
      user?.user?.id);

  if (!is_logged_in) {
    header_exceptions.push('/success');
  }

  const vertical_scroll_exceptions = [
    '/',
    '/account',
    '/billing',
    '/forgot-password',
    '/reset-password',
    '/appearance',
    '/project',
    '/sign-in',
    '/tracking',
    '/tags',
    '/upvotes',
    '/whatsnew',
  ];

  const main = document.getElementById('main') as HTMLElement;
  if (main) {
    let overflow_y = 'auto';
    if (vertical_scroll_exceptions.includes(window.location.pathname)) {
      overflow_y = 'hidden';
    }
    main.style.overflowY = overflow_y;
  }

  const setAppearanceColors = (appearance?: ProjectAppearance) => {
    document.documentElement.style.setProperty(
      '--public-view-active-link-color',
      appearance?.active_link_color || default_active_link_color
    );
    document.documentElement.style.setProperty(
      '--public-view-background-color',
      appearance?.background_color || default_background_color
    );
    document.documentElement.style.setProperty(
      '--public-view-button-text-color',
      appearance?.button_text_color || default_button_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-default-text-color',
      appearance?.default_text_color || default_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-primary-button-border',
      appearance?.primary_button_border || default_primary_button_border
    );
    document.documentElement.style.setProperty(
      '--public-view-primary-button-color',
      appearance?.primary_button_color || default_primary_button_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-color',
      appearance?.sign_in_button_color || sign_in_button_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-border-color',
      appearance?.sign_in_button_border_color || sign_in_button_border_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-hover-color',
      appearance?.sign_in_button_hover_color || sign_in_button_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-text-color',
      appearance?.sign_in_button_text_color || sign_in_button_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-in-button-text-hover-color',
      appearance?.sign_in_button_text_hover_color ||
        sign_in_button_text_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-color',
      appearance?.sign_up_button_color || sign_up_button_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-border-color',
      appearance?.sign_up_button_border_color || sign_up_button_border_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-hover-color',
      appearance?.sign_up_button_hover_color || sign_up_button_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-text-color',
      appearance?.sign_up_button_text_color || sign_up_button_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-sign-up-button-text-hover-color',
      appearance?.sign_up_button_text_hover_color ||
        sign_up_button_text_hover_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-active-background-color',
      appearance?.tags_active_background_color || tags_active_background_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-active-text-color',
      appearance?.tags_active_text_color || tags_active_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-default-background-color',
      appearance?.tags_default_background_color || tags_default_background_color
    );
    document.documentElement.style.setProperty(
      '--public-view-tags-default-text-color',
      appearance?.tags_default_text_color || tags_default_text_color
    );
    document.documentElement.style.setProperty(
      '--public-view-check-box-active-color',
      appearance?.check_box_active_color || check_box_active_color
    );
  };

  const handlePublicView = () => {
    let search_queries: { pi?: number; wni?: number } = {};
    if (location.search) {
      search_queries = queryString.parse(location.search);
    }
    const hash = location.hash.slice(1);
    if (!search_queries.wni && !search_queries.pi && !hash && !params.post_id) {
      const active_tabs: string[] = [];
      if (user?.project?.is_visible_upvotes === true) {
        active_tabs.push('/upvote');
      }
      if (user?.project?.is_visible_roadmap === true) {
        active_tabs.push('/roadmaps');
      }
      if (user?.project?.is_visible_whats_new === true) {
        active_tabs.push('/changelog');
      }

      const pathname = location.pathname;
      switch (pathname) {
        case '/upvotes':
          setActiveTab('/upvote');
          break;
        case '/roadmaps-admin':
        case '/roadmap':
          setActiveTab('/roadmaps');
          break;
        case '/whatsnew-admin':
        case '/whatsnew':
          setActiveTab('/changelog');
          break;
        default:
          break;
      }
    }
    if (hash && hash == 'whats_new') {
      setActiveTab('/changelog');
      clearQueryString();
    }
    if (params.post_id) {
      setActiveTab('/changelog');
    }
  };

  useEffect(() => {
    setDefaultFilter();
  }, [active_tab]);

  useEffect(() => {
    setAppearanceColors(user?.appearance);
    if (is_public) {
      handlePublicView();
    }
  }, [user]);

  useEffect(() => {
    if (!is_public) {
      let active_tab = location.pathname;
      if (active_tab === '/upvotes') active_tab = '/upvote';
      if (active_tab === '/roadmaps-admin') active_tab = '/roadmaps';
      if (active_tab === '/whatsnew-admin') active_tab = '/changelog';
      setActiveTab(active_tab);
    }
  }, [window.location.pathname]);

  const pricingStyle =
    location.pathname === '/pricing' ? { color: '#5a00cd' } : {};

  if (header_exceptions.includes(location.pathname)) {
    return null;
  }

  const handleNavigation = (page: PageType) => {
    navigate('/' + page.toString());
  };

  return (
    <nav id="main-nav">
      <div id="wp-heading">
        <div id="header-outer" style={{ width: '100%' }}>
          <div
            id="top"
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <a href="https://producthq.io/">
              <img src="../../../static/assets/logo.png" />
            </a>
            <nav style={{ display: 'flex' }}>
              <ul
                className="sf-menu sf-js-enabled sf-arrows"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <li
                  id="menu-item-250"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-238 current_page_item menu-item-has-children nectar-regular-menu-item sf-with-ul menu-item-250"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }

                    const featureSubMenu =
                      document.getElementById('sub-menu-features');
                    if (featureSubMenu) {
                      featureSubMenu.style.display = 'block';
                    }
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      const featureSubMenu =
                        document.getElementById('sub-menu-features');
                      if (featureSubMenu) {
                        featureSubMenu.style.display = 'none';
                      }
                    }, 1000);
                  }}
                  onMouseMove={() => {
                    const featureSubMenu =
                      document.getElementById('sub-menu-features');
                    if (featureSubMenu) {
                      featureSubMenu.style.display = 'block';
                    }
                  }}
                >
                  <a className="sf-with-ul">
                    <span className="menu-title-text">Features</span>
                    <span className="sf-sub-indicator">
                      <ChevronDownIcon />
                    </span>
                  </a>
                  <div
                    id="sub-menu-features"
                    className="sub-menu-features tracked-pos"
                    onMouseLeave={() => {
                      setTimeout(() => {
                        const featureSubMenu =
                          document.getElementById('sub-menu-features');
                        if (featureSubMenu) {
                          featureSubMenu.style.display = 'none';
                        }
                      }, 1000);
                    }}
                  >
                    <div
                      id="menu-item-3118"
                      className="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-3118"
                    >
                      <a
                        href="https://producthq.io/upvotes/"
                        className="sf-with-ul"
                      >
                        <span className="menu-title-text">Upvotes</span>
                      </a>
                    </div>
                    <div
                      id="menu-item-3117"
                      className="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-3117"
                    >
                      <a
                        href="https://producthq.io/roadmaps/"
                        className="sf-with-ul"
                      >
                        <span className="menu-title-text">Roadmaps</span>
                      </a>
                    </div>
                    <div
                      id="menu-item-3116"
                      className="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-3116"
                    >
                      <a
                        href="https://producthq.io/whats-new/"
                        className="sf-with-ul"
                      >
                        <span className="menu-title-text">What&apos;s New</span>
                      </a>
                    </div>
                  </div>
                </li>
                <li
                  id="menu-item-3285"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-238 current_page_item nectar-regular-menu-item menu-item-250"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }
                  }}
                >
                  <a
                    href="https://producthq.io/producthq-demo/"
                    aria-current="page"
                    className="sf-with-ul"
                  >
                    <span className="menu-title-text">Demo</span>
                  </a>
                </li>
                <li
                  id="menu-item-3354"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-238 current_page_item nectar-regular-menu-item menu-item-250"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }
                  }}
                >
                  <a
                    href="https://producthq.io/book-a-demo/"
                    aria-current="page"
                    className="sf-with-ul"
                  >
                    <span className="menu-title-text">Book A Demo</span>
                  </a>
                </li>
                <li
                  id="menu-item-1163"
                  className="menu-item menu-item-type-custom menu-item-object-custom nectar-regular-menu-item menu-item-1163"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }
                  }}
                >
                  <a
                    href="https://app.producthq.io/pricing"
                    className="sf-with-ul"
                  >
                    <span className="menu-title-text" style={pricingStyle}>
                      Pricing
                    </span>
                  </a>
                </li>
                <li
                  id="menu-item-252"
                  className="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-252"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }
                  }}
                >
                  <a href="https://producthq.io/faqs/" className="sf-with-ul">
                    <span className="menu-title-text">FAQs</span>
                  </a>
                </li>
                <li
                  id="menu-item-1168"
                  className="menu-item menu-item-type-custom menu-item-object-custom nectar-regular-menu-item menu-item-1168"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }
                  }}
                >
                  <a
                    href="https://feedback.producthq.io"
                    className="sf-with-ul"
                  >
                    <span className="menu-title-text">Feedback</span>
                  </a>
                </li>
                <li
                  id="menu-item-297"
                  className="menu-item menu-item-type-post_type menu-item-object-page nectar-regular-menu-item menu-item-297"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }
                  }}
                >
                  <a
                    href="https://producthq.io/producthq-blog/"
                    className="sf-with-ul"
                  >
                    <span className="menu-title-text">Blog</span>
                  </a>
                </li>
                <li
                  id="menu-item-3310"
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children nectar-regular-menu-item sf-with-ul menu-item-3310"
                  onMouseEnter={() => {
                    const trackedPos = document.getElementsByClassName(
                      'tracked-pos'
                    ) as HTMLCollectionOf<HTMLDivElement>;
                    for (let i = 0; i < trackedPos.length; i++) {
                      const element = trackedPos[i];
                      element.style.display = 'none';
                    }

                    const resourceSubMenu =
                      document.getElementById('sub-menu-resources');
                    if (resourceSubMenu) {
                      resourceSubMenu.style.display = 'block';
                    }
                  }}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      const resourceSubMenu =
                        document.getElementById('sub-menu-resources');
                      if (resourceSubMenu) {
                        resourceSubMenu.style.display = 'none';
                      }
                    }, 1000);
                  }}
                  onMouseMove={() => {
                    const resourceSubMenu =
                      document.getElementById('sub-menu-resources');
                    if (resourceSubMenu) {
                      resourceSubMenu.style.display = 'block';
                    }
                  }}
                >
                  <a className="sf-with-ul">
                    <span className="menu-title-text">Resources</span>
                    <span className="sf-sub-indicator">
                      <ChevronDownIcon />
                    </span>
                  </a>
                  <div
                    id="sub-menu-resources"
                    className="sub-menu-resources tracked-pos"
                    onMouseLeave={() => {
                      setTimeout(() => {
                        const resourceSubMenu =
                          document.getElementById('sub-menu-resources');
                        if (resourceSubMenu) {
                          resourceSubMenu.style.display = 'none';
                        }
                      }, 1000);
                    }}
                  >
                    <div
                      id="menu-item-3481"
                      className="menu-item menu-item-type-custom menu-item-object-custom nectar-regular-menu-item menu-item-3481"
                    >
                      <a
                        href="https://funnel.producthq.io/product-hq-opt-in-page-page"
                        className="sf-with-ul"
                      >
                        <span className="menu-title-text">
                          Product Prioritisation
                        </span>
                      </a>
                    </div>
                  </div>
                </li>
                <img
                  width={1}
                  // height={1}
                  src="https://producthq.io/wp-content/uploads/2023/02/Horizontal-Divider.svg"
                  className="nectar-menu-icon-img entered lazyloaded"
                  decoding="async"
                  data-lazy-src="https://producthq.io/wp-content/uploads/2023/02/Horizontal-Divider.svg"
                  data-ll-status="loaded"
                  style={{ marginLeft: '12px', marginRight: '12px' }}
                />
                <noscript>
                  <img
                    width={1}
                    height={1}
                    src="https://producthq.io/wp-content/uploads/2023/02/Horizontal-Divider.svg"
                    className="nectar-menu-icon-img"
                    alt=""
                    decoding="async"
                  />
                </noscript>
                {!is_logged_in && (
                  <>
                    <li
                      id="menu-item-949"
                      className="menu-item menu-item-type-custom menu-item-object-custom nectar-regular-menu-item menu-item-has-icon menu-item-949"
                    >
                      <a href={`http://${window.location.host}/sign-in`}>
                        <span className="menu-title-text">Sign in</span>
                      </a>
                    </li>
                    <li
                      id="menu-item-950"
                      className="menu-item menu-item-type-custom menu-item-object-custom button_solid_color_2 menu-item-950"
                    >
                      <a
                        href={`http://${window.location.host}/sign-up`}
                        style={{
                          backgroundColor: '#ff6b3d',
                          paddingBottom: '10px',
                          paddingTop: '10px',
                          height: '34px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <span className="menu-title-text">
                          Start free trial
                        </span>
                      </a>
                    </li>
                  </>
                )}
              </ul>
              <ul className="buttons sf-menu"> </ul>
            </nav>
          </div>
        </div>
      </div>
      {isAuthenticated() && (
        <>
          <Notifications />
          <UserMenu user={user?.user} onNavigate={handleNavigation} />
          {!is_public && (
            <div className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-[12px] font-medium rounded">
              Admin
            </div>
          )}
        </>
      )}
    </nav>
  );
};

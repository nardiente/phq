import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Banner from '../components/Banner';
import { SidebarMenu } from '../components/layout/SidebarMenu';
import moment from 'moment';
import { AddYourBoardModal } from '../components/AddYourBoardModal';
import { SidePanel } from '../components/SidePanel';
import Footer from '../components/Footer';
import { PageType } from '../types/app';

const AppRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const { isAuthenticated, user: userDetails, showBanner } = useUser();
  const { project, user } = userDetails ?? {};

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [remindAddBoard, setRemindAddBoard] = useState<boolean | undefined>();

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  const onbordingPaths = [
    '/ob-board',
    '/ob-idea',
    '/ob-tags',
    '/ob-survey',
    '/ob-success',
    '/pricing',
  ];

  const pathExceptions = [
    '/forgot-password',
    '/reset-password',
    '/sign-in',
    '/sign-in/google',
    '/sign-up',
  ];

  const publicPagePaths = ['/upvotes', '/roadmap', '/posts'];

  const handleNavigation = useCallback(
    (page: PageType) => {
      setCurrentPage(page);
      navigate('/' + page.toString());
    },
    [navigate]
  );

  useEffect(() => {
    let pageType: PageType = pathname.slice(1) as PageType;

    if (!is_public) {
      if (
        ![...pathExceptions, ...onbordingPaths].includes(pathname) ||
        (pathExceptions.includes(pathname) && search.length === 0)
      ) {
        if (pathname.slice(1).length === 0) {
          pageType = 'dashboard';
        }
        if (showBanner) {
          pageType = 'billing';
        }
      }
    } else {
      if (![...pathExceptions, ...publicPagePaths].includes(pathname)) {
        pageType = 'upvotes';
      }
    }

    handleNavigation(pageType);
  }, [pathname]);

  useEffect(() => {
    setRemindAddBoard(
      !is_public &&
        project !== undefined &&
        user &&
        !user.stop_remind_add_board &&
        (!user.remind_3_days ||
          (user.remind_3_days &&
            moment().diff(moment(user.remind_3_days_timestamp), 'minutes') >=
              4320))
    );
  }, [user]);

  return (
    <div className="bg-white">
      {isAuthenticated() || (!isAuthenticated() && is_public) ? (
        <>
          <div className="min-h-screen bg-[#fafafa] flex">
            {!pathExceptions.includes(pathname) && (
              <SidebarMenu
                activeItem={
                  currentPage === 'settings' ? 'account' : currentPage
                }
                onNavigate={handleNavigation}
              />
            )}
            <div className="flex-1">
              {!pathExceptions.includes(pathname) && (
                <Banner onNavigate={handleNavigation} />
              )}
              <Outlet />
              <AddYourBoardModal open={remindAddBoard ?? false} />
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
      <SidePanel />
      <Footer />
    </div>
  );
};

export default AppRoute;

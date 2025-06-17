import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Banner from '../components/Banner';
import { SidebarMenu } from '../components/layout/SidebarMenu';
import { SidePanel } from '../components/SidePanel';
import Footer from '../components/Footer';
import { onbordingPaths, PageType, pathExceptions } from '../types/app';
import { useFeedback } from '../contexts/FeedbackContext';
import { useSocket } from '../contexts/SocketContext';
import { SocketAction } from '../types/socket';
import { useApp } from '../contexts/AppContext';

const AppRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const { is_public } = useApp();
  const { handleGetStatus, handleListTag } = useFeedback();
  const {
    loaded,
    user: userDetails,
    showBanner,
    handleGetUser,
    isAuthenticated,
    setUser,
  } = useUser();
  const { project } = userDetails ?? {};
  const {
    state: { action, message },
    setAction,
  } = useSocket();

  const [currentPage, setCurrentPage] = useState<PageType>(
    pathname.slice(1) as PageType
  );

  const handleNavigation = useCallback(
    (page: PageType) => {
      setCurrentPage(page);
      navigate('/' + page.toString());
    },
    [navigate]
  );

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (
      !project?.id ||
      !message?.data.projectId ||
      project.id !== message.data.projectId
    ) {
      return;
    }

    if (action === SocketAction.UPDATE_APPEARANCE) {
      setUser((prev) => ({ ...prev, appearance: message.data.appearance }));
    }
    setAction();
  }, [action]);

  useEffect(() => {
    setCurrentPage(pathname.slice(1).split('/')[0] as PageType);
    if (!is_public) {
      if (
        ![...pathExceptions, ...onbordingPaths].includes(pathname) ||
        (pathExceptions.includes(pathname) && search.length === 0)
      ) {
        if (pathname.slice(1).length === 0) {
          handleNavigation('dashboard');
        }
        if (showBanner) {
          handleNavigation('billing');
        }
      }
    } else {
      if (pathname.slice(1).length === 0 && project) {
        handleNavigation('upvotes');
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (is_public && loaded && !project) {
      navigate('/404');
    }
  }, [loaded]);

  useEffect(() => {
    if (project?.id) {
      handleGetStatus();
      handleListTag();
    }
  }, [project]);

  return (
    <div className={is_public ? 'background-color' : 'bg-white'}>
      {isAuthenticated() || (!isAuthenticated() && is_public) ? (
        <>
          <div
            className={`min-h-screen flex ${is_public ? 'background-color' : 'bg-[#fafafa]'}`}
          >
            {!pathExceptions.includes(pathname) && !is_public && (
              <SidebarMenu
                activeItem={
                  currentPage === 'settings' ? 'account' : currentPage
                }
                onNavigate={handleNavigation}
                setCurrentPage={setCurrentPage}
              />
            )}
            <div className="flex-1">
              {!pathExceptions.includes(pathname) && (
                <Banner
                  activeItem={currentPage}
                  onNavigate={handleNavigation}
                />
              )}
              <Outlet />
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

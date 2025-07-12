import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Banner from '../components/Banner';
import { SidebarMenu } from '../components/layout/SidebarMenu';
import Footer from '../components/Footer';
import { onbordingPaths, PageType, pathExceptions } from '../types/app';
import { Permissions } from '../types/common';
import { useApp } from '../contexts/AppContext';
import { isSuperDuperAdmin } from '../utils/user';
import { getImpersonator } from '../utils/localStorage';
import { SidePanel } from '../components/SidePanel';

const AppRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const { is_public } = useApp();
  const {
    loaded,
    user: userDetails,
    showBanner,
    handleGetUser,
    isAuthenticated,
    setShowBanner,
  } = useUser();
  const {
    admin_profile,
    permissions = [],
    project,
    subscription,
    user,
  } = userDetails ?? {};
  const { id: projectId } = project ?? {};

  const [currentPage, setCurrentPage] = useState<PageType>(
    pathname.slice(1) as PageType
  );

  const impersonator = getImpersonator();
  const userProfile = is_public ? admin_profile : user;

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
    setCurrentPage(pathname.slice(1).split('/')[0] as PageType);
    if (projectId) {
      if (!is_public) {
        if (
          ![...pathExceptions, ...onbordingPaths].includes(pathname) ||
          (pathExceptions.includes(pathname) && search.length === 0)
        ) {
          if (pathname.slice(1).length === 0) {
            handleNavigation(
              isSuperDuperAdmin(userProfile) ? 'super-duper-admin' : 'dashboard'
            );
          }
          if (showBanner) {
            handleNavigation('billing');
          }
        }
      }
      if (is_public && pathname.slice(1).length === 0) {
        handleNavigation('upvotes');
      }
    }
    if (is_public && loaded && !projectId) {
      navigate('/404');
    }
  }, [loaded, pathname, projectId]);

  return (
    <>
      {!is_public && isAuthenticated() && impersonator && impersonator.id && (
        <div className="w-full bg-purple-700 text-white font-semibold py-[8px] text-center fixed top-[0] left-[0] z-[2000]">
          {`Super Duper admin "${
            impersonator.full_name ||
            impersonator.email ||
            `User #${impersonator.id}`
          }" is active`}
        </div>
      )}
      {/* Spacer for fixed impersonator bar */}
      {impersonator && impersonator.id && <div className="h-[40px]" />}
      {showBanner === true && (
        <div className="restrict-banner">
          <div className="content">
            {!permissions.includes(Permissions.ADD_IDEA) &&
            (permissions.length ?? 0) > 0 ? (
              <>
                You&apos;ve reached your plan limit, you may top up{' '}
                <a href="/pricing">here</a>.
              </>
            ) : (
              <>
                {subscription?.is_trial ? 'Your trial has ended. ' : ''}
                You have limited access to your account.
              </>
            )}

            <button onClick={() => setShowBanner(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
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
    </>
  );
};

export default AppRoute;

import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Banner from '../components/Banner';
import { SidebarMenu } from '../components/layout/SidebarMenu';
import moment from 'moment';
import { AddYourBoardModal } from '../components/AddYourBoardModal';
import { SidePanel } from '../components/SidePanel';
import { PageType } from '../types/app';
import { useApp } from '../contexts/AppContext';

type ProtectedRouteProps = {
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = '/sign-in',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { is_public } = useApp();
  const { isAuthenticated, user: userDetails, showBanner } = useUser();
  const { project, user } = userDetails ?? {};

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [remindAddBoard, setRemindAddBoard] = useState<boolean | undefined>();

  const handleNavigation = useCallback(
    (page: PageType) => {
      setCurrentPage(page);
      navigate('/' + page.toString());
    },
    [navigate]
  );

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(redirectTo);
    }
  }, []);

  useEffect(() => {
    let pathname = location.pathname.slice(1);
    if (pathname !== 'pricing') {
      if (pathname.length === 0) {
        pathname = 'dashboard';
      }
      if (showBanner) {
        pathname = 'billing';
      }
      handleNavigation(pathname as PageType);
    }
  }, [location.pathname, showBanner, handleNavigation]);

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
    <>
      <div
        className={`min-h-screen ${is_public ? 'background-color' : 'bg-[#fafafa]'} flex`}
      >
        <SidebarMenu
          activeItem={currentPage === 'settings' ? 'account' : currentPage}
          onNavigate={handleNavigation}
        />
        <div className="flex-1">
          <Banner onNavigate={handleNavigation} />
          <Outlet />
          <AddYourBoardModal open={remindAddBoard ?? false} />
        </div>
      </div>
      <SidePanel />
    </>
  );
};

export default ProtectedRoute;

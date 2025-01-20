import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Banner from '../components/Banner';
import { SidebarMenu } from '../components/layout/SidebarMenu';

export type PageType =
  | 'home'
  | 'settings'
  | 'account'
  | 'boost'
  | 'create-boost'
  | 'project'
  | 'appearance'
  | 'moderation'
  | 'emails'
  | 'tags'
  | 'team'
  | 'billing'
  | 'import'
  | 'dashboard'
  | 'activity'
  | 'mentions'
  | 'matrix'
  | 'widgets'
  | 'surveys'
  | 'testimonials'
  | 'sign-in'
  | 'upvotes'
  | 'roadmap'
  | 'docs'
  | 'submit-feature'
  | 'our-roadmap';

type ProtectedRouteProps = {
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = '/sign-in',
}) => {
  const navigate = useNavigate();

  const { isAuthenticated, showBanner } = useUser();

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  useEffect(() => {
    let pathname = location.pathname.slice(1);
    if (pathname.length === 0) {
      pathname = 'dashboard';
    }
    setCurrentPage(pathname as PageType);
  }, [location.pathname]);

  useEffect(() => {
    if (showBanner) {
      setCurrentPage('billing');
      navigate('/billing');
    }
  }, [showBanner]);

  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    navigate('/' + page.toString());
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      <SidebarMenu
        activeItem={currentPage === 'settings' ? 'account' : currentPage}
        onNavigate={handleNavigation}
      />
      <div className="flex-1">
        <Banner onNavigate={handleNavigation} />
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import { SidebarMenu } from '../components/layout/SidebarMenu';
import { getKaslKey } from '../utils/localStorage';

// Mock function to check if the user is authenticated
const isAuthenticated = (): boolean => {
  return getKaslKey() !== null;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

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

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  useEffect(() => {
    setCurrentPage(location.pathname.slice(1) as PageType);
  }, [location]);

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
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
        {children}
      </div>
    </div>
  );
};

export default ProtectedRoute;

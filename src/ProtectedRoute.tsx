import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { DropdownProvider } from './contexts/DropdownContext';
import Banner from './components/Banner';
import { BoostProvider } from './contexts/BoostContext';
import { UnsavedChangesProvider } from './contexts/UnsavedChangesContext';
import { SidebarMenu } from './components/layout/SidebarMenu';
import { UserProvider } from './contexts/UserContext';
import { getKaslKey } from './utils/cookie';

// Mock function to check if the user is authenticated
const isAuthenticated = (): boolean => {
  return getKaslKey() !== undefined;
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

  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
  }

  const handleNavigation = (page: PageType) => {
    console.log({ page });
    setCurrentPage(page);
    navigate('/' + page.toString());
  };

  return (
    <UserProvider>
      <DropdownProvider>
        <UnsavedChangesProvider>
          <BoostProvider>
            <div className="min-h-screen bg-[#fafafa] flex">
              <SidebarMenu
                activeItem={
                  currentPage === 'settings' ? 'account' : currentPage
                }
                onNavigate={handleNavigation}
              />
              <div className="flex-1">
                <Banner onNavigate={setCurrentPage} />
                {children}
              </div>
            </div>
          </BoostProvider>
        </UnsavedChangesProvider>
      </DropdownProvider>
    </UserProvider>
  );
};

export default ProtectedRoute;

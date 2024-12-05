import React, { useState } from 'react';
import Banner from './components/Banner';
import { AccountSettings } from './pages/AccountSettings';
import BoostPage from './pages/BoostPage';
import WidgetsPage from './pages/WidgetsPage';
import CreateBoostPage from './pages/CreateBoostPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AppearancePage from './pages/AppearancePage';
import ModerationPage from './pages/ModerationPage';
import EmailsPage from './pages/EmailsPage';
import TagsPage from './pages/TagsPage';
import TeamMembersPage from './pages/TeamMembersPage';
import BillingPage from './pages/BillingPage';
import ImportIdeasPage from './pages/ImportIdeasPage';
import DashboardPage from './pages/DashboardPage';
import TestimonialsPage from './pages/TestimonialsPage';
import { DropdownProvider } from './contexts/DropdownContext';
import { UnsavedChangesProvider } from './contexts/UnsavedChangesContext';
import { BoostProvider } from './contexts/BoostContext';
import { SidebarMenu } from './components/layout/SidebarMenu';

type PageType =
  | 'home'
  | 'settings'
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
  | 'sign-in';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const getCurrentPage = () => {
    switch (currentPage) {
      case 'sign-in':
        return <></>;
      case 'dashboard':
        return <DashboardPage />;
      case 'settings':
        return <AccountSettings onCancel={() => setCurrentPage('home')} />;
      case 'create-boost':
        return <CreateBoostPage onBack={() => setCurrentPage('home')} />;
      case 'project':
        return <ProjectDetailsPage />;
      case 'appearance':
        return <AppearancePage />;
      case 'moderation':
        return <ModerationPage />;
      case 'emails':
        return <EmailsPage />;
      case 'tags':
        return <TagsPage />;
      case 'team':
        return <TeamMembersPage />;
      case 'billing':
        return <BillingPage />;
      case 'import':
        return <ImportIdeasPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'widgets':
        return <WidgetsPage />;
      default:
        return <BoostPage onNavigate={() => setCurrentPage('create-boost')} />;
    }
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'account':
        setCurrentPage('settings');
        break;
      case 'boost':
        setCurrentPage('home');
        break;
      case 'project':
      case 'appearance':
      case 'moderation':
      case 'emails':
      case 'tags':
      case 'team':
      case 'billing':
      case 'import':
      case 'dashboard':
      case 'activity':
      case 'mentions':
      case 'matrix':
      case 'widgets':
      case 'surveys':
      case 'testimonials':
        setCurrentPage(page as PageType);
        break;
    }
  };

  return (
    <DropdownProvider>
      <UnsavedChangesProvider>
        <BoostProvider>
          <div className="min-h-screen bg-[#fafafa] flex">
            <SidebarMenu
              activeItem={currentPage === 'settings' ? 'account' : currentPage}
              onNavigate={handleNavigation}
            />
            <div className="flex-1">
              <Banner onNavigate={setCurrentPage} />
              {getCurrentPage()}
            </div>
          </div>
        </BoostProvider>
      </UnsavedChangesProvider>
    </DropdownProvider>
  );
}

export default App;

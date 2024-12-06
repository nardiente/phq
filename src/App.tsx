import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import { AccountSettings } from './pages/AccountSettings';
import CreateBoostPage from './pages/CreateBoostPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AppearancePage from './pages/AppearancePage';
import ModerationPage from './pages/ModerationPage';
import EmailsPage from './pages/EmailsPage';
import TagsPage from './pages/TagsPage';
import TeamMembersPage from './pages/TeamMembersPage';
import BillingPage from './pages/BillingPage';
import ImportIdeasPage from './pages/ImportIdeasPage';
import TestimonialsPage from './pages/TestimonialsPage';
import WidgetsPage from './pages/WidgetsPage';
import BoostPage from './pages/BoostPage';
import { SignupPage } from './pages/SignupPage';
import { UserProvider } from './contexts/UserContext';
import { LoginPage } from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/sign-in"
          element={
            <UserProvider>
              <LoginPage />
            </UserProvider>
          }
        />
        <Route path="/sign-up" element={<SignupPage />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boost"
          element={
            <ProtectedRoute>
              <BoostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-boost"
          element={
            <ProtectedRoute>
              <CreateBoostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appearance"
          element={
            <ProtectedRoute>
              <AppearancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderation"
          element={
            <ProtectedRoute>
              <ModerationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emails"
          element={
            <ProtectedRoute>
              <EmailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tags"
          element={
            <ProtectedRoute>
              <TagsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <TeamMembersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/import"
          element={
            <ProtectedRoute>
              <ImportIdeasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/widgets"
          element={
            <ProtectedRoute>
              <WidgetsPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

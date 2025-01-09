import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../pages/DashboardPage';
import { AccountSettings } from '../pages/Settings/AccountSettings';
import BoostPage from '../pages/BoostPage';
import CreateBoostPage from '../pages/CreateBoostPage';
import ProjectDetailsPage from '../pages/Settings/ProjectDetailsPage';
import AppearancePage from '../pages/Settings/AppearancePage';
import ModerationPage from '../pages/Settings/ModerationPage';
import EmailsPage from '../pages/EmailsPage';
import TagsPage from '../pages/Settings/TagsPage';
import TeamMembersPage from '../pages/Settings/TeamMembersPage';
import BillingPage from '../pages/Settings/BillingPage';
import ImportIdeasPage from '../pages/ImportIdeasPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import WidgetsPage from '../pages/WidgetsPage';
import { SSOVerifyingPage } from '../components/SSOVerifying';
import ForgotPasswordPage from '../pages/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-in/google" element={<SSOVerifyingPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

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
  );
};

export default AppRoutes;

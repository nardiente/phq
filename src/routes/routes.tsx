import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import AppRoute from './AppRoute';
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
import UpvotesPage from '../pages/Upvotes/UpvotesPage';
import { RoadmapPage } from '../pages/Roadmap/RoadmapPage';
import { WhatsNewPage } from '../pages/WhatsNew';
import { Suspense } from 'react';
import Fallback from './Fallback';
import SegmentsPage from '../pages/SegmentsPage';
import UserProfilesPage from '../pages/UserProfilesPage';
import PrioritizationPage from '../pages/PrioritizationPage';
import PricingPage from '../pages/Pricing';
import SuccessPage from '../pages/success/success';
import OnboardingPage from '../pages/onboarding/onboarding';
import ResetPasswordPage from '../pages/ResetPassword';
import FreeTrialPage from '../pages/FreeTrialPage';
import { LtdPage } from '../pages/LtdPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<AppRoute />}>
            {/* Public Routes */}
            <Route path="/" element={<Fallback />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-in/google" element={<SSOVerifyingPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/free-trial-plans" element={<FreeTrialPage />} />
            <Route path="/lifetime-deal" element={<LtdPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/ob-board" element={<OnboardingPage />} />
            <Route path="/ob-idea" element={<OnboardingPage />} />
            <Route path="/ob-tags" element={<OnboardingPage />} />
            <Route path="/ob-survey" element={<OnboardingPage />} />
            <Route path="/ob-success" element={<OnboardingPage />} />

            {/* Protected Route */}
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upvotes" element={<UpvotesPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/posts" element={<WhatsNewPage />} />
            <Route path="/boost" element={<BoostPage />} />
            <Route path="/create-boost" element={<CreateBoostPage />} />
            <Route path="/widgets" element={<WidgetsPage />} />
            <Route path="/segments" element={<SegmentsPage />} />
            <Route path="/profiles" element={<UserProfilesPage />} />
            <Route path="/prioritization" element={<PrioritizationPage />} />

            {/* Settings */}
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/project" element={<ProjectDetailsPage />} />
            <Route path="/appearance" element={<AppearancePage />} />
            <Route path="/moderation" element={<ModerationPage />} />
            <Route path="/team" element={<TeamMembersPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/emails" element={<EmailsPage />} />
            <Route path="/import" element={<ImportIdeasPage />} />

            <Route path="/testimonials" element={<TestimonialsPage />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

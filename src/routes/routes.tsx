import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import AppRoute from './AppRoute';
import DashboardPage from '../pages/DashboardPage';
import { AccountSettings } from '../pages/Settings/AccountSettings';
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
import WidgetsView from '../pages/widgets.tsx';
import { SSOVerifyingPage } from '../components/SSOVerifying';
import ForgotPasswordPage from '../pages/ForgotPassword';
import UpvotesPage from '../pages/Upvotes/UpvotesPage';
import { RoadmapPage } from '../pages/Roadmap/RoadmapPage';
import { WhatsNewPage } from '../pages/WhatsNew';
import { Suspense } from 'react';
import Fallback from './Fallback';
import UserProfilesPage from '../pages/UserProfilesPage';
import PrioritizationPage from '../pages/PrioritizationPage';
import PricingPage from '../pages/Pricing';
import SuccessPage from '../pages/success/success';
import OnboardingPage from '../pages/onboarding/onboarding';
import ResetPasswordPage from '../pages/ResetPassword';
import FreeTrialPage from '../pages/FreeTrialPage';
import { LtdPage } from '../pages/LtdPage';
import NotFoundPage from '../pages/NotFoundPage';
import { pathExceptions } from '../types/app';
import TestFetch from '../pages/TestFetch';
import DesignSystem from '../pages/DesignSystem';
import SegmentsPage from '../pages/SegmentsPage.tsx';
import WhatsNewPost from '../pages/WhatsNewPost/index.tsx';

// Add /test to exceptions at the top of the file
pathExceptions.push('/test');

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<AppRoute />}>
            {/* Add test route early in the list */}
            <Route path="/test" element={<TestFetch />} />

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
            <Route path="/success" element={<SuccessPage />} />

            {/* Protected Route */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/upvotes" element={<UpvotesPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/whatsnew" element={<WhatsNewPage />} />
            <Route path="/whatsnew/:post_id" element={<WhatsNewPost />} />
            <Route path="/widgets" element={<WidgetsView />} />
            <Route path="/widgets/page" element={<WidgetsPage />} />
            <Route path="/widgets/page/:id" element={<WidgetsPage />} />
            <Route path="/profiles" element={<UserProfilesPage />} />
            <Route path="/prioritization" element={<PrioritizationPage />} />
            <Route path="/segments" element={<SegmentsPage />} />

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

            {/* New route */}
            <Route path="/design" element={<DesignSystem />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

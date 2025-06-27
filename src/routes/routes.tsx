import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';
import AppRoute from './AppRoute';
import { SSOVerifyingPage } from '../components/SSOVerifying';
import ForgotPasswordPage from '../pages/ForgotPassword';
import { Suspense } from 'react';
import Fallback from './Fallback';
import PricingPage from '../pages/Pricing';
import SuccessPage from '../pages/success/success';
import OnboardingPage from '../pages/onboarding/onboarding';
import ResetPasswordPage from '../pages/ResetPassword';
import FreeTrialPage from '../pages/FreeTrialPage';
import { LtdPage } from '../pages/LtdPage';
import NotFoundPage from '../pages/NotFoundPage';
import TestFetch from '../pages/TestFetch';
import { useApp } from '../contexts/AppContext.tsx';
import { useUser } from '../contexts/UserContext.tsx';

const AppRoutes = () => {
  const { is_public, menuItems } = useApp();
  const { user: userContext } = useUser();
  const { admin_profile, user } = userContext ?? {};

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
            {menuItems.map((menuItem, idx) => (
              <Route
                key={idx}
                Component={menuItem.component}
                path={`/${menuItem.id}`}
              />
            ))}
          </Route>

          {/* Redirect unknown routes */}
          <Route
            path="*"
            element={
              menuItems.length > 0 &&
              ((is_public && admin_profile) || (!is_public && user)) ? (
                <NotFoundPage />
              ) : (
                <Fallback />
              )
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

import './PricingPage.css';
import PricingBanner from './PricingBanner';
import Faqs from './Faqs';
import Testimonials from './Testimonials';
import CompareFeatures from './CompareFeatures';
import { useEffect } from 'react';
import { getApi } from '../../utils/api/api';
import { useState } from 'react';
import { Feature, Plan } from '../../types/billing';
import { Header } from '../../components/Header';
import { getKaslKey } from '../../utils/localStorage';
import { getSessionToken } from '../../utils/localStorage';
import { useUser } from '../../contexts/UserContext';
import { PageType } from '../../routes/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { SidebarMenu } from '../../components/layout/SidebarMenu';
import Banner from '../../components/Banner';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { moderation } = user ?? {};

  const [plan, setPlan] = useState<Plan>({
    monthly: {
      plans: [
        {
          active: true,
          amount: 12,
          id: '',
          planName: 'Starter',
          price: '',
          product: { id: '', name: 'Start' },
          recurring: { interval: 'month', interval_count: 0 },
        },
        {
          active: true,
          amount: 25,
          id: '',
          planName: 'Growth',
          price: '',
          product: { id: '', name: 'Growth' },
          recurring: { interval: 'month', interval_count: 0 },
        },
        {
          active: true,
          amount: 49,
          id: '',
          planName: 'Scale',
          price: '',
          product: { id: '', name: 'Scale' },
          recurring: { interval: 'month', interval_count: 0 },
        },
      ],
      powerups: [
        {
          active: true,
          amount: 10,
          id: '',
          planName: 'Remove ProductHQ branding',
          price: '',
          product: { id: '', name: 'Remove ProductHQ branding' },
          recurring: { interval: 'month', interval_count: 0 },
        },
      ],
    },
    yearly: {
      plans: [
        {
          active: true,
          amount: 120,
          id: '',
          planName: 'Starter',
          price: '',
          product: { id: '', name: 'Start' },
          recurring: { interval: 'month', interval_count: 0 },
        },
        {
          active: true,
          amount: 250,
          id: '',
          planName: 'Growth',
          price: '',
          product: { id: '', name: 'Growth' },
          recurring: { interval: 'month', interval_count: 0 },
        },
        {
          active: true,
          amount: 490,
          id: '',
          planName: 'Scale',
          price: '',
          product: { id: '', name: 'Scale' },
          recurring: { interval: 'month', interval_count: 0 },
        },
      ],
      powerups: [
        {
          active: true,
          amount: 100,
          id: '',
          planName: 'Remove ProductHQ branding',
          price: '',
          product: { id: '', name: 'Remove ProductHQ branding' },
          recurring: { interval: 'month', interval_count: 0 },
        },
      ],
    },
  });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [tabView, setTabView] = useState<string>('monthly');
  const [currentPage, setCurrentPage] = useState<PageType>('pricing');

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const is_logged_in =
    getKaslKey() !== null ||
    (is_public &&
      moderation?.user_login === true &&
      getSessionToken() !== null);

  useEffect(() => {
    getPlans();
    listFeature();
  }, []);

  const getPlans = () => {
    getApi<Plan>({ url: 'billing/plans' }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setPlan(data);
      }
    });
  };

  const listFeature = () => {
    getApi<Feature[]>({ url: 'billing/features' }).then((res) => {
      if (res.results.data) {
        setFeatures(res.results.data);
      }
    });
  };

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
    navigate('/' + page.toString());
  };

  const pricing = (
    <>
      <PricingBanner
        features={features}
        plan={plan}
        tabView={tabView}
        setTabView={setTabView}
      />
      <Testimonials />
      <CompareFeatures plan={plan} tabView={tabView} setTabView={setTabView} />
      <Faqs />
    </>
  );

  if (is_logged_in || is_public) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex">
        <SidebarMenu activeItem={currentPage} onNavigate={handleNavigation} />
        <div className="flex-1">
          <Banner onNavigate={handleNavigation} />
          {pricing}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {pricing}
    </>
  );
};

export default PricingPage;

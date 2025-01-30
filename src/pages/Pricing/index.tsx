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

export const PricingPage: React.FC = () => {
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

  return (
    <>
      <Header />
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
};

export default PricingPage;

import { useEffect, useState } from 'react';
import FreeTrialBottomCta from '../components/FreeTrial/FreeTrialBottomCta';
import FreeTrialFeatures from '../components/FreeTrial/FreeTrialFeatures';
import FreeTrialHero from '../components/FreeTrial/FreeTrialHero';
import FreeTrialImageTextBlocks from '../components/FreeTrial/FreeTrialImageTextBlocks';
import FreeTrialPricingPlans from '../components/FreeTrial/FreeTrialPricingPlans';
import FreeTrialTestimonials from '../components/FreeTrial/FreeTrialTestimonials';
import FreeTrialVideo from '../components/FreeTrial/FreeTrialVideo';
import PerfectTipsTabs from '../components/FreeTrial/PerfectTipsTabs';
import CompareFeatures from './Pricing/CompareFeatures';
import Faqs from './Pricing/Faqs';
import { Plan } from '../types/billing';
import { getApi } from '../utils/api/api';
import '../styles/freetrialnew.css';

export default function FreeTrialPage() {
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
  const [tabView, setTabView] = useState<string>('Scale');

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = () => {
    getApi<Plan>({ url: 'billing/plans' }).then((res) => {
      if (res.results.data) {
        const data = res.results.data;
        setPlan(data);
      }
    });
  };

  return (
    <>
      <div className="landingHeader">
        <a href="https://producthq.io/">
          <img src="../../static/images/productHQ_logo.png" />
        </a>
      </div>
      <FreeTrialHero />
      <FreeTrialFeatures />
      <FreeTrialVideo />
      <FreeTrialImageTextBlocks />
      <PerfectTipsTabs />
      <FreeTrialTestimonials />
      <FreeTrialPricingPlans plan={plan} />
      <CompareFeatures plan={plan} tabView={tabView} setTabView={setTabView} />
      <Faqs />
      <FreeTrialBottomCta />
    </>
  );
}

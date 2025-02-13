import { useEffect, useState } from 'react';
import { LifetimeDeal } from '../types/billing';
import { getApi } from '../utils/api/api';
import { useNavigate } from 'react-router-dom';
import AboutUs from '../components/Ltd/AboutUs';
import Hero from '../components/Ltd/Hero';
import OurTools from '../components/Ltd/OurTools';
import PricesBlock from '../components/Ltd/PricesBlock';
import SaveBig from '../components/Ltd/SaveBig';
import SignupsSlider from '../components/Ltd/SignupsSlider';
import ImageTextBlocks from '../components/Ltd/ImageTextBlocks';
import FreeTrialCTA from '../components/Ltd/FreeTrialCTA';
import HowItWorks from '../components/Ltd/HowItWorks';
import ProjectStats from '../components/Ltd/ProjectStats';
import MoneyBackGuarntee from '../components/Ltd/MoneyBackGuarntee';
import Video from '../components/Ltd/Video';
import Testimonials from '../components/Ltd/Testimonials';
import Faqs from '../components/Ltd/Faqs';
import { Header } from '../components/Header';

export const LtdPage: React.FC = () => {
  const navigate = useNavigate();

  const [lifetimeDeal, setLifetimeDeal] = useState<LifetimeDeal>({
    deals: [
      {
        active: true,
        id: '',
        amount: 0,
        planName: '',
        price: '',
        product: { id: '', name: '' },
        recurring: { interval: '', interval_count: 0 },
      },
      {
        active: true,
        id: '',
        amount: 0,
        planName: '',
        price: '',
        product: { id: '', name: '' },
        recurring: { interval: '', interval_count: 0 },
      },
      {
        active: true,
        id: '',
        amount: 0,
        planName: '',
        price: '',
        product: { id: '', name: '' },
        recurring: { interval: '', interval_count: 0 },
      },
    ],
    subscription: null,
  });

  useEffect(() => {
    if (import.meta.env.SYSTEM_TYPE === 'public') {
      navigate('/upvotes');
      return;
    }
    getApi<LifetimeDeal>({ url: 'billing/lifetime-deals' }).then((res) => {
      if (res.results.data) {
        setLifetimeDeal(res.results.data);
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <OurTools />
      <ProjectStats />
      <PricesBlock id="first-price" lifetimeDeal={lifetimeDeal} />
      <Video />
      <ImageTextBlocks />
      <SignupsSlider />
      <Testimonials />
      <SaveBig />
      <ProjectStats />
      <PricesBlock id="second-price" lifetimeDeal={lifetimeDeal} />
      <MoneyBackGuarntee />
      <HowItWorks />
      <AboutUs />
      <Faqs />
      <FreeTrialCTA />
    </>
  );
};

export default LtdPage;

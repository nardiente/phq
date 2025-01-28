import { useEffect, useState } from 'react';
import { Subscription } from '../types/billing';
import { getApi } from '../utils/api/api';

const Footer = () => {
  const [fetching, setFetching] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const footer_exceptions = [
    '/sign-in',
    '/forgot-password',
    '/reset-password',
    '/sign-up',
    '/ob-board',
    '/ob-idea',
    '/ob-tags',
    '/ob-survey',
    '/ob-success',
    '/free-trial-plans',
  ];

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  const getSubscription = () => {
    setFetching(true);
    setSubscriptions([]);
    getApi<Subscription[]>({
      url: 'billing',
      params: {
        domain: window.location.host,
      },
    }).then((res) => {
      setFetching(false);
      if (res.results.data) {
        setSubscriptions(res.results.data);
      }
    });
  };

  useEffect(() => {
    getSubscription();
  }, []);

  return !fetching &&
    !subscriptions.some((subscription) =>
      subscription.items?.some(
        (item) =>
          subscription.status === 'active' &&
          (item.name.toLowerCase().includes('branding') ||
            item.name.toLowerCase() === 'scale')
      )
    ) &&
    !footer_exceptions.includes(window.location.pathname) &&
    !window.location.host.includes('producthq.io') &&
    is_public ? (
    <footer className="footer bg-white fixed bottom-0 right-0 w-fit pt-0 pl-1 pb-2 pr-2">
      <label className="text-[#09041a] text-[14px]">
        Powered by{' '}
        <a
          className="text-blue-800 hover:underline"
          href="http://producthq.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ProductHQ.io
        </a>
      </label>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;

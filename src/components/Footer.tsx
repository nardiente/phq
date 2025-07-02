import { useApp } from '../contexts/AppContext';
import { useUser } from '../contexts/UserContext';

const Footer = () => {
  const { is_public } = useApp();
  const { fetching, subscriptions } = useUser();

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

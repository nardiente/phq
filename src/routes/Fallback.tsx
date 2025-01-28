import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

const Fallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const { isAuthenticated } = useUser();

  const onbordingPaths = [
    '/ob-board',
    '/ob-idea',
    '/ob-tags',
    '/ob-survey',
    '/ob-success',
    '/pricing',
  ];

  const pathExceptions = [
    '/forgot-password',
    '/reset-password',
    '/sign-in',
    '/sign-in/google',
    '/sign-up',
  ];

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  useEffect(() => {
    if (
      !is_public &&
      (![...pathExceptions, ...onbordingPaths].includes(pathname) ||
        (pathExceptions.includes(pathname) && search.length === 0))
    ) {
      if (isAuthenticated() && pathname === '/sign-in') {
        navigate('/dashboard');
      }
      if (!isAuthenticated()) {
        navigate('/sign-in');
      }
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  );
};

export default Fallback;

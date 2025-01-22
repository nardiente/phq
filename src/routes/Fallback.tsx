import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

const Fallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useUser();

  const onbordingPaths = [
    '/ob-board',
    '/ob-idea',
    '/ob-tags',
    '/ob-survey',
    '/ob-success',
  ];

  const pathExceptions = [
    '/forgot-password',
    '/pricing',
    '/reset-password',
    '/sign-in',
    '/sign-in/google',
    '/sign-up',
  ];

  useEffect(() => {
    const { pathname, search } = location;
    if (
      ![...pathExceptions, ...onbordingPaths].includes(pathname) ||
      (pathExceptions.includes(pathname) && search.length === 0)
    ) {
      if (isAuthenticated() && pathname === '/sign-in') {
        navigate('/dashboard');
      }
      if (!isAuthenticated()) {
        navigate('/sign-in');
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  );
};

export default Fallback;

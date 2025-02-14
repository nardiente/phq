import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';
import { onbordingPaths } from '../types/app';
import { pathExceptions } from '../types/app';

const Fallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const {
    loaded,
    user: userDetails,
    handleGetUser,
    isAuthenticated,
  } = useUser();
  const { project, user } = userDetails ?? {};

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';
  const unprotectedPages = [
    '/',
    '/free-trial-plans',
    '/lifetime-deal',
    '/pricing',
  ];

  useEffect(() => {
    if (
      !is_public &&
      (![...pathExceptions, ...onbordingPaths].includes(pathname) ||
        (pathExceptions.includes(pathname) && search.length === 0))
    ) {
      if (isAuthenticated() && pathname === '/sign-in') {
        navigate('/dashboard');
        return;
      }
      if (!isAuthenticated() && !unprotectedPages.includes(pathname)) {
        navigate('/sign-in');
        return;
      }
    } else if (pathname.slice(1).length === 0 && project) {
      navigate('/upvotes');
    }
    handleGetUser();
  }, []);

  useEffect(() => {
    if (is_public && loaded && !project) {
      navigate('/404');
    }
  }, [loaded]);

  useEffect(() => {
    if (is_public && pathname.slice(1).length === 0) {
      navigate('/upvotes');
    }
  }, [user]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      Loading...
    </div>
  );
};

export default Fallback;

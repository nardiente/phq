import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';
import { onbordingPaths } from '../types/app';
import { pathExceptions } from '../types/app';
import { useApp } from '../contexts/AppContext';
import { isSuperDuperAdmin } from '../utils/user';

const Fallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const { is_public } = useApp();
  const { loaded, user: userDetails, isAuthenticated } = useUser();
  const { project, user } = userDetails ?? {};

  const unprotectedPages = [
    '/',
    '/free-trial-plans',
    '/lifetime-deal',
    '/pricing',
  ];

  useEffect(() => {
    if (is_public && loaded && !project) {
      navigate('/404');
    }
    if (
      !is_public &&
      (![...pathExceptions, ...onbordingPaths].includes(pathname) ||
        (pathExceptions.includes(pathname) && search.length === 0))
    ) {
      if (
        isAuthenticated() &&
        (pathname === '/sign-in' || pathname === '/') &&
        user
      ) {
        navigate(isSuperDuperAdmin(user) ? '/super-duper-user' : '/dashboard');
        return;
      }
      if (!isAuthenticated() && !unprotectedPages.includes(pathname)) {
        navigate('/sign-in');
        return;
      }
    }
    if (is_public && pathname.slice(1).length === 0) {
      navigate('/upvotes');
    }
  }, [is_public, loaded, project, user]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      Loading...
    </div>
  );
};

export default Fallback;

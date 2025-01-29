import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';
import { onbordingPaths } from '../types/app';
import { pathExceptions } from '../types/app';

const Fallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const { isAuthenticated } = useUser();

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

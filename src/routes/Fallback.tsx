import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

const Fallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  );
};

export default Fallback;

import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Fallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  if (isAuthenticated()) {
    navigate('/dashboard');
  } else {
    navigate('/sign-in');
  }

  return (
    <div className="h-screen flex items-center justify-center">Loading...</div>
  );
};

export default Fallback;

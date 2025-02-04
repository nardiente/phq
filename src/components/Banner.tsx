import { UserMenu } from './UserMenu';
import { useUser } from '../contexts/UserContext';
import { Notifications } from './Notifications';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface BannerProps {
  onNavigate: (page: 'home' | 'account') => void;
}

function Banner({ onNavigate }: BannerProps) {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useUser();

  const is_public = import.meta.env.VITE_SYSTEM_TYPE === 'public';

  return (
    <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center justify-end sticky top-0 z-50 pr-5">
      <div className="flex items-center gap-3">
        {isAuthenticated() || (is_public && user?.user?.id) ? (
          <>
            <Notifications />
            <UserMenu user={user?.user} onNavigate={onNavigate} />
          </>
        ) : (
          <>
            <Button
              className="sign-in"
              text="Sign in"
              onClick={() => navigate('/sign-in')}
              variant="outline"
            />
            <Button
              className="sign-up"
              text="Sign up"
              onClick={() => navigate('/sign-up')}
            />
          </>
        )}
        {!is_public && (
          <div className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-[12px] font-medium rounded">
            Admin
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;

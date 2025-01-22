import { UserMenu } from './UserMenu';
import { useUser } from '../contexts/UserContext';
import { Notifications } from './Notifications';

interface BannerProps {
  onNavigate: (page: 'home' | 'account') => void;
}

function Banner({ onNavigate }: BannerProps) {
  const { user } = useUser();

  return (
    <div className="w-full h-[60px] bg-white border-b border-gray-200 flex items-center justify-end sticky top-0 z-50">
      <div className="pr-6 flex items-center gap-3">
        <Notifications />
        <UserMenu user={user?.user} onNavigate={onNavigate} />
        <div className="px-2 py-1 bg-[#EEF2FF] text-[#6366F1] text-[12px] font-medium rounded">
          Admin
        </div>
      </div>
    </div>
  );
}

export default Banner;

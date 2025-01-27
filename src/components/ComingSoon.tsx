import { Clock } from 'lucide-react';

export function ComingSoon() {
  return (
    <div className="h-full w-full flex items-center justify-center opacity-25 gap-1">
      <div>
        <Clock size={18} className="text-gray-400" />
      </div>
      <div className="py-1 bg-purple-50 text-[#5A00CD] text-xs font-medium rounded">
        COMING SOON
      </div>
    </div>
  );
}

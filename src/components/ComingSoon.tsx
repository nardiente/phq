import React from 'react';
import { Clock } from 'lucide-react';

export function ComingSoon() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center opacity-25">
      <div className="mb-4">
        <Clock size={48} className="text-gray-400" />
      </div>
      <div className="px-3 py-1 bg-purple-50 text-[#5A00CD] text-xs font-medium rounded">
        COMING SOON
      </div>
    </div>
  );
}

import React from "react";
import { Star, ChevronRight } from "lucide-react";
import { FC } from 'react';

const InlineWithIcons: FC = () => {
 return (
  <div className="flex space-x-5">
   {/* Badge 1 */}
   <div className="flex items-center space-x-1 border border-gray-300 rounded-md px-1.5 py-1">
    <Star className="w-3 h-3 text-gray-700" />
    <div className="flex items-center space-x-2">
     <span className="text-xs font-bold text-gray-900">ProductHQ</span>
    </div>
   </div>

   {/* Badge 2 */}
   <div className="flex items-center space-x-1 border border-gray-300 rounded-md px-1.5 py-1">
    <div className="flex items-center space-x-2">
     <span className="text-xs font-bold text-gray-900">ProductHQ</span>
    </div>
    <ChevronRight className="w-3 h-3 text-gray-700" />
   </div>

   {/* Badge 3 */}
   <div className="flex items-center space-x-1 border border-gray-300 rounded-md px-1.5 py-1">
    <Star className="w-3 h-3 text-gray-700" />
    <div className="flex items-center space-x-2">
     <span className="text-xs font-bold text-gray-900">ProductHQ</span>
    </div>
    <ChevronRight className="w-3 h-3 text-gray-700" />
   </div>
  </div>
 );
};

export default InlineWithIcons; 
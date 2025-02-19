import React from "react";
import { FC } from 'react';

const NumberBadges: FC = () => {
 return (
  <div className="flex space-x-5">
   {/* Badge 1 */}
   <div className="flex items-center justify-center bg-purple-700 text-white text-sm font-bold rounded-md px-1.5 py-1">
    <span className="text-xs">5</span>
   </div>

   {/* Badge 2 */}
   <div className="flex items-center justify-center border border-gray-300 text-gray-800 text-sm font-bold rounded-full px-1.5 py-1">
    <span className="text-xs">5</span>
   </div>

   {/* Badge 3 */}
   <div className="flex items-center justify-center bg-purple-200 text-purple-700 text-sm font-bold rounded-md px-1.5 py-1">
    <span className="text-xs">9+</span>
   </div>

   {/* Badge 4 */}
   <div className="flex items-center justify-center border border-gray-300 text-gray-800 text-sm font-bold rounded-full px-1.5 py-1">
    <span className="text-xs">9+</span>
   </div>
  </div>
 );
};

export default NumberBadges; 
import React from 'react';
import { FC } from 'react';

const BadgeColorVariants1: FC = () => {
 return (
  <div className="flex flex-col space-y-4 w-[150px] h-full">
   <div className="text-[15px] font-medium text-[#475566] leading-[20px] tracking-[-0.4px]">
    Rounded
   </div>
   <div className="flex items-center justify-center bg-badge-soft rounded-[5px] px-2 py-1 h-[26px]">
    <span className="text-[12px] font-bold text-badge-solid leading-[16px]">
     Badge
    </span>
   </div>
  </div>
 );
};

export default BadgeColorVariants1; 
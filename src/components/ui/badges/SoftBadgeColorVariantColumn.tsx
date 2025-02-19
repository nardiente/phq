import React from 'react';
import { FC } from 'react';

const SoftBadgeColorVariantColumn: FC = () => {
 return (
  <div className="flex flex-col space-y-4 w-[150px]">
   <h6 className="text-[15px] font-medium text-[#475466] tracking-[-0.4px]">
    Soft
   </h6>
   <div className="flex items-center justify-center bg-soft-badge-DEFAULT rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text1">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-100 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text2">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-200 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text3">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-300 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text4">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-400 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text5">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-500 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text6">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-600 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text7">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-700 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text8">Badge</span>
   </div>
   <div className="flex items-center justify-center bg-soft-badge-800 rounded-[5px] px-2 py-1">
    <span className="text-[12px] font-bold text-soft-badge-text9">Badge</span>
   </div>
  </div>
 );
};

export default SoftBadgeColorVariantColumn; 
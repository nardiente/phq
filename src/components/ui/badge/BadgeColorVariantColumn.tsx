import React from 'react';
import { FC } from 'react';

const BadgeColorVariantColumn: FC = () => {
 return (
  <div className="flex flex-col space-y-4 w-[150px]">
   <h6 className="text-[15px] font-medium text-[#475466] tracking-[-0.4px]">
    Outlined
   </h6>
   <div className="flex items-center justify-center border border-outlined-badge-DEFAULT rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text1">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-100 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text2">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-200 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text3">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-300 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text4">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-400 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text5">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-500 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text6">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-600 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text7">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-700 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-text8">Badge</span>
   </div>
   <div className="flex items-center justify-center border border-outlined-badge-800 rounded-[5px] px-[6px] py-[4px]">
    <span className="text-[12px] font-bold text-outlined-badge-800">Badge</span>
   </div>
  </div>
 );
};

export default BadgeColorVariantColumn; 
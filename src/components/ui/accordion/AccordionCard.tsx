import React from 'react';

const AccordionCard = () => {
 return (
  <div className="flex flex-col gap-[15px] items-start relative">
   <div className="relative w-full h-[17px] bg-transparent">
    <p className="text-[15px] leading-[18px] tracking-[0.005em] text-slate-600">
     <span className="text-slate-600 text-[15px] tracking-[0.005em] font-medium">Card</span>
    </p>
   </div>
   <div className="flex flex-col gap-2.5 items-start relative w-[475px]">
    <div className="border border-gray-200 p-5 flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[19px] bg-gray-50">
     <div className="flex gap-5 items-center self-stretch relative w-full">
      <div className="flex gap-3 items-center flex-1 relative w-full">
       <p className="text-base leading-6 tracking-[0.005em] text-[#110733]">
        <span className="text-[#110733] text-base tracking-[0.005em] font-bold">Accordion Item</span>
       </p>
      </div>
     </div>
    </div>
    <div className="rounded-xl border border-gray-200 p-5 flex flex-col gap-2.5 items-start self-stretch relative w-full bg-gray-50">
     <div className="flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[19px]">
      <div className="flex gap-5 items-center self-stretch relative w-full">
       <div className="flex gap-3 items-center flex-1 relative w-full">
        <p className="text-base leading-6 tracking-[0.005em] text-[#44009a]">
         <span className="text-[#44009a] text-base tracking-[0.005em] font-bold">What makes ProductHQ different??</span>
        </p>
       </div>
      </div>
     </div>
     <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566]">
      <span className="text-[#4d4566] text-base tracking-[0.005em] font-medium">
       Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante proin nunc leo sed. Ultrices nisi eget lectus vulputate.
      </span>
     </p>
    </div>
    <div className="border border-gray-200 p-5 flex flex-col gap-0 justify-center items-start self-stretch relative w-full h-[19px] bg-gray-50">
     <div className="flex gap-5 items-center self-stretch relative w-full">
      <div className="flex gap-3 items-center flex-1 relative w-full">
       <p className="text-base leading-6 tracking-[0.005em] text-[#110733]">
        <span className="text-[#110733] text-base tracking-[0.005em] font-bold">Accordion Item</span>
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default AccordionCard; 
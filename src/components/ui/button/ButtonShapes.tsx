import React from "react";
import { Plus } from "lucide-react";
import { FC } from 'react';

const ButtonShapes: FC = () => {
 return (
  <div className="w-full max-w-screen-xl mx-auto p-4">
   <div className="flex flex-col space-y-8">
    {/* Docs Title */}
    <div className="space-y-2">
     <h1 className="text-lg font-medium text-black tracking-[-0.4px]">
      Shapes
     </h1>
     <div className="w-full h-[1px] bg-[#E5E7EB]" />
    </div>

    {/* Inline Section */}
    <div className="flex flex-wrap gap-10">
     {/* Types Section */}
     <div className="space-y-4 w-full max-w-[331px]">
      <h6 className="text-sm font-medium text-[#475569] tracking-[-0.4px]">
       Rounded (Default)
      </h6>
      <div className="flex gap-[-1px]">
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#09021A] bg-white border border-[#E5E7EB] shadow-sm rounded-md">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#09021A] bg-white border border-[#E5E7EB] shadow-sm rounded-md">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#09021A] bg-white border border-[#E5E7EB] shadow-sm rounded-md">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
      </div>
     </div>

     {/* Pilled Section */}
     <div className="space-y-4 w-full max-w-[331px]">
      <h6 className="text-sm font-medium text-[#475569] tracking-[-0.4px]">
       Pilled
      </h6>
      <div className="flex gap-[-1px]">
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#09021A] bg-white border border-[#E5E7EB] shadow-sm rounded-full">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#09021A] bg-white border border-[#E5E7EB] shadow-sm rounded-full">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#09021A] bg-white border border-[#E5E7EB] shadow-sm rounded-full">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ButtonShapes; 
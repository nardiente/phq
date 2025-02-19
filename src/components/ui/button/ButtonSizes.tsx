import React from "react";
import { Plus, Home } from "lucide-react";
import { FC } from 'react';

const ButtonSizes: FC = () => {
 return (
  <div className="w-full max-w-screen-xl mx-auto p-4">
   <div className="flex flex-col space-y-8">
    {/* Docs Title */}
    <div className="w-full">
     <h1 className="text-lg font-medium text-black tracking-tight">Sizes</h1>
     <div className="w-full h-px bg-[#E5E7EB] mt-2"></div>
    </div>

    {/* Inline Section */}
    <div className="flex flex-wrap gap-10">
     {/* Small Buttons */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-[#475569]">Small</h6>
      <div className="flex space-x-1">
       <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-[#090827] border border-[#E5E7EB] rounded w-24">
        Button-sm
       </button>
       <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-[#090827] border border-[#E5E7EB] rounded w-24">
        Button-sm
       </button>
       <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-[#090827] border border-[#E5E7EB] rounded w-24">
        Button-sm
       </button>
      </div>
     </div>

     {/* Default Buttons */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-[#475569]">Default</h6>
      <div className="flex space-x-1">
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#090827] border border-[#E5E7EB] rounded w-28">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#090827] border border-[#E5E7EB] rounded w-28">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
       <button className="flex items-center justify-center px-5 py-3 text-sm font-medium text-[#090827] border border-[#E5E7EB] rounded w-28">
        <Plus className="w-4 h-4 mr-2" />
        Button
       </button>
      </div>
     </div>

     {/* Large Buttons */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-[#475569]">Large</h6>
      <div className="flex space-x-1">
       <button className="flex items-center justify-center px-6 py-4 text-sm font-bold text-[#090827] border border-[#E5E7EB] rounded">
        <Home className="w-4 h-4 mr-2" />
        Default-lg
       </button>
       <button className="flex items-center justify-center px-6 py-4 text-sm font-bold text-[#090827] border border-[#E5E7EB] rounded">
        <Home className="w-4 h-4 mr-2" />
        Default-lg
       </button>
       <button className="flex items-center justify-center px-6 py-4 text-sm font-bold text-[#090827] border border-[#E5E7EB] rounded">
        <Home className="w-4 h-4 mr-2" />
        Default-lg
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ButtonSizes; 
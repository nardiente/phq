import React from "react";
import { X } from "lucide-react";
import { FC } from 'react';

const InlineElements: FC = () => {
 return (
  <div className="flex flex-wrap gap-9">
   {/* Status Section */}
   <div className="flex flex-col gap-4">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Status</h6>
    <div className="flex gap-4">
     <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md">
      <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
      <span className="text-xs font-bold text-gray-800">ProductHQ</span>
     </div>
     <div className="flex items-center gap-2 px-2 py-1 bg-green-100 rounded-full">
      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
      <span className="text-xs font-bold text-green-700">Active</span>
     </div>
    </div>
   </div>

   {/* Avatar Section */}
   <div className="flex flex-col gap-4">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Avatar</h6>
    <div className="flex items-center gap-2 px-2 py-1 bg-purple-100 rounded-full">
     <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
     <span className="text-xs font-bold text-purple-700">Maria</span>
    </div>
   </div>

   {/* Close Icon Section */}
   <div className="flex flex-col gap-4">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Close Icon</h6>
    <div className="flex gap-4">
     <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md">
      <span className="text-xs font-bold text-gray-800">ProductHQ</span>
      <div className="w-3.5 h-3.5 bg-gray-200 rounded-full flex items-center justify-center">
       <X className="w-2 h-2 text-gray-700" />
      </div>
     </div>
     <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-full">
      <span className="text-xs font-bold text-gray-800">ProductHQ</span>
      <div className="w-3.5 h-3.5 bg-gray-200 rounded-full flex items-center justify-center">
       <X className="w-2 h-2 text-gray-700" />
      </div>
     </div>
    </div>
   </div>

   {/* Avatar & Close Icon Section */}
   <div className="flex flex-col gap-4">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Avatar & Close Icon</h6>
    <div className="flex items-center gap-2 px-2 py-1 border border-gray-300 rounded-md">
     <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
     <span className="text-xs font-bold text-gray-800">Maria</span>
     <div className="w-3.5 h-3.5 bg-gray-200 rounded-full flex items-center justify-center">
      <X className="w-2 h-2 text-gray-700" />
     </div>
    </div>
   </div>
  </div>
 );
};

export default InlineElements; 
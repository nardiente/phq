import React from "react";
import { FC } from 'react';

const ButtonGroup: FC = () => {
 return (
  <div className="flex flex-wrap gap-10 w-full max-w-screen-xl mx-auto py-4">
   {/* Solid Section */}
   <div className="flex flex-col gap-4 w-64">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Solid</h6>
    <div className="flex gap-2">
     <button className="bg-purple-700 text-white px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
     <button className="bg-purple-700 text-white px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
     <button className="bg-purple-700 text-white px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
    </div>
   </div>

   {/* Outline Section */}
   <div className="flex flex-col gap-4 w-64">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Outline</h6>
    <div className="flex gap-2">
     <button className="border border-purple-700 text-purple-700 px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
     <button className="border border-purple-700 text-purple-700 px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
     <button className="border border-purple-700 text-purple-700 px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
    </div>
   </div>

   {/* Soft Section */}
   <div className="flex flex-col gap-4 w-64">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">Soft</h6>
    <div className="flex gap-2">
     <button className="bg-purple-100 text-purple-700 px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
     <button className="bg-purple-100 text-purple-700 px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
     <button className="bg-purple-100 text-purple-700 px-5 py-3 rounded-md text-sm font-medium">
      Button
     </button>
    </div>
   </div>

   {/* White Section */}
   <div className="flex flex-col gap-4 w-64">
    <h6 className="text-sm font-medium text-gray-600 tracking-tight">White</h6>
    <div className="flex gap-2">
     <button className="bg-white text-gray-900 border border-gray-300 px-5 py-3 rounded-md text-sm font-medium shadow-sm">
      Button
     </button>
     <button className="bg-white text-gray-900 border border-gray-300 px-5 py-3 rounded-md text-sm font-medium shadow-sm">
      Button
     </button>
     <button className="bg-white text-gray-900 border border-gray-300 px-5 py-3 rounded-md text-sm font-medium shadow-sm">
      Button
     </button>
    </div>
   </div>
  </div>
 );
};

export default ButtonGroup; 
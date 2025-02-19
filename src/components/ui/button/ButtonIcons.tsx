import React from "react";
import { LucideIcon } from "lucide-react";
import { FC } from 'react';

const ButtonIcons: FC = () => {
 return (
  <div className="w-full max-w-screen-xl mx-auto p-4">
   <div className="flex flex-col space-y-8">
    {/* Docs Title */}
    <div className="w-full">
     <h1 className="text-lg font-medium text-black tracking-tight">States</h1>
     <div className="w-full h-px bg-gray-300 mt-2"></div>
    </div>

    {/* Inline Section */}
    <div className="flex flex-wrap gap-10">
     {/* Types Section */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-gray-600">Default</h6>
      <div className="flex space-x-1">
       <button className="w-20 h-12 border border-gray-300 bg-white text-sm font-medium text-gray-900 rounded-md shadow-sm">
        Button
       </button>
       <button className="w-20 h-12 border border-gray-300 bg-white text-sm font-medium text-gray-900 rounded-md shadow-sm">
        Button
       </button>
       <button className="w-20 h-12 border border-gray-300 bg-white text-sm font-medium text-gray-900 rounded-md shadow-sm">
        Button
       </button>
      </div>
     </div>

     {/* Hover Section */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-gray-600">Hover</h6>
      <div className="flex space-x-1">
       <button className="w-20 h-12 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-900 rounded-md shadow-sm">
        Button
       </button>
       <button className="w-20 h-12 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-900 rounded-md shadow-sm">
        Button
       </button>
       <button className="w-20 h-12 border border-gray-300 bg-gray-100 text-sm font-medium text-gray-900 rounded-md shadow-sm">
        Button
       </button>
      </div>
     </div>

     {/* Focus Section */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-gray-600">Focus</h6>
      <div className="flex space-x-1">
       <button className="w-20 h-12 border border-gray-300 bg-white text-sm font-medium text-gray-900 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
        Button
       </button>
       <button className="w-20 h-12 border border-gray-300 bg-white text-sm font-medium text-gray-900 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
        Button
       </button>
       <button className="w-20 h-12 border border-gray-300 bg-white text-sm font-medium text-gray-900 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
        Button
       </button>
      </div>
     </div>

     {/* Disabled Section */}
     <div className="flex flex-col space-y-4 w-64">
      <h6 className="text-sm font-medium text-gray-600">Disabled</h6>
      <div className="flex space-x-1">
       <button
        className="w-20 h-12 border border-gray-300 bg-gray-200 text-sm font-medium text-gray-400 rounded-md shadow-sm"
        disabled
       >
        Button
       </button>
       <button
        className="w-20 h-12 border border-gray-300 bg-gray-200 text-sm font-medium text-gray-400 rounded-md shadow-sm"
        disabled
       >
        Button
       </button>
       <button
        className="w-20 h-12 border border-gray-300 bg-gray-200 text-sm font-medium text-gray-400 rounded-md shadow-sm"
        disabled
       >
        Button
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ButtonIcons; 
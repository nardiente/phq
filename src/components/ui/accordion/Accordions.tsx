import React from "react";
import { PlusCircle, DashCircle, ChevronDown, ChevronUp } from "lucide-react";
import { FC } from 'react';

const Accordions: FC = () => {
 return (
  <div className="w-full max-w-screen-xl mx-auto p-4">
   <div className="flex flex-col md:flex-row gap-9">
    {/* Basic Usage Section */}
    <div className="flex flex-col gap-4 w-full md:w-1/3">
     <h6 className="text-sm font-medium text-gray-600 tracking-tight">
      Basic usage
     </h6>
     <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
       <PlusCircle className="text-indigo-900" size={16} />
       <span className="text-lg font-bold text-indigo-900">
        Accordion Item
       </span>
      </div>
      <div className="flex items-center gap-5">
       <DashCircle className="text-purple-900" size={16} />
       <span className="text-lg font-bold text-purple-900">
        What makes ProductHQ different??
       </span>
      </div>
      <p className="text-gray-700 text-base font-medium">
       Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante proin
       nunc leo sed. Ultrices nisi eget lectus vulputate.
      </p>
      <div className="flex items-center gap-5">
       <PlusCircle className="text-indigo-900" size={16} />
       <span className="text-lg font-bold text-indigo-900">
        Accordion Item
       </span>
      </div>
     </div>
    </div>

    {/* Bordered Section */}
    <div className="flex flex-col gap-4 w-full md:w-1/3">
     <h6 className="text-sm font-medium text-gray-600 tracking-tight">
      Bordered
     </h6>
     <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-0">
      <div className="flex items-center justify-between py-3">
       <div className="flex items-center gap-5">
        <PlusCircle className="text-indigo-900" size={16} />
        <span className="text-lg font-bold text-indigo-900">
         Accordion Item
        </span>
       </div>
      </div>
      <hr className="border-gray-300" />
      <div className="flex items-center justify-between py-3">
       <div className="flex items-center gap-5">
        <DashCircle className="text-purple-900" size={16} />
        <span className="text-lg font-bold text-purple-900">
         What makes ProductHQ different??
        </span>
       </div>
      </div>
      <div className="bg-gray-50 p-4">
       <p className="text-gray-700 text-base font-medium">
        Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante
        proin nunc leo sed. Ultrices nisi eget lectus vulputate.
       </p>
      </div>
      <hr className="border-gray-300" />
      <div className="flex items-center justify-between py-3">
       <div className="flex items-center gap-5">
        <PlusCircle className="text-indigo-900" size={16} />
        <span className="text-lg font-bold text-indigo-900">
         Accordion Item
        </span>
       </div>
      </div>
     </div>
    </div>

    {/* Light Background Section */}
    <div className="flex flex-col gap-4 w-full md:w-1/3">
     <h6 className="text-sm font-medium text-gray-600 tracking-tight">
      Light Background
     </h6>
     <div className="border border-gray-300 rounded-lg flex flex-col gap-0">
      <div className="flex items-center justify-between py-3 px-5">
       <div className="flex items-center gap-5">
        <span className="text-lg font-bold text-indigo-900">
         Accordion Item
        </span>
       </div>
       <ChevronDown className="text-indigo-900" size={16} />
      </div>
      <hr className="border-gray-300" />
      <div className="bg-gray-50 flex items-center justify-between py-3 px-5">
       <div className="flex items-center gap-5">
        <span className="text-lg font-bold text-purple-900">
         What makes ProductHQ different??
        </span>
       </div>
       <ChevronUp className="text-purple-900" size={16} />
      </div>
      <div className="bg-gray-50 p-4">
       <p className="text-gray-700 text-base font-medium">
        Lorem ipsum dolor sit amet consectetur. Feugiat euismod ante
        proin nunc leo sed. Ultrices nisi eget lectus vulputate.
       </p>
      </div>
      <hr className="border-gray-300" />
      <div className="flex items-center justify-between py-3 px-5">
       <div className="flex items-center gap-5">
        <span className="text-lg font-bold text-indigo-900">
         Accordion Item
        </span>
       </div>
       <ChevronDown className="text-indigo-900" size={16} />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Accordions; 
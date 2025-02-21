import React from 'react';
import { FC } from 'react';
import BadgeColorVariants1 from './BadgeColorVariants1';

const BadgeColorVariants: FC = () => {
 return (
  <div className="flex space-x-9 w-full max-w-[522px]">
   <BadgeColorVariants1 />
   {/* Add other color variant columns here */}
  </div>
 );
};

export default BadgeColorVariants; 
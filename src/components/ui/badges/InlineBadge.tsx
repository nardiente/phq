import React from 'react';
import { FC } from 'react';

interface InlineBadgeProps {
 size: 'sm' | 'DEFAULT' | 'lg';
 children: React.ReactNode;
}

const InlineBadge: FC<InlineBadgeProps> = ({ size, children }) => {
 let badgeClasses =
  'flex items-center justify-center bg-badge-soft rounded-[5px] text-badge-solid font-bold';

 switch (size) {
  case 'sm':
   badgeClasses += ' px-[4px] py-[2px] text-badge-sm';
   break;
  case 'DEFAULT':
   badgeClasses += ' px-[6px] py-[4px] text-badge-base';
   break;
  case 'lg':
   badgeClasses += ' px-[10px] py-[8px] text-badge-base';
   break;
  default:
   break;
 }

 return <div className={badgeClasses}>{children}</div>;
};

export default InlineBadge; 
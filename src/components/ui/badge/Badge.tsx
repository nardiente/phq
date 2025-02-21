import React from 'react';
import { FC } from 'react';

interface BadgeProps {
 variant: 'white' | 'outlined' | 'soft' | 'solid';
 children: React.ReactNode;
}

const Badge: FC<BadgeProps> = ({ variant, children }) => {
 let badgeClasses = 'flex items-center justify-center w-[57px] h-[26px] text-xs font-bold rounded-[5px]';

 switch (variant) {
  case 'white':
   badgeClasses += ' border border-neutral-border text-neutral-text';
   break;
  case 'outlined':
   badgeClasses += ' border border-badge-outlined text-badge-outlined';
   break;
  case 'soft':
   badgeClasses += ' bg-badge-soft text-badge-soft';
   break;
  case 'solid':
   badgeClasses += ' bg-badge-solid text-white';
   break;
  default:
   break;
 }

 return (
  <div className={badgeClasses}>
   {children}
  </div>
 );
};

export default Badge; 
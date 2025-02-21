import React from 'react';
import Button from './Button';

interface ButtonSectionProps {
  title: string;
  buttons: React.ReactNode;
}

const ButtonSection: React.FC<ButtonSectionProps> = ({ title, buttons }) => {
  return (
    <div className="flex flex-col gap-[30px] items-start self-stretch relative w-full">
      <div className="flex flex-col gap-2.5 items-start self-stretch relative w-full">
        <p className="text-lg leading-[22px] tracking-[0.005em] text-black">
          <span className="text-black text-lg tracking-[0.005em] font-medium">{title}</span>
        </p>
        <div className="w-full h-px bg-gray-200"></div>
      </div>
      {buttons}
    </div>
  );
};

export default ButtonSection; 
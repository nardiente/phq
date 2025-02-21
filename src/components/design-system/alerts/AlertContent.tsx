import React from 'react';
import { AlertProps } from './types';

export const AlertContent: React.FC<Pick<AlertProps, 'variant' | 'title' | 'description' | 'actions' | 'link'>> = ({
  variant,
  title,
  description,
  actions,
  link
}) => {
  if (variant === 'example-link-right') {
    return (
      <div className="flex gap-2.5 items-start self-stretch relative w-full">
        {/* Link right specific layout */}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
      {title && (
        <div className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
          {typeof title === 'string' ? (
            <p className={`text-lg leading-[22px] tracking-[0.005em] ${
              variant === 'example-dismiss' ? 'text-teal-800' : 'text-[#110733]'
            }`}>
              <span className="font-bold">{title}</span>
            </p>
          ) : title}
        </div>
      )}
      {description && (
        <div className="text-base leading-6 tracking-[0.005em] text-[#4d4566]">
          {typeof description === 'string' ? (
            <span className="font-normal">{description}</span>
          ) : description}
        </div>
      )}
      {actions && (
        <div className="pt-2.5 pb-0 flex gap-[5px] items-start self-stretch relative w-full">
          {actions}
        </div>
      )}
    </div>
  );
}; 
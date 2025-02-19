import React from 'react';

type ButtonProps = {
  variant?: 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'white';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill';
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton = ({ 
  variant = 'solid', 
  size = 'md',
  shape = 'rounded',
  children = 'Button',
  disabled,
  className = '',
  ...props 
}: ButtonProps) => {
  const variants = {
    solid: `
      bg-[#5A00CD] text-white
      hover:bg-[#4A00AD]
      focus:ring-4 focus:ring-[rgba(168,85,247,0.25)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    outline: `
      border border-dark text-dark bg-white
      hover:bg-[#F9F5FD]
      focus:ring-4 focus:ring-[rgba(168,85,247,0.25)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      text-[#5A00CD] bg-transparent
      hover:bg-[#F9F5FD]
      focus:ring-4 focus:ring-[rgba(168,85,247,0.25)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    soft: `
      bg-[#F9F5FD] text-[#5A00CD]
      hover:bg-[#EBE0F9]
      focus:ring-4 focus:ring-[rgba(168,85,247,0.25)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    link: `
      text-[#5A00CD] bg-transparent
      hover:underline
      focus:ring-4 focus:ring-[rgba(168,85,247,0.25)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    white: `
      bg-white text-[#09031A] border-[1px] border-[#E5E7EB]
      hover:bg-[#F9FAFB]
      focus:ring-4 focus:ring-[rgba(168,85,247,0.25)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `
  };

  const sizes = {
    sm: `
      h-[35px] px-3 py-2
      text-[14px] font-medium
    `,
    md: `
      h-[48px] px-5 py-[14px]
      text-[15px] font-medium
    `,
    lg: `
      h-[60px] px-6 py-[18px]
      text-[16px] font-bold
    `
  };

  const shapes = {
    rounded: 'rounded-[6px]',
    pill: 'rounded-full'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-['Satoshi'] font-medium
        ${shapes[shape]}
        transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
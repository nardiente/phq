import { FC, ReactNode } from 'react';

interface ButtonProps {
  text: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg border';
  const variantStyles = {
    primary: 'bg-[#FF5C35] hover:bg-[#ff4a1a] text-white',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-red-100 text-red-600 hover:bg-red-200',
    outline: 'border-gray-200 text-gray-600 hover:bg-gray-100',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

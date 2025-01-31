import { FC, ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  text: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
}

const Button: FC<ButtonProps> = ({
  className = '',
  disabled = false,
  loading = false,
  onClick,
  text,
  variant = 'primary',
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg border';
  const variantStyles = {
    primary: 'bg-[#FF5C35] hover:bg-[#FF6334] text-white',
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
      {loading ? 'Loading ...' : text}
    </button>
  );
};

export default Button;

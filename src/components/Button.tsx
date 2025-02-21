import { FC, ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  text: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'custom';
}

const Button: FC<ButtonProps> = ({
  className = '',
  disabled = false,
  loading = false,
  onClick,
  text,
  variant = 'primary',
}) => {
  const baseStyles =
    'flex items-center gap-2 px-4 py-2 rounded-lg hover:opacity-90';
  const variantStyles = {
    primary: 'bg-[#ff6334] text-white',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    danger: 'bg-red-100 text-white hover:bg-red-200',
    outline: 'border-gray-200 text-gray-600 hover:bg-gray-100',
    custom: '',
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

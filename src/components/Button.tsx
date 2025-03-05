import React from 'react';

type ButtonState = 'default' | 'hover' | 'focus' | 'disabled';
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'white';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  state?: ButtonState;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  state = 'default',
  variant = 'solid',
}) => {
  const baseStyles = 'flex gap-0 items-start relative bg-transparent';

  const getVariantStyles = (variant: ButtonVariant, state: ButtonState) => {
    const styles = {
      solid: {
        default: 'bg-[#5a00cd] text-white',
        hover: 'bg-[#44009a] text-white',
        focus: 'bg-[#5a00cd] text-white',
        disabled: 'bg-[#d6bff3] text-white',
      },
      outline: 'border border-[#5a00cd] text-[#5a00cd]',
      ghost: 'text-[#5a00cd] font-bold',
      soft: 'bg-[#ebdff9] text-[#5a00cd] font-bold',
      link: 'text-[#5a00cd]',
      white:
        'bg-white border border-gray-200 text-[#09041a] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]',
    };

    if (variant === 'solid') {
      return styles.solid[state];
    }
    return styles[variant];
  };

  return (
    <button
      className={baseStyles}
      disabled={disabled || loading}
      onClick={onClick}
    >
      <div
        className={`overflow-hidden rounded-md px-5 py-[14px] flex gap-2.5 justify-center items-center relative ${getVariantStyles(variant, state)} ${className}`}
      >
        <p className="text-[15px] leading-[18px] tracking-[0.005em] text-center">
          <span className="text-[15px] tracking-[0.005em] font-medium">
            {loading ? 'Loading ...' : children}
          </span>
        </p>
      </div>
    </button>
  );
};

export default Button;

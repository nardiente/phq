import React from 'react';

type ButtonState = 'default' | 'hover' | 'focus' | 'disabled' | 'outline';
type ButtonVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'soft'
  | 'link'
  | 'white'
  | 'blue';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  pClassName?: string;
  state?: ButtonState;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  pClassName = '',
  state = 'default',
  variant = 'solid',
}) => {
  const baseStyles = 'flex gap-0 items-start relative bg-transparent';

  const getVariantStyles = (variant: ButtonVariant, state: ButtonState) => {
    const styles = {
      solid: {
        default: 'bg-[#FF6334] text-white',
        hover: 'bg-[#44009a] text-white',
        focus: 'bg-[#FF6334] text-white',
        disabled: 'bg-[#d6bff3] text-white',
        outline: 'border border-[#FF6334] text-[#FF6334]',
      },
      outline: 'border border-[#FF6334] text-[#FF6334]',
      ghost: 'text-[#FF6334] font-bold',
      soft: 'bg-[#ebdff9] text-[#FF6334] font-bold',
      link: 'text-[#5a00cd]',
      white:
        'bg-white border border-gray-200 text-[#09041a] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]',
      blue: {
        default: 'bg-[#5a00cd] text-white',
        hover: 'bg-[#44009a] text-white',
        focus: 'bg-[#5a00cd] text-white',
        disabled: 'bg-[#d6bff3] text-white',
        outline: 'border border-[#5a00cd] text-[#5a00cd]',
      },
    };

    if (variant === 'solid') {
      return styles.solid[state];
    }
    if (variant === 'blue') {
      return styles.blue[state];
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
        className={`overflow-hidden rounded-md px-4 py-2 flex justify-center items-center relative ${getVariantStyles(variant, state)} ${className}`}
      >
        <p
          className={
            'text-[15px] leading-[18px] tracking-[0.005em] text-center text-inherit ' +
            pClassName
          }
        >
          <span className="text-[15px] tracking-[0.005em] font-medium text-inherit">
            {children}
          </span>
        </p>
      </div>
    </button>
  );
};

export default Button;

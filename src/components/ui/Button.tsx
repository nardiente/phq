import { components } from '../../styles/components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ 
  variant = 'primary',
  size = 'md',
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={`
        ${components.button.base}
        ${components.button.variants[variant].base}
        ${components.button.variants[variant].hover}
        ${components.button.variants[variant].focus}
        ${components.button.sizes[size]}
        ${className}
      `}
      {...props}
    />
  );
}; 
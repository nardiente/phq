import { components } from '../../styles/components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Input = ({ error, size = 'md', disabled, className, ...props }: InputProps) => {
  return (
    <input
      className={`
        ${components.input.base}
        ${components.input.sizes[size]}
        ${error ? components.input.error : components.input.focus}
        ${disabled && components.input.disabled}
        ${className}
      `}
      disabled={disabled}
      {...props}
    />
  );
}; 
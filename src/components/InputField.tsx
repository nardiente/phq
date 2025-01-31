import React, { HTMLInputTypeAttribute, useRef } from 'react';
import Button from './Button';

interface InputFieldProps {
  className?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  domain?: string;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  variant?: 'default' | 'error' | 'success' | 'outline';
  readOnly?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  className = '',
  label,
  type = 'text',
  value = '',
  domain = '',
  error = '',
  onBlur,
  onChange,
  onClick,
  placeholder,
  variant = 'default',
  readOnly = false,
  disabled = false,
}) => {
  const baseStyles = 'w-full px-4 py-2 border rounded-lg text-[14px]';
  const variantStyles = {
    default: 'border-gray-200 focus:border-[#8340d9]',
    error: 'border-red-500 focus:border-red-600',
    success: 'border-green-500 focus:border-green-600',
    outline: 'border-gray-300 focus:border-blue-500',
  };

  const ref = useRef<HTMLInputElement>(null);
  if (error.length > 0) {
    ref.current?.focus();
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="block text-[13px] font-medium m-0">{label}</label>
      <div className="flex">
        <input
          ref={ref}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className={`${baseStyles} ${variantStyles[variant]} focus:outline-none ${domain.length > 0 || onClick !== undefined ? 'rounded-r-[0px]' : ''} ${className}`}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
        />
        {domain.length > 0 && (
          <label className="px-4 py-2 text-[14px] border bg-[#f9fafb]">
            {domain}
          </label>
        )}
        {onClick !== undefined && (
          <Button
            className="border-solid border rounded-l-[0px] rounded-r-lg h-10 flex justify-center items-center gap-2 text-[14px]"
            onClick={onClick}
            text={
              <>
                <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/updated_copy.svg" />
                Copy
              </>
            }
            variant="outline"
          />
        )}
      </div>
      {error.length > 0 && (
        <label className="not-italic font-medium text-sm leading-[17px] tracking-[0.005em] text-red-400 !important">
          {error}
        </label>
      )}
    </div>
  );
};

export default InputField;

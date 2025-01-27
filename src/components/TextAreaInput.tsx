import React from 'react';

interface TextAreaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'error' | 'success';
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  variant = 'default',
  error = '',
}) => {
  const baseClass =
    'w-full p-4 border rounded-lg min-h-[200px] resize-none placeholder:text-[#888399]';
  const variantClass = {
    default: 'border-gray-300 focus:border-[#8340d9]',
    error: 'border-red-500',
    success: 'border-green-500',
  }[variant];

  return (
    <div className="flex flex-col gap-1.5">
      <textarea
        value={value}
        onChange={onChange}
        className={`${baseClass} ${variantClass} ${className} focus:outline-none placeholder:opacity-[50%]`}
        placeholder={placeholder}
      />
      {error.length > 0 && (
        <label className="not-italic font-medium text-sm leading-[17px] tracking-[0.005em] text-red-400">
          {error}
        </label>
      )}
    </div>
  );
};

export default TextAreaInput;

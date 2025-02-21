import React from 'react';
import { AlertProps } from './types';
import { AlertContent } from './AlertContent';

const Alert: React.FC<AlertProps> = ({ 
  variant,
  title,
  description,
  actions,
  icon,
  link,
  onDismiss,
  avatar 
}) => {
  const baseStyles = `flex gap-5 items-start ${variant === 'example-avatar' ? 'w-[511px]' : 'w-[354px]'}`;
  
  const variantStyles = {
    // Move these to a theme configuration
    'dark': 'rounded-md p-4 bg-[#110733] text-white',
    'green': 'rounded-md p-4 bg-teal-500 text-white',
    // ... other variants
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      {icon && (
        <div className="pt-[3px] pb-0 flex gap-0 items-start relative">
          {icon}
        </div>
      )}
      <AlertContent 
        variant={variant}
        title={title}
        description={description}
        actions={actions}
        link={link}
      />
      {onDismiss && (
        <button onClick={onDismiss}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert; 
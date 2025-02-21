import React from 'react';

interface ButtonDisplayProps {
  type: 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'default';
  label: string;
  state?: 'default' | 'hover' | 'focus' | 'disabled';
  size?: 'small' | 'default' | 'large';
  shape?: 'rounded' | 'pilled';
  color?: string;
}

const ButtonDisplay: React.FC<ButtonDisplayProps> = ({ type, label, state = 'default', size = 'default', shape = 'rounded', color = 'primary' }) => {
  const baseClasses = 'flex justify-center items-center';
  let typeClasses = '';
  let stateClasses = '';
  let sizeClasses = '';
  let shapeClasses = '';
  let textColor = 'text-white';

  switch (type) {
    case 'solid':
      typeClasses = `bg-${color}`;
      break;
    case 'outline':
      typeClasses = `border border-${color}`;
      textColor = `text-${color}`;
      break;
    case 'ghost':
      textColor = `text-${color} font-bold`;
      break;
    case 'soft':
      typeClasses = `bg-${color}`;
      textColor = `text-${color.replace('-100', '')}`;
      break;
    case 'link':
      textColor = `text-${color}`;
      break;
    default:
      typeClasses = 'border border-neutral bg-white';
      textColor = 'text-neutral';
  }

  switch (state) {
    case 'hover':
      stateClasses = 'bg-hover';
      break;
    case 'focus':
      stateClasses = 'ring-2 ring-offset-2 ring-primary';
      break;
    case 'disabled':
      stateClasses = 'bg-disabled cursor-not-allowed';
      break;
    default:
      stateClasses = '';
  }

  switch (size) {
    case 'small':
      sizeClasses = 'px-3 py-2 text-sm';
      break;
    case 'large':
      sizeClasses = 'px-6 py-[18px] text-base';
      break;
    default:
      sizeClasses = 'px-5 py-[14px] text-[15px]';
  }

  switch (shape) {
    case 'pilled':
      shapeClasses = 'rounded-full';
      break;
    default:
      shapeClasses = 'rounded-md';
  }

  return (
    <button className={`${baseClasses} ${typeClasses} ${stateClasses} ${sizeClasses} ${shapeClasses}`} disabled={state === 'disabled'}>
      <p className={`leading-6 tracking-[0.005em] font-bold ${textColor}`}>
        {label}
      </p>
    </button>
  );
};

export default ButtonDisplay; 
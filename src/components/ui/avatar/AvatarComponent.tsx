import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away' | 'dnd';
  style?: 'solid' | 'soft' | 'white' | 'teal' | 'blue' | 'purple' | 'yellow' | 'red' | 'orange' | 'softTeal' | 'softBlue' | 'softPurple' | 'softYellow' | 'softRed' | 'softOrange' | 'softGray' | 'softPink' | 'gray' | 'pink' | 'darkPurple' | 'darkerPurple';
  text?: string;
}

const AvatarComponent: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  status,
  style = 'solid',
  text,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-[26px] h-[26px] text-xs';
      case 'sm':
        return 'w-[38px] h-[38px] text-sm';
      case 'lg':
        return 'w-[62px] h-[62px] text-xl';
      default:
        return 'w-[46px] h-[46px] text-base';
    }
  };

  const getStatusIndicatorClasses = () => {
    switch (status) {
      case 'online':
        return 'bg-[#14B8A6]';
      case 'away':
        return 'bg-[#EAB308]';
      case 'dnd':
        return 'bg-[#EF4444]';
      default:
        return 'bg-[#94A3B8]';
    }
  };

  const getStyleClasses = () => {
    switch (style) {
      case 'soft':
        return 'bg-gray-100 text-[#110733]';
      case 'white':
        return 'border border-gray-200 bg-white text-gray-700';
      case 'teal':
        return 'bg-teal-500 text-white';
      case 'blue':
        return 'bg-blue-500 text-white';
      case 'purple':
        return 'bg-[#5a00cd] text-white';
      case 'yellow':
        return 'bg-yellow-500 text-white';
      case 'red':
        return 'bg-red-500 text-white';
      case 'orange':
        return 'bg-[#ff6334] text-white';
      case 'softTeal':
        return 'bg-teal-100 text-teal-500';
      case 'softBlue':
        return 'bg-blue-50 text-blue-500';
      case 'softPurple':
        return 'bg-[#ebdff9] text-[#5a00cd]';
      case 'softYellow':
        return 'bg-yellow-100 text-yellow-500';
      case 'softRed':
        return 'bg-red-100 text-red-500';
      case 'softOrange':
        return 'bg-[#ffd8cc] text-[#ff6334]';
      case 'softGray':
        return 'bg-gray-100 text-gray-500';
      case 'softPink':
        return 'bg-pink-100 text-pink-500';
      case 'gray':
        return 'bg-gray-500 text-white';
      case 'pink':
        return 'bg-pink-500 text-white';
      case 'darkPurple':
        return 'bg-[#110733] text-white';
      default:
        return 'bg-[#4d4566] text-white';
    }
  };

  return (
    <div className="relative">
      {src ? (
        <div className={`rounded-full overflow-hidden flex items-center justify-center ${getSizeClasses()} ${getStyleClasses()}`}>
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`rounded-full flex items-center justify-center ${getSizeClasses()} ${getStyleClasses()}`}>
          {text || 'A'}
        </div>
      )}
      {status && (
        <svg
          className="absolute bottom-0 right-0"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="5" fill={getStatusIndicatorClasses()} stroke="white" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

export default AvatarComponent;
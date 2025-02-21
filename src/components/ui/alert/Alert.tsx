import React from 'react';

type AlertVariant = 
  | 'dark' | 'green' | 'purple' | 'blue' | 'red' | 'orange' | 'yellow' | 'light' | 'gray'
  | 'soft-dark' | 'soft-gray' | 'soft-green' | 'soft-purple' | 'soft-blue' | 'soft-red' | 'soft-orange' | 'soft-yellow'
  | 'rounded-dark' | 'rounded-gray' | 'rounded-green' | 'rounded-purple' | 'rounded-blue' | 'rounded-red' | 'rounded-orange' | 'rounded-yellow' | 'rounded-light'
  | 'rounded-soft-dark' | 'rounded-soft-gray' | 'rounded-soft-green' | 'rounded-soft-purple' | 'rounded-soft-blue' | 'rounded-soft-red' | 'rounded-soft-orange' | 'rounded-soft-yellow' | 'rounded-soft-light'
  | 'example-warning' | 'example-error' | 'example-info'
  | 'example-link-right' | 'example-discover' | 'example-dismiss'
  | 'example-upload-success' 
  | 'example-update-available'
  | 'example-user-deleted'
  | 'example-avatar';

interface AlertProps {
  variant: AlertVariant;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  link?: { text: string; onClick?: () => void };
  onDismiss?: () => void;
  avatar?: string;
}

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.982 1.56601C8.88301 1.39358 8.74027 1.25031 8.56821 1.15069C8.39614 1.05106 8.20083 0.998596 8.002 0.998596C7.80317 0.998596 7.60786 1.05106 7.43579 1.15069C7.26372 1.25031 7.12099 1.39358 7.022 1.56601L0.164999 13.233C-0.292001 14.011 0.255999 15 1.145 15H14.858C15.747 15 16.296 14.01 15.838 13.233L8.982 1.56601Z" fill="#FACC15"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.982 1.56601C8.88301 1.39358 8.74027 1.25031 8.56821 1.15069C8.39614 1.05106 8.20083 0.998596 8.002 0.998596C7.80317 0.998596 7.60786 1.05106 7.43579 1.15069C7.26372 1.25031 7.12099 1.39358 7.022 1.56601L0.164999 13.233C-0.292001 14.011 0.255999 15 1.145 15H14.858C15.747 15 16.296 14.01 15.838 13.233L8.982 1.56601Z" fill="#F87171"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z" fill="#4D4566"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13.854 2.14598C13.9006 2.19242 13.9375 2.2476 13.9627 2.30834C13.9879 2.36909 14.0009 2.43421 14.0009 2.49998C14.0009 2.56575 13.9879 2.63087 13.9627 2.69161C13.9375 2.75236 13.9006 2.80753 13.854 2.85398L2.85402 13.854C2.76013 13.9479 2.6328 14.0006 2.50002 14.0006C2.36725 14.0006 2.23991 13.9479 2.14602 13.854C2.05213 13.7601 1.99939 13.6328 1.99939 13.5C1.99939 13.3672 2.05213 13.2399 2.14602 13.146L13.146 2.14598C13.1925 2.09941 13.2476 2.06247 13.3084 2.03727C13.3691 2.01206 13.4343 1.99908 13.5 1.99908C13.5658 1.99908 13.6309 2.01206 13.6917 2.03727C13.7524 2.06247 13.8076 2.09941 13.854 2.14598Z" fill="#4D4566"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M2.14604 2.14598C2.09948 2.19242 2.06253 2.2476 2.03733 2.30834C2.01212 2.36909 1.99915 2.43421 1.99915 2.49998C1.99915 2.56575 2.01212 2.63087 2.03733 2.69161C2.06253 2.75236 2.09948 2.80753 2.14604 2.85398L13.146 13.854C13.2399 13.9479 13.3673 14.0006 13.5 14.0006C13.6328 14.0006 13.7602 13.9479 13.854 13.854C13.9479 13.7601 14.0007 13.6328 14.0007 13.5C14.0007 13.3672 13.9479 13.2399 13.854 13.146L2.85404 2.14598C2.80759 2.09941 2.75242 2.06247 2.69167 2.03727C2.63093 2.01206 2.56581 1.99908 2.50004 1.99908C2.43427 1.99908 2.36915 2.01206 2.30841 2.03727C2.24766 2.06247 2.19248 2.09941 2.14604 2.14598Z" fill="#4D4566"/>
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM12.03 4.97C11.9586 4.89882 11.8735 4.84277 11.7799 4.80522C11.6863 4.76766 11.5861 4.74936 11.4853 4.75141C11.3845 4.75347 11.2851 4.77583 11.1932 4.81717C11.1012 4.85851 11.0185 4.91797 10.95 4.992L7.477 9.417L5.384 7.323C5.24183 7.19052 5.05378 7.1184 4.85948 7.12183C4.66518 7.12525 4.47979 7.20397 4.34238 7.34138C4.20497 7.47879 4.12625 7.66418 4.12283 7.85848C4.1194 8.05278 4.19152 8.24083 4.324 8.383L6.97 11.03C7.04128 11.1012 7.12616 11.1572 7.21958 11.1949C7.313 11.2325 7.41305 11.2509 7.51375 11.2491C7.61444 11.2472 7.71374 11.2251 7.8057 11.184C7.89766 11.1429 7.9804 11.0837 8.049 11.01L12.041 6.02C12.1771 5.8785 12.2523 5.68928 12.2504 5.49296C12.2485 5.29664 12.1698 5.10888 12.031 4.97H12.03Z" fill="#2DD4BF"/>
  </svg>
);

const SuccessCheckIcon = () => (
  <div className="rounded-full border-[5px] border-[#ebdff9] flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-[#d6bff3]">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.92 4.96248C16.0053 4.87544 16.1071 4.80629 16.2195 4.75908C16.3318 4.71188 16.4525 4.68756 16.5744 4.68756C16.6962 4.68756 16.8169 4.71188 16.9293 4.75908C17.0416 4.80629 17.1434 4.87544 17.2287 4.96248C17.5862 5.32373 17.5912 5.90748 17.2412 6.27498L9.85 15.0125C9.76608 15.1046 9.66424 15.1787 9.55072 15.2301C9.4372 15.2816 9.31437 15.3093 9.18976 15.3117C9.06514 15.314 8.94136 15.2909 8.82599 15.2437C8.71061 15.1966 8.60607 15.1264 8.51875 15.0375L4.02125 10.48C3.84779 10.3031 3.75063 10.0652 3.75063 9.81748C3.75063 9.56973 3.84779 9.33187 4.02125 9.15498C4.10656 9.06794 4.20837 8.99879 4.32073 8.95158C4.4331 8.90438 4.55375 8.88006 4.67562 8.88006C4.7975 8.88006 4.91815 8.90438 5.03051 8.95158C5.14288 8.99879 5.24469 9.06794 5.33 9.15498L9.145 13.0212L15.895 4.98998C15.9028 4.98032 15.9111 4.97113 15.92 4.96248Z" fill="#5A00CD"/>
    </svg>
  </div>
);

const UpdateIcon = () => (
  <div className="rounded-full border-[5px] border-[#ebdff9] flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-[#d6bff3]">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4175 8.75003H19.3325C19.3919 8.75005 19.45 8.76699 19.5001 8.79887C19.5502 8.83074 19.5902 8.87623 19.6154 8.93C19.6406 8.98378 19.6499 9.04361 19.6423 9.1025C19.6347 9.1614 19.6105 9.2169 19.5725 9.26253L17.115 12.2125C17.0857 12.2477 17.049 12.276 17.0075 12.2954C16.966 12.3148 16.9208 12.3249 16.875 12.3249C16.8292 12.3249 16.784 12.3148 16.7425 12.2954C16.701 12.276 16.6643 12.2477 16.635 12.2125L14.1775 9.26253C14.1395 9.2169 14.1153 9.1614 14.1077 9.1025C14.1001 9.04361 14.1094 8.98378 14.1346 8.93C14.1598 8.87623 14.1998 8.83074 14.2499 8.79887C14.3 8.76699 14.3581 8.75005 14.4175 8.75003V8.75003Z" fill="#5A00CD"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10 3.74999C8.06001 3.74999 6.32501 4.63374 5.17876 6.02249C5.12758 6.08883 5.06357 6.1442 4.99056 6.18531C4.91755 6.22642 4.83701 6.25243 4.75375 6.26179C4.67048 6.27115 4.58618 6.26368 4.50586 6.2398C4.42554 6.21593 4.35084 6.17616 4.28621 6.12284C4.22157 6.06952 4.16831 6.00374 4.1296 5.92943C4.0909 5.85511 4.06753 5.77377 4.06088 5.69025C4.05424 5.60672 4.06446 5.52271 4.09094 5.44321C4.11742 5.36371 4.15961 5.29035 4.21501 5.22749C5.13025 4.11939 6.3445 3.2975 7.71334 2.85956C9.08218 2.42161 10.548 2.38605 11.9365 2.7571C13.3249 3.12815 14.5776 3.89019 15.5455 4.95259C16.5134 6.015 17.1558 7.33305 17.3963 8.74999H16.125C15.8364 7.3385 15.0692 6.06998 13.9532 5.15892C12.8371 4.24786 11.4407 3.75016 10 3.74999V3.74999Z" fill="#5A00CD"/>
    </svg>
  </div>
);

const DeleteIcon = () => (
  <div className="rounded-full border-[5px] border-red-50 flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-red-100">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.92 4.96248C16.0053 4.87544 16.1071 4.80629 16.2195 4.75908C16.3318 4.71188 16.4525 4.68756 16.5743 4.68756C16.6962 4.68756 16.8169 4.71188 16.9292 4.75908C17.0416 4.80629 17.1434 4.87544 17.2287 4.96248C17.5862 5.32373 17.5912 5.90748 17.2412 6.27498L9.84997 15.0125C9.76606 15.1046 9.66422 15.1787 9.5507 15.2301C9.43717 15.2816 9.31435 15.3093 9.18973 15.3117C9.06512 15.314 8.94134 15.2909 8.82596 15.2437C8.71059 15.1966 8.60604 15.1264 8.51872 15.0375L4.02123 10.48C3.84777 10.3031 3.75061 10.0652 3.75061 9.81748C3.75061 9.56973 3.84777 9.33187 4.02123 9.15498C4.10653 9.06794 4.20835 8.99879 4.32071 8.95158C4.43307 8.90438 4.55372 8.88006 4.6756 8.88006C4.79748 8.88006 4.91813 8.90438 5.03049 8.95158C5.14285 8.99879 5.24467 9.06794 5.32998 9.15498L9.14497 13.0212L15.895 4.98998C15.9027 4.98032 15.9111 4.97113 15.92 4.96248Z" fill="#EF4444"/>
    </svg>
  </div>
);

const Avatar = ({ src }: { src: string }) => (
  <div className="rounded-full flex gap-0 justify-center items-center relative w-[38px] h-[38px] bg-[#4d4566]">
    <div className="overflow-hidden rounded-full relative w-[38px] h-[38px] bg-transparent">
      <img src={src} className="w-[38px] h-[38px]" alt="User avatar" />
    </div>
  </div>
);

const Alert: React.FC<AlertProps> = ({ variant, children, title, description, actions, icon, link, onDismiss, avatar }) => {
  const baseStyles = `flex gap-5 items-start ${variant === 'example-avatar' ? 'w-[511px]' : 'w-[354px]'}`;
  
  const variantStyles = {
    // Solid variants (rounded-md)
    dark: 'rounded-md p-4 bg-[#110733] text-white',
    green: 'rounded-md p-4 bg-teal-500 text-white',
    purple: 'rounded-md p-4 bg-[#5a00cd] text-white',
    blue: 'rounded-md p-4 bg-blue-500 text-white',
    red: 'rounded-md p-4 bg-red-500 text-white',
    orange: 'rounded-md p-4 bg-[#ff6334] text-white',
    yellow: 'rounded-md p-4 bg-yellow-500 text-white',
    light: 'rounded-md p-4 bg-white text-[#110733]',
    gray: 'rounded-md p-4 bg-[#4d4566] text-white',
    // Soft variants
    'soft-dark': 'rounded-md p-4 bg-gray-100 text-[#110733]',
    'soft-gray': 'rounded-md p-4 bg-gray-50 text-[#110733]',
    'soft-green': 'rounded-md p-4 bg-teal-50 text-teal-800',
    'soft-purple': 'rounded-md p-4 bg-[#ebdff9] text-[#110733]',
    'soft-blue': 'rounded-md p-4 bg-blue-50 text-[#110733]',
    'soft-red': 'rounded-md p-4 bg-red-50 text-red-800',
    'soft-orange': 'rounded-md p-4 bg-[#fff5f2] text-[#bf4a27]',
    'soft-yellow': 'rounded-md p-4 bg-yellow-50 text-yellow-800',
    // Rounded variants
    'rounded-dark': 'rounded-full px-6 py-4 bg-[#110733] text-white',
    'rounded-gray': 'rounded-full px-6 py-4 bg-[#4d4566] text-white',
    'rounded-green': 'rounded-full px-6 py-4 bg-teal-500 text-white',
    'rounded-purple': 'rounded-full px-6 py-4 bg-[#5a00cd] text-white',
    'rounded-blue': 'rounded-full px-6 py-4 bg-blue-500 text-white',
    'rounded-red': 'rounded-full px-6 py-4 bg-red-500 text-white',
    'rounded-orange': 'rounded-full px-6 py-4 bg-[#ff6334] text-white',
    'rounded-yellow': 'rounded-full px-6 py-4 bg-yellow-500 text-white',
    'rounded-light': 'rounded-full px-6 py-4 bg-white text-[#110733]',
    // Rounded Soft variants
    'rounded-soft-dark': 'rounded-full px-6 py-4 bg-gray-100 text-[#110733]',
    'rounded-soft-gray': 'rounded-full px-6 py-4 bg-gray-50 text-[#110733]',
    'rounded-soft-green': 'rounded-full px-6 py-4 bg-teal-50 text-teal-800',
    'rounded-soft-purple': 'rounded-full px-6 py-4 bg-[#ebdff9] text-[#110733]',
    'rounded-soft-blue': 'rounded-full px-6 py-4 bg-blue-50 text-[#110733]',
    'rounded-soft-red': 'rounded-full px-6 py-4 bg-red-50 text-red-800',
    'rounded-soft-orange': 'rounded-full px-6 py-4 bg-[#fff5f2] text-[#bf4a27]',
    'rounded-soft-yellow': 'rounded-full px-6 py-4 bg-yellow-50 text-yellow-800',
    'rounded-soft-light': 'rounded-full px-6 py-4 bg-white/10 text-white',
    'example-warning': 'rounded-md p-4 bg-yellow-50',
    'example-error': 'rounded-md p-4 bg-red-50',
    'example-info': 'rounded-md p-4 bg-[#ebdff9]',
    'example-link-right': 'rounded-md p-4 bg-gray-50',
    'example-discover': 'rounded-md border border-gray-200 px-6 py-4 bg-white',
    'example-dismiss': 'rounded-md p-4 bg-teal-50',
    'example-upload-success': 'rounded-md p-4 bg-[#5a00cd]',
    'example-update-available': 'rounded-md border border-gray-200 px-6 py-4 bg-white',
    'example-user-deleted': 'rounded-md p-4 bg-red-50',
    'example-avatar': 'rounded-md border border-gray-200 px-6 py-4 bg-white',
  };

  const getIcon = () => {
    if (variant === 'example-avatar' && avatar) {
      return <Avatar src={avatar} />;
    }
    if (icon) return icon;
    switch (variant) {
      case 'example-warning': return <WarningIcon />;
      case 'example-error': return <ErrorIcon />;
      case 'example-info': return <InfoIcon />;
      case 'example-dismiss': return <SuccessIcon />;
      case 'example-upload-success': return <SuccessCheckIcon />;
      case 'example-update-available': return <UpdateIcon />;
      case 'example-user-deleted': return <DeleteIcon />;
      default: return null;
    }
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      {getIcon() && (
        <div className="pt-[3px] pb-0 flex gap-0 items-start relative">
          {getIcon()}
        </div>
      )}
      <div className="flex flex-col gap-[5px] items-start flex-1 relative w-full">
        {variant === 'example-link-right' ? (
          <div className="flex gap-2.5 items-start self-stretch relative w-full">
            <p className="text-lg leading-[22px] tracking-[0.005em] text-[#110733]">
              <span className="text-[#110733] text-lg tracking-[0.005em] font-normal">
                {description}
              </span>
            </p>
            {link && (
              <div className="pt-0.5 pb-0 flex gap-2.5 items-start relative">
                <p className="text-base leading-6 tracking-[0.005em] text-[#5a00cd]">
                  <span className="text-[#5a00cd] text-base tracking-[0.005em] font-medium">
                    {link.text}
                  </span>
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            {title && (
              <div className="pl-0 pr-[35px] flex gap-2.5 items-start self-stretch relative w-full">
                <p className={`text-lg leading-[22px] tracking-[0.005em] ${
                  variant === 'example-dismiss' ? 'text-teal-800' : 'text-[#110733]'
                }`}>
                  <span className="font-bold">{title}</span>
                </p>
              </div>
            )}
            {description && (
              <p className="text-base leading-6 tracking-[0.005em] text-[#4d4566]">
                <span className="font-normal">{description}</span>
              </p>
            )}
          </>
        )}
        {actions}
      </div>
      {onDismiss && (
        <button onClick={onDismiss}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Alert; 
import { ReactNode } from 'react';

export const Settings = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex-1 bg-[#fafafa] ${className !== 'pb-0' ? 'py-6' : 'pt-6'}`}
    >
      {children}
    </div>
  );
};

import { ReactNode } from 'react';
import { useApp } from '../contexts/AppContext';

export const Settings = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { is_public } = useApp();

  return (
    <div
      className={`flex-1 ${is_public ? 'background-color' : 'bg-[#fafafa]'} ${className !== 'pb-0' ? 'py-6' : 'pt-6'}`}
    >
      {children}
    </div>
  );
};

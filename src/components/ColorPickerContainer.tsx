import { FocusEventHandler, ReactNode } from 'react';

export function ColorPicketContainer({
  children,
  className = '',
  onBlur,
  onFocus,
}: {
  children: ReactNode;
  className?: string;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onFocus?: FocusEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={`inline-flex items-center h-10 w-full p-2 border border-gray-200 rounded gap-2 ${className}`}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {children}
    </div>
  );
}

import React from 'react';
import './styles.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withDot?: boolean;
}

export function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  withDot = false,
  ...props
}: BadgeProps) {
  return (
    <div
      className={`badge badge--${variant} badge--${size} ${className}`}
      {...props}
    >
      {withDot && <span className="badge__dot" />}
      {children}
    </div>
  );
}
